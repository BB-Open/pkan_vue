<template>
    <div :class="style_class">
      <h2>Vernetzung:</h2>
      <div v-for="item in this.result" :class="element_style_class">
        <div class="element_title">{{ item.title }}</div>
        <div class="element_description">{{ item.description }}</div>
        <NuxtLink :to="get_nuxt_link(item.id)">[Mehr]</NuxtLink>
      </div>
    </div>
</template>

<script>
  import SocketPromise from "../../mixins/SocketPromise";

    export default {
      name: "sparqlnetworking",
      props: ['id', 'view_url', 'element_style_class', 'style_class',],
      data() {
        return {
          result: []
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
          return '/' + this.view_url + '/' + id
        },
        get_data() {
          let request = Object.assign({}, {id: this.id});
          return this.sendPromise('request_related_items', request)
            .then(
              this.handle_result.bind(this)
            )
        },
        handle_result(data){
          this.result = data.results;
          this.$forceUpdate()
        },


      },
    }
</script>

<style scoped>

</style>
