<template>
  <div>
    <div class="box_area plone_box_area">
      <div class="text_area">
        <h1>{{ item.title }}</h1>

        <div class="description" v-if="item.description">{{ item.description}}</div>
        <div v-html="item.text" v-if="item.text"></div>
      </div>

      <div class="element_logo" v-if="item.logo"><img :src="item.logo.download" :alt="item.title + ' Logo'"/></div>
    </div>
    <entitydetail_included :dcat_id="item.sparql_identifier" :view_url="view_url" v-if="item.sparql_identifier" :alert_title="alert_title"></entitydetail_included>
  </div>
</template>

<script>
  import {SEARCH_URL} from "../../configs/routing";
  import entitydetail_included from "../entity/entitydetail_included";
  import {id_to_store_id, write_aria_polite} from '../../mixins/utils';
  import Plone from "../../mixins/Plone";
  import {VUEX_NAMESPACE} from "../../../store/breadcrumb";

  export default {
    name: "publisher",
    mixins: [Plone],
    components: {
      entitydetail_included,
    },
    computed: {
      item: function () {
        let result = this.plone_res_first;
        if (result === undefined) {
          result = {
            title: 'Titel wird geladen.',
            description: 'Beschreibung wird geladen.',
            text: 'Text wird geladen.',
            sparql_identifier: '',
          }
        } else {
          let setter = VUEX_NAMESPACE + '/titles@' + id_to_store_id(this.$route.path);
          this.$store.set(setter, result.title);
          write_aria_polite(this, 'Die Seite ' + result.title + ' wurde geladen.')
        }
        return result
      }
    },
    created () {
      this.view_url = SEARCH_URL;
      this.alert_title = false
    },

    serverPrefetch() {
      this.$log.debug(this.vuex_ns + ' mounted');
    },
    mounted() {
      // Force the initialization
      this.$log.debug(this.vuex_ns + ' mounted');
    },
  }
</script>

<style scoped>

  .element_logo img {
    max-width: 150px;
  }

  .plone_box_area {
    padding: 0;
    margin: 0;
  }

</style>
