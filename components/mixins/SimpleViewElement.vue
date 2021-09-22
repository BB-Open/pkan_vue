<script>
  import {get_flask_data} from '../mixins/utils';
  import {VUEX_NAMESPACE} from "../../store/simple_view";
  import {VUEX_NAMESPACE as BR_STORE} from "../../store/breadcrumb";
  import {write_aria_polite} from "./utils";
  import {SEARCH_URL} from "../configs/routing";

  export default {
    name: 'SimpleViewElement',
    created() {
      this.vuex_ns = VUEX_NAMESPACE;
      this.view_url = SEARCH_URL;
    },
    props: ['dcat_id'],
    computed: {
      id: function () {
        if (this.dcat_id !== null && this.dcat_id !== undefined) {
          return this.dcat_id
        }
        return this.$route.params.id;
      },
      store_id: function () {
        return this.id_to_store_id(this.id)
      },
      title: function () {
        let result = this.$store.get(this.vuex_ns + '/titles@' + this.store_id);

        if (result === undefined) {
          result = this.get_data();
          return 'Titel wird geladen'
        }

        return result
      },
      description: function () {
        let result = this.$store.get(this.vuex_ns + '/descriptions@' + this.store_id);
        if (result === undefined) {
          return 'Beschreibung wird geladen'
        }

        return result
      },
      datasets: function () {
        return this.$store.get(this.vuex_ns + '/datasets@' + this.store_id)
      },
      catalogs: function () {
        return this.$store.get(this.vuex_ns + '/catalogs@' + this.store_id)
      },
      distributions: function () {
        return this.$store.get(this.vuex_ns + '/distributions@' + this.store_id)
      },
      result_fields: function () {
        return this.$store.get(this.vuex_ns + '/result_fields@' + this.store_id)
      },
    },
    methods: {
      async get_data() {
        var response = await get_flask_data(this, this.request, {id: this.id});
        await this.handle_result(response);
        return response

      },
      async handle_result(data) {
        let setter = this.vuex_ns + '/titles@' + this.store_id;
        this.$store.set(setter, data.title);
        setter = BR_STORE + '/titles@' + this.$route.path;
        await this.$store.set(setter, data.title);
        setter = this.vuex_ns + '/descriptions@' + this.store_id;
        this.$store.set(setter, data.description);
        setter = this.vuex_ns + '/datasets@' + this.store_id;
        this.$store.set(setter, data.datasets);
        setter = this.vuex_ns + '/catalogs@' + this.store_id;
        this.$store.set(setter, data.catalogs);
        setter = this.vuex_ns + '/distributions@' + this.store_id;
        this.$store.set(setter, data.distributions);
        setter = this.vuex_ns + '/result_fields@' + this.store_id;
        this.$store.set(setter, data.result_fields);
        write_aria_polite(this, 'Die Seite ' + this.title + ' wurde geladen.')
      },
      id_to_store_id(id) {
        id = id.split("/").join("");
        id = id.split(".").join("");
        id = id.split(":").join("");
        id = id.split("#").join("");
        id = id.split("=").join("");
        id = id.split("?").join("");
        id = id.split("&").join("");
        return id
      },
      isEmpty(obj) {
        for (var key in obj) {
          if (obj.hasOwnProperty(key))
            return false;
        }
        return true;
      },
      get_dataset_link(id) {
        return this.view_url + '/simple_view/dataset/' + encodeURIComponent(id)
      },
      get_catalog_link(id) {
        return this.view_url + '/simple_view/catalog/' + encodeURIComponent(id)
      },
      get_distribution_link(id) {
        return this.view_url + '/simple_view/distribution/' + encodeURIComponent(id)
      },
      get_detail_link() {
        return this.view_url + '/' + encodeURIComponent(this.id)
      }
    }
    ,

  }
</script>

<style scoped>

</style>
