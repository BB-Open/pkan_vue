<template>
  <div>
    <h1>{{ item.title }}</h1>
    <div class="publish_date" v-if="item.date_text">{{item.date_text}}</div>
    <div v-if="item.description" class="description">{{ item.description}}</div>
    <div v-html="removeSelfClosingTags(item.text.data)" v-if="item.text"></div>
  </div>
</template>

<script>
  import {EV} from "../../configs/events";
  import {server_settings} from "../../configs/server_settings";
  import {format_plone_date, removeSelfClosingTags, set_error_message} from "../../mixins/utils";
  import {PLONE_UNREACHABLE_MESSAGE} from "../../configs/plone_keywords";

  export default {
    name: "plonepage_uid",
    props: {
      'uid': String,
      'display_date':
        {
          type: Boolean,
          default:
            false
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
      removeSelfClosingTags(html) {
        return removeSelfClosingTags(html)
      },
      generate_data_url() {
        this.data_url = this.base_data_url;

        if (this.uid !== undefined) {
          this.data_url += '&UID=' + this.uid
        }
//        this.$log.debug(this.data_url + ' requested');
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
        if (this.display_date) {
          this.item.date_text = 'Veröffentlicht am ' + format_plone_date(this.item.effective);
        }
        this.$store.ep_commit('BreadCrumb', 'last_title', this.item.title);
        this.$EventBus.$emit(EV.PAGE_CHANGED, {});
        this.$store.ep_commit('BreadCrumb', 'title', this.item.title);
        this.$EventBus.$emit(EV.PAGE_TITLE_CHANGED, {});
        this.$forceUpdate()
      },
    },
  }
</script>

<style scoped>
  .publish_date {
    font-style: italic;
  }

</style>
