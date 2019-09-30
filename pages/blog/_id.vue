<template>
  <base-view :namespace="namespace" :breadcrumb="breadcrumb" :ignore_last_title="true" :display_info_column="true">
    <template slot="content">
      <plonepage_uid :uid="get_data()"></plonepage_uid>
    </template>
  </base-view>
</template>

<script>

  import plonepage_uid from "../../components/page/plone/plonepage_uid";
  import BaseView from "../../components/page/views/BaseView";

  export default {
    components: {
      plonepage_uid,
      BaseView
    },
    data() {
      return {
        namespace: 'UID View',
        breadcrumb: 'Blog'
      }
    },
    mounted() {
      // Force the initialization
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
