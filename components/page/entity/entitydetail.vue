<template>
  <div :class="style_class">
    <h1>{{title}}</h1>
    <p>{{description}}</p>
    <h2>Felder:</h2>
    <div v-for="item in this.result" :class="element_style_class">
      <div class="element_title">{{ item.field }}:</div>
      <NuxtLink :to="get_nuxt_link(item.value)" v-if="item.type === 'url'">{{item.title}}</NuxtLink>
      <div v-if="item.type === 'text'">{{item.value}}</div>
    </div>
  </div>
</template>

<script>
  import SocketPromise from "../../mixins/SocketPromise";
  import {EV} from "../../configs/events";
  import {REQUEST_ITEM_DETAIL} from "../../configs/socket";

  export default {
    name: "sparqlnetworking",
    props: ['id', 'view_url', 'element_style_class', 'style_class',],
    data() {
      return {
        result: [],
        title: '',
        description: ''
      }
    },
    mixins: [
      SocketPromise
    ],
    mounted() {
      // Force the initialization
      this.get_data();
    },
    methods: {
      get_nuxt_link(id) {
        return this.view_url + '/' + id
      },
      get_data() {
        let request = Object.assign({}, {id: this.id});
        return this.sendPromise(REQUEST_ITEM_DETAIL, request)
          .then(
            this.handle_result.bind(this)
          )
      },
      handle_result(data){
        this.result = data.fields;
        this.title = data.title;
        this.description = data.description;
        this.$store.ep_commit('BreadCrumb', 'last_title', this.title);
        this.$EventBus.$emit(EV.BREADCRUMB_CHANGED, {});
        this.$forceUpdate()
      },


    },
  }
</script>

<style scoped>

</style>
