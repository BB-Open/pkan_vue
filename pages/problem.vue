<template>
  <base-view :vuex_ns="name" :display_search="true">
    <template slot="content">
      <h1>Fehler melden</h1>
      <div class="portalMessage info" v-if="info">
        <div>Info</div>
        <div>{{info}}</div>
      </div>
      <form @submit.prevent="">
        <label class="textsearch">
          <div class="textsearch_label">{{label}}</div>
          <textarea class="textsearch_area_problem" v-model="message" :placeholder="place_holder" :rows="rows" aria-describedby="help" :aria-label="label"></textarea>
          <div class="input_button">
            <button
              @click="send_message()"
              class="button textsearch_button"
              type="submit" :title="button_label">
              {{button_label}}
            </button>
          </div>

        </label>
        <div class="help hidden_help_text" id="help">{{help}}</div>
      </form>
    </template>
  </base-view>
</template>

<script>
  import BaseView from '../components/page/views/BaseView';
  import {get_flask_data, write_aria_polite} from "../components/mixins/utils";
  import {REQUEST_SEND_MESSAGE} from "../components/configs/socket";
  import {server_settings} from "../components/configs/server_settings";

  export default {
    name: 'problem',
    components: {
      BaseView,

    },
    data() {
      return {
        name: this.name,
        label: 'Ihre Nachricht',
        message: '',
        place_holder: 'Geben Sie Ihre Nachricht ein',
        rows: 8,
        help: 'Mit diesem Formular können Sie Fehler auf der Seite melden. Fügen Sie dazu eine Beschreibung des Problems in das Textfeld ein',
        button_label: 'Fehler senden',
        info: '',
      }
    },
    mounted() {
      this.$log.debug(this.name + ' mounted');
    },
    methods: {
      async send_message() {
        let message = this.message;
        let from_obj = this.$nuxt.context.from;
        let link = server_settings.MY_URL + from_obj.fullPath;
        let response = await get_flask_data(this, REQUEST_SEND_MESSAGE, {message: message, link: link});
        write_aria_polite(this, 'Ihre Nachricht wurde gesendet.');
        this.message = '';
        this.info = 'Ihre Nachricht wurde gesendet.';
        return response
      }
      },

  }
</script>

<style scoped>


</style>
