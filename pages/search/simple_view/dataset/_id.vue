<template>
  <base-view :vuex_ns="simple_vue_vuex_ns" :display_info_column="true">
    <template slot="content">
      <h1>Datenstruktur: {{title}}</h1>
      <p class="description">{{description}}</p>
      <h2>Ausgaben</h2>
      <ul class="nobull" v-if="!isEmpty(distributions)">
        <li v-for="item in distributions">
          <p class="element_title">{{ item.title }}</p>
          <p class="element_description">{{ item.description }}</p>
          <p class="element_description">Format: {{ item.formats }}</p>
          <p>
            <NuxtLink :to="get_distribution_link(item.id)" :aria-label="item.title + ' weiterlesen'">Weiterlesen</NuxtLink>
          </p>
        </li>
      </ul>
      <div v-if="isEmpty(distributions)">
        <p>Es wurden keine Ausgaben gefunden oder diese werden noch geladen.</p>
      </div>
      <h2>RDF-Download:</h2>
      <download-control :id="id"></download-control>
      <h2>Detailseite</h2>
      <NuxtLink :to="get_detail_link()" :aria-label="'Zur Detailseite von ' + this.title + ' wechseln'">Zur Detailseite wechseln</NuxtLink>
      <h2>Katalog</h2>
      <ul class="nobull" v-if="!isEmpty(catalogs)">
        <li v-for="item in catalogs">
          <p>
            <NuxtLink :to="get_catalog_link(item.id)" :aria-label="'Zurück zum Katalog' + item.title + ' gehen'">Zurück zum Katalog {{ item.title }}</NuxtLink>
          </p>
        </li>
      </ul>
      <div v-if="isEmpty(catalogs)">
        <p>Es wurde kein Katalog gefunden oder dieser wurde noch nicht geladen.</p>
      </div>
    </template>
  </base-view>
</template>

<script>
  import BaseView from '../../../../components/page/views/BaseView';
  import SimpleViewElement from "../../../../components/mixins/SimpleViewElement";
  import {REQUEST_SIMPLE_VIEW_DATASET} from "../../../../components/configs/socket";
  import DownloadControl from "../../../../components/controls/DownloadControl";

  export default {
    name: 'dataset_simpel',
    mixins: [SimpleViewElement],
    components: {
      DownloadControl,
      BaseView
    },
    created() {
      this.request = REQUEST_SIMPLE_VIEW_DATASET
    },
    mounted() {
      this.$log.debug(this.name + ' mounted');
    },
    methods: {

    }

  }
</script>

<style scoped>

</style>

