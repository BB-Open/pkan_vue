<template>
  <base-view :vuex_ns="vuex_ns" :breadcrumb="breadcrumb" :ignore_last_title="true" :display_info_column="true">
    <template slot="content">
      <entitydetail :id="get_data()" :view_url="view_url" :alert_title="alert_title"></entitydetail>
    </template>
  </base-view>
</template>

<script>
  import BaseView from '../../components/page/views/BaseView';
  import entitydetail from "../../components/page/entity/entitydetail";
  import {SEARCH_URL} from "../../components/configs/routing";

  export default {
    name: 'SearchDetail',
    components: {
      entitydetail,
      BaseView
    },
    data() {
      return {
        vuex_ns: 'Entity',
        breadcrumb: 'DetailSearch',
        view_url: SEARCH_URL,
        alert_title: true,
      }
    },
    mounted() {
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
