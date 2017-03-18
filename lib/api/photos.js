// Dependencies:
var api = require('../api');
var utility = require('../utility');


// ***

// This module wraps API methods required to manage the messages.

// See [Api Methods](https://core.telegram.org/methods#working-with-messages)

// Access only via Client object (like client.messages) and `messages` instance property

function Photos(client) {
    this.client = client;
}

Photos.prototype.updateProfilePhoto = (id, callback) => {
    return utility.callService(api.service.photos.updateProfilePhoto, this.client, this.client._channel, callback, arguments);
}
Photos.prototype.uploadProfilePhoto = (file, callback) => {
    return utility.callService(api.service.photos.uploadProfilePhoto, this.client, this.client._channel, callback, arguments);
}
Photos.prototype.deletePhotos = (id, callback) => {
    return utility.callService(api.service.photos.deletePhotos, this.client, this.client._channel, callback, arguments);
}
Photos.prototype.getUserPhotos = (user_id, offset, max_id, limit, callback) => {
    return utility.callService(api.service.photos.getUserPhotos, this.client, this.client._channel, callback, arguments);
}

// Export the class.
module.exports = exports = Photos;