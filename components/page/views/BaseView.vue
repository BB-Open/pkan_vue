<template>
  <div class="body_content">
  <div :class="namespace">
    <pkan-header></pkan-header>
     <div class="twocolumncontent content_container" v-if="display_info_column">
      <div class="main_content ">
        <search-field v-if="this.display_search" property="textline_keywords" store_namespace="Search" :initial_value="search_initial" :place_holder="placeholder" :next_view="next_view" rows="1" button_label="Suchen"></search-field>
        <slot name="content"></slot>
      </div>
      <div class="info_column_right info_column">
        <plonepage_search :portal_type="pt" :sort_on="sort_on" :sort_order="sort_order" :tag="side_tag" :display_title="false"></plonepage_search>
      </div>
    </div>
    <div class="content_container" v-if="!display_info_column">
      <search-field v-if="this.display_search" property="textline_keywords" store_namespace="Search" :initial_value="search_initial" :place_holder="placeholder" :next_view="next_view" rows="1" button_label="Suchen"></search-field>
      <slot name="content"></slot>
    </div>
    <pkan-footer></pkan-footer>
  </div>
  </div>
</template>

<script>
  import SearchField from "../../controls/SearchFieldSingleLine";
  import PkanFooter from "../subelements/PkanFooter";
  import PkanHeader from "../subelements/PkanHeader";
  import {EV} from "../../configs/events";
  import {DETAIL_SEARCH_URL} from "../../configs/routing";
  import plonepage_search from "../plone/plonepage_search";
  import {
    PLONE_INDEX_CREATED,
    PLONE_PT_DOCUMENT,
    PLONE_REVERSE_ORDERING,
    PLONE_TAG_BLOG, PLONE_TAG_LANDING, PLONE_TAG_SIDETEXT
  } from "../../configs/plone_keywords";

  export default {
    name: 'BaseView',
    components: {
      PkanHeader,
      SearchField,
      PkanFooter,
      plonepage_search,
    },
    props: ['namespace', 'breadcrumb', 'ignore_last_title', 'search_initial', 'display_info_column', "display_search"],
    data() {
      return {
        placeholder: 'In den Datensätzen suchen',
        next_view: DETAIL_SEARCH_URL,
        sort_on: PLONE_INDEX_CREATED,
        sort_order: PLONE_REVERSE_ORDERING,
        tag: PLONE_TAG_BLOG,
        pt: PLONE_PT_DOCUMENT,
        landing_tag: PLONE_TAG_LANDING,
        side_tag: PLONE_TAG_SIDETEXT,
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
