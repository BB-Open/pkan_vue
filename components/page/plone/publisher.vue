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
    <entitydetail :id="item.sparql_identifier" :view_url="view_url" v-if="item.sparql_identifier" :alert_title="alert_title"></entitydetail>
  </div>
</template>

<script>
  import {EV} from "../../configs/events";
  import {server_settings} from "../../configs/server_settings";
  import {SEARCH_URL} from "../../configs/routing";
  import entitydetail from "../entity/entitydetail";
  import {PLONE_UNREACHABLE_MESSAGE} from "../../configs/plone_keywords";
  import {set_error_message, write_aria_polite} from "../../mixins/utils";

  export default {
    name: "publisher",
    props: ['uid'],
    components: {
      entitydetail,
    },
    data() {
      return {
        namespace: 'Blog',
        result: {},
        base_data_url: server_settings.PLONE_URL + '/@search?fullobjects=1',
        item: {
          title: 'Titel wird geladen.',
          description: 'Beschreibung wird geladen.',
          text: 'Text wird geladen.',
          sparql_identifier: '',
        },
        view_url: SEARCH_URL,
        alert_title: false,
      }
    },
    mounted() {
      // Force the initialization
      this.$log.debug(this.namespace + ' mounted');
      this.generate_data_url();
      this.get_data();
    },
    methods: {
      get_data() {
        this.request_pages(this.data_url)
      },
      generate_data_url() {
        this.data_url = this.base_data_url;

        if (this.uid !== undefined) {
          this.data_url += '&UID=' + this.uid
        }
        this.$log.debug(this.data_url + ' requested');
      },
      async request_pages(url) {
        this.$axios.setHeader('Content-Type', 'application/json', ['get']);
        this.$axios.setHeader('Accept', 'application/json', ['get']);
        this.$axios.setHeader('Access-Control-Allow-Origin', '*', ['get']);
        try {
          this.result = await this.$axios.$get(url);
        } catch (e) {
          console.log(e.message);
          console.log(e.stack);
          set_error_message(this, PLONE_UNREACHABLE_MESSAGE);
          return
        }
        this.item = this.result.items[0];
        this.$store.ep_commit('BreadCrumb', 'last_title', this.item.title);
        this.$EventBus.$emit(EV.PAGE_CHANGED, {});
        write_aria_polite('Die Seite ' + this.item.title + ' wurde geladen.');
        this.$forceUpdate()
      },
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
