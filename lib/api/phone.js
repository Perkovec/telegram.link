// Dependencies:
var api = require('../api');
var utility = require('../utility');


// ***

// This module wraps API methods required to manage the messages.

// See [Api Methods](https://core.telegram.org/methods#working-with-messages)

// Access only via Client object (like client.messages) and `messages` instance property

function Phone(client) {
    this.client = client;
}

Phone.prototype.requestCall = (user_id, random_id, g_a, protocol, callback) => {
    return utility.callService(api.service.phone.requestCall, this.client, this.client._channel, callback, arguments);
}
Phone.prototype.acceptCall = (peer, g_b, key_fingerprint, protocol, callback) => {
    return utility.callService(api.service.phone.acceptCall, this.client, this.client._channel, callback, arguments);
}
Phone.prototype.discardCall = (peer, duration, reason, connection_id, callback) => {
    return utility.callService(api.service.phone.discardCall, this.client, this.client._channel, callback, arguments);
}
Phone.prototype.receivedCall = (peer, callback) => {
    return utility.callService(api.service.phone.receivedCall, this.client, this.client._channel, callback, arguments);
}

// Export the class.
module.exports = exports = Phone;