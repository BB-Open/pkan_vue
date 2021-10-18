<script>
  import {VUEX_NAMESPACE as SPARQL_NS} from "../../store/sparqlelement";
  import {VUEX_NAMESPACE as BR_STORE} from "../../store/breadcrumb";
  import {REQUEST_ITEM_DETAIL, REQUEST_ITEM_TITLE_DESC, REQUEST_LABEL} from "../configs/socket";
  import * as rdf from "rdf";
  import {get_flask_data, write_aria_polite} from '../mixins/utils';

  export default {
    name: 'SparqlElement',
    created() {
      this.vuex_ns = SPARQL_NS
    },
    props: [
      'id', 'alert_title',
    ],
    serverPrefetch() {
      let res = this.get_title();
      this.get_data();
      return res
    },

    computed: {
      store_id: function () {
        return this.id_to_store_id(this.id)
      },
      title: function () {
        let result = this.$store.get(this.vuex_ns + '/titles@' + this.store_id);

        if (result === undefined) {
          result = this.get_title();
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
      download_url: function () {
        return this.$store.get(this.vuex_ns + '/downloads@' + this.store_id)
      },
      raw_fields: function () {
        let result = this.$store.get(this.vuex_ns + '/fields@' + this.store_id);
        if (result === undefined) {
          this.get_data();
          return []
        }
        return result
      },

      result_fields: function () {
        let result = this.raw_fields;
        let new_results = [];
        result.forEach(function (item) {
          let new_item = {};
          new_item['value'] = item['value'];
          new_item['is_url'] = item['url'];
          if (this.labels[this.id_to_store_id(item['field'])]) {
            new_item['field'] = this.labels[this.id_to_store_id(item['field'])];
          } else {
            new_item['field'] = item['field']
          }
          new_results.push(new_item)
        }, this);
        return new_results;
      },
      labels: function () {
        let result = this.$store.ep_get(this.vuex_ns, 'labels');
        if (result === undefined) {
          return {}
        }
        return result
      },
      result_networking: function () {
        let result = this.$store.get(this.vuex_ns + '/networks@' + this.store_id);
        if (result === undefined) {
          this.get_data();
          return []
        }
        return result
      },
    },
    methods: {
      async get_title() {
        this.$log.debug('Get Title called');
        var response = await get_flask_data(this, REQUEST_ITEM_TITLE_DESC, {id: this.id});
        await this.$store.set(this.vuex_ns + '/titles@' + this.store_id, response.title);
        await this.$store.set(this.vuex_ns + '/descriptions@' + this.store_id, response.description);
        let setter = BR_STORE + '/titles@' + this.$route.path;
        await this.$store.set(setter, response.title);
        if (this.alert_title) {
          write_aria_polite(this, 'Die Seite ' + this.title + ' wurde geladen.')
        }
        this.$log.debug('Get Title finished');
        return response

      },
      async get_data() {
        var response = await get_flask_data(this, REQUEST_ITEM_DETAIL, {id: this.id});
        await this.handle_result_ttl(response);
        return response

      },
      async handle_result_ttl(data) {
        let result_ttl = data.rdf_ttl;
        let parse = rdf.TurtleParser.parse(result_ttl);
        let graph_array = parse.graph.toArray();
        let result_fields = [];
        graph_array.forEach(
          async function (item) {
            let s, p, o;
            s = item['subject'];
            p = item['predicate'];
            o = item['object'];
            if (o instanceof rdf.Literal && s.nominalValue === this.id && (o.language === 'de' || o.language === null)) {
              // set field
              result_fields.push({
                  'field': p.nominalValue,
                  'value': o.nominalValue,
                  'is_url': o.nominalValue.startsWith('http')
                }
              );
              this.get_label(p.nominalValue);
              if (p.nominalValue === 'http://www.w3.org/ns/dcat#downloadURL') {
                let download_url = o.valueOf();
                this.$store.set(this.vuex_ns + '/downloads@' + this.store_id, download_url);
              }
            } else if (o instanceof rdf.NamedNode && s instanceof rdf.NamedNode && p instanceof rdf.NamedNode && o.nominalValue === this.id) {
              // related objects where o is our object
              await this.handle_network_details(s.nominalValue)

            } else if (o instanceof rdf.NamedNode && s instanceof rdf.NamedNode && p instanceof rdf.NamedNode && s.nominalValue === this.id) {
              // related objects where s is our objects
              await this.handle_network_details(o.nominalValue)

            } else if (o instanceof rdf.NamedNode && s instanceof rdf.NamedNode && p instanceof rdf.NamedNode && p.nominalValue === this.id) {
              // related objects where p is our objects
              await this.handle_network_details(o.nominalValue);
              await this.handle_network_details(s.nominalValue)

            } else {
              // additional sparql not directly related to our object
            }
          }, this);
        await this.$store.set(this.vuex_ns + '/fields@' + this.store_id, result_fields);
      },
      async request_label(id) {
        // no need to request to often

        let request = Object.assign({}, {'id': id});

        var data = await get_flask_data(this, REQUEST_LABEL, request);
        await this.$store.set(this.vuex_ns + '/labels@' + this.id_to_store_id(data.id), data.label)
      },
      get_label(field) {
        if (field in this.labels) {
          return this.labels[this.id_to_store_id(field)]
        } else {
          this.request_label(field);
          return field
        }
      },
      async handle_network_details(id) {
        this.$log.info('fetching network details');
        this.$log.info(id);
        let data = await get_flask_data(this, REQUEST_ITEM_TITLE_DESC, {'id': id});

        let network = {
          'title': data.title,
          'description': data.description,
          'type': data.type,
          'id': id,
        };
        let setter = this.vuex_ns + '/networks@' + this.store_id + '.' + this.id_to_store_id(id);
        this.$log.info('Got Response');
        this.$log.info(data);
        await this.$store.set(setter, network);
        return data
      },
      id_to_store_id(id) {
        id = id.split("/").join("");
        id = id.split(".").join("");
        id = id.split(":").join("");
        id = id.split("#").join("");
        id = id.split("=").join("");
        id = id.split("?").join("");
        id = id.split("&").join("");
        id = id.split("%").join("");
        id = id.split("~").join("");
        id = id.split("-").join("");
        id = id.split("+").join("");
        return id
      }
    },

  }
</script>

<style scoped>

</style>
