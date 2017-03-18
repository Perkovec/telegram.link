//     telegram.link
//     Copyright 2014 Enrico Stara 'enrico.stara@gmail.com'
//     Released under the MIT License
//     http://telegram.link


// Dependencies:
var api = require('../api');
var utility = require('../utility');


// ***

// This module wraps API methods required to manage the user contacts.

// See [Api Methods](https://core.telegram.org/methods#working-with-contacts)

// Access only via Client object (like client.contacts) and `contacts` instance property

function Contacts(client) {
    this.client = client;
}


// ***

// **Event: **`'method name'`

// Each of the following methods emits an event with the same name when done, an `error` event otherwise.


// ***
// contacts.**getContacts(hash, [callback])**

// Return a Promise to get the current user's contact list.

// [Click here for more details](https://core.telegram.org/method/contacts.getContacts)

// The code:
/*Contacts.prototype.getContacts = function (hash, callback) {
    return utility.callService(api.service.contacts.getContacts, this.client, this.client._channel, callback, arguments);
};*/

Contacts.prototype.getStatuses = (callback) => {
    return utility.callService(api.service.contacts.getStatuses, this.client, this.client._channel, callback, arguments);
}
Contacts.prototype.getContacts = (hash, callback) => {
    return utility.callService(api.service.contacts.getContacts, this.client, this.client._channel, callback, arguments);
}
Contacts.prototype.importContacts = (contacts, replace, callback) => {
    return utility.callService(api.service.contacts.importContacts, this.client, this.client._channel, callback, arguments);
}
Contacts.prototype.deleteContact = (id, callback) => {
    return utility.callService(api.service.contacts.deleteContact, this.client, this.client._channel, callback, arguments);
}
Contacts.prototype.deleteContacts = (id, callback) => {
    return utility.callService(api.service.contacts.deleteContacts, this.client, this.client._channel, callback, arguments);
}
Contacts.prototype.block = (id, callback) => {
    return utility.callService(api.service.contacts.block, this.client, this.client._channel, callback, arguments);
}
Contacts.prototype.unblock = (id, callback) => {
    return utility.callService(api.service.contacts.unblock, this.client, this.client._channel, callback, arguments);
}
Contacts.prototype.getBlocked = (offset, limit, callback) => {
    return utility.callService(api.service.contacts.getBlocked, this.client, this.client._channel, callback, arguments);
}
Contacts.prototype.exportCard = (callback) => {
    return utility.callService(api.service.contacts.exportCard, this.client, this.client._channel, callback, arguments);
}
Contacts.prototype.importCard = (export_card, callback) => {
    return utility.callService(api.service.contacts.importCard, this.client, this.client._channel, callback, arguments);
}
Contacts.prototype.search = (q, limit, callback) => {
    return utility.callService(api.service.contacts.search, this.client, this.client._channel, callback, arguments);
}
Contacts.prototype.resolveUsername = (username, callback) => {
    return utility.callService(api.service.contacts.resolveUsername, this.client, this.client._channel, callback, arguments);
}
Contacts.prototype.getTopPeers = (flags, correspondents, bots_pm, bots_inline, groups, channels, offset, limit, hash, callback) => {
    return utility.callService(api.service.contacts.getTopPeers, this.client, this.client._channel, callback, arguments);
}
Contacts.prototype.resetTopPeerRating = (category, peer, callback) => {
    return utility.callService(api.service.contacts.resetTopPeerRating, this.client, this.client._channel, callback, arguments);
}

// Export the class
module.exports = exports = Contacts;
