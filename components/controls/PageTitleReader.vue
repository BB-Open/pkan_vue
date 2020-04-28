<template>
  <div class="hidden_help_text" role="status" aria-live="polite" aria-relevant="all" aria-atomic="true">
    {{page_change_text}}
  </div>
</template>

<script>
  import {EV} from "../configs/events";

  export default {
    name: "PageTitleReader",
    data() {
      return {
        page_change_text: 'Die Seite wird geladen.',
      }
    },
    computed: {
      title: {
        set: function (value) {
        },
        get: function () {
          return this.$store.getters['BreadCrumb' + '/title']
        }
      },
    },
    beforeDestroy: function () {
      this.$EventBus.$off(EV.PAGE_TITLE_CHANGED,
        this.update_text.bind(this))
    },
    mounted() {
      this.init_events();
      this.$log.debug('Mounted Page Title Reader.')
    },
    methods: {
      update_text() {
        this.page_change_text = 'Die Seite ' + this.title + ' wurde geladen.';
      },
      init_events() {
        this.$EventBus.$on(EV.PAGE_TITLE_CHANGED,
          this.update_text.bind(this));
      }
    }
  }
</script>

<style scoped>

</style>
