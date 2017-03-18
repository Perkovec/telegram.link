//     telegram.link
//     Copyright 2014 Enrico Stara 'enrico.stara@gmail.com'
//     Released under the MIT License
//     http://telegram.link


// Dependencies:
var api = require('../api');
var utility = require('../utility');


// ***

// This module wraps API methods required to manage the messages.

// See [Api Methods](https://core.telegram.org/methods#working-with-messages)

// Access only via Client object (like client.messages) and `messages` instance property

function Messages(client) {
    this.client = client;
}

/*
// ***

// **Event: **`'method name'`

// Each of the following methods emits an event with the same name when done, an `error` event otherwise.


// ***
// messages.**getDialogs(offset, max_id, limit, [callback])**

// Return a Promise to get the current user dialog list.

// [Click here for more details](https://core.telegram.org/method/messages.getDialogs)

// The code:
Messages.prototype.getDialogs = function (offset_date, offset_id, offset_peer, limit, callback) {
    return utility.callService(api.service.messages.getDialogs, this.client, this.client._channel, callback, arguments);
};

// ***
// messages.**getHistory(peer, offset, max_id, limit, [callback])**

// Return a Promise to get the message history for a chat.

// [Click here for more details](https://core.telegram.org/method/messages.getHistory)

// Usage example (`user_id` must be a real contact id, of course):

//      var api = require('telegram.link')();
//
//      var client = api.createClient( ...
//
//      var peer = new api.type.InputPeerContact({
//           props: {
//                user_id: 12345678
//           }
//      });
//
//      client.messages.getHistory(
//           peer,
//           0, 0,
//           10  // num of messages to be returned
//      ).then(function(messages) {
//           console.log('messages:', messages.toPrintable());
//      });

// The code:
Messages.prototype.getHistory = function (peer, offset_id, offset_date, add_offset, max_id, min_id, limit, callback) {
    return utility.callService(api.service.messages.getHistory, this.client, this.client._channel, callback, arguments);
};

// ***
// messages.**readHistory(peer, max_id, offset, read_contents, [callback])**

// Return a Promise to mark the message history as read..

// [Click here for more details](https://core.telegram.org/method/messages.readHistory)


// The code:
Messages.prototype.readHistory = function (peer, max_id, offset, read_contents, callback) {

    read_contents = read_contents === false ? new api.type.BoolFalse() :
        ( read_contents === true ? new api.type.BoolTrue() : read_contents);

    return utility.callService(api.service.messages.readHistory, this.client, this.client._channel, callback, arguments);
};

// ***
// messages.**sendMessage(peer, message, random_id, [callback])**

// Return a Promise to send a message to the peer.

// [Click here for more details](https://core.telegram.org/method/messages.sendMessage)

// Usage example (`user_id` must be a real contact id, of course):

//      var api = require('telegram.link')();
//
//      var client = api.createClient( ...
//
//      var peer = new api.type.InputPeerContact({
//           props: {
//                user_id: 12345678
//           }
//      });
//
//      client.messages.sendMessage(
//           peer,
//           'My UTF8 first msg!!',
//           9876543211  // random id...,
//           2323 // message_id or null,
//           new client.type.ReplyKeyboardHide() // or any other ReplyMarkup or null,
//           new tl.TypeVector({ list: [...] }) // list of MessageEntity type or null
//      ).then(function(sentMsg) {
//           console.log('sentMsg:', sentMsg.toPrintable());
//      });

// The code:
Messages.prototype.sendMessage = function (peer, message, random_id, reply_to_msg_id, reply_markup, entities, callback) {
    return utility.callService(api.service.messages.sendMessage, this.client, this.client._channel, callback, arguments);
};
*/

Messages.prototype.getMessages = (id, callback) => {
    return utility.callService(api.service.messages.getMessages, this.client, this.client._channel, callback, arguments);
}
Messages.prototype.getDialogs = (flags, exclude_pinned, offset_date, offset_id, offset_peer, limit, callback) => {
    return utility.callService(api.service.messages.getDialogs, this.client, this.client._channel, callback, arguments);
}
Messages.prototype.getHistory = (peer, offset_id, offset_date, add_offset, limit, max_id, min_id, callback) => {
    return utility.callService(api.service.messages.getHistory, this.client, this.client._channel, callback, arguments);
}
Messages.prototype.search = (flags, peer, q, filter, min_date, max_date, offset, max_id, limit, callback) => {
    return utility.callService(api.service.messages.search, this.client, this.client._channel, callback, arguments);
}
Messages.prototype.readHistory = (peer, max_id, callback) => {
    return utility.callService(api.service.messages.readHistory, this.client, this.client._channel, callback, arguments);
}
Messages.prototype.deleteHistory = (flags, just_clear, peer, max_id, callback) => {
    return utility.callService(api.service.messages.deleteHistory, this.client, this.client._channel, callback, arguments);
}
Messages.prototype.deleteMessages = (flags, revoke, id, callback) => {
    return utility.callService(api.service.messages.deleteMessages, this.client, this.client._channel, callback, arguments);
}
Messages.prototype.receivedMessages = (max_id, callback) => {
    return utility.callService(api.service.messages.receivedMessages, this.client, this.client._channel, callback, arguments);
}
Messages.prototype.setTyping = (peer, action, callback) => {
    return utility.callService(api.service.messages.setTyping, this.client, this.client._channel, callback, arguments);
}
Messages.prototype.sendMessage = (flags, no_webpage, silent, background, clear_draft, peer, reply_to_msg_id, message, random_id, reply_markup, entities, callback) => {
    return utility.callService(api.service.messages.sendMessage, this.client, this.client._channel, callback, arguments);
}
Messages.prototype.sendMedia = (flags, silent, background, clear_draft, peer, reply_to_msg_id, media, random_id, reply_markup, callback) => {
    return utility.callService(api.service.messages.sendMedia, this.client, this.client._channel, callback, arguments);
}
Messages.prototype.forwardMessages = (flags, silent, background, with_my_score, from_peer, id, random_id, to_peer, callback) => {
    return utility.callService(api.service.messages.forwardMessages, this.client, this.client._channel, callback, arguments);
}
Messages.prototype.reportSpam = (peer, callback) => {
    return utility.callService(api.service.messages.reportSpam, this.client, this.client._channel, callback, arguments);
}
Messages.prototype.hideReportSpam = (peer, callback) => {
    return utility.callService(api.service.messages.hideReportSpam, this.client, this.client._channel, callback, arguments);
}
Messages.prototype.getPeerSettings = (peer, callback) => {
    return utility.callService(api.service.messages.getPeerSettings, this.client, this.client._channel, callback, arguments);
}
Messages.prototype.getChats = (id, callback) => {
    return utility.callService(api.service.messages.getChats, this.client, this.client._channel, callback, arguments);
}
Messages.prototype.getFullChat = (chat_id, callback) => {
    return utility.callService(api.service.messages.getFullChat, this.client, this.client._channel, callback, arguments);
}
Messages.prototype.editChatTitle = (chat_id, title, callback) => {
    return utility.callService(api.service.messages.editChatTitle, this.client, this.client._channel, callback, arguments);
}
Messages.prototype.editChatPhoto = (chat_id, photo, callback) => {
    return utility.callService(api.service.messages.editChatPhoto, this.client, this.client._channel, callback, arguments);
}
Messages.prototype.addChatUser = (chat_id, user_id, fwd_limit, callback) => {
    return utility.callService(api.service.messages.addChatUser, this.client, this.client._channel, callback, arguments);
}
Messages.prototype.deleteChatUser = (chat_id, user_id, callback) => {
    return utility.callService(api.service.messages.deleteChatUser, this.client, this.client._channel, callback, arguments);
}
Messages.prototype.createChat = (users, title, callback) => {
    return utility.callService(api.service.messages.createChat, this.client, this.client._channel, callback, arguments);
}
Messages.prototype.forwardMessage = (peer, id, random_id, callback) => {
    return utility.callService(api.service.messages.forwardMessage, this.client, this.client._channel, callback, arguments);
}
Messages.prototype.getDhConfig = (version, random_length, callback) => {
    return utility.callService(api.service.messages.getDhConfig, this.client, this.client._channel, callback, arguments);
}
Messages.prototype.requestEncryption = (user_id, random_id, g_a, callback) => {
    return utility.callService(api.service.messages.requestEncryption, this.client, this.client._channel, callback, arguments);
}
Messages.prototype.acceptEncryption = (peer, g_b, key_fingerprint, callback) => {
    return utility.callService(api.service.messages.acceptEncryption, this.client, this.client._channel, callback, arguments);
}
Messages.prototype.discardEncryption = (chat_id, callback) => {
    return utility.callService(api.service.messages.discardEncryption, this.client, this.client._channel, callback, arguments);
}
Messages.prototype.setEncryptedTyping = (peer, typing, callback) => {
    return utility.callService(api.service.messages.setEncryptedTyping, this.client, this.client._channel, callback, arguments);
}
Messages.prototype.readEncryptedHistory = (peer, max_date, callback) => {
    return utility.callService(api.service.messages.readEncryptedHistory, this.client, this.client._channel, callback, arguments);
}
Messages.prototype.sendEncrypted = (peer, random_id, data, callback) => {
    return utility.callService(api.service.messages.sendEncrypted, this.client, this.client._channel, callback, arguments);
}
Messages.prototype.sendEncryptedFile = (peer, random_id, data, file, callback) => {
    return utility.callService(api.service.messages.sendEncryptedFile, this.client, this.client._channel, callback, arguments);
}
Messages.prototype.sendEncryptedService = (peer, random_id, data, callback) => {
    return utility.callService(api.service.messages.sendEncryptedService, this.client, this.client._channel, callback, arguments);
}
Messages.prototype.receivedQueue = (max_qts, callback) => {
    return utility.callService(api.service.messages.receivedQueue, this.client, this.client._channel, callback, arguments);
}
Messages.prototype.reportEncryptedSpam = (peer, callback) => {
    return utility.callService(api.service.messages.reportEncryptedSpam, this.client, this.client._channel, callback, arguments);
}
Messages.prototype.readMessageContents = (id, callback) => {
    return utility.callService(api.service.messages.readMessageContents, this.client, this.client._channel, callback, arguments);
}
Messages.prototype.getAllStickers = (hash, callback) => {
    return utility.callService(api.service.messages.getAllStickers, this.client, this.client._channel, callback, arguments);
}
Messages.prototype.getWebPagePreview = (message, callback) => {
    return utility.callService(api.service.messages.getWebPagePreview, this.client, this.client._channel, callback, arguments);
}
Messages.prototype.exportChatInvite = (chat_id, callback) => {
    return utility.callService(api.service.messages.exportChatInvite, this.client, this.client._channel, callback, arguments);
}
Messages.prototype.checkChatInvite = (hash, callback) => {
    return utility.callService(api.service.messages.checkChatInvite, this.client, this.client._channel, callback, arguments);
}
Messages.prototype.importChatInvite = (hash, callback) => {
    return utility.callService(api.service.messages.importChatInvite, this.client, this.client._channel, callback, arguments);
}
Messages.prototype.getStickerSet = (stickerset, callback) => {
    return utility.callService(api.service.messages.getStickerSet, this.client, this.client._channel, callback, arguments);
}
Messages.prototype.installStickerSet = (stickerset, archived, callback) => {
    return utility.callService(api.service.messages.installStickerSet, this.client, this.client._channel, callback, arguments);
}
Messages.prototype.uninstallStickerSet = (stickerset, callback) => {
    return utility.callService(api.service.messages.uninstallStickerSet, this.client, this.client._channel, callback, arguments);
}
Messages.prototype.startBot = (bot, peer, random_id, start_param, callback) => {
    return utility.callService(api.service.messages.startBot, this.client, this.client._channel, callback, arguments);
}
Messages.prototype.getMessagesViews = (peer, id, increment, callback) => {
    return utility.callService(api.service.messages.getMessagesViews, this.client, this.client._channel, callback, arguments);
}
Messages.prototype.toggleChatAdmins = (chat_id, enabled, callback) => {
    return utility.callService(api.service.messages.toggleChatAdmins, this.client, this.client._channel, callback, arguments);
}
Messages.prototype.editChatAdmin = (chat_id, user_id, is_admin, callback) => {
    return utility.callService(api.service.messages.editChatAdmin, this.client, this.client._channel, callback, arguments);
}
Messages.prototype.migrateChat = (chat_id, callback) => {
    return utility.callService(api.service.messages.migrateChat, this.client, this.client._channel, callback, arguments);
}
Messages.prototype.searchGlobal = (q, offset_date, offset_peer, offset_id, limit, callback) => {
    return utility.callService(api.service.messages.searchGlobal, this.client, this.client._channel, callback, arguments);
}
Messages.prototype.reorderStickerSets = (flags, masks, order, callback) => {
    return utility.callService(api.service.messages.reorderStickerSets, this.client, this.client._channel, callback, arguments);
}
Messages.prototype.getDocumentByHash = (sha256, size, mime_type, callback) => {
    return utility.callService(api.service.messages.getDocumentByHash, this.client, this.client._channel, callback, arguments);
}
Messages.prototype.searchGifs = (q, offset, callback) => {
    return utility.callService(api.service.messages.searchGifs, this.client, this.client._channel, callback, arguments);
}
Messages.prototype.getSavedGifs = (hash, callback) => {
    return utility.callService(api.service.messages.getSavedGifs, this.client, this.client._channel, callback, arguments);
}
Messages.prototype.saveGif = (id, unsave, callback) => {
    return utility.callService(api.service.messages.saveGif, this.client, this.client._channel, callback, arguments);
}
Messages.prototype.getInlineBotResults = (flags, bot, peer, geo_point, query, offset, callback) => {
    return utility.callService(api.service.messages.getInlineBotResults, this.client, this.client._channel, callback, arguments);
}
Messages.prototype.setInlineBotResults = (flags, gallery, private, query_id, results, cache_time, next_offset, switch_pm, callback) => {
    return utility.callService(api.service.messages.setInlineBotResults, this.client, this.client._channel, callback, arguments);
}
Messages.prototype.sendInlineBotResult = (flags, silent, background, clear_draft, peer, reply_to_msg_id, random_id, query_id, id, callback) => {
    return utility.callService(api.service.messages.sendInlineBotResult, this.client, this.client._channel, callback, arguments);
}
Messages.prototype.getMessageEditData = (peer, id, callback) => {
    return utility.callService(api.service.messages.getMessageEditData, this.client, this.client._channel, callback, arguments);
}
Messages.prototype.editMessage = (flags, no_webpage, peer, id, message, reply_markup, entities, callback) => {
    return utility.callService(api.service.messages.editMessage, this.client, this.client._channel, callback, arguments);
}
Messages.prototype.editInlineBotMessage = (flags, no_webpage, id, message, reply_markup, entities, callback) => {
    return utility.callService(api.service.messages.editInlineBotMessage, this.client, this.client._channel, callback, arguments);
}
Messages.prototype.getBotCallbackAnswer = (flags, game, peer, msg_id, data, callback) => {
    return utility.callService(api.service.messages.getBotCallbackAnswer, this.client, this.client._channel, callback, arguments);
}
Messages.prototype.setBotCallbackAnswer = (flags, alert, query_id, message, url, cache_time, callback) => {
    return utility.callService(api.service.messages.setBotCallbackAnswer, this.client, this.client._channel, callback, arguments);
}
Messages.prototype.getPeerDialogs = (peers, callback) => {
    return utility.callService(api.service.messages.getPeerDialogs, this.client, this.client._channel, callback, arguments);
}
Messages.prototype.saveDraft = (flags, no_webpage, reply_to_msg_id, peer, message, entities, callback) => {
    return utility.callService(api.service.messages.saveDraft, this.client, this.client._channel, callback, arguments);
}
Messages.prototype.getAllDrafts = (callback) => {
    return utility.callService(api.service.messages.getAllDrafts, this.client, this.client._channel, callback, arguments);
}
Messages.prototype.getFeaturedStickers = (hash, callback) => {
    return utility.callService(api.service.messages.getFeaturedStickers, this.client, this.client._channel, callback, arguments);
}
Messages.prototype.readFeaturedStickers = (id, callback) => {
    return utility.callService(api.service.messages.readFeaturedStickers, this.client, this.client._channel, callback, arguments);
}
Messages.prototype.getRecentStickers = (flags, attached, hash, callback) => {
    return utility.callService(api.service.messages.getRecentStickers, this.client, this.client._channel, callback, arguments);
}
Messages.prototype.saveRecentSticker = (flags, attached, id, unsave, callback) => {
    return utility.callService(api.service.messages.saveRecentSticker, this.client, this.client._channel, callback, arguments);
}
Messages.prototype.clearRecentStickers = (flags, attached, callback) => {
    return utility.callService(api.service.messages.clearRecentStickers, this.client, this.client._channel, callback, arguments);
}
Messages.prototype.getArchivedStickers = (flags, masks, offset_id, limit, callback) => {
    return utility.callService(api.service.messages.getArchivedStickers, this.client, this.client._channel, callback, arguments);
}
Messages.prototype.getMaskStickers = (hash, callback) => {
    return utility.callService(api.service.messages.getMaskStickers, this.client, this.client._channel, callback, arguments);
}
Messages.prototype.getAttachedStickers = (media, callback) => {
    return utility.callService(api.service.messages.getAttachedStickers, this.client, this.client._channel, callback, arguments);
}
Messages.prototype.setGameScore = (flags, edit_message, force, peer, id, user_id, score, callback) => {
    return utility.callService(api.service.messages.setGameScore, this.client, this.client._channel, callback, arguments);
}
Messages.prototype.setInlineGameScore = (flags, edit_message, force, id, user_id, score, callback) => {
    return utility.callService(api.service.messages.setInlineGameScore, this.client, this.client._channel, callback, arguments);
}
Messages.prototype.getGameHighScores = (peer, id, user_id, callback) => {
    return utility.callService(api.service.messages.getGameHighScores, this.client, this.client._channel, callback, arguments);
}
Messages.prototype.getInlineGameHighScores = (id, user_id, callback) => {
    return utility.callService(api.service.messages.getInlineGameHighScores, this.client, this.client._channel, callback, arguments);
}
Messages.prototype.getCommonChats = (user_id, max_id, limit, callback) => {
    return utility.callService(api.service.messages.getCommonChats, this.client, this.client._channel, callback, arguments);
}
Messages.prototype.getAllChats = (except_ids, callback) => {
    return utility.callService(api.service.messages.getAllChats, this.client, this.client._channel, callback, arguments);
}
Messages.prototype.getWebPage = (url, hash, callback) => {
    return utility.callService(api.service.messages.getWebPage, this.client, this.client._channel, callback, arguments);
}
Messages.prototype.toggleDialogPin = (flags, pinned, peer, callback) => {
    return utility.callService(api.service.messages.toggleDialogPin, this.client, this.client._channel, callback, arguments);
}
Messages.prototype.reorderPinnedDialogs = (flags, force, order, callback) => {
    return utility.callService(api.service.messages.reorderPinnedDialogs, this.client, this.client._channel, callback, arguments);
}
Messages.prototype.getPinnedDialogs = (callback) => {
    return utility.callService(api.service.messages.getPinnedDialogs, this.client, this.client._channel, callback, arguments);
}


// Export the class.
module.exports = exports = Messages;
