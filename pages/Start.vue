<template>
  <base-view :namespace="namespace">
    <template slot="content">
      <h1>{{ this.namespace }}</h1>
      <plonepage></plonepage>
      <div class="link-collection">
        Hier werden wichtige Links dargestellt.
      </div>
      <plonelisting></plonelisting>
    </template>
  </base-view>
</template>

<script>
  import BaseView from '../components/page/BaseView';
  import plonepage from '../components/page/plone/plonepage';
  import plonelisting from '../components/page/plone/plonelisting'

  export default {
    name: 'Start',
    components: {
      BaseView,
      plonepage,
      plonelisting
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
