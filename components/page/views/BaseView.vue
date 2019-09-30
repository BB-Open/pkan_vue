<template>
  <div class="body_content">
  <div :class="namespace">
    <pkan-header></pkan-header>
    <search-field v-if="this.display_search" property="keywords" store_namespace="Search" :initial_value="search_initial" :place_holder="placeholder" :next_view="next_view" rows="1" button_label="Suchen"></search-field>
    <div class="content">
      <slot name="content"></slot>
    </div>
    <pkan-footer></pkan-footer>
  </div>
  </div>
</template>

<script>
  import SearchField from "../../controls/SearchField";
  import PkanFooter from "../subelements/PkanFooter";
  import PkanHeader from "../subelements/PkanHeader";
  import {EV} from "../../configs/events";
  import {DETAIL_SEARCH_URL} from "../../configs/routing";

  export default {
    name: 'BaseView',
    components: {
      PkanHeader,
      SearchField,
      PkanFooter
    },
    props: ['namespace', 'breadcrumb', 'ignore_last_title', 'search_initial', 'display_left_column', "display_search"],
    data() {
      return {
        placeholder: 'In den Datensätzen suchen',
        next_view: DETAIL_SEARCH_URL,
      }
    },
    mounted() {
      // Force the initialization
      this.$log.debug(this.namespace + ' mounted');
      this.$store.ep_commit('BreadCrumb', 'currentView', this.breadcrumb);
      if (this.ignore_last_title === undefined){
        this.$store.ep_commit('BreadCrumb', 'last_title', null)
      };
      this.$EventBus.$emit(EV.BREADCRUMB_CHANGED, {});
    },
  }
</script>

<style scoped>

</style>
