//     telegram.link
//     Copyright 2014 Enrico Stara 'enrico.stara@gmail.com'
//     Released under the MIT License
//     http://telegram.link


// Dependencies:
var api = require('../api');
var utility = require('../utility');


// ***

// This module wraps API methods required to manage notifications and settings

// See [Api Methods](https://core.telegram.org/methods#working-with-notifications-settings)

// Access only via Client object (like client.account) and `account` instance property

function Account(client) {
    this.client = client;
}

/*
// ***

// **Event: **`'method name'`

// Each of the following methods emits an event with the same name when done, an `error` event otherwise.


// ***
// account.**updateStatus(offline, [callback])**

// Return a Promise to update the online user status..

// [Click here for more details](https://core.telegram.org/method/account.updateStatus)

// The code:
Account.prototype.updateStatus = function (offline, callback) {

    offline = offline === false ? new api.type.BoolFalse() :
        ( offline === true ? new api.type.BoolTrue() : offline);

    return utility.callService(api.service.account.updateStatus, this.client, this.client._channel, callback, arguments);
};

// ***
// account.**getPassword([callback])**

// Return a Promise to get password

// [Click here for more details](https://core.telegram.org/method/account.getPassword)

// The code:
Account.prototype.getPassword = function (callback) {
  return utility.callService(api.service.account.getPassword, this.client, this.client._channel, callback, arguments);
};

Account.prototype.getAuthorizations = function (callback) {
  return utility.callService(api.service.account.getAuthorizations, this.client, this.client._channel, callback, arguments);
};
*/

Account.prototype.registerDevice = (token_type, token, callback) => {
    return utility.callService(api.service.account.registerDevice, this.client, this.client._channel, callback, arguments);
}
Account.prototype.unregisterDevice = (token_type, token, callback) => {
    return utility.callService(api.service.account.unregisterDevice, this.client, this.client._channel, callback, arguments);
}
Account.prototype.updateNotifySettings = (peer, settings, callback) => {
    return utility.callService(api.service.account.updateNotifySettings, this.client, this.client._channel, callback, arguments);
}
Account.prototype.getNotifySettings = (peer, callback) => {
    return utility.callService(api.service.account.getNotifySettings, this.client, this.client._channel, callback, arguments);
}
Account.prototype.resetNotifySettings = (callback) => {
    return utility.callService(api.service.account.resetNotifySettings, this.client, this.client._channel, callback, arguments);
}
Account.prototype.updateProfile = (flags, first_name, last_name, about, callback) => {
    return utility.callService(api.service.account.updateProfile, this.client, this.client._channel, callback, arguments);
}
Account.prototype.updateStatus = (offline, callback) => {
    return utility.callService(api.service.account.updateStatus, this.client, this.client._channel, callback, arguments);
}
Account.prototype.getWallPapers = (callback) => {
    return utility.callService(api.service.account.getWallPapers, this.client, this.client._channel, callback, arguments);
}
Account.prototype.reportPeer = (peer, reason, callback) => {
    return utility.callService(api.service.account.reportPeer, this.client, this.client._channel, callback, arguments);
}
Account.prototype.checkUsername = (username, callback) => {
    return utility.callService(api.service.account.checkUsername, this.client, this.client._channel, callback, arguments);
}
Account.prototype.updateUsername = (username, callback) => {
    return utility.callService(api.service.account.updateUsername, this.client, this.client._channel, callback, arguments);
}
Account.prototype.getPrivacy = (key, callback) => {
    return utility.callService(api.service.account.getPrivacy, this.client, this.client._channel, callback, arguments);
}
Account.prototype.setPrivacy = (key, rules, callback) => {
    return utility.callService(api.service.account.setPrivacy, this.client, this.client._channel, callback, arguments);
}
Account.prototype.deleteAccount = (reason, callback) => {
    return utility.callService(api.service.account.deleteAccount, this.client, this.client._channel, callback, arguments);
}
Account.prototype.getAccountTTL = (callback) => {
    return utility.callService(api.service.account.getAccountTTL, this.client, this.client._channel, callback, arguments);
}
Account.prototype.setAccountTTL = (ttl, callback) => {
    return utility.callService(api.service.account.setAccountTTL, this.client, this.client._channel, callback, arguments);
}
Account.prototype.sendChangePhoneCode = (flags, allow_flashcall, phone_number, current_number, callback) => {
    return utility.callService(api.service.account.sendChangePhoneCode, this.client, this.client._channel, callback, arguments);
}
Account.prototype.changePhone = (phone_number, phone_code_hash, phone_code, callback) => {
    return utility.callService(api.service.account.changePhone, this.client, this.client._channel, callback, arguments);
}
Account.prototype.updateDeviceLocked = (period, callback) => {
    return utility.callService(api.service.account.updateDeviceLocked, this.client, this.client._channel, callback, arguments);
}
Account.prototype.getAuthorizations = (callback) => {
    return utility.callService(api.service.account.getAuthorizations, this.client, this.client._channel, callback, arguments);
}
Account.prototype.resetAuthorization = (hash, callback) => {
    return utility.callService(api.service.account.resetAuthorization, this.client, this.client._channel, callback, arguments);
}
Account.prototype.getPassword = (callback) => {
    return utility.callService(api.service.account.getPassword, this.client, this.client._channel, callback, arguments);
}
Account.prototype.getPasswordSettings = (current_password_hash, callback) => {
    return utility.callService(api.service.account.getPasswordSettings, this.client, this.client._channel, callback, arguments);
}
Account.prototype.updatePasswordSettings = (current_password_hash, new_settings, callback) => {
    return utility.callService(api.service.account.updatePasswordSettings, this.client, this.client._channel, callback, arguments);
}
Account.prototype.sendConfirmPhoneCode = (flags, allow_flashcall, hash, current_number, callback) => {
    return utility.callService(api.service.account.sendConfirmPhoneCode, this.client, this.client._channel, callback, arguments);
}
Account.prototype.confirmPhone = (phone_code_hash, phone_code, callback) => {
    return utility.callService(api.service.account.confirmPhone, this.client, this.client._channel, callback, arguments);
}

// Exports the class
module.exports = exports = Account;
