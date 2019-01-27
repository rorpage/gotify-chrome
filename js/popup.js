'use strict'

$(function () {
    $('#submit').click(function (e) {
        e.preventDefault();
        var title = $('#title').val();
        var message = $('#message').val();

        var object = gotify.buildMessageObject(title, message);
        gotify.postMessage(object, function () {
            Materialize.toast('Sent!', 4000);
        });
    });

    $('#popout-link').click(function (e) {
        e.preventDefault();
        chrome.tabs.create({ url: 'popup.html' });
    });

    $('#options-link').click(function (e) {
        e.preventDefault();
        chrome.tabs.create({ url: 'options.html' });
    });
});