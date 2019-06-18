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
  import PkanMenu from './subelements/PkanMenu';
  import Breadcrumb from "./subelements/Breadcrumb";
  import SearchField from "../controls/SearchField";
  import PkanFooter from "./subelements/PkanFooter";
  import PkanHeader from "./subelements/PkanHeader";

  export default {
    name: 'BaseView',
    components: {
      PkanHeader,
      SearchField,
      PkanFooter
    },
    props: ['namespace'],
  }
</script>

<style scoped>

</style>
