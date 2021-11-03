<template>
    
</template>

<script>
  export default {
    name: 'SearchRouteMixin',
    async beforeRouteLeave (to, from, next) {
      this.$log.info('beforeRouteLeave')
      if (to.path !== undefined && !to.path.includes('search')) {
        await this.$store.ep_set(this.search_ns, 'disable_get_data', true);
        await this.$store.commit(this.search_ns + '/'+ 'RESET_ALL')
        await this.$store.commit(this.search_ns + '/RESET_SEARCH_RESULTS')
      }
      next()
    },
    async mounted() {
      this.$log.info('mounted')
      await this.$store.ep_set(this.search_ns, 'disable_get_data', false);
  },
  }
</script>

<style scoped>

</style>
