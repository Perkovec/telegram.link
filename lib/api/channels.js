// Dependencies:
var api = require('../api');
var utility = require('../utility');


// ***

// This module wraps API methods required to the user to gain the authorization.

// See [User Authorization](https://core.telegram.org/api/auth)
// and [Api Methods](https://core.telegram.org/methods#registration-authorization)

// Access only via Client object (like client.auth) and `auth` instance property

function Channels(client) {
    this.client = client;
}

Channels.prototype.readHistory = (channel, max_id, callback) => {
    return utility.callService(api.service.channels.readHistory, this.client, this.client._channel, callback, arguments);
}
Channels.prototype.deleteMessages = (channel, id, callback) => {
    return utility.callService(api.service.channels.deleteMessages, this.client, this.client._channel, callback, arguments);
}
Channels.prototype.deleteUserHistory = (channel, user_id, callback) => {
    return utility.callService(api.service.channels.deleteUserHistory, this.client, this.client._channel, callback, arguments);
}
Channels.prototype.reportSpam = (channel, user_id, id, callback) => {
    return utility.callService(api.service.channels.reportSpam, this.client, this.client._channel, callback, arguments);
}
Channels.prototype.getMessages = (channel, id, callback) => {
    return utility.callService(api.service.channels.getMessages, this.client, this.client._channel, callback, arguments);
}
Channels.prototype.getParticipants = (channel, filter, offset, limit, callback) => {
    return utility.callService(api.service.channels.getParticipants, this.client, this.client._channel, callback, arguments);
}
Channels.prototype.getParticipant = (channel, user_id, callback) => {
    return utility.callService(api.service.channels.getParticipant, this.client, this.client._channel, callback, arguments);
}
Channels.prototype.getChannels = (id, callback) => {
    return utility.callService(api.service.channels.getChannels, this.client, this.client._channel, callback, arguments);
}
Channels.prototype.getFullChannel = (channel, callback) => {
    return utility.callService(api.service.channels.getFullChannel, this.client, this.client._channel, callback, arguments);
}
Channels.prototype.createChannel = (flags, broadcast, megagroup, title, about, callback) => {
    return utility.callService(api.service.channels.createChannel, this.client, this.client._channel, callback, arguments);
}
Channels.prototype.editAbout = (channel, about, callback) => {
    return utility.callService(api.service.channels.editAbout, this.client, this.client._channel, callback, arguments);
}
Channels.prototype.editAdmin = (channel, user_id, role, callback) => {
    return utility.callService(api.service.channels.editAdmin, this.client, this.client._channel, callback, arguments);
}
Channels.prototype.editTitle = (channel, title, callback) => {
    return utility.callService(api.service.channels.editTitle, this.client, this.client._channel, callback, arguments);
}
Channels.prototype.editPhoto = (channel, photo, callback) => {
    return utility.callService(api.service.channels.editPhoto, this.client, this.client._channel, callback, arguments);
}
Channels.prototype.checkUsername = (channel, username, callback) => {
    return utility.callService(api.service.channels.checkUsername, this.client, this.client._channel, callback, arguments);
}
Channels.prototype.updateUsername = (channel, username, callback) => {
    return utility.callService(api.service.channels.updateUsername, this.client, this.client._channel, callback, arguments);
}
Channels.prototype.joinChannel = (channel, callback) => {
    return utility.callService(api.service.channels.joinChannel, this.client, this.client._channel, callback, arguments);
}
Channels.prototype.leaveChannel = (channel, callback) => {
    return utility.callService(api.service.channels.leaveChannel, this.client, this.client._channel, callback, arguments);
}
Channels.prototype.inviteToChannel = (channel, users, callback) => {
    return utility.callService(api.service.channels.inviteToChannel, this.client, this.client._channel, callback, arguments);
}
Channels.prototype.kickFromChannel = (channel, user_id, kicked, callback) => {
    return utility.callService(api.service.channels.kickFromChannel, this.client, this.client._channel, callback, arguments);
}
Channels.prototype.exportInvite = (channel, callback) => {
    return utility.callService(api.service.channels.exportInvite, this.client, this.client._channel, callback, arguments);
}
Channels.prototype.deleteChannel = (channel, callback) => {
    return utility.callService(api.service.channels.deleteChannel, this.client, this.client._channel, callback, arguments);
}
Channels.prototype.toggleInvites = (channel, enabled, callback) => {
    return utility.callService(api.service.channels.toggleInvites, this.client, this.client._channel, callback, arguments);
}
Channels.prototype.exportMessageLink = (channel, id, callback) => {
    return utility.callService(api.service.channels.exportMessageLink, this.client, this.client._channel, callback, arguments);
}
Channels.prototype.toggleSignatures = (channel, enabled, callback) => {
    return utility.callService(api.service.channels.toggleSignatures, this.client, this.client._channel, callback, arguments);
}
Channels.prototype.updatePinnedMessage = (flags, silent, channel, id, callback) => {
    return utility.callService(api.service.channels.updatePinnedMessage, this.client, this.client._channel, callback, arguments);
}
Channels.prototype.getAdminedPublicChannels = (callback) => {
    return utility.callService(api.service.channels.getAdminedPublicChannels, this.client, this.client._channel, callback, arguments);
}

// Export the class.
module.exports = exports = Channels;