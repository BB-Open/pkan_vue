<template>
  <base-view :namespace="namespace">
    <template slot="content">
      <h1>{{ this.namespace }}</h1>
      <plonelisting></plonelisting>
      <p>This is test content. Will be replaced.</p>
      <li v-for="item in this.result.items">
        <NuxtLink :to="'/blog/'+item.UID">
          {{ item.title }}
        </NuxtLink>
      </li>
    </template>
  </base-view>
</template>

<script>
  import BaseView from '../../components/page/BaseView';
  import {PLONE_URL} from "../../components/config";
  import Plonelisting from "../../components/page/plone/plonelisting";

  export default {
    name: 'Blog',
    components: {
      Plonelisting,
      BaseView
    },
    data() {
      return {
        namespace: 'Blog',
        result: {},
        data_url: PLONE_URL + '/Plone/@search?portal_type=Document&fullobjects=1',
      }
    },
    mounted() {
      // Force the initialization
      this.$log.debug(this.namespace + ' mounted');
      this.$store.ep_commit('GlobalState', 'currentView', this.namespace);
      this.get_data();
    },
    methods: {
      get_data() {
        this.request_pages(this.data_url)
      },
      async request_pages(url) {

        this.$axios.setHeader('Content-Type', 'application/json', ['get']);
        this.$axios.setHeader('Accept', 'application/json', ['get']);
        this.$axios.setHeader('Access-Control-Allow-Origin', '*', ['get']);
        this.result = await this.$axios.$get(url);
        this.$forceUpdate()
      },
    }

  }
</script>

<style scoped>

</style>
