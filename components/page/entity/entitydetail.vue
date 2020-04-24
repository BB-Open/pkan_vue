<template>
  <div :class="style_class">
    <h1>{{title}}</h1>
    <p class="description">{{description}}</p>
    <a :href="id">Originallink aufrufen</a>
    <h2>Download:</h2>
    <download-control :id="id"></download-control>
    <h2>Felder:</h2>
    <ul class="nobull" v-if="result_fields.length">
      <li v-for="item in result_fields" :class="element_style_class">
        <p class="element_title">{{ get_label(item.field) }}:</p>
        <p class="element_description">{{item.value}}</p>
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
  import SocketPromise from "../../mixins/SocketPromise";
  import {EV} from "../../configs/events";
  import {REQUEST_ITEM_DETAIL, REQUEST_ITEM_TITLE_DESC, REQUEST_LABEL} from "../../configs/socket";
  import * as rdf from "rdf";
  import DownloadControl from "../../controls/DownloadControl";

  export default {
    name: "entitydetail",
    components: {DownloadControl},
    props: ['id', 'view_url', 'element_style_class', 'style_class',],
    data() {
      return {
        result_fields: [],
        labels: {},
        result_networking: {},
        result_ttl: '',
        title: 'Titel wird geladen',
        description: 'Beschreibung wird geladen'
      }
    },
    mixins: [
      SocketPromise
    ],
    mounted() {
      // Force the initialization
      this.get_title();
      this.get_data();
    },
    methods: {
      get_nuxt_link(id) {
        return this.view_url + '/' + encodeURIComponent(id)
      },
      get_title() {
        let request = Object.assign({}, {id: this.id});
        return this.sendPromise(REQUEST_ITEM_TITLE_DESC, request)
          .then(
            this.handle_result_title.bind(this)
          )
      },
      get_data() {
        let request = Object.assign({}, {id: this.id});
        return this.sendPromise(REQUEST_ITEM_DETAIL, request)
          .then(
            this.handle_result_ttl.bind(this)
          )
      },
      handle_result_title(data) {
        this.title = data.title;
        this.description = data.description;
        this.$store.ep_commit('BreadCrumb', 'last_title', this.title);
        this.$EventBus.$emit(EV.BREADCRUMB_CHANGED, {});
        this.$forceUpdate()
      },
      handle_result_ttl(data) {
        this.result_ttl = data.rdf_ttl;
        this.update_results();
        this.$forceUpdate()
      },
      update_results() {
        let parse = rdf.TurtleParser.parse(this.result_ttl);
        let graph_array = parse.graph.toArray();
        graph_array.forEach(
          function (item) {
            let s, p, o;
            s = item['subject'];
            p = item['predicate'];
            o = item['object'];
            if (o instanceof rdf.Literal && s.nominalValue === this.id && (o.language === 'de' || o.language === null)) {
              // basic fields

              // get label from flask
              this.handle_label(p);

              // set field
              this.result_fields.push({
                  'field': p.nominalValue,
                  'value': o.valueOf()
                }
              )
            } else if (o instanceof rdf.NamedNode && s instanceof rdf.NamedNode && p instanceof rdf.NamedNode && o.nominalValue === this.id) {
              // related objects where o is our object
              this.handle_netork_id(s.nominalValue)

            } else if (o instanceof rdf.NamedNode && s instanceof rdf.NamedNode && p instanceof rdf.NamedNode && s.nominalValue === this.id) {
              // related objects where s is our objects
              this.handle_netork_id(o.nominalValue)

            } else if (o instanceof rdf.NamedNode && s instanceof rdf.NamedNode && p instanceof rdf.NamedNode && p.nominalValue === this.id) {
              // related objects where p is our objects
              this.handle_netork_id(o.nominalValue);
              this.handle_netork_id(s.nominalValue)

            } else {
              // additional sparql not directly related to our object
            }
          }, this);
      },
      handle_label(p) {
        let key = p.nominalValue;
        // no need to request to often
        if (!(key in this.labels)) {
          let request = Object.assign({}, {'id': key});
          return this.sendPromise(REQUEST_LABEL, request)
            .then(
              this.handle_result_label.bind(this)
            )
        }
      },
      handle_result_label(data) {
        this.labels[data.id] = data.label;
        this.$forceUpdate()
      },
      get_label(field) {
        if (field in this.labels) {
          return this.labels[field]
        } else {
          return field
        }
      },
      get_object_title_description(id) {
        let request = Object.assign({}, {'id': id});
        return this.sendPromise(REQUEST_ITEM_TITLE_DESC, request)
          .then(
            this.handle_result_object_title_desc.bind(this)
          )
      },
      handle_result_object_title_desc(data) {
        let id = data.id;
        this.result_networking[id]['title'] = data.title;
        this.result_networking[id]['description'] = data.description;
        this.result_networking[id]['type'] = data.type;
        this.$forceUpdate()
      },
      handle_netork_id(id) {
        // set default values
        this.result_networking[id] = {
          'title': id,
          'description': '',
          'type': '',
          'id': id,
        };
        // load infos from flask and replace default values
        this.get_object_title_description(id)
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
