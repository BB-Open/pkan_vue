<template>
  <div class="breadcrumb hidesmallscreen" aria-label="Pfadangabe">
    <div><span class="describer">Sie sind hier: </span>
      <span v-for="item in breadcrumb_elements">
        <span v-if="item !== '/'"> <i class="fa fa-caret-right"></i> </span>
        <span v-if="breadcrumb_clear[item].url"><nuxt-link class="" :to="breadcrumb_clear[item].url">{{breadcrumb_clear[item].title}}</nuxt-link></span>
        <span v-if="!breadcrumb_clear[item].url">{{breadcrumb_clear[item].title}}</span>
      </span>

    </div>
  </div>
</template>

<script>
  import {TITLES_FOR_BREADCRUMB} from "../../configs/routing";
  import {id_to_store_id, remove_element_from_array} from "../../mixins/utils";
  import {VUEX_NAMESPACE} from "../../../store/breadcrumb";
  import SimpleViewElement from "../../mixins/SimpleViewElement";

  export default {
    name: "Breadcrumb",
    created() {
      this.vuex_ns = VUEX_NAMESPACE;
      this.vuex_prop = 'titles';
    },
    mixins: [SimpleViewElement],
    computed: {
      breadcrumb_elements: function () {
        if (this.$route.path.includes('simple_view')){
          return this.get_simple_view_breadcrumb_elements()
        }
        let elements = this.$route.path.split('/');
        let paths = [];
        let path = '';
        elements.forEach(
          function (item) {
            if (path.length > 0 && item === '') {
              return
            }
            path += item;
            path += '/';

            paths.push(path)

          }, this);
        paths = remove_element_from_array(paths, '//');
        return paths
      },
      breadcrumb_clear: function () {
        let clean_breadcrumbs = {};
        let elements = this.breadcrumb_elements;

        elements.forEach(
          function (item) {
            let url = item;
            let title = null;

            if (item in TITLES_FOR_BREADCRUMB) {
              title = TITLES_FOR_BREADCRUMB[item]
            } else {
              let getter = this.vuex_ns + '/' + this.vuex_prop + '@' + id_to_store_id(item);
              title = this.$store.get(getter);
            }

            clean_breadcrumbs[item] =  {
              'url': url,
              'title': title
            }

          }, this);
        return clean_breadcrumbs
      }
    },
  }
</script>

<style scoped>
  .describer {
    color: #C73C35;
    font-weight: bold;
  }

  .breadcrumb a {
    color: #161616;
    text-decoration: unset;
  }

  .breadcrumb a:hover, .breadcrumb a:active, .breadcrumb a:focus {
    background-color: unset;
    color: #C73C35;
  }

  .breadcrumb {
    font-size: 0.8125rem;
  }

  .breadcrumb p {
    margin-bottom: 0;
  }
</style>
