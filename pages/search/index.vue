<template>
  <base-view :namespace="namespace" :breadcrumb="namespace">
    <template slot="content">
      <h1>Einfache Suche</h1>
      <div class="ordering box_area">
        <div v-for="item in this.vocab_ordering" class="box">
          <button
            @click="handle_click_order(item)"
            class="button"
            type="button">{{item}}
          </button>
        </div>
      </div>
      <div class="category box_area">
        <div v-for="item in this.vocab_category" class="box">
          <button
            @click="handle_click_cat(item)"
            class="button"
            type="button">{{item}}
          </button>
        </div>
      </div>
    </template>
  </base-view>
</template>

<script>
  import BaseView from '../../components/page/views/BaseView';
  import SocketPromise from '../../components/mixins/SocketPromise';
  import {SEARCH_URL} from "../../components/config";

  export default {
    name: 'Search',
    components: {
      BaseView,
    },
    mixins: [
      SocketPromise
    ],
    data() {
      return {
        vocab_ordering: [],
        vocab_category:[],
        namespace: 'Search',
      }
    },
    mounted() {
      // Force the initialization
      this.get_vocab_ordering();
      this.get_vocab_category()
    },
    methods: {
      get_vocab_ordering() {
        let request = Object.assign({}, {vocab: 'ordering'});
        return this.sendPromise('request_vocab', request)
          .then(
            this.handle_result_ordering.bind(this)
          )
      },
      get_vocab_category() {
        let request = Object.assign({}, {vocab: 'category'});
        return this.sendPromise('request_vocab', request)
          .then(
            this.handle_result_category.bind(this)
          )
      },
      handle_result_ordering(data) {
        // read result from request
        this.vocab_ordering = data.vocab;
      },
      handle_result_category(data) {
        // read result from request
        this.vocab_category = data.vocab;
      },
      handle_click_order(value) {
        this.$store.ep_commit('Search', 'order_by', value);
        this.$router.push(SEARCH_URL);
      },
      handle_click_cat(value) {
        let value_clean = {
          'value_pos': [value],
          'value_neg': []
        };
        this.$store.ep_commit('Search', 'category', value_clean);
        this.$router.push(SEARCH_URL);
      }
    }

  }
</script>

<style scoped>

</style>
