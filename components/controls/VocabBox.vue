<template>
  <div>
    <ul class="nobull category box_area" v-if="vocab.length">
      <li v-for="item in vocab" class="box" :key="item.id" @click="handle_click(item.id)">
        <nuxt-link
          :to="url"
          class="lightbutton button vocabbutton">
          <div class="category_label">
            <div class="category_icon"><i :aria-labelledby="item.id" :class="item.icon_class + ' bb-ifa'"
                                          v-if="item.icon_class"></i><br v-if="item.icon_class"
                                                                         class="hidesmallscreen"/></div>
            <div class="category_text" :id="item.id">{{item.text}}</div>
          </div>
        </nuxt-link>
      </li>
    </ul>
    <div v-if="!vocab.length" class="content_container">
      <p>Hier wird eine Auswahl von Verlinkungen vom Server geladen.</p>
    </div>
  </div>
</template>

<script>
  import {REQUEST_VOCAB} from "../configs/socket";
  import SocketPromise from "../mixins/SocketPromise";
  import {DETAIL_SEARCH_URL} from "../configs/routing";
  import {server_settings} from "../configs/server_settings";

  export default {
    name: "VocabBox",
    data() {
      return {
        vocab: [],
        namespace: 'Vocab Boxes',
        url: DETAIL_SEARCH_URL
      }
    },
    mixins: [
      SocketPromise
    ],
    props: {
      'vocab_name': String,
      'clean_value': Boolean,
      'search_field': String
    },
    mounted() {
      // Force the initialization
      this.get_vocab();
    },
    methods: {
      get_vocab() {
        let request = Object.assign({}, {vocab: this.vocab_name});
        return this.sendPromise(REQUEST_VOCAB, request)
          .then(
            this.handle_result.bind(this)
          )
      },
      handle_result(data) {
        // read result from request
        this.vocab = data.vocab;
      },
      handle_click(value) {
        let value_clean;
        if (this.clean_value === true) {
          value_clean = {
            'value_pos': [value],
            'value_neg': []
          };
        } else {
          value_clean = value
        }
        this.$store.ep_commit('Search', this.search_field, value_clean);
        this.$router.push(DETAIL_SEARCH_URL);
      },
    }
  }
</script>

<style scoped>

  li.box {
    display: block;
  }

  .vocabbutton {
    width: 100%;
    height: 100%;
    padding: 15px;
  }

  a.vocabbutton {
    text-decoration: none;
    display: block;
    height: 100%;
    width: 100%;
  }

  a.vocabbutton:hover, a.vocabbutton:focus {
    background-color: #C73C35;
    color: #fff;
  }


  @media (max-width: 640px) {
    .category_label {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }

    .category_icon {
      width: 10%;
    }

    .category_text {
      width: 80%;
      margin-top: auto;
      margin-bottom: auto;
    }

    .vocabbutton {
      width: 100%;
      height: 100%;
      padding: 5px;
    }
  }

</style>
