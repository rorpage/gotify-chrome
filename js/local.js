'use strict';

gotify.getArrayFromLocalStorage = function (key) {
    var storedArray = localStorage.getItem(key);
    return storedArray === null ? [] : JSON.parse(storedArray);
};

gotify.saveArrayToLocalStorage = function (key, value) {
    localStorage.setItem(key, JSON.stringify(value));
};

gotify.setGcmRegistered = function () {
    localStorage.setItem(GCM_REGISTERED, 'true');
};

gotify.isGcmRegistered = function () {
    return localStorage.getItem(GCM_REGISTERED);
};

gotify.getRecipients = function () {
    return gotify.getArrayFromLocalStorage(USER_RECIPIENTS);
};

gotify.setRecipients = function (recipients) {
    gotify.saveArrayToLocalStorage(USER_RECIPIENTS, recipients);
};