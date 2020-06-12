<template>
  <div :class="style_class">
    <h1>{{title}}</h1>
    <p class="description">{{description}}</p>
    <a :href="id">Originallink des Datensatzes aufrufen</a>
    <a v-if="download_url" :href="download_url">Den Download der Originaldaten aufrufen</a>
    <h2>RDF-Download:</h2>
    <download-control :id="id"></download-control>
    <h2>Felder:</h2>
    <ul class="nobull" v-if="result_fields.length">
      <li v-for="item in result_fields" :class="element_style_class">
        <p class="element_title">{{ item.field }}:</p>
        <p class="element_description" v-if="!item.is_url">{{item.value}}</p>
        <a class="element_description" :href="item.value" v-if="item.is_url">{{item.value}}</a>
      </li>
    </ul>
    <div v-if="!result_fields.length">
      <p>Es wurden keine Felder gefunden oder diese werden noch geladen.</p>
    </div>
    <h2>Vernetzung:</h2>
    <ul class="nobull" v-if="!isEmpty(result_networking)">
      <li v-for="item in result_networking" :class="element_style_class">
        <p class="element_title">{{ item.type }}: {{ item.title }}</p>
        <p class="element_description">{{ item.description }}</p>
        <p>
          <NuxtLink :to="get_nuxt_link(item.id)" :aria-label="item.title + ' weiterlesen'">Weiterlesen</NuxtLink>
        </p>
      </li>
    </ul>
    <div v-if="isEmpty(result_networking)">
      <p>Es wurden keine vernetzten Elemente gefunden oder diese werden noch geladen.</p>
    </div>
  </div>
</template>

<script>
  import DownloadControl from "../../controls/DownloadControl";
  import SparqlElement from "../../mixins/SparqlElement";

  export default {
    name: "entitydetail",
    components: {DownloadControl},
    mixins: [SparqlElement],
    props: ['view_url', 'element_style_class', 'style_class'],

    methods: {
      get_nuxt_link(id) {
        return this.view_url + '/' + encodeURIComponent(id)
      },
      
      isEmpty(obj) {
        for(var key in obj) {
          if(obj.hasOwnProperty(key))
            return false;
        }
        return true;
      }
    },
  }
</script>

<style scoped>

  .element_title, .element_description {
    margin-bottom: 0;
  }

  .element_title {
    font-weight: bold;
  }

</style>
