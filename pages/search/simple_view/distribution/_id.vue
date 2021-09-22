<template>
  <base-view :vuex_ns="vuex_ns" :display_info_column="true">
    <template slot="content">
      <h1>{{title}}</h1>
      <p class="description">{{description}}</p>
      <h2>Identifier</h2>
      <p class="element_description">{{id}}</p>
      <h2>Eigenschaften</h2>
      <ul class="nobull" v-if="result_fields.length">
        <li v-for="item in result_fields">
          <p class="element_title">{{ item.field }}:</p>
          <p class="element_description">{{item.value}}</p>
          <!--        <a class="element_description" :href="item.value" v-if="item.is_url">{{item.value}}</a>-->
        </li>
      </ul>
      <div v-if="!result_fields.length">
        <p>Es wurden keine Felder gefunden oder diese werden noch geladen.</p>
      </div>
      <h2>Datensatz</h2>
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
