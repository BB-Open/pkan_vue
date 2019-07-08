<template>
  <nav class="menu" aria-label="site">
    <nuxt-link class="router-link" to="/start">Start</nuxt-link>
    <nuxt-link class="router-link" to="/search">Einfache Suche</nuxt-link>
    <nuxt-link class="router-link" to="/search/sparql">SPARQL</nuxt-link>
    <nuxt-link class="router-link" to="/publisher">Datenbereitsteller</nuxt-link>
    <nuxt-link class="router-link" to="/faq">Fragen und Antworten</nuxt-link>
    <nuxt-link class="router-link" to="/blog">Blog</nuxt-link>
  </nav>
    
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
    justify-content: flex-end;
  }
  .router-link {
    background-color: #ffffff;
    border: none;
    padding: 0.5em 0.25em;
    margin: 2px;
    text-align: center;
    text-decoration: none;
    color: #000000;
  }

  .router-link:hover,
  .router-link:focus,
  .nuxt-link-active {
    background-color: white;
    color: #C73C35;
  }
</style>
