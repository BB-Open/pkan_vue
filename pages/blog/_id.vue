<template>
  <base-view :vuex_ns="vuex_ns" :breadcrumb="breadcrumb" :ignore_last_title="true" :display_info_column="true">
    <template slot="content">
      <plonepage_uid :uid="get_data()" :display_date="true" :vuex_ns="vuex_ns" :vuex_prop="get_data()"></plonepage_uid>
    </template>
  </base-view>
</template>

<script>

  import plonepage_uid from "../../components/page/plone/plonepage_uid";
  import BaseView from "../../components/page/views/BaseView";
  import {VUEX_NAMESPACE as PLONE_NS} from "../../store/plone";

  export default {
    name: 'Blogdetail',
    components: {
      plonepage_uid,
      BaseView
    },
    created() {
        this.breadcrumb = 'Blog';
        this.vuex_ns = PLONE_NS
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
