/*
 *  global notification manager, used to communicate between components
 *  that don't really need to talk to eachother. you can think of this
 *  as a fancy producer / consumer object
 */

class GlobalNotificationManager {
  constructor() {
    this.topics = {}
  }

  _createTopicIfNotExists(topic) {
    if (!(topic in this.topics)) {
      this.topics[topic] = [];
    }
  }

  // Takes in a topic to listen to and a listener, who will be sent
  // notifications when a new message arrives. Listener should be a 
  // function that can be called _with_ the message that is sent.
  subscribe(topic, listener) {
    this._createTopicIfNotExists(topic);
    this.topics[topic].push(listener);
  }

  push(topic, message) {
    this._createTopicIfNotExists(topic);

    // Send message to all listener.
    this.topics[topic].forEach(listener => {
      listener(message);
    });
  }

  sendAlert(message, negative=true) {
    this.push('alert', { msg: message, ok: negative })
  }
}

export default GlobalNotificationManager = new GlobalNotificationManager();
