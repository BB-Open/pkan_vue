<template>
  <footer class="footer">
    <div class="footercontent content_container">
      <breadcrumb></breadcrumb>
      <div class="footerbox">
        <h2 class="hidden_help_text">Weiterführende Informationen</h2>
        <div class="footerelement">
          <h3 class="footerelementtitle">Open Data</h3>
          <hr/>
          <ul class="nobull">
            <li>
              <a class="footerelementlink" href="https://www.dcat-ap.de/"><span
                class="hidden_help_text">Metadatenmodell </span>
                DCAT-AP.de
              </a>
              <hr class="hidesmallscreen"/>
            </li>
            <li>
              <a class="footerelementlink" href="https://www.govdata.de/"><span class="hidden_help_text">Bund-Länder-Portal </span>
                GovData.de
              </a>
              <hr class="hidesmallscreen"/>
            </li>
            <li>
              <a class="footerelementlink" href="https://www.dcat-ap.de/"><span class="hidden_help_text">Open-Data-Portal für Europa: </span>
                EuropeanDataportal.eu
              </a>
            </li>
          </ul>
        </div>
        <div class="footerelement">
          <h3 class="footerelementtitle">Open Source</h3>
          <hr/>
          <ul class="nobull">
            <li>
              <a class="footerelementlink" href="https://github.com/BB-Open/pkan.dcatapde"><span
                class="hidden_help_text">Github Repositorium: </span>
                PKAN <i class="fa fa-github"></i>
              </a>
              <hr class="hidesmallscreen"/>
            </li>
            <li>
              <a class="footerelementlink" href="http://plone.com/"><span
                class="hidden_help_text">Dokumentation zum </span>
                Plone CMS
              </a>
            </li>
          </ul>
        </div>
        <div class="footerelement">
          <h3 class="footerelementtitle">Service</h3>
          <hr/>
          <ul class="nobull">
            <li>
              <a class="footerelementlink" href="http://www.brandenburg.de" target="_blank"
              ><span class="hidden_help_text">Link zum </span>
                Landesportal Brandenburg
              </a>
              <hr class="hidesmallscreen"/>
            </li>
            <li>
              <a class="footerelementlink" href="http://service.brandenburg.de" target="_blank"
              ><span class="hidden_help_text">Link zum </span>
                Serviceportal Brandenburg
              </a></li>
          </ul>

        </div>
      </div>
    </div>
    <div class="footer-line">
      <div class="footer-line-text hidesmallscreen"><span>2019 | Land Brandenburg</span></div>
      <div class="footer-line-left">
        <nuxt-link to="/accessibility">Barrierefreiheit</nuxt-link>
        |
        <nuxt-link to="/data_protection">Datenschutz</nuxt-link>
        |
        <nuxt-link to="/impressum">Impressum</nuxt-link>
      </div>

    </div>
  </footer>
</template>

<script>
  import Breadcrumb from "./Breadcrumb";

  export default {
    name: "PkanFooter",
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
    text-decoration: unset;
  }

  .footer-line a:hover, .footer-line a:active, .footer-line a:focus {
    color: #161616;
    background-color: #FFCC00;
  }

  .footerelement a {
    color: #161616;
    text-decoration: unset;
  }

  .footerelement a:hover, .footerelement a:active, .footerelement a:focus {
    color: #C73C35;
    background-color: unset;
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

  .footerelementtitle {
    margin: 0;
    font-size: 1rem;
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
      margin-bottom: 5px;
      padding-right: 5px;
      padding-left: 5px;
    }

    .footerelement a {
      display: block;
    }

    .footer-line-left {
      white-space: normal;
    }

    .footer-line {
      height: auto;
      padding-right: 10px;
      padding-left: 10px;
    }

    .footerelement .footerelementlink {
      margin-bottom: auto;
      line-height: 30px;
    }

    .footercontent {
      padding-right: 5px;
      padding-left: 5px;
    }

    .footercontent .breadcrumb {
      padding: 5px;
    }

  }

</style>
