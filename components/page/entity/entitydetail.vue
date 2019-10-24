<template>
  <div :class="style_class">
    <h1>{{title}}</h1>
    <p>{{description}}</p>
    <h2>Felder:</h2>
    <div v-for="item in this.result_fields" :class="element_style_class">
      <div class="element_title">{{ get_label(item.field) }}:</div>
      <div>{{item.value}}</div>
    </div>
    <h2>Vernetzung:</h2>
    <div v-for="item in this.result_networking" :class="element_style_class">
      <div class="element_title">{{ get_label(item.type)}}: {{ item.title }}</div>
      <div class="element_description">{{ item.description }}</div>
      <NuxtLink :to="get_nuxt_link(item.id)">[Mehr]</NuxtLink>
    </div>
  </div>
</template>

<script>
  import SocketPromise from "../../mixins/SocketPromise";
  import {EV} from "../../configs/events";
  import {REQUEST_ITEM_DETAIL, REQUEST_ITEM_TITLE_DESC, REQUEST_LABEL} from "../../configs/socket";
  import * as rdf from "rdf";

  export default {
    name: "sparqlnetworking",
    props: ['id', 'view_url', 'element_style_class', 'style_class',],
    data() {
      return {
        result_fields: [],
        labels: {},
        result_networking: {},
        result_ttl: '',
        title: '',
        description: ''
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
              this.handle_label(p);
              this.result_fields.push({
                  'field': p.nominalValue,
                  'value': o.valueOf()
                }
              )
            } else {
              // s is id, o is type
              this.handle_label(o);
              this.result_networking[s.nominalValue] = {
                'title': '',
                'description': '',
                'type': o.nominalValue,
                'id': s.nominalValue,
              };
              this.get_object_title_description(s.nominalValue)
            }
          }, this)
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
      get_object_title_description(id){
        let request = Object.assign({}, {'id': id});
        return this.sendPromise(REQUEST_ITEM_TITLE_DESC, request)
          .then(
            this.handle_result_object_title_desc.bind(this)
          )
      },
      handle_result_object_title_desc(data){
        let id = data.id
        this.result_networking[id]['title'] = data.title;
        this.result_networking[id]['description'] = data.description;
        this.$forceUpdate()
      }


    },
  }
</script>

<style scoped>

</style>
