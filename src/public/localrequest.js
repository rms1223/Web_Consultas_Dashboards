const request_ping = document.getElementById('login');
const toolsAruba = document.getElementById('dataAruba');
const celda = document.getElementById('modelo');
const consola = document.getElementById('textconsole');
const btnSubmit = document.getElementById('btnsubmit');

$('#herramientasAruba').on('show.bs.modal', function(e) {
    var serial = $(e.relatedTarget).data('serial');
    $(e.currentTarget).find('input[name="serial"]').val(serial);
});
request_ping.addEventListener('submit', (event) => {

    btnSubmit.disabled = true;
    event.preventDefault();
    const serial_devices = document.getElementById('serial').value;
    const ip = document.getElementById('textip').value;
    const options = {
        method: "POST",
        body: new URLSearchParams({
            serial: serial_devices,
            host: ip
        }),
    }
    let url = new Request("/aruba/tool/ping/", options);
    fetch(url)
        .then((res) => {
            console.log("OK");
            return res.json();
        })
        .then((resparset) => {
            consola.value = "\t\t\t\t\tNombre Centro Educativo: " + resparset.hostname + "\nEstado de Consulta: " + resparset.status + "\n\n" + resparset.output;
        })
        .catch((error) => {
            console.log("Error al procesar peticion " + error);
        })
    btnSubmit.disabled = false;
})