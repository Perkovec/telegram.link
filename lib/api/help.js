// Dependencies:
var api = require('../api');
var utility = require('../utility');


// ***

// This module wraps API methods required to the user to gain the authorization.

// See [User Authorization](https://core.telegram.org/api/auth)
// and [Api Methods](https://core.telegram.org/methods#registration-authorization)

// Access only via Client object (like client.auth) and `auth` instance property

function Help(client) {
    this.client = client;
}

Help.prototype.getConfig = (callback) => {
    return utility.callService(api.service.help.getConfig, this.client, this.client._channel, callback, arguments);
}
Help.prototype.getNearestDc = (callback) => {
    return utility.callService(api.service.help.getNearestDc, this.client, this.client._channel, callback, arguments);
}
Help.prototype.getAppUpdate = (callback) => {
    return utility.callService(api.service.help.getAppUpdate, this.client, this.client._channel, callback, arguments);
}
Help.prototype.saveAppLog = (events, callback) => {
    return utility.callService(api.service.help.saveAppLog, this.client, this.client._channel, callback, arguments);
}
Help.prototype.getInviteText = (callback) => {
    return utility.callService(api.service.help.getInviteText, this.client, this.client._channel, callback, arguments);
}
Help.prototype.getSupport = (callback) => {
    return utility.callService(api.service.help.getSupport, this.client, this.client._channel, callback, arguments);
}
Help.prototype.getAppChangelog = (callback) => {
    return utility.callService(api.service.help.getAppChangelog, this.client, this.client._channel, callback, arguments);
}
Help.prototype.getTermsOfService = (callback) => {
    return utility.callService(api.service.help.getTermsOfService, this.client, this.client._channel, callback, arguments);
}
Help.prototype.setBotUpdatesStatus = (pending_updates_count, message, callback) => {
    return utility.callService(api.service.help.setBotUpdatesStatus, this.client, this.client._channel, callback, arguments);
}

// Export the class.
module.exports = exports = Help;