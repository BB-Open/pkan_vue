

<script>
  import {v1} from 'uuid'
  import {get_tag_for_namespace} from "./utils";

  export default {
    name: 'SocketPromise',
    static: function () {
      let tag = get_tag_for_namespace(this);
      let namespace_name = 'namespaces_' + tag;
      let requests_name = 'requests_' + tag;
      let data = {};
      data[namespace_name] = new Map([]);
      data[requests_name] = new Map([]);
      return data
    },
    methods: {


      // send a request and returns a promise which delivers the response
      sendPromise: function (namespace, params) {
        // construct the request
        let tag = get_tag_for_namespace(this);
        let namespace_name = 'namespaces_' + tag;
        let requests_name = 'requests_' + tag;
        
        let request = {
          namespace: namespace,
          params: params,
          transaction_id: v1()
        };
        // return the promise
        return new Promise((function (resolve, reject) {

//          this.$log.debug(this);
          // check is namespace is already subscribed
          if (this.$static[namespace_name].has(namespace)) {
            this.$log.debug('Namespace: ' + namespace + ' already registered');
          } else {
            this.$log.debug('Register namespace: ' + namespace);
            // subscribe resolve handler of the promise to the namespace
            this.sockets.subscribe(namespace, this.getResponse);
            // memoize the namespace
            this.$static[namespace_name].set(namespace, namespace);
          }
          // send the request
          try {
            if (this.$static[requests_name].has(request.transaction_id)){
              this.$log.debug('Transaction ID already in use: ' + request.transaction_id)
            }
            this.$static[requests_name].set(request.transaction_id, resolve);
            this.$socket.emit(namespace, request);
          } catch (error) {
            // if an error occures call the reject handler
            this.$log.error(error);
            reject(error)
          }
        }).bind(this))
      },
      // receives the response
      getResponse: function (json_response) {
        // Extract the metadata and the payload from the response
        let response;
        let tag = get_tag_for_namespace(this);
        let requests_name = 'requests_' + tag;
        try {
          response = JSON.parse(json_response);
        } catch (error) {
          this.$log.error(error);
          return;
        }

        this.sockets.unsubscribe(response.namespace);

        // retrieve the transaction_id from the response
        // and call the resolve function of the promise with the response
        let resolve = this.$static[requests_name].get(response.transaction_id);
        try {
          resolve(response);
        } catch (e) {
          console.log(e.message);
          console.log(e.stack)
        }

        this.$static[requests_name].delete(response.transaction_id);
      }
    }
  }
</script>
