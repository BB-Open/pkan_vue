<template>
  <div class="footer">
    <div class="footercontent">
    <breadcrumb></breadcrumb>
    <div class="footerbox">
      <div class="footerelement">
        <p>Open Data</p>
        <hr/>
        <a href="https://www.dcat-ap.de/" title="Metadatenmodell DCAT-AP.de">
          DCAT-AP.de
        </a>
        <hr/>
        <a href="https://www.govdata.de/" title="Bund-Länder-Portal GovData">
          GovData.de
        </a>
        <hr/>
        <a href="https://www.dcat-ap.de/" title="Open-Data-Portal für Europa">
          EuropeanDataportal.eu
        </a>
      </div>
      <div class="footerelement">
        <p>Open Source</p>
        <hr/>
        <a href="https://github.com/BB-Open/pkan.dcatapde" title="Github Repositorium">
          PKAN
        </a><i class="fa fa-github"></i>
        <hr/>
        <a href="http://plone.com/" title="Plone Content-Management">
          Plone CMS
        </a>
      </div>
      <div class="footerelement">
        <p>Service</p>
        <hr/>
        <a href="http://www.brandenburg.de" target="_blank" title="Link zum Landesportal Brandenburg">
          Landesportal Brandenburg
        </a>
        <hr/>
        <a href="http://service.brandenburg.de" target="_blank" title="Link zum Serviceportal Brandenburg">
          Serviceportal Brandenburg
        </a>

      </div>
    </div>
    </div>
    <div class="footer-line">
      <div class="footer-line-text"><span>2019 | Land Brandenburg</span></div>
      <div class="footer-line-links"><nuxt-link to="/accessibility">Barrierefreiheit</nuxt-link>
        |
        <nuxt-link to="/data_protection">Datenschutz</nuxt-link>
        |
        <nuxt-link to="/impressum">Impressum</nuxt-link></div>

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

  .footercontent {
    padding: 10px;
  }
  .footer-line a {
    color: white;
  }

  .footerbox, .footer-line {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    padding: 5px;
  }

  .footerelement {
    width: 30%;
  }

  .footerelement p {
    font-style: italic;
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
