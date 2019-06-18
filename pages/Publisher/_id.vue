<template>
  <base-view :namespace="namespace">
    <template slot="content">
      <h1>Publisher XY</h1>
      <publisher></publisher>
      <entitydetail></entitydetail>
      <sparqlnetworking></sparqlnetworking>
    </template>
  </base-view>
</template>

<script>
  import BaseView from '../../components/page/BaseView';
  import {PLONE_URL} from "../../components/config";
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
      }
    },
  }
</script>

<style scoped>

</style>
