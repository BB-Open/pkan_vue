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
        <p class="element_title">{{ get_label(item.field) }}:</p>
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
        <p class="element_title">{{ get_label(item.type)}}: {{ item.title }}</p>
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
  import {REQUEST_ITEM_DETAIL, REQUEST_ITEM_TITLE_DESC, REQUEST_LABEL} from "../../configs/socket";
  import * as rdf from "rdf";
  import DownloadControl from "../../controls/DownloadControl";
  import {get_flask_data, write_aria_polite} from '../../mixins/utils';

  export default {
    name: "entitydetail",
    components: {DownloadControl},
    props: ['id', 'view_url', 'element_style_class', 'style_class', 'alert_title'],
    data() {
      return {
        download_url: '',
        result_fields: [],
        labels: {},
        result_networking: {},
        result_ttl: '',
        title: 'Titel wird geladen',
        description: 'Beschreibung wird geladen'
      }
    },
    serverPrefetch() {
      this.get_title();
      return this.get_data();
    },
    mounted() {
      // Force the initialization
      this.get_title();
      this.get_data();
    },
    methods: {
      get_nuxt_link(id) {
        return this.view_url + '/' + encodeURIComponent(id)
      },
      async get_title() {
        var response = await get_flask_data(this, REQUEST_ITEM_TITLE_DESC,  {id: this.id});
        return await this.handle_result_title(response)

      },
      async get_data() {
        var response = await get_flask_data(this, REQUEST_ITEM_DETAIL,  {id: this.id});
        return await this.handle_result_ttl(response)

      },
      async handle_result_title(data) {
        this.title = data.title;
        this.description = data.description;
        this.$store.ep_set('breadcrumb', 'last_title', this.title);
        if (this.alert_title) {
          write_aria_polite(this, 'Die Seite ' + this.title + ' wurde geladen.')
        }
      },
      async handle_result_ttl(data) {
        this.result_ttl = data.rdf_ttl;
        await this.update_results();
      },
      async update_results() {
        let parse = rdf.TurtleParser.parse(this.result_ttl);
        let graph_array = parse.graph.toArray();
        graph_array.forEach(
          async function (item) {
            let s, p, o;
            s = item['subject'];
            p = item['predicate'];
            o = item['object'];
            if (o instanceof rdf.Literal && s.nominalValue === this.id && (o.language === 'de' || o.language === null)) {
              // basic fields

              // get label from flask
              await this.handle_label(p);

              // set field
              this.result_fields.push({
                  'field': p.nominalValue,
                  'value': o.valueOf(),
                  'is_url': o.valueOf().startsWith('http')
                }
              ); debugger;
              if (p.nominalValue === 'http://www.w3.org/ns/dcat#downloadURL') {
                this.download_url = o.valueOf()
              }
            } else if (o instanceof rdf.NamedNode && s instanceof rdf.NamedNode && p instanceof rdf.NamedNode && o.nominalValue === this.id) {
              // related objects where o is our object
              await this.handle_network_id(s.nominalValue)

            } else if (o instanceof rdf.NamedNode && s instanceof rdf.NamedNode && p instanceof rdf.NamedNode && s.nominalValue === this.id) {
              // related objects where s is our objects
              await this.handle_network_id(o.nominalValue)

            } else if (o instanceof rdf.NamedNode && s instanceof rdf.NamedNode && p instanceof rdf.NamedNode && p.nominalValue === this.id) {
              // related objects where p is our objects
              await this.handle_network_id(o.nominalValue);
              await this.handle_network_id(s.nominalValue)

            } else {
              // additional sparql not directly related to our object
            }
          }, this);
      },
      async handle_label(p) {
        let key = p.nominalValue;
        // no need to request to often
        if (!(key in this.labels)) {
          let request = Object.assign({}, {'id': key});

          var response = await get_flask_data(this, REQUEST_LABEL,  {'id': key})
          return await this.handle_result_label(response)
        }
      },
      async handle_result_label(data) {
        this.labels[data.id] = data.label;
      },
      get_label(field) {
        if (field in this.labels) {
          return this.labels[field]
        } else {
          return field
        }
      },
      async get_object_title_description(id) {

        var response = await get_flask_data(this, REQUEST_ITEM_TITLE_DESC,  {'id': id})
        return await this.handle_result_object_title_desc(response)

      },
      handle_result_object_title_desc(data) {
        let id = data.id;
        this.result_networking[id]['title'] = data.title;
        this.result_networking[id]['description'] = data.description;
        this.result_networking[id]['type'] = data.type;
      },
      async handle_network_id(id) {
        // set default values
        this.result_networking[id] = {
          'title': id,
          'description': '',
          'type': '',
          'id': id,
        };
        // load infos from flask and replace default values
        await this.get_object_title_description(id)
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
