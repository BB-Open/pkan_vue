<template>
  <div>
    <h1>{{ item.title }}</h1>
    <div class="publish_date" v-if="item.date_text">{{item.date_text}}</div>
    <div v-if="item.description" class="description">{{ item.description}}</div>
    <div v-html="removeSelfClosingTags(item.text.data)" v-if="item.text"></div>
  </div>
</template>

<script>
  import {server_settings} from "../../configs/server_settings";
  import {
    format_plone_date,
    get_plone_data,
    removeSelfClosingTags,
    write_aria_polite
  } from '../../mixins/utils';

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
        prefetched : false,
        vuex_ns: 'plonepage_uid',
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
      this.$log.debug(this.vuex_ns + ' mounted');
      this.generate_data_url();
      return this.get_data();
    },
    mounted() {
      // Force the initialization
      this.$log.debug(this.vuex_ns + ' mounted');
      if (this.prefetched === false) {
        this.generate_data_url();
        this.get_data();
      }
    },
    methods: {
      async get_data() {
        await this.request_pages(this.data_url)
        this.prefetched = await true
      },
      removeSelfClosingTags(html) {
        return removeSelfClosingTags(html)
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

        this.item = this.result.items[0];

        if (this.display_date) {
          this.item.date_text = 'Veröffentlicht am ' + format_plone_date(this.item.effective);
        }

        this.$store.ep_set('breadcrumb', 'last_title', this.item.title);
        write_aria_polite(this, 'Die Seite ' + this.item.title + ' wurde geladen.');
      },
    },
  }
</script>

<style scoped>
  .publish_date {
    font-style: italic;
  }

</style>
