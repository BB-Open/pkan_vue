<template>
  <div>
    <ul v-if="vocab.length" class="nobull category box_area">
      <li v-for="item in vocab"
          class="box"
          :key="item.id"
          @click="handle_click(item.id)">
        <nuxt-link
          :to="url"
          class="lightbutton button vocabbutton">
          <div class="category_label">
            <div class="category_icon">
              <i v-if="item.icon_class"
                 :class="item.icon_class + ' bb-ifa'"
                 :aria-labelledby="item.id"
              ></i>
              <br v-if="item.icon_class"
                  class="hidesmallscreen"/>
            </div>
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
  import { INCLUDE } from '../configs/socket'
  import { DETAIL_SEARCH_URL } from '../configs/routing'
  import Vocab from '../mixins/Vocab'

  export default {
    name: 'VocabBox',
    mixins: [Vocab],
    props: {
      'target_ns': String,
      'target_prop': String,
      'vocab_ns': String,
      'vocab_prop': String,
      'clear_state': Boolean
    },
    created() {
      this.url = DETAIL_SEARCH_URL
    },

    methods: {

      async reset_cat(category) {
        return this.$store.commit(this.target_ns + '/' + 'SET_FILTER_STATE',
          { filter: this.target_prop, category: category, new_state: INCLUDE })
      },

      async reset_res() {
        return this.$store.commit(this.target_ns + '/' + 'RESET_SEARCH_RESULTS')
      },

      async handle_click(category) {
        let res1 = await this.reset_cat(category)
        let res2 = await this.reset_res()
        this.$log.info('Handle Click')
        this.$log.info(res1)
        this.$log.info(res2)
        this.$router.push(DETAIL_SEARCH_URL)
      }
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
