<template>
  <base-view :namespace="namespace" :breadcrumb="breadcrumb" :ignore_last_title="true">
    <template slot="content">
      <entitydetail :id="get_data()" :view_url="view_url" ></entitydetail>
      <sparqlnetworking :id="get_data()" :view_url="view_url"></sparqlnetworking>
    </template>
  </base-view>
</template>

<script>
  import BaseView from '../../components/page/views/BaseView';
  import Entitydetail from "../../components/page/entity/entitydetail";
  import Sparqlnetworking from "../../components/page/entity/sparqlnetworking";
  import {SEARCH_URL} from "../../components/config";

  export default {
    components: {
      Sparqlnetworking,
      Entitydetail,
      BaseView
    },
    data() {
      return {
        namespace: 'Entity',
        breadcrumb: 'DetailSearch',
        view_url: 'search'
      }
    },
    mounted() {
      this.$log.debug(this.namespace + ' mounted');
    },
    methods: {
      get_data() {
        return this.$route.params.id;
      },
    }

  }
</script>

<style scoped>

</style>
