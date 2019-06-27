<template>
  <base-view :namespace="namespace">
    <template slot="content">
      <entitydetail></entitydetail>
      <sparqlnetworking></sparqlnetworking>
    </template>
  </base-view>
</template>

<script>
  import BaseView from '../../components/page/BaseView';
  import {PLONE_URL} from "../../components/config";
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
      }
    },
    mounted() {
    },

  }
</script>

<style scoped>

</style>
