///Obtenemos el serial de losdispositivos 
$(document).ready(function() {
    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": true,
        "positionClass": "toast-top-center",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }
    $(document).on('click', '.enviar', function(e) {
        e.preventDefault();
        let nombreCe = document.getElementById('ce');
        let codigo = document.getElementById('codigo');
        let descripcion = document.getElementById('message');
        let fecha = document.getElementById('fecha');
        let tecnico = document.getElementById('tecnico');
        let estado = document.getElementById('estado');
        let cartel = document.getElementById('cartel');
        let copiaCorreo = document.getElementById('copiacorreo');
        let options = {
            method: "POST",
            body: new URLSearchParams({
                ce: nombreCe.value,
                codigo: codigo.value,
                data: descripcion.value,
                fecha: fecha.value,
                tecnico: tecnico.value,
                estado: estado.value,
                cartel: cartel.value,
                cc: copiaCorreo.value
            }),
        }

        let url = new Request("/sendmail/", options);
        fetch(url)
            .then((res) => {
                return res.json();
            })
            .then((resparset) => {
                toastr["success"](resparset);
                codigo.value = "";
                nombreCe.value = "";
                descripcion.value = "";

            })
            .catch((error) => {
                toastr["error"](error);
                console.log(`Error processing request ${error}`);
            })

    });

});