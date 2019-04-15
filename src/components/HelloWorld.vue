<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>{{ number }}</p>
    <button
            @click="handle_click()"
            class="button"
            type="button">Get new Number from Socket
    </button>
  </div>
</template>

<script>
  import SocketPromise from './mixins/SocketPromise.vue'

  export default {
    name: 'HelloWorld',
    mixins: [
      SocketPromise
    ],
    data() {
      return {
        msg: 'Hello World',
        number: 0,
      }
    },
    methods: {
      handle_click() {
        // send request
        let request = Object.assign({}, {});
        return this.sendPromise('request_number', request)
          .then(
            this.handle_result.bind(this)
          )
      },
      handle_result(data) {
        // read result from request
        this.number = data.number
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
