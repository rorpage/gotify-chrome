'use strict';

gotify.onResponse = function (status, body, done) {
    if (status == 200) {
        try {
            done(JSON.parse(body));
        } catch (e) {
            done();
        }
    } else if (status === 401) {
        // sign out
    } else if (status === 400) {
        try {
            done(null, JSON.parse(body).error);
        } catch (e) {
            done();
        }
    } else {
        done();
    }
};

gotify.buildXhr = function (method, url, done) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('X-User-Agent', 'Gotify Chrome');

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            gotify.onResponse(xhr.status, xhr.responseText, done);
        }
    };

    return xhr;
}

gotify.postToApi = function (url, object, done) {
    chrome.storage.sync.get({
        app_token: null
    }, function (items) {
        if (items.app_token === null || items.app_token === '') {
            Materialize.toast('No app token configured. Please set one in Options.', 4000);
        } else {
            var xhr = gotify.buildXhr('POST', url + '?token=' + items.app_token, done);
            xhr.send(object);
        }
    });
};

gotify.postMessage = function (object, done) {
    chrome.storage.sync.get({
        gotify_url: null
    }, function (items) {
        if (items.gotify_url === null || items.gotify_url === '') {
            Materialize.toast('No Gotify URL configured. Please set one in Options.', 4000);
        } else {
            gotify.postToApi(items.gotify_url, object, done);
        }
    });
};