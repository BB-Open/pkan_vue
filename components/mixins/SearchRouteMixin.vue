<template>
    
</template>

<script>
  import { VUEX_NAMESPACE } from '../../store/search_detail'

  export default {
    name: 'SearchRouteMixin',
    async beforeRouteLeave (to, from, next) {
      let ns = VUEX_NAMESPACE
      this.$log.info('beforeRouteLeave')
      if (to.path !== undefined && !to.path.includes('search')) {
        await this.$store.ep_set(ns, 'disable_get_data', true);
        await this.$store.commit(ns + '/'+ 'RESET_ALL')
        await this.$store.commit(ns + '/RESET_SEARCH_RESULTS')
      }
      next()
    },
    async mounted() {
      this.$log.info('mounted')
      let ns = VUEX_NAMESPACE
      await this.$store.ep_set(ns, 'disable_get_data', false);
  },
  }
</script>

<style scoped>

</style>
