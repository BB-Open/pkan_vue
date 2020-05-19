<template>
  <div >
    <h1 v-if="this.display_title">{{ item.title }}</h1>
    <div class="description" v-if="item.description">{{ item.description}}</div>
    <div v-html="removeSelfClosingTags(item.text.data)" v-if="item.text" :class="content_class"></div>
  </div>
</template>

<script>
  import {removeSelfClosingTags, write_aria_polite} from '../../mixins/utils';
  import Plone from "../../mixins/Plone";

  export default {
    name: "plonepage_search",
    mixins: [Plone],
    props: {
      'element_style_class': String,
      'content_class': String,
      'display_title': {
        type: Boolean,
        default: true
      }
    },
    computed: {
      item : function () {
        let result = this.plone_res_first;
          if (result === undefined) {
            result = {
              title: 'Titel wird geladen.',
              description: 'Beschreibung wird geladen.',
              text: {
                data: 'Text wird geladen.'
              }
            }
          } else {
            if (this.display_title) {
              this.$store.ep_set('breadcrumb', 'last_title', result.title);
              write_aria_polite(this, 'Die Seite ' + result.title + ' wurde geladen.')
            }
          }
        return result
        }
    },
    serverPrefetch() {
      // Force the initialization
      this.$log.debug(this.vuex_ns + ' mounted');
    },
    mounted() {
      // Force the initialization
      this.$log.debug(this.name + ' mounted');
    },
    methods: {

      removeSelfClosingTags(html) {
        return removeSelfClosingTags(html)
      },
    },
  }
</script>

<style scoped>


</style>
