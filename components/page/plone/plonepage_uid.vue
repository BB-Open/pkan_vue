<template>
  <div>
    <h1>{{ item.title }}</h1>
    <h2 v-if="item.description">{{ item.description}}</h2>
    <div v-html="item.text.data" v-if="item.text"></div>
  </div>
</template>

<script>
  import {PLONE_URL} from "../../config";

  export default {
    name: "plonepage_uid",
    props: ['uid'],
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
      this.$store.ep_commit('GlobalState', 'currentView', this.namespace);
      this.generate_data_url();
      this.get_data();
    },
    methods: {
      get_data() {
        this.request_pages(this.data_url)
      },
      generate_data_url() {
        this.data_url = this.base_data_url;

        if (this.uid !== undefined) {
          this.data_url += '&UID=' + this.uid
        }
        this.$log.debug(this.data_url + ' requested');
      },
      async request_pages(url) {

        this.$axios.setHeader('Content-Type', 'application/json', ['get']);
        this.$axios.setHeader('Accept', 'application/json', ['get']);
        this.$axios.setHeader('Access-Control-Allow-Origin', '*', ['get']);
        this.result = await this.$axios.$get(url);
        this.item = this.result.items[0];
        this.$forceUpdate()
      },
    },
  }
</script>

<style scoped>



</style>
