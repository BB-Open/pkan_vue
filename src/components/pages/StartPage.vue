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
    name: 'StartPage',
    components: {
      BaseView
    },
    data() {
      return {
        text: 'Text',
        namespace: 'Start'
      }
    }

  }
</script>

<style scoped>

</style>
