<template>
  <div>
    <h1>{{ item.title }}</h1>
    <div class="publish_date" v-if="item.date_text">{{item.date_text}}</div>
    <div v-if="item.description" class="description">{{ item.description}}</div>
    <div v-html="removeSelfClosingTags(item.text.data)" v-if="item.text"></div>
  </div>
</template>

<script>
  import {removeSelfClosingTags, write_aria_polite} from '../../mixins/utils';
  import Plone from "../../mixins/Plone";
  import {VUEX_NAMESPACE} from "../../../store/breadcrumb";

  export default {
    name: "plonepage_uid",
    mixins: [Plone],
    computed: {
      item: function () {
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
          let setter = VUEX_NAMESPACE + '/titles@' + this.$route.path;
          this.$store.set(setter, result.title);
          write_aria_polite(this, 'Die Seite ' + result.title + ' wurde geladen.')
        }
        return result
      }
    },
    serverPrefetch() {
      this.$log.debug(this.vuex_ns + ' mounted');
    },
    mounted() {
      // Force the initialization
      this.$log.debug(this.vuex_ns + ' mounted');
      },
    methods: {

      removeSelfClosingTags(html) {
        return removeSelfClosingTags(html)
      },
    },

  }
</script>

<style scoped>
  .publish_date {
    font-style: italic;
  }

</style>
