// Saves options to chrome.storage

$(function(){
    chrome.storage.sync.get(
        {
            'lunes': "8.8",
            'martes': "8.8",
            'miercoles': "8.8",
            'jueves': "8.8",
            'viernes': "6"
        }
    , function (items) {
        $('#lunes').val(items.lunes);
        $('#martes').val(items.martes);
        $('#miercoles').val(items.miercoles);
        $('#jueves').val(items.jueves);
        $('#viernes').val(items.viernes);
    });

    $('#save').click(function(){
        var lunes = $('#lunes').val();
        var martes = $('#martes').val();
        var miercoles = $('#miercoles').val();
        var jueves = $('#jueves').val();
        var viernes = $('#viernes').val();

        chrome.storage.sync.set({
            'lunes': lunes,
            'martes': martes,
            'miercoles': miercoles,
            'jueves': jueves,
            'viernes': viernes
        }, function () {
            close();
        });
    })

})



/*


function save_options() {
    var lunes = document.getElementById('lunes').value;
    var martes = document.getElementById('martes').value;
    var miercoles = document.getElementById('miercoles').value;
    var jueves = document.getElementById('jueves').value;
    var viernes = document.getElementById('viernes').value;

    console.log(lunes);
    alert(lunes);

    chrome.storage.sync.set({
        'lunes': lunes,
        'martes': martes,
        'miercoles': miercoles,
        'jueves': jueves,
        'viernes': viernes
    }, function () {
        // Update status to let user know options were saved.
        //close();
        console.log("nose")
        //var status = document.getElementById('status');
        //status.innerText = 'Options saved.';
    });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
    // Use default value color = 'red' and likesColor = true.
    chrome.storage.sync.get(
        ['lunes', 'martes', 'miercoles', 'jueves', 'viernes']
    , function (items) {
        document.getElementById('lunes').value = items.lunes;
        document.getElementById('martes').value = items.martes;
        document.getElementById('miercoles').value = items.miercoles;
        document.getElementById('jueves').value = items.jueves;
        document.getElementById('viernes').value = items.viernes;
    });
}
*/

//document.getElementById('save').addEventListener('click', save_options);