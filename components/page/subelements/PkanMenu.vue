<template>
  <nav :class="menu_class" aria-label="site">
    <div class="icon_box">
    <button @click="button_clicked()"
            class="icon"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                              width="25" height="25"
                              viewBox="0 0 172 172"
                              style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#c73c35"><path d="M86,9.83625l-79.12,43.16125v108.6825h158.24v-108.6825zM127.28,123.84h-82.56v-6.88h82.56zM127.28,103.2h-82.56v-6.88h82.56zM127.28,82.56h-82.56v-6.88h82.56z"></path></g></g></svg>

    </button><p>Hauptmenü</p></div>
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
            this.menu_class = 'menu'
          }
        }

      },
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
    padding-left: 16px;
    padding-right: 16px;
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

  .menu .icon {
    display: none;
  }

  .menu .icon_box {
    display: none;
  }

  @media (max-width: 640px) {
    .menu .icon_box {
      width: 100%;
      float: left;
      position: relative;
      display: block;
    }

    .menu .icon_box p {
      position: absolute;
      bottom: 1px;
      left: 30px;
      margin: 2px;
      padding: 1px;
    }

    .menu {
      display: flex;
      flex-direction: column;
    }
    .menu .router-link {display: none;}
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
    }
    .router-link {
      padding-left: 0;
      padding-right: 0;
    }
  }
</style>
