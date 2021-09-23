<template>
  <base-view :vuex_ns="vuex_ns" :display_info_column="true">
    <template slot="content">
      <h1>Ausgabe: {{title}}</h1>
      <p class="description">{{description}}</p>
      <h2>Eigenschaften</h2>
      <ul class="nobull" v-if="!isEmpty(result_fields)">
        <li v-for="item in result_fields">
          <p class="element_title">{{ item.field }}:</p>
          <p class="element_description" v-if="!item.is_url">{{item.value}}</p>
          <a class="element_description" :href="item.value" v-if="item.is_url">{{item.value}}</a>
        </li>
      </ul>
      <div v-if="isEmpty(result_fields)">
        <p>Es wurden keine Eigenschaften gefunden oder diese werden noch geladen.</p>
      </div>
      <h2>RDF-Download:</h2>
      <download-control :id="id"></download-control>
      <h2>Detailseite</h2>
      <NuxtLink :to="get_detail_link()" :aria-label="'Zur Detailseite von ' + this.title + ' wechseln'">Zur Detailseite wechseln</NuxtLink>
      <h2>Datenstruktur</h2>
      <ul class="nobull" v-if="!isEmpty(datasets)">
        <li v-for="item in datasets">
          <p>
            <NuxtLink :to="get_dataset_link(item.id)" :aria-label="'Zurück zur Datenstruktur' + item.title + ' gehen'">Zurück zur Datenstruktur {{ item.title }}</NuxtLink>
          </p>
        </li>
      </ul>
      <div v-if="isEmpty(datasets)">
        <p>Es wurde keine Datenstruktur gefunden oder diese wird noch geladen.</p>
      </div>
    </template>
  </base-view>
</template>

<script>
  import BaseView from '../../../../components/page/views/BaseView';
  import SimpleViewElement from "../../../../components/mixins/SimpleViewElement";
  import {REQUEST_SIMPLE_VIEW_DISTRIBUTION} from "../../../../components/configs/socket";
  import DownloadControl from "../../../../components/controls/DownloadControl";

  export default {
    name: 'catalog_simple',
    mixins: [SimpleViewElement],
    components: {
      DownloadControl,
      BaseView
    },
    created() {
      this.request = REQUEST_SIMPLE_VIEW_DISTRIBUTION
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
