<template>
  <base-view :namespace="namespace">
    <template slot="heading">
      <h1>{{ this.namespace }}</h1>
    </template>
    <template slot="content">
      <p>Coming Soon</p>
    </template>
  </base-view>
</template>

<script>
  import BaseView from './BaseView';

  export default {
    name: 'Impressum',
    components: {
      BaseView
    },
    data() {
      return {
        text: 'Text',
        namespace: 'Impressum'
      }
    }

  }
</script>

<style scoped>

</style>
