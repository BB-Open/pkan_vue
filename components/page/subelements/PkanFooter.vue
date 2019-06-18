<template>
  <div class="footer">
    <breadcrumb></breadcrumb>
    <div class="footerbox">
      <div class="infobox">Info hier</div>
      <div class="servicebox">Service hier</div>
    </div>
    <div class="footer-line">
      <div class="footer-line-text"><span>2019 | Land Brandenburg</span></div>
      <div class="footer-line-links"><nuxt-link to="/accessibility">Barrierefreiheit</nuxt-link>
        |
        <nuxt-link to="/dataprotection">Datenschutz</nuxt-link>
        |
        <nuxt-link to="/impressum">Impressum</nuxt-link>
        |
        <nuxt-link to="/contact">Kontakt</nuxt-link></div>

    </div>
  </div>
</template>

<script>
    import Breadcrumb from "./Breadcrumb";

    export default {
        name: "Footer",
      components: {
        Breadcrumb,
      },
    }
</script>

<style scoped>
  .footer {
    background-color: #eee;
  }

  .footer-line a {
    color: white;
  }

  .footerbox, .footer-line {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
  }

  .footer-line {
    height: 30px;
    line-height: 30px;
    background-color: #C73C35;
    color: #fff;
    white-space: nowrap;
    text-align: center;
  }

</style>
