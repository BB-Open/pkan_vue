<script>
  import {v1} from 'uuid'

  export default {
    name: 'SocketPromise',
    static: function () {
      return {
        namespaces: new Map([]),
        requests: new Map([])
      }
    },
    methods: {
      // send a request and returns a promise which delivers the response
      sendPromise: function (namespace, params) {
        // construct the request
        let request = {
          namespace: namespace,
          params: params,
          transaction_id: v1()
        };
        // return the promise
        return new Promise((function (resolve, reject) {

//          this.$log.debug(this);
          // check is namespace is already subscribed
          if (this.$static.namespaces.has(namespace)) {
            this.$log.debug('Namespace: ' + namespace + ' already registered');
          } else {
            this.$log.debug('Register namespace: ' + namespace);
            // subscribe resolve handler of the promise to the namespace
            this.sockets.subscribe(namespace, this.getResponse);
            // memoize the namespace
            this.$static.namespaces.set(namespace, namespace);
          }
          // send the request
          try {
            this.$static.requests.set(request.transaction_id, resolve);
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
        try {
          response = JSON.parse(json_response);
        } catch (error) {
          this.$log.error(error);
          return;
        }

        this.sockets.unsubscribe(response.namespace);

        // retrieve the transaction_id from the response
        // and call the resolve function of the promise with the response
        let resolve = this.$static.requests.get(response.transaction_id);
        resolve(response);
        this.$static.requests.delete(response.transaction_id);
      }
    }
  }
</script>
