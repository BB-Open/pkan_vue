<template>
  <base-view :namespace="namespace" :breadcrumb="breadcrumb" :ignore_last_title="true" :display_info_column="true">
    <template slot="content">
      <publisher :uid="get_data()"></publisher>
    </template>
  </base-view>
</template>

<script>
  import BaseView from '../../components/page/views/BaseView';
  import publisher from "../../components/page/plone/publisher";

  export default {
    name: 'PublisherDetail',
    components: {
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
