<template>
  <nav :class="menu_class" aria-label="site">
    <div class="icon_box">
      <button @click="button_clicked()"
              class="icon">
        <span class="hidden_help_text">Menü</span>
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
             width="24" height="24"
             viewBox="0 0 172 172"
             style=" fill:#C73C35;">
          <g transform="">
            <g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt"
               stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0"
               font-family="none" font-weight="normal" font-size="none" text-anchor="start" style="mix-blend-mode: normal">
              <path d="M0,172v-172h172v172z" fill="white"></path>
              <g fill="#c73c35">
                <path
                  d="M14.33333,35.83333v14.33333h143.33333v-14.33333zM14.33333,78.83333v14.33333h143.33333v-14.33333zM14.33333,121.83333v14.33333h143.33333v-14.33333z"></path>
              </g>
            </g>
          </g>
        </svg>
      </button>
      <p>DatenAdler.de</p></div>
    <ul>
      <li>
        <nuxt-link class="router-link" to="/start">Start</nuxt-link>
        <hr class="hidebigscreen"/>
      </li>
      <li>
        <nuxt-link class="router-link" to="/faq">Antworten</nuxt-link>
        <hr class="hidebigscreen"/>
      </li>
      <li>
        <nuxt-link class="router-link" to="/blog">Blog</nuxt-link>
        <hr class="hidebigscreen"/>
      </li>
      <li>
        <nuxt-link class="router-link" to="/publisher">Datenbereitsteller</nuxt-link>
        <hr class="hidebigscreen"/>
      </li>
      <li>
        <nuxt-link class="router-link" to="/search">Einfache Suche</nuxt-link>
        <hr class="hidebigscreen"/>
      </li>
      <li>
        <nuxt-link class="router-link" to="/search/sparql">SPARQL</nuxt-link>
        <hr class="hidebigscreen"/>
      </li>
      <li>
        <nuxt-link to="/accessibility" class="router-link hidebigscreen">Barrierefreiheit</nuxt-link>
        <hr class="hidebigscreen"/>
      </li>
      <li>
        <nuxt-link to="/data_protection" class="router-link hidebigscreen">Datenschutz</nuxt-link>
        <hr class="hidebigscreen"/>
      </li>
      <li>
        <nuxt-link to="/impressum" class="router-link hidebigscreen">Impressum</nuxt-link>
      </li>
    </ul>
  </nav>

</template>

<script>
  export default {
    name: 'PkanMenu',
    data() {
      return {
        menu_class: 'menu content_container'
      }
    },
    methods: {
      button_clicked() {
        if (this.menu_class === 'menu content_container') {
          this.menu_class += ' responsive'
        } else {
          this.menu_class = 'menu content_container'
        }
      }

    },
  }
</script>

<style scoped>
  ul {
    display: flex;
    flex-flow: row wrap;
    margin: 0 -2px 0 -2px;
    justify-content: flex-end;
  }

  ul li {
    list-style-type: none;
  }

  .router-link {
    background-color: #ffffff;
    border: none;
    padding-left: 16px;
    padding-right: 16px;
    margin: 2px;
    text-align: center;
    text-decoration: none;
    color: #161616;
  }

  .router-link:hover,
  .router-link:focus,
  .nuxt-link-active {
    background-color: white;
    color: #C73C35;
  }

  .menu .icon {
    display: none;
  }

  .menu .icon_box {
    display: none;
  }

  .hidebigscreen {
    display: none;
  }

  .content_container {
    margin-right: -16px;
    padding-right: 0;
  }

  @media (max-width: 640px) {
    .menu .icon_box {
      width: 100%;
      float: left;
      position: relative;
      display: block;
      background-color: #C73C35;
    }

    .menu .icon_box button {
      background-color: #C73C35;
    }

    .menu .icon_box p {
      position: absolute;
      bottom: 1px;
      left: 30px;
      margin: 2px;
      padding: 1px;
      background-color: #C73C35;
      color: white;
    }

    .menu {
      display: flex;
      flex-direction: column;
      padding-left: 0;
      padding-right: 0;
      position: fixed;
      z-index: 2;
      left: 0;
      top: 0;
      width: 100%;
      padding-bottom: 5px;
      background-color: white;
    }

    .menu .router-link {
      display: none;
    }

    .menu .icon {
      float: left;
      display: block;
      background-color: white;
      padding: 1px;
    }

    .menu.responsive .router-link {
      float: none;
      display: block;
      text-align: left;
      padding-left: 5px;
    }

    .menu.responsive .hidebigscreen {
      display: block;
    }

    .router-link {
      padding-left: 0;
      padding-right: 0;
    }
  }
</style>
