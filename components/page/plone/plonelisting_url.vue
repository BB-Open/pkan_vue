<template>
  <div>
    <ul :class="style_class + ' nobull'">

      <li v-for="item in this.result.items" :class="element_style_class" v-if="result.items.length">
        <div class="plone_listing_element">
          <h2 class="element_title">{{ item.title }}</h2>
          <div class="element_date" v-if="item.date_text">{{ item.date_text }}</div>
          <div class="element_logo" v-if="item.logo"><img :src="item.logo.download" :alt="item.title + ' Logo'"/></div>
          <div class="element_description">{{ item.description }}</div>
          <NuxtLink :to="get_nuxt_link(item.UID)" :aria-label="item.title + ' weiterlesen'">Weiterlesen</NuxtLink>
        </div>
      </li>

    </ul>
    <div v-if="!result.items.length">
      <p>Es sind keine Inhalte verfügbar oder diese werden noch geladen.</p>
    </div>
  </div>
</template>

<script>
  import {server_settings} from "../../configs/server_settings";
  import {format_plone_date, get_plone_data, set_error_message} from '../../mixins/utils';
  import {PLONE_UNREACHABLE_MESSAGE} from "../../configs/plone_keywords";

  export default {
    name: "plonelisting_url",
    props: {
      'portal_type': String,
      'max_number': String,
      'sort_on': String,
      'tag': String,
      'view_url': String,
      'element_style_class': String,
      'sort_order': String,
      'style_class': String,
      'display_date':
        {
          type: Boolean,
          default:
            false
        }
    },
    data() {
      return {
        namespace: 'plonenlisting_url',
        result: {
          items: []
        },
        base_data_url: server_settings.PLONE_URL + '/@search?fullobjects=1',
      }
    },
    serverPrefetch() {
      this.generate_data_url();
      return this.get_data();
    },
    mounted() {
      // Force the initialization
      this.$log.debug(this.namespace + ' mounted');
      this.generate_data_url();
      this.get_data();
    }
    ,
    methods: {
      get_nuxt_link(uid) {
        return this.view_url + '/' + uid
      }
      ,
      async get_data() {
        await this.request_pages(this.data_url)
      }
      ,
      generate_data_url() {
        this.data_url = this.base_data_url;

        if (this.portal_type !== undefined) {
          this.data_url += '&portal_type=' + this.portal_type
        }

        if (this.sort_on !== undefined) {
          this.data_url += '&sort_on=' + this.sort_on
        }

        if (this.sort_order !== undefined) {
          this.data_url += '&sort_order=' + this.sort_order
        }
        if (this.max_number !== undefined) {
          this.data_url += '&sort_limit=' + this.max_number
        }

        if (this.tag !== undefined) {
          this.data_url += '&Subject=' + this.tag
        }

        this.$log.debug(this.data_url + ' requested');
      }
      ,
      async request_pages(url) {
        this.result = await get_plone_data(this, url)

        if (this.display_date) {
          this.result.items.forEach(
            function (item) {
              item.date_text = 'Veröffentlicht am ' + format_plone_date(item.effective);
            }, this)
        }
      }
      ,
    }
    ,
  }
</script>

<style scoped>

  .element_title {
    font-weight: bold;
    font-style: normal;
    font-size: 1rem;
    margin: 0;
  }

  .element_logo img {
    max-width: 100px;
  }

  .element_date {
    font-style: italic;
  }

  .plone_listing_element {
    padding: 15px;
    padding-left: 0;
  }

  .box .plone_listing_element {
    padding-left: 15px;
  }

  @media (max-width: 640px) {
    .plone_listing_element {
      padding: 5px;
      padding-left: 0;
    }

    .box .plone_listing_element {
      padding-left: 5px;
    }

  }

</style>
