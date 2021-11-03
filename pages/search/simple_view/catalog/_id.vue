<template>
  <base-view :vuex_ns="simple_vue_vuex_ns" :display_info_column="true">
    <template slot="content">
      <h1>Katalog: {{title}}</h1>
      <p class="description">{{description}}</p>
      <h2>Datensätze</h2>
      <ul class="nobull" v-if="!isEmpty(datasets)">
        <li v-for="item in datasets">
          <p class="element_title">{{ item.title }}</p>
          <p class="element_description">{{ item.description }}</p>
          <p>
            <NuxtLink :to="get_dataset_link(item.id)" :aria-label="item.title + ' weiterlesen'">Weiterlesen</NuxtLink>
          </p>
        </li>
      </ul>
      <div v-if="isEmpty(datasets)">
        <p>Es wurden keine Datensätze gefunden oder diese werden noch geladen.</p>
      </div>
      <h2>RDF-Download:</h2>
      <download-control :id="id"></download-control>
      <h2>Detailseite</h2>
      <NuxtLink :to="get_detail_link()" :aria-label="'Zur Detailseite von ' + this.title + ' wechseln'">Zur Detailseite wechseln</NuxtLink>
    </template>
  </base-view>
</template>

<script>
  import BaseView from '../../../../components/page/views/BaseView';
  import SimpleViewElement from "../../../../components/mixins/SimpleViewElement";
  import {REQUEST_SIMPLE_VIEW_CATALOG} from "../../../../components/configs/socket";
  import DownloadControl from "../../../../components/controls/DownloadControl";
  import SearchRouteMixin from '../../../../components/mixins/SearchRouteMixin'

  export default {
    name: 'catalog_simple',
    mixins: [SimpleViewElement, SearchRouteMixin],
    components: {
      DownloadControl,
      BaseView
    },
    created() {
      this.request = REQUEST_SIMPLE_VIEW_CATALOG
    },
    mounted() {
      this.$log.debug(this.name + ' mounted');
    },
    methods: {

    },


  }
</script>

<style scoped>

</style>
