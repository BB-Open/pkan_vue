<template>
  <div class="SearchSelector">
    <h2>{{ title }}</h2>
    <input type="text" v-model="search_string" placeholder="Kriterien durchsuchen" @change="filter_criteria">
    <div  class="criteria_buttons">
      <button v-for="item in display_values" @click="button_clicked(item)" v-bind:class="{ button_add: data_store[item].check_add, button_remove: data_store[item].check_remove}">
        {{ item }}
      </button><button v-for="item in additional_values" @click="button_clicked(item)" v-bind:class="{ button_add: data_store[item].check_add, button_remove: data_store[item].check_remove}" v-if="show_more || data_store[item].check_add || data_store[item].check_remove">
        {{ item}}
      </button>
    </div>


    <div>
    <button @click="show_more = !show_more" v-if="additional_values.length > 0">
      <template v-if="!show_more">ᐁ Show More</template>
      <template v-if="show_more">ᐃ Hide</template>
    </button>
    </div>
    <!--this is just for seeing some results-->
    <h2>Your selections</h2>
    <h3>Selected Check Add:</h3>
    <ul>
      <li v-for="item in values_add">
        {{ item }}
      </li>
    </ul>
    <h3>Selected Check Remove:</h3>
    <ul>
      <li v-for="item in values_remove">
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script>
  import {remove_element_from_array} from '../mixins/utils';

  // todo, this is just an viewable prototype, has to be included to States and Backend and Eventhandling
  export default {
    name: 'SearchSelector',
    props: ['title', 'options'],
    components: {
    },
    data() {
      return {
        values: [],
        data_store: {},
        number_displayed: 8,
        values_add: [],
        values_remove: [],
        show_more: false,
        display_values: [],
        additional_values: [],
        search_string: '',
      }
    },
    mounted() {
      // Force the initialization
      if (this.options.values !== undefined) {
        this.values = this.options.values;
        this.options.values.forEach(
          function (item) {
            this.data_store[item] = {
              check_add: false,
              check_remove: false,
            };
          }, this)
      }

      if (this.options.number_displayed !== undefined) {
        this.number_displayed = this.options.number_displayed
      }

      this.set_values_for_widget()

    }
    ,
    methods: {
      button_clicked(item) {
        // todo: in second loop are items inverted. Why?
        let store = this.data_store[item];
        if (store.check_add === false && store.check_remove === false) {
          store.check_add = true;
          store.check_remove = false;
          this.values_remove = remove_element_from_array(this.values_remove, item);
          this.values_add.push(item)
        } else if (store.check_remove === false && store.check_add === true) {
          store.check_add = false;
          store.check_remove = true;
          this.values_add = remove_element_from_array(this.values_add, item);
          this.values_remove.push(item)
        } else if  (store.check_remove === true && store.check_add === false){
          store.check_add = false;
          store.check_remove = false;
          this.values_add = remove_element_from_array(this.values_add, item);
          this.values_remove = remove_element_from_array(this.values_remove, item);
        }
        this.data_store[item] = store;
      },
      set_values_for_widget() {
        this.display_values = this.values.slice(0, this.number_displayed);
        this.additional_values = this.values.slice(this.number_displayed, this.values.length)
      },
      filter_criteria() {
        if (this.search_string === '' || this.search_string === undefined){
          this.values = this.options.values
        } else {
          let search = this.search_string.toLowerCase();
          this.values = [];
          this.options.values.forEach(
            function (item) {
              let compare = item.toLowerCase();
              let store = this.data_store[item];
              if (compare.includes(search)){
                this.values.push(item)
              } else if (store.check_remove || store.check_add) {
                this.values.push(item)
              }
            }, this)
        }
        this.set_values_for_widget()
      }

    },
  }
</script>

<style scoped>

  .button_add {
    background-color: #4CAF50;
  }

  .button_remove {
    background-color: #e50018;
  }

  .criteria_buttons {

  }

</style>
