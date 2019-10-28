<template>
  <div class="footer">
    <div class="footercontent content_container">
    <breadcrumb></breadcrumb>
    <div class="footerbox">
      <div class="footerelement">
        <p class="footerelementtitle">Open Data</p>
        <hr/>
        <a class="footerelementlink" href="https://www.dcat-ap.de/" title="Metadatenmodell DCAT-AP.de">
          DCAT-AP.de
        </a>
        <hr class="hidesmallscreen"/>
        <a class="footerelementlink" href="https://www.govdata.de/" title="Bund-Länder-Portal GovData">
          GovData.de
        </a>
        <hr class="hidesmallscreen"/>
        <a class="footerelementlink" href="https://www.dcat-ap.de/" title="Open-Data-Portal für Europa">
          EuropeanDataportal.eu
        </a>
      </div>
      <div class="footerelement">
        <p class="footerelementtitle">Open Source</p>
        <hr/>
        <a class="footerelementlink" href="https://github.com/BB-Open/pkan.dcatapde" title="Github Repositorium">
          PKAN
        </a><i class="fa fa-github"></i>
        <hr class="hidesmallscreen"/>
        <a class="footerelementlink" href="http://plone.com/" title="Plone Content-Management">
          Plone CMS
        </a>
      </div>
      <div class="footerelement">
        <p class="footerelementtitle">Service</p>
        <hr/>
        <a class="footerelementlink" href="http://www.brandenburg.de" target="_blank" title="Link zum Landesportal Brandenburg">
          Landesportal Brandenburg
        </a>
        <hr class="hidesmallscreen"/>
        <a class="footerelementlink" href="http://service.brandenburg.de" target="_blank" title="Link zum Serviceportal Brandenburg">
          Serviceportal Brandenburg
        </a>

      </div>
    </div>
    </div>
    <div class="footer-line">
      <div class="footer-line-text hidesmallscreen"><span>2019 | Land Brandenburg</span></div>
      <div class="footer-line-left"><nuxt-link to="/accessibility">Barrierefreiheit</nuxt-link>
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
    padding-left: 15px;
    padding-right: 15px;
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
  .footercontent .breadcrumb {
    padding: 15px;
  }

  .footerbox {
  }

  .footerelement {
    width: 33%;
    padding-right: 15px;
    padding-left: 15px;
    padding-bottom: 16px;
  }

  .footerelement .footerelementtitle {
    font-style: italic;
    margin-bottom: .5rem;
    line-height: 1.4;
  }

  .footerelement .footerelementlink {
    margin-bottom: 1rem;
    line-height: 30px;
  }

  .footer-line {
    height: 30px;
    line-height: 30px;
    background-color: #C73C35;
    color: #fff;
    white-space: nowrap;
    text-align: center;
    padding-left: 30px;
    padding-right: 30px;
  }



  @media (max-width: 640px) {
    .footerbox {
      display: block;
    }
    .footerelement {
      width: 100%;
      margin-bottom: 15px;
    }
    .footerelement a {
      display: block;
    }

    .footer-line-left {
      white-space: normal;
    }

    .footer-line {
      height: auto;
    }

  }

</style>
