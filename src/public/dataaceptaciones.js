 $(document).ready(function() {

    const cartel = document.getElementById('cartel');
    const copiassCorreo = document.getElementById('copiacorreo');
    const options = {
        method: "GET",
    }
    let url = new Request("/get/carteles/", options);
    fetch(url)
        .then((res) => {
            return res.json();
        })
        .then((resparset) => {
            for (let i in resparset) {
                cartel.add(new Option(resparset[i].id_cartel));
            }
        })
        .catch((error) => {
            console.log(`Error processing request ${error}`);
        })
    let urlcorreo = new Request("/get/correos/", options);
    fetch(urlcorreo)
        .then((res) => {
            return res.json();
        })
        .then((resparset) => {
            for (let i in resparset.datamail) {
                copiassCorreo.add(new Option(resparset.datamail[i]));
            }
        })
        .catch((error) => {
            console.log("Error al procesar peticion " + error);
        })
    $(document).on('click', '.btn_buscar', function(e) {
        e.preventDefault();
        const codigo = document.getElementById('codigo').value;
        const nombreCe = document.getElementById('ce');
        const options = {
            method: "POST",
            body: new URLSearchParams({

                data: codigo
            }),
        }

        let url = new Request("/buscarnombrece/", options);
        fetch(url)
            .then((res) => {
                return res.json();
            })
            .then((resparset) => {
                nombreCe.value = resparset
            })
            .catch((error) => {
                console.log(`Error processing request ${error}`);
            });

    });
});