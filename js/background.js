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
    var parentMenu = chrome.contextMenus.create({ "title": "Gotify" });

    chrome.contextMenus.create({
        "parentId": parentMenu,
        "title": "Push this page",
        "contexts": ["all"],
        "onclick": function (info, tab) {
            gotify.getCurrentTabUrl(info, tab, gotify.postMessage, function (message) {
                gotify.log('Done!');
            });
        }
    });
};

gotify.buildMenu();