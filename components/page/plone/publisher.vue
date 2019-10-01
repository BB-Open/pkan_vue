<template>
  <div>
    <div class="box_area">
      <div class="text_area">
        <h1>{{ item.title }}</h1>

        <h2 v-if="item.description">{{ item.description}}</h2>
        <div v-html="item.text" v-if="item.text"></div>
      </div>

      <div class="element_logo" v-if="item.logo"><img :src="item.logo.download" :alt="item.title + ' Logo'"/></div>
    </div>
    <entitydetail :id="item.sparql_identifier" :view_url="view_url" v-if="item.sparql_identifier"></entitydetail>
    <sparqlnetworking :id="item.sparql_identifier" :view_url="view_url" v-if="item.sparql_identifier"></sparqlnetworking>
  </div>
</template>

<script>
  import {EV} from "../../configs/events";
  import {PLONE_URL} from "../../configs/server_settings";
  import {BLOG_URL, SEARCH_URL} from "../../configs/routing";
  import entitydetail from "../entity/entitydetail";
  import sparqlnetworking from "../entity/sparqlnetworking";

  export default {
    name: "plonepage_uid",
    props: ['uid'],
    components: {
      entitydetail,
      sparqlnetworking,
    },
    data() {
      return {
        namespace: 'Blog',
        result: {},
        base_data_url: PLONE_URL + '/@search?fullobjects=1',
        item: {
          title: '',
          description: '',
          text:  '',
          sparql_identifier: '',
        },
        view_url: SEARCH_URL,
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
        this.$store.ep_commit('BreadCrumb', 'last_title', this.item.title);
        this.$EventBus.$emit(EV.BREADCRUMB_CHANGED, {});
        this.$forceUpdate()
      },
    },
  }
</script>

<style scoped>

  .element_logo img {
    max-width: 150px;
  }

  .box_area {
    padding: 0px;
  }

</style>
