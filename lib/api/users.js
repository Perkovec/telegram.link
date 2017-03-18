// Dependencies:
var api = require('../api');
var utility = require('../utility');


// ***

// This module wraps API methods required to manage the messages.

// See [Api Methods](https://core.telegram.org/methods#working-with-messages)

// Access only via Client object (like client.messages) and `messages` instance property

function Users(client) {
    this.client = client;
}

Users.prototype.getUsers = (id, callback) => {
    return utility.callService(api.service.users.getUsers, this.client, this.client._channel, callback, arguments);
}
Users.prototype.getFullUser = (id, callback) => {
    return utility.callService(api.service.users.getFullUser, this.client, this.client._channel, callback, arguments);
}

// Export the class.
module.exports = exports = Users;