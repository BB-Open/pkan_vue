<template>
  <base-view :namespace="namespace" :breadcrumb="breadcrumb" :ignore_last_title="true">
    <template slot="content">
      <entitydetail></entitydetail>
      <sparqlnetworking></sparqlnetworking>
    </template>
  </base-view>
</template>

<script>
  import BaseView from '../../components/page/views/BaseView';
  import Entitydetail from "../../components/page/entity/entitydetail";
  import Sparqlnetworking from "../../components/page/entity/sparqlnetworking";

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
      }
    },
    mounted() {
    },

  }
</script>

<style scoped>

</style>
