<template>
  <base-view :vuex_ns="vuex_ns" :display_info_column="true">
    <template slot="content">
      <entitydetail :id="get_data()" :view_url="view_url" :alert_title="alert_title"></entitydetail>
    </template>
  </base-view>
</template>

<script>
  import BaseView from '../../components/page/views/BaseView';
  import entitydetail from "../../components/page/entity/entitydetail";
  import {SEARCH_URL} from "../../components/configs/routing";
  import SearchRouteMixin from '../../components/mixins/SearchRouteMixin'

  export default {
    name: 'SearchDetail',
    mixins: [SearchRouteMixin],
    components: {
      entitydetail,
      BaseView
    },
    created() {
        this.vuex_ns = 'Entity';
        this.view_url = SEARCH_URL;
        this.alert_title = true;
    },
    mounted() {
      this.$log.debug(this.name + ' mounted');
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
