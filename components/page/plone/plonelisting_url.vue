<template>
  <div>
    <ul :class="style_class + ' nobull'">
      <li v-for="item in plone_res.items" :class="element_style_class" v-if="plone_res.items.length">
        <div class="plone_listing_element">
          <h2 class="element_title">{{ item.title }}</h2>
          <div class="element_date" v-if="item.date_text">{{ item.date_text }}</div>
          <div class="element_logo" v-if="item.logo"><img :src="item.logo.download" :alt="item.title + ' Logo'"/></div>
          <div class="element_description">{{ item.description }}</div>
          <NuxtLink :to="get_nuxt_link(item.UID)" :aria-label="item.title + ' weiterlesen'">Weiterlesen</NuxtLink>
        </div>
      </li>
    </ul>
    <div v-if="!plone_res.items.length">
      <p>Es sind keine Inhalte verfügbar oder diese werden noch geladen.</p>
    </div>
  </div>
</template>

<script>
  import Plone from "../../mixins/Plone";

  export default {
    name: "plonelisting_url",
    mixins: [Plone],
    props: {
      'view_url': String,
      'element_style_class': String,
      'style_class': String,

    },
    methods: {
      get_nuxt_link(uid) {
        return this.view_url + '/' + uid
      },
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
