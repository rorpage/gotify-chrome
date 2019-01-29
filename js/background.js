'use strict'

gotify.getCurrentTabUrl = function (info, tab, callback, done) {
    var queryInfo = {
        active: true,
        currentWindow: true
    };

    chrome.tabs.query(queryInfo, function (tabs) {
        var tab = tabs[0];
        var object = gotify.buildMessageObject(tab.title, tab.url);
        callback(object, done);
    });
};

gotify.buildMenu = function () {
    chrome.contextMenus.create({
        title: "Send this page",
        contexts: ["page"],
        onclick: function (info, tab) {
            gotify.getCurrentTabUrl(info, tab, gotify.postMessage, function (message) {
                gotify.log('Done!');
            });
        }
    });

    chrome.contextMenus.create({
        title: "Send selected text",
        contexts: ["selection"],
        onclick: function (text) {
            var message = text.selectionText;
            var object = gotify.buildMessageObject('Selected text', message);
            gotify.postMessage(object, function () {
                gotify.log('Done!');
            });
        }
    });

    chrome.contextMenus.create({
        title: "Send image URL",
        contexts: ["image"],
        onclick: function (image) {
            var message = image.srcUrl;
            var object = gotify.buildMessageObject('Image URL', message);
            gotify.postMessage(object, function () {
                gotify.log('Done!');
            });
        }
    });

    chrome.contextMenus.create({
        title: "Send link",
        contexts: ["link"],
        onclick: function (link) {
            var message = link.linkUrl;
            var object = gotify.buildMessageObject('Link URL', message);
            gotify.postMessage(object, function () {
                gotify.log('Done!');
            });
        }
    });
};

gotify.buildMenu();