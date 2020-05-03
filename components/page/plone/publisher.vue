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
  import {get_plone_data, set_error_message, write_aria_polite} from '../../mixins/utils';

  export default {
    name: "publisher",
    props: ['uid'],
    components: {
      entitydetail,
    },
    data() {
      return {
        prefetched : false,
        namespace: 'Publisher',
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
    serverPrefetch() {
      this.$log.debug(this.namespace + ' mounted');
      this.generate_data_url();
      return this.get_data();
    },
    mounted() {
      // Force the initialization
      this.$log.debug(this.namespace + ' mounted');
      if (this.prefetched === false) {
        this.generate_data_url();
        this.get_data()
      }
    },
    methods: {
      async get_data() {
        await this.request_pages(this.data_url)
      },
      generate_data_url() {
        this.data_url = this.base_data_url;

        if (this.uid !== undefined) {
          this.data_url += '&UID=' + this.uid
        }
        this.$log.debug(this.data_url + ' requested');
      },
      async request_pages(url) {

        this.result = await get_plone_data(this, url)
        this.item = await this.result.items[0];
        await this.$store.set('breadcrumb/last_title', this.item.title);
        await this.$EventBus.$emit(EV.PAGE_CHANGED, {});
        await write_aria_polite('Die Seite ' + this.item.title + ' wurde geladen.');
        this.prefetched = true
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
