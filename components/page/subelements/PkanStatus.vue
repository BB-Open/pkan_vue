<template>
  <div role="alert">
    <div class="portalMessage error" v-if="value">
      <div>Fehler</div>
      <div>{{value}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "PkanStatus",
    computed: {
      value: {
        set: function (value) {
        },
        get: function () {
          return this.$store.state['GlobalState']['error_message'];
        }
      },
    },
  }
</script>

<style scoped>

</style>
