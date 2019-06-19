<template>
  <base-view :namespace="namespace">
    <template slot="content">
      <plonepage></plonepage>
      <h1>{{ item.title }}</h1>
      <h2>{{ item.description}}</h2>
      <p>This is test content. Will be replaced.</p>
      <div v-html="item.text.data"></div>
    </template>
  </base-view>
</template>

<script>
  import BaseView from '../../components/page/BaseView';
  import {PLONE_URL} from "../../components/config";
  import Plonepage from "../../components/page/plone/plonepage";

  export default {
    components: {
      Plonepage,
      BaseView
    },
    data() {
      return {
        namespace: 'Blog ID',
        result: {},
        item: {
          title: '',
          description: '',
          text: {
            data: ''
          }
        },
        data_url: PLONE_URL + '/Plone/@search?fullobjects=1&UID=',
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
        // todo: this is not nice
        let uid = this.$route.params.id;

        this.request_pages(this.data_url + uid)

      },
      async request_pages(url) {

        this.$axios.setHeader('Content-Type', 'application/json', ['get']);
        this.$axios.setHeader('Accept', 'application/json', ['get']);
        this.$axios.setHeader('Access-Control-Allow-Origin', '*', ['get']);
        this.result = await this.$axios.$get(url);
        this.item = this.result.items[0];
        this.$log.debug(this.item);
        this.$forceUpdate()
      },
    }

  }
</script>

<style scoped>

</style>
