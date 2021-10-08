var storageCache = {};
chrome.storage.sync.get(null, function(data) {
  storageCache = data;
});


chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    var data = request.data || {};

    var table = document.getElementsByTagName('table')[0];

    var fecha;
    var horas;

    var datos = new Map()
    for (var r = 1, n = table.rows.length; r < n; r++) {
        fecha = table.rows[r].cells[0].innerText;
        horas = table.rows[r].cells[1].innerText;
        horas = parseFloat(horas);
        if (!datos.has(fecha)) {
            datos.set(fecha, horas);
        } else {
            datos.set(fecha, datos.get(fecha) + horas);
        }
    }

    sendResponse({ table_data: createTable(datos).innerHTML, data: data, success: true });
});


function comprobarFecha(fecha, horas) {

    var numDia = fecha.getDay();
    var lunes, martes, miercoles, jueves, viernes;
    var result = "✘";

    lunes = parseFloat(storageCache.lunes);
    martes = parseFloat(storageCache.martes);
    miercoles = parseFloat(storageCache.miercoles);
    jueves = parseFloat(storageCache.jueves);
    viernes = parseFloat(storageCache.viernes);

    if ((numDia == 1) && (horas == lunes)) {
        result = "✔";
    } else if ((numDia == 2) && (horas == martes)) {
        result = "✔";
    } else if ((numDia == 3) && (horas == miercoles)) {
        result = "✔";
    } else if ((numDia == 4) && (horas == jueves)) {
        result = "✔";
    } else if ((numDia == 5) && (horas == viernes)) {
        result = "✔";
    } else {
        result = "✘";
    }

    return result;
}


function createTable(datos) {
    var table = document.createElement('table');

    for (const [key, value] of datos.entries()) {

        var tr = document.createElement('tr');

        var tdFecha = document.createElement('td');
        var tdHoras = document.createElement('td');
        var tdResult = document.createElement('td');

        var textFecha = document.createTextNode(key);
        var textHoras = document.createTextNode(value);

        var result = comprobarFecha(new Date(key), value);

        var textResult = document.createTextNode(result);

        if (result == "✘") {
            tr.style.backgroundColor = "#FFB09F";
        } else {
            tr.style.backgroundColor = "#DAF7A6";
        }

        tdFecha.appendChild(textFecha);
        tdHoras.appendChild(textHoras);
        tdResult.appendChild(textResult);

        tr.appendChild(tdFecha);
        tr.appendChild(tdHoras);
        tr.appendChild(tdResult);

        table.appendChild(tr);
    }
    return table;
}

