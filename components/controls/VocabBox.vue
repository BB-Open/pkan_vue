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
  import {DETAIL_SEARCH_URL} from "../configs/routing";
  import {server_settings} from "../configs/server_settings";
  import {get_flask_data} from '../mixins/utils';



  export default {
    name: "VocabBox",
    data() {
      return {
        prefetched: false,
        vuex_ns: 'Vocab Boxes',
        url: DETAIL_SEARCH_URL,
        base_data_url: server_settings.PLONE_URL,
      }
    },
    computed : {
        vocab : function () {

          return this.$store.ep_get('vocabularies/vocabularies', this.vocab_name)
        }
    },
    props: {
      'vocab_name': String,
      'clean_value': Boolean,
      'search_field': String
    },
    serverPrefetch() {
      // Force the initialization
        return this.get_vocab();
    },
    mounted() {
      // Force the initialization
      if (this.prefetched === false) {
        this.get_vocab();
      }
    },
    methods: {
      async get_vocab() {
        var response = await get_flask_data(this, REQUEST_VOCAB,  {vocab: this.vocab_name})
        return await this.handle_result(response)
      },
      handle_result(response) {
        // read result from request
        var vocab = response.vocab
        vocab.sort((a, b) => a.text.localeCompare(b.text))

        this.$store.ep_set('vocabularies/vocabularies',this.vocab_name, vocab)
        this.prefetched = true;
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
        // ToDo: This is direct coupling of components. Better fire an event.
        this.$store.set('search_detail/' + this.search_field, value_clean);
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
