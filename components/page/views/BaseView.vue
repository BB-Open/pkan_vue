<template>
  <div class="body_content">
    <div :class="vuex_ns">
      <a href="#maincontent" class="hidden_help_text">Weiter zum Hauptteil der Seite</a>
      <pkan-header></pkan-header>
      <main class="twocolumncontent content_container" v-if="display_info_column" id="maincontent">
        <pkan-status></pkan-status>
        <div class="main_content ">
          <form v-if="this.display_search" @submit.prevent="">
            <search-field-single-line vuex_prop="search_phrase" vuex_ns="search_detail"
                                       :place_holder="placeholder" :next_view="next_view"
                                      rows="1" button_label="Suchen"
                                      :hidden_label="placeholder"></search-field-single-line>
          </form>
          <slot name="content"></slot>
        </div>
        <aside class="info_column_right info_column" v-if="display_info_column">
          <plonepage_search :vuex_ns='plone_ns' :vuex_prop='side_tag' :portal_type="pt" :sort_on="sort_on" :sort_order="sort_order" :tag="side_tag"
                            :display_title="false"></plonepage_search>
        </aside>
      </main>
      <main class="content_container" v-if="!display_info_column">
        <pkan-status></pkan-status>
        <form v-if="this.display_search" @submit.prevent="">
          <search-field-single-line vuex_prop="search_phrase" :vuex_ns="search_ns"
                                    :place_holder="placeholder" :next_view="next_view"
                                    rows="1" button_label="Suchen"
                                    :hidden_label="placeholder"></search-field-single-line>
        </form>
        <slot name="content"></slot>
      </main>
      <pkan-footer></pkan-footer>
    </div>
  </div>
</template>

<script>
  import SearchFieldSingleLine from "../../controls/SearchFieldSingleLine";
  import PkanFooter from "../subelements/PkanFooter";
  import PkanHeader from "../subelements/PkanHeader";
  import {DETAIL_SEARCH_URL} from "../../configs/routing";
  import plonepage_search from "../plone/plonepage_search";
  import {
    PLONE_INDEX_CREATED,
    PLONE_PT_DOCUMENT,
    PLONE_REVERSE_ORDERING,
    PLONE_TAG_BLOG,
    PLONE_TAG_LANDING,
    PLONE_TAG_SIDETEXT
  } from "../../configs/plone_keywords";
  import PkanStatus from "../subelements/PkanStatus";
  import {set_error_message} from "../../mixins/utils";
  import {VUEX_NAMESPACE as PLONE_NS} from '../../../store/plone'
  import {VUEX_NAMESPACE as SEARCH_NS} from '../../../store/search_detail'
  import {VUEX_NAMESPACE as BC_NS} from '../../../store/breadcrumb'

  export default {
    name: 'BaseView',
    components: {
      PkanHeader,
      SearchFieldSingleLine,
      PkanFooter,
      plonepage_search,
      PkanStatus,
    },
    props: ['vuex_ns', 'breadcrumb', 'ignore_last_title', 'display_info_column', "display_search"],
    created() {
      
      this.placeholder = 'In den Datensätzen suchen';
      this.plone_ns = PLONE_NS;
      this.search_ns = SEARCH_NS;
      this.breadcrumb_ns = BC_NS;
      this.next_view = DETAIL_SEARCH_URL;
      this.sort_on = PLONE_INDEX_CREATED;
      this.sort_order = PLONE_REVERSE_ORDERING;
      this.tag = PLONE_TAG_BLOG;
      this.pt = PLONE_PT_DOCUMENT;
      this.landing_tag = PLONE_TAG_LANDING;
      this.side_tag = PLONE_TAG_SIDETEXT;
      
    },
    mounted() {
      set_error_message(this, '');
      this.$log.debug(this.name + ' mounted');
      this.$store.ep_set(this.breadcrumb_ns, 'currentView', this.breadcrumb);
      if (this.ignore_last_title === undefined) {
        this.$store.ep_set(this.breadcrumb_ns,'last_title', null)
      }
    },
  }
</script>

<style scoped>

</style>
