<template>
  <div :class="style_class">

  <div v-for="item in this.result.items" :class="element_style_class">
    <div class="element_title">{{ item.title }}</div>
    <div class="element_logo" v-if="item.logo"><img :src="item.logo.download"/></div>
    <div class="element_description">{{ item.description }}</div>
    <NuxtLink :to="get_nuxt_link(item.UID)">[Mehr]</NuxtLink>
  </div>
  </div>
</template>

<script>
  import {PLONE_URL} from "../../config";

  export default {
    name: "plonelisting",
    props: ['portal_type', 'max_number', 'sort_on', 'tag', 'view_url', 'element_style_class', 'sort_order', 'style_class'],
    data() {
      return {
        namespace: 'Blog',
        result: {},
        base_data_url: PLONE_URL + '/@search?fullobjects=1',
      }
    },
    mounted() {
      // Force the initialization
      this.$log.debug(this.namespace + ' mounted');
      this.generate_data_url();
      this.get_data();
    },
    methods: {
      get_nuxt_link(uid) {
        return '/' + this.view_url + '/' + uid
      },
      get_data() {
        this.request_pages(this.data_url)
      },
      generate_data_url() {
        this.data_url = this.base_data_url;

        if (this.portal_type !== undefined) {
          this.data_url += '&portal_type=' + this.portal_type
        }

        if (this.sort_on !== undefined) {
          this.data_url += '&sort_on=' + this.sort_on
        }

        if (this.sort_order !== undefined) {
          this.data_url += '&sort_order=' + this.sort_order
        }
        if (this.max_number !== undefined) {
          this.data_url += '&sort_limit=' + this.max_number
        }

        if (this.tag !== undefined) {
          this.data_url += '&Subject=' + this.tag
        }

        this.$log.debug(this.data_url + ' requested');
      },
      async request_pages(url) {

        this.$axios.setHeader('Content-Type', 'application/json', ['get']);
        this.$axios.setHeader('Accept', 'application/json', ['get']);
        this.$axios.setHeader('Access-Control-Allow-Origin', '*', ['get']);
        this.result = await this.$axios.$get(url);
        this.$forceUpdate()
      },
    },
  }
</script>

<style scoped>

  .element_title {
    font-weight: bold;
  }

  .element_logo img {
    max-width: 100px;
  }

</style>
