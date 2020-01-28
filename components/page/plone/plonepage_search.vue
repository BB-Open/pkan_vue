<template>
  <div>
    <h1 v-if="this.display_title">{{ item.title }}</h1>
    <h2 v-if="item.description">{{ item.description}}</h2>
    <div v-html="removeSelfClosingTags(item.text.data)" v-if="item.text" :class="content_class"></div>
  </div>
</template>

<script>
  import {PLONE_URL} from "../../configs/server_settings";
  import {removeSelfClosingTags} from "../../mixins/utils";
  import {PLONE_UNREACHABLE_MESSAGE} from "../../configs/plone_keywords";

  export default {
    name: "plonepage_search",
    props: {
      'portal_type': String,
      'sort_on': String,
      'tag': String,
      'element_style_class': String,
      'sort_order': String,
      'content_class': String,
      'display_title': {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        namespace: 'Blog',
        result: {},
        base_data_url: PLONE_URL + '/@search?fullobjects=1',
        item: {
          title: '',
          description: '',
          text: {
            data: ''
          }
        },
      }
    },
    mounted() {
      // Force the initialization
      this.$log.debug(this.namespace + ' mounted');
      this.generate_data_url();
      this.get_data();
    },
    methods: {
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

        this.data_url += '&sort_limit=1';

        if (this.tag !== undefined) {
          this.data_url += '&Subject=' + this.tag
        }

        this.$log.debug(this.data_url + ' requested');
      },
      removeSelfClosingTags(html) {
        return removeSelfClosingTags(html)
      },
      async request_pages(url) {

        this.$axios.setHeader('Content-Type', 'application/json', ['get']);
        this.$axios.setHeader('Accept', 'application/json', ['get']);
        this.$axios.setHeader('Access-Control-Allow-Origin', '*', ['get']);
        try {
          this.result = await this.$axios.$get(url);
        } catch (e) {
          console.log(e.message);
          console.log(e.stack);
          alert(PLONE_UNREACHABLE_MESSAGE);
          return
        }
        if (this.result.items[0] !== undefined) {
          this.item = this.result.items[0];
        }

        this.$forceUpdate()
      },
    },
  }
</script>

<style scoped>


</style>
