<template>
  <base-view :namespace="namespace">
    <template slot="content">
      <p>Coming Soon</p>
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
      BaseView
    },
    data() {
      return {
        namespace: 'Sparql',
      }
    },
    mounted() {
    },

  }
</script>

<style scoped>

</style>
