<template>
  <div :class="namespace">
    <div class="header">
      <div class="logo">
      </div>
      <pkan-menu></pkan-menu>
    </div>
    <div class="heading">
      <slot name="heading"></slot>
    </div>
    <div class="content">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
  import PkanMenu from './controls/PkanMenu';

  export default {
    name: 'BaseView',
    components: {
      PkanMenu
    },
    props: ['namespace'],
  }
</script>

<style scoped>

</style>
