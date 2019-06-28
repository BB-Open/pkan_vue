<template>
  <base-view :namespace="namespace" :breadcrumb="namespace">
    <template slot="content">
      <p>Coming Soon</p>
    </template>
  </base-view>
</template>

<script>
  import BaseView from '../../components/page/views/BaseView';

  export default {
    components: {
      BaseView
    },
    data() {
      return {
        namespace: 'DetailSearch',
      }
    },
    mounted() {
      // Force the initialization
      this.$log.debug(this.namespace + ' mounted');
    },

  }
</script>

<style scoped>

</style>
