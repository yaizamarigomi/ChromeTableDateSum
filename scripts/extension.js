document.addEventListener('DOMContentLoaded', function() {
    var button = document.getElementById('comprobar');
    button.addEventListener('click', function () {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {data: "start"}, function(response) {
                $('#content').html(response["table_data"]);
            });
        });
    });
});

