$(function () {
    chrome.storage.sync.get({
        gotify_url: null,
        app_token: null
    }, function (items) {
        $('#gotify-url').val(items.gotify_url);
        $('#app-token').val(items.app_token);
        Materialize.updateTextFields();
    });

    $('#save-options').click(function (e) {
        e.preventDefault();

        chrome.storage.sync.set({
            gotify_url: $('#gotify-url').val(),
            app_token: $('#app-token').val()
        }, function () {
            Materialize.toast('Options saved!', 4000);
        });
    });
});