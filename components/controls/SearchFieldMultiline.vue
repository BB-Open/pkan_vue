<template>
  <form @submit.prevent="">
    <label class="textsearch">
      <div class="textsearch_label">{{label}}</div>
      <textarea class="textsearch_area" v-model="search_string" :placeholder="place_holder" :rows="rows" aria-describedby="help" :aria-label="label"></textarea>
      <div class="input_button">
        <button
          @click="filter_criteria()"
          class="button textsearch_button"
          type="submit" :title="button_label">
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
               width="30" height="30"
               viewBox="0 0 172 172"
               style=" fill:#000000;"
               role="img"
               aria-label="Suchen"
          >
            <g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt"
               stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0"
               font-family="none"
               font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal">
              <path d="M0,172v-172h172v172z" fill="none"></path>
              <g fill="#c73c35">
                <path
                  d="M11.99038,6.61538c-2.92007,0 -5.375,2.40324 -5.375,5.375v148.01923c0,2.97176 2.45493,5.375 5.375,5.375h148.01923c2.92007,0 5.375,-2.40324 5.375,-5.375v-148.01923c0,-2.97176 -2.45493,-5.375 -5.375,-5.375zM72.76923,33.07692c21.91346,0 39.69231,17.77885 39.69231,39.69231c0,8.57933 -2.81671,16.46094 -7.44231,22.94712l34.73077,34.52404c0.82692,0.80108 0.67188,3.25601 -2.89423,6.82212c-3.5661,3.56611 -5.6851,3.61779 -6.61538,2.6875c-0.93029,-0.93029 -34.52404,-34.73077 -34.52404,-34.73077c-6.48618,4.6256 -14.36779,7.44231 -22.94712,7.44231c-21.91346,0 -39.69231,-17.77885 -39.69231,-39.69231c0,-21.91346 17.77885,-39.69231 39.69231,-39.69231zM72.76923,46.30769c-14.6262,0 -26.46154,11.83534 -26.46154,26.46154c0,14.62621 11.83534,26.46154 26.46154,26.46154c14.62621,0 26.46154,-11.83533 26.46154,-26.46154c0,-14.6262 -11.83533,-26.46154 -26.46154,-26.46154z"></path>
              </g>
            </g>
          </svg>
        </button>
      </div>

    </label>
    <div class="help" id="help">{{help}}</div>
  </form>
</template>

<script>
  import {sync} from "vuex-pathify";

  export default {
    name: 'SearchFieldMulitline',
    props: ['vuex_ns', 'vuex_prop', 'place_holder', 'vuex_ns', 'next_view', 'rows', 'button_label', 'label', 'help'],
    components: {},
    computed: {
      /* Caution! Here the value of the VUEX_store has to be hard coded since the
      sync statement is run at compile time. There is no "this" at this time.
      With the colon-syntax :vuex_prop pathify will generate a reference to
      this.vuex_prop. But the name of the store to use must be hard coded as string.
      */
      search_string : sync('search_sparql/:vuex_prop')
    },
    methods: {
      filter_criteria() {
        if (this.search_string === '') {
        } else {
          if (this.$route.path !== this.next_view) {
            this.$router.push(this.next_view);
          }
        }
      },
    },
  }
</script>

<style scoped>
  .textsearch {
    display: table;
    width: 100%;
    margin-bottom: 1rem;
    height: 100px
  }

  .textsearch_label {
    width: 100%;
  }

  .textsearch_area {
    margin: 0;
    white-space: nowrap;
    display: table-cell;
    vertical-align: middle;
    padding-left: 5px;
    width: 100%;
  }

  .textsearch_button {
    width: 30px;
    height: 100px;
    vertical-align: center;
    background-color: white;
  }

  .input_button {
    display: table-cell;
    padding: 0;
    text-align: center;
    height: 100%;
    width: 1%;
    margin: 0;
    white-space: nowrap;
    vertical-align: middle;
  }

  .input_button button {
    margin: 0;
    padding: 0;
  }

</style>
