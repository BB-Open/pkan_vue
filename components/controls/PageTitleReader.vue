<template>
  <div class="hidden_help_text" role="status" aria-live="polite" aria-relevant="all" aria-atomic="true">
    {{text}}
  </div>
</template>

<script>
  import {EV} from "../configs/events";

  export default {
    name: "PageTitleReader",
    data() {
      return {
        text: 'Die Seite wird geladen.',
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
      this.$EventBus.$off(EV.PAGE_TITLE_CHANGED)
    },
    mounted() {
      this.init_events();
    },
    methods: {
      update_text() {
        this.text = 'Die Seite ' + this.title + ' wurde geladen.'
      },
      init_events() {
        this.$EventBus.$on(EV.PAGE_TITLE_CHANGED, () => {
          this.$log.debug('Page Title Changed');
          this.$log.debug(this.title);
          this.update_text()
        });
      }
    }
  }
</script>

<style scoped>

</style>
