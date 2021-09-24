<script>
  import {get_flask_data} from '../mixins/utils';
  import {VUEX_NAMESPACE} from "../../store/simple_view";
  import {VUEX_NAMESPACE as BR_STORE} from "../../store/breadcrumb";
  import {id_to_store_id, write_aria_polite} from "./utils";
  import {SEARCH_URL} from "../configs/routing";

  export default {
    name: 'SimpleViewElement',
    created() {
      this.simple_vue_vuex_ns = VUEX_NAMESPACE;
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
        return id_to_store_id(this.id)
      },
      title: function () {
        let result = this.$store.get(this.simple_vue_vuex_ns + '/titles@' + this.store_id);

        if (result === undefined) {
          result = this.get_data();
          return 'Titel wird geladen'
        }

        return result
      },
      description: function () {
        let result = this.$store.get(this.simple_vue_vuex_ns + '/descriptions@' + this.store_id);
        if (result === undefined) {
          return 'Beschreibung wird geladen'
        }

        return result
      },
      datasets: function () {
        return this.$store.get(this.simple_vue_vuex_ns + '/datasets@' + this.store_id)
      },
      catalogs: function () {
        return this.$store.get(this.simple_vue_vuex_ns + '/catalogs@' + this.store_id)
      },
      distributions: function () {
        return this.$store.get(this.simple_vue_vuex_ns + '/distributions@' + this.store_id)
      },
      result_fields: function () {
        return this.$store.get(this.simple_vue_vuex_ns + '/result_fields@' + this.store_id)
      },
    },
    methods: {
      async get_data() {
        var response = await get_flask_data(this, this.request, {id: this.id});
        await this.handle_result(response);
        return response

      },
      async handle_result(data) {
        let setter = this.simple_vue_vuex_ns + '/titles@' + this.store_id;
        this.$store.set(setter, data.title);
        setter = BR_STORE + '/titles@' + id_to_store_id(this.$route.path);
        await this.$store.set(setter, data.title);
        setter = this.simple_vue_vuex_ns + '/descriptions@' + this.store_id;
        this.$store.set(setter, data.description);
        setter = this.simple_vue_vuex_ns + '/datasets@' + this.store_id;
        this.$store.set(setter, data.datasets);
        setter = this.simple_vue_vuex_ns + '/catalogs@' + this.store_id;
        this.$store.set(setter, data.catalogs);
        setter = this.simple_vue_vuex_ns + '/distributions@' + this.store_id;
        this.$store.set(setter, data.distributions);
        setter = this.simple_vue_vuex_ns + '/result_fields@' + this.store_id;
        this.$store.set(setter, data.result_fields);
        await this.set_breadcrumb_titles(data);
        write_aria_polite(this, 'Die Seite ' + this.title + ' wurde geladen.');
      },

      isEmpty(obj) {
        if (obj === undefined) {
          return true
        }
        for (var key in obj) {
          if (obj.hasOwnProperty(key))
            return false;
        }
        return true;
      },
      get_dataset_link(id) {
        return this.view_url + '/simple_view/dataset/' + encodeURIComponent(id) + '/'
      },
      get_catalog_link(id) {
        return this.view_url + '/simple_view/catalog/' + encodeURIComponent(id) + '/'
      },
      get_distribution_link(id) {
        return this.view_url + '/simple_view/distribution/' + encodeURIComponent(id) + '/'
      },
      get_detail_link() {
        return this.view_url + '/' + encodeURIComponent(this.id) + '/'
      },
      async set_breadcrumb_titles(data){
        let path = this.$route.path;
        if (path.includes('dataset') || path.includes('distribution')) {
          if (!this.isEmpty(data.catalogs)) {
            let url = this.get_catalog_link(data.catalogs[0].id);
            let setter = BR_STORE + '/titles@' + id_to_store_id(url);
            this.$log.info(data.catalogs[0]);
            await this.$store.set(setter, data.catalogs[0].title);
          }
        }
        if (path.includes('distribution')) {
          if (!this.isEmpty(data.datasets)) {
            let url = this.get_dataset_link(data.datasets[0].id);
            let setter = BR_STORE + '/titles@' + id_to_store_id(url);
            await this.$store.set(setter, data.datasets[0].title);
          }
        }

      },
      get_simple_view_breadcrumb_elements() {
        let elements = [];
        elements.push('/');
        elements.push('/search/');
        let path = this.$route.path;
        if (path.includes('dataset') || path.includes('distribution')) {
          if (!this.isEmpty(this.catalogs)) {
            let url = this.get_catalog_link(this.catalogs[0].id);
            elements.push(url);
          }
        }
        if (path.includes('distribution')) {
          if (!this.isEmpty(this.datasets)) {
            let url = this.get_dataset_link(this.datasets[0].id);
            elements.push(url);
          }
        }

        elements.push(path);
        return elements;
      },
    }

  }
</script>

<style scoped>

</style>
