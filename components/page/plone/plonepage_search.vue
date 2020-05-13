<template>
  <div >
    <h1 v-if="this.display_title">{{ item.title }}</h1>
    <div class="description" v-if="item.description">{{ item.description}}</div>
    <div v-html="removeSelfClosingTags(item.text.data)" v-if="item.text" :class="content_class"></div>
  </div>
</template>

<script>
  import {server_settings} from "../../configs/server_settings";
  import {get_plone_data, removeSelfClosingTags, write_aria_polite} from '../../mixins/utils';

  export default {
    name: "plonepage_search",
    props: {
      'vuex_ns': String,
      'vuex_prop': String,
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
        prefetched : false,
        result: {},
        base_data_url: server_settings.PLONE_URL + '/@search?fullobjects=1',
      }
    },
    computed: {
      item : function () {
          let result = this.$store.ep_get(this.vuex_ns, this.vuex_prop)
          if (result === undefined) {
            result = {
              title: 'Titel wird geladen.',
              description: 'Beschreibung wird geladen.',
              text: {
                data: 'Text wird geladen.'
              }
            }
        }
        return result
        }
    },
    serverPrefetch() {
      // Force the initialization
      this.$log.debug(this.vuex_ns + ' mounted');
      this.generate_data_url();
      return this.get_data();
    },
    mounted() {
      // Force the initialization
      this.$log.debug(this.name + ' mounted');
      if (this.prefetched === false) {
        this.generate_data_url();
        this.get_data();
      }
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

        var result = await get_plone_data(this, url)

        if ( result.items[0] !== undefined) {
          var item = await result.items[0];
          await this.$store.ep_set(this.vuex_ns, this.vuex_prop, item)

          if (this.display_title){
              write_aria_polite(this, 'Die Seite ' + await this.item.title + ' wurde geladen.')
          }
          this.prefetched = true
        }
      },
    },
  }
</script>

<style scoped>


</style>
