<template>
  <div>
    <h1 v-if="this.display_title">{{ item.title }}</h1>
    <div class="description" v-if="item.description">{{ item.description}}</div>
    <div v-html="removeSelfClosingTags(item.text.data)" v-if="item.text" :class="content_class"></div>
  </div>
</template>

<script>
  import {server_settings} from "../../configs/server_settings";
  import {removeSelfClosingTags, set_error_message, write_aria_polite} from "../../mixins/utils";
  import {PLONE_UNREACHABLE_MESSAGE} from "../../configs/plone_keywords";
  import {EV} from "../../configs/events";

  export default {
    name: "plonepage_search",
    props: {
      'portal_type': String,
      'sort_on': String,
      'tag': String,
      'element_style_class': String,
      'sort_order': String,
      'content_class': String,
      'display_title': {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        namespace: 'Blog',
        result: {},
        base_data_url: server_settings.PLONE_URL + '/@search?fullobjects=1',
        item: {
          title: 'Titel wird geladen.',
          description: 'Beschreibung wird geladen.',
          text: {
            data: 'Text wird geladen.'
          }
        },
      }
    },
    serverPrefetch() {
      // Force the initialization
      this.$log.debug(this.namespace + ' mounted');
      this.generate_data_url();
      return this.get_data();
    },
    mounted() {
      // Force the initialization
      this.$log.debug(this.namespace + ' mounted');
      this.generate_data_url();
      this.get_data();
    },
    methods: {
      async get_data() {
        await this.request_pages(this.data_url)
      },
      generate_data_url() {
        this.data_url = this.base_data_url;

        if (this.portal_type !== undefined) {
          this.data_url += '&portal_type=' + this.portal_type
        }

        if (this.sort_on !== undefined) {
          this.data_url += '&sort_on=' + this.sort_on
        }

        if (this.sort_order !== undefined) {
          this.data_url += '&sort_order=' + this.sort_order
        }

        this.data_url += '&sort_limit=1';

        if (this.tag !== undefined) {
          this.data_url += '&Subject=' + this.tag
        }

        this.$log.debug(this.data_url + ' requested');
      },
      removeSelfClosingTags(html) {
        return removeSelfClosingTags(html)
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
        if (this.result.items[0] !== undefined) {
          this.item = this.result.items[0];
        }

//        this.$forceUpdate()
        if (this.display_title){
          write_aria_polite('Die Seite ' + this.item.title + ' wurde geladen.')
        }

      },
    },
  }
</script>

<style scoped>


</style>
