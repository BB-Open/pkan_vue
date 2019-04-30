<template>
  <div class="app">
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import './assets/styles.css';

  export default {
    name: 'app',
    components: {
    },
    mounted() {
      document.title = 'Pkan Brandenburg';
    }
  };
</script>

<style>
</style>
