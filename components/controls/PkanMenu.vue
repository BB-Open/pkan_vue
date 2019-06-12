<template>
  <div class="menu">
    <nuxt-link class="router-link" to="/startpage">Startseite</nuxt-link>
    <nuxt-link class="router-link" to="/search">Suche</nuxt-link>
    <nuxt-link class="router-link" to="/impressum">Impressum</nuxt-link>
    <nuxt-link class="router-link" to="/plonepages">Plone Pages</nuxt-link>
  </div>
    
</template>

<script>
    export default {
        name: 'PkanMenu'
    }
</script>

<style scoped>
  .menu {
    display: flex;
    flex-flow: row wrap;
    margin: 0 -2px 0 -2px;
  }
  .router-link {
    flex: 1 1 10ch;
    background-color: #aad3df;
    border: none;
    padding: 0.5em 0.25em;
    margin: 2px;
    text-align: center;
    text-decoration: none;
    font-size: 0.85rem;
    color: #093d71;
  }

  .router-link:hover,
  .router-link:focus,
  .router-link-active {
    background-color: #093d71;
    color: #fff;
  }
</style>
