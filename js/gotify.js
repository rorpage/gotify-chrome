'use strict';

var gotify = {};
gotify.currentPayload = {};

gotify.log = function (message) {
    var line;
    if (message instanceof Object || message instanceof Array) {
        line = message;
    } else {
        line = new Date().toLocaleString() + ' - ' + message;
    }

    console.log(line);
};

gotify.buildMessageObject = function (title, message) {
    if (title === null || title === '') {
        return 'message=' + message + '&priority=5';
    }

    return 'title=' + title + '&message=' + message + '&priority=5';
};