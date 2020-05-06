<template>
  <base-view :vuex_ns="vuex_ns" :breadcrumb="breadcrumb" :ignore_last_title="true" :display_info_column="true">
    <template slot="content">
      <plonepage_uid :uid="get_data()" :display_date="true"></plonepage_uid>
    </template>
  </base-view>
</template>

<script>

  import plonepage_uid from "../../components/page/plone/plonepage_uid";
  import BaseView from "../../components/page/views/BaseView";

  export default {
    name: 'Blogdetail',
    components: {
      plonepage_uid,
      BaseView
    },
    data() {
      return {
        vuex_ns: 'UID View',
        breadcrumb: 'Blog'
      }
    },
    mounted() {
      // Force the initialization
      this.$log.debug(this.vuex_ns + ' mounted');
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
