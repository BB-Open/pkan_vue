<template>
  <div>
    <div class="hidden_help_text" role="status" aria-live="polite" aria-relevant="all" aria-atomic="true" id="pkan_aria_polite">
      {{aria_polite}}
    </div>
    <div class="hidden_help_text" role="status" aria-live="assertive" aria-relevant="all" aria-atomic="true" id="pkan_aria_assertive">
      {{aria_assertive}}
    </div>
  </div>
</template>

<script>
  import {VUEX_NAMESPACE} from "../../store/globalstate"

  export default {
    name: 'aria_active',
    created() {
      this.VUEX_NAMESPACE = VUEX_NAMESPACE;
    },
    computed:{
      aria_polite: {
        get : function () {
          this.$store.ep_get(this.VUEX_NAMESPACE, 'aria_polite')
        }
      },
      aria_assertive: {
        get : function () {
          this.$store.ep_get(this.VUEX_NAMESPACE, 'aria_assertive')
        }
      },
    }
  }
</script>

<style scoped>

</style>
