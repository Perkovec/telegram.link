// Dependencies:
var api = require('../api');
var utility = require('../utility');


// ***

// This module wraps API methods required to manage the messages.

// See [Api Methods](https://core.telegram.org/methods#working-with-messages)

// Access only via Client object (like client.messages) and `messages` instance property

function Upload(client) {
    this.client = client;
}

Upload.prototype.saveFilePart = (file_id, file_part, bytes, callback) => {
    return utility.callService(api.service.upload.saveFilePart, this.client, this.client._channel, callback, arguments);
}
Upload.prototype.getFile = (location, offset, limit, callback) => {
    return utility.callService(api.service.upload.getFile, this.client, this.client._channel, callback, arguments);
}
Upload.prototype.saveBigFilePart = (file_id, file_part, file_total_parts, bytes, callback) => {
    return utility.callService(api.service.upload.saveBigFilePart, this.client, this.client._channel, callback, arguments);
}

// Export the class.
module.exports = exports = Upload;