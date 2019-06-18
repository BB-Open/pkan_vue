<template>
  <base-view :namespace="namespace">
    <template slot="content">
      <plonepage></plonepage>
      <h1>{{ item.title }}</h1>
      <h2>{{ item.description}}</h2>
      <p>This is test content. Will be replaced.</p>
      <div v-html="item.text.data"></div>
    </template>
  </base-view>
</template>

<script>
  import BaseView from '../../components/page/BaseView';
  import {PLONE_URL} from "../../components/config";
  import Plonepage from "../../components/page/plone/plonepage";

  export default {
    components: {
      Plonepage,
      BaseView
    },
    data() {
      return {
        namespace: 'Blog ID',
        result: {},
        token_res: null,
        item: {
          title: '',
          description: '',
          text: {
            data: ''
          }
        },
        data_url: PLONE_URL + '/Plone/@entity?fullobjects=1&UID=',
        login_url: PLONE_URL + '/Plone/@login'
      }
    },
    mounted() {
      // Force the initialization
      this.$log.debug(this.namespace + ' mounted');
      this.$store.ep_commit('GlobalState', 'currentView', this.namespace);
      this.get_data();
    },
    methods: {
      get_data() {
        // todo: this is not nice
        let $this = this;
        let uid = this.$route.params.id;
        if (this.token_res === null) {
          this.login().then(function (res) {
            $this.token_res = res;
            $this.$log.debug(res);
            $this.request_pages($this.data_url + uid)
          });
        } else {
          this.request_pages(this.data_url + uid)
        }
      },
      async request_pages(url) {

        this.$axios.setHeader('Content-Type', 'application/json', ['get']);
        this.$axios.setHeader('Accept', 'application/json', ['get']);
        this.$axios.setHeader('Access-Control-Allow-Origin', '*', ['get']);
        this.$axios.setHeader('Authorization', 'Bearer ' + this.token_res);
        this.result = await this.$axios.$get(url);
        this.item = this.result.items[0];
        this.$log.debug(this.item);
        this.$forceUpdate()
      },


      async login() {
        let data = {
          login: "admin",
          password: "admin"
        };
        this.$axios.setHeader('Content-Type', 'application/json', ['post']);
        this.$axios.setHeader('Accept', 'application/json', ['post']);
        this.$axios.setHeader('Access-Control-Allow-Origin', '*', ['post']);
        let res = await this.$axios.$post(this.login_url, data);
        return res['token']
      }
    }

  }
</script>

<style scoped>

</style>
