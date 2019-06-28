<template>
  <div :class="namespace">
    <pkan-header></pkan-header>
    <search-field></search-field>
    <div class="content">
      <slot name="content"></slot>
    </div>
    <pkan-footer></pkan-footer>
  </div>
</template>

<script>
  import SearchField from "../../controls/SearchField";
  import PkanFooter from "../subelements/PkanFooter";
  import PkanHeader from "../subelements/PkanHeader";
  import {EV} from "../../events";

  export default {
    name: 'BaseView',
    components: {
      PkanHeader,
      SearchField,
      PkanFooter
    },
    props: ['namespace', 'breadcrumb', 'ignore_last_title'],
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
