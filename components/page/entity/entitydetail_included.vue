<template>
  <div :class="style_class">
    <h2>OpenData für {{title}}</h2>
    <p class="description">{{description}}</p>
    <h3>Kataloge</h3>
    <ul class="nobull" v-if="!isEmpty(catalogs)">
      <li v-for="item in catalogs">
        <p class="element_title">{{ item.title }}</p>
        <p class="element_description">{{ item.description }}</p>
        <p>
          <NuxtLink :to="get_catalog_link(item.id)" :aria-label="item.title + ' weiterlesen'">Weiterlesen</NuxtLink>
        </p>
      </li>
    </ul>
    <div v-if="isEmpty(catalogs)">
      <p>Es wurden keine Kataloge gefunden oder diese werden noch geladen.</p>
    </div>
    <h3>Datensätze</h3>
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
    <h3>RDF-Download:</h3>
    <download-control :id="id"></download-control>
    <h2>Detailseite</h2>
    <NuxtLink :to="get_detail_link()" :aria-label="'Zur Detailseite von ' + this.title + ' wechseln'">Zur Detailseite wechseln</NuxtLink>
  </div>
</template>

<script>
  import SimpleViewElement from "../../../components/mixins/SimpleViewElement";
  import {REQUEST_SIMPLE_VIEW_PUBLISHER} from "../../../components/configs/socket";
  import DownloadControl from "../../../components/controls/DownloadControl";

  export default {
    name: 'catalog_simple',
    mixins: [SimpleViewElement],
    components: {
      DownloadControl,
    },
    created() {
      this.request = REQUEST_SIMPLE_VIEW_PUBLISHER
    },
    mounted() {
      this.$log.debug(this.name + ' mounted');
    },
    methods: {

    }

  }
</script>
