<template>
  <base-view :namespace="namespace" :breadcrumb="breadcrumb" :ignore_last_title="true">
    <template slot="content">
      <publisher :uid="get_data()"></publisher>
      <entitydetail></entitydetail>
      <sparqlnetworking></sparqlnetworking>
    </template>
  </base-view>
</template>

<script>
  import BaseView from '../../components/page/views/BaseView';
  import publisher from "../../components/page/plone/publisher";
  import Entitydetail from "../../components/page/entity/entitydetail";
  import Sparqlnetworking from "../../components/page/entity/sparqlnetworking";

  export default {
    components: {
      Sparqlnetworking,
      Entitydetail,
      BaseView,
      publisher
    },
    data() {
      return {
        namespace: 'Publisher Detail',
        breadcrumb: 'Publisher'
      }
    },
    methods: {
      get_data() {
        return this.$route.params.id;

      },
    },
  }
</script>

<style scoped>

</style>
