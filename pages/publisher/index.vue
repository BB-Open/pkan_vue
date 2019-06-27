<template>
  <base-view :namespace="namespace">
    <template slot="content">
      <h1>{{ this.namespace }}</h1>
      <plonelisting></plonelisting>
    </template>
  </base-view>
</template>

<script>
  import BaseView from '../../components/page/BaseView';
  import {PLONE_URL} from "../../components/config";
  import Plonelisting from "../../components/page/plone/plonelisting";

  export default {
    name: 'PlonePages',
    components: {
      Plonelisting,
      BaseView
    },
    data() {
      return {
        namespace: 'Publisher',
      }
    },

  }
</script>

<style scoped>

</style>
