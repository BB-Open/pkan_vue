<template>
  <div role="alert">
    <div class="portalMessage error" v-if="value">
      <div>Fehler</div>
      <div>{{value}}</div>
    </div>
  </div>
</template>

<script>
  import {VUEX_NAMESPACE} from '../../../store/globalstate';

  export default {
    name: "PkanStatus",
    created() {
      this.VUEX_NAMESPACE = VUEX_NAMESPACE
    },
    computed: {
      value: {
        get: function () {
          return this.$store.ep_get(this.VUEX_NAMESPACE,'error_message');
        }
      },
    },
  }
</script>

<style scoped>

</style>
