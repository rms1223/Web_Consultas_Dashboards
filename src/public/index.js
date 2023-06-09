let map;
let markers = []
const setListener = () => {
    document.querySelectorAll(".centroseducativos_nombres_individual").forEach((cename, index) => {
        cename.addEventListener("click", () => {
            google.maps.event.trigger(markers[index], "click")
        })
    })

}
const dispplayCEList = () => {
    let CEHTML = "";
    centroseducativos.forEach(ce => {
        CEHTML += `<h4 class="centroseducativos_nombres_individual">${ce.nombre} (${ce.Codigo})</h4>`
    })
    document.getElementById("centroseducativos_nombres").innerHTML = CEHTML
}
const svg = window.btoa(`
                        <svg fill="#00B900" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240">
                        <circle cx="120" cy="120" opacity=".6" r="90" />
                        </svg>`);

const createMarker = (coord, name, count, state, codigo, cartel, proveedor, dashboard) => {
    let html = `
    <div class="window">
        <h4>${name} (${codigo})</h4>
        <div class="dataCE">
            <h5>Cartel: ${cartel}</h5>
        </div>
        <div class="dataCE">
            <h5>Dispositivos: ${count}</h5>
        </div>
        <div class="dataCE">
            <h5>Proveedor: ${proveedor}</h5>
        </div>
        <div class="dataCE">
            <h5>Sistema de Administracion: ${dashboard}</h5>
        </div>
    </div>
    
    
    `;
    let URL = ""
    switch (state) {
        case "ONLINE":
            URL = "./icons/online.png"
            break;
        case "OFFLINE":
            URL = "./icons/offline.png"
            break;
        case "ALERT":

            URL = "./icons/alert.png"
            break;
        default:
            URL = "./icons/FOD23.png"
            break;
    }
    const marker = new google.maps.Marker({
        position: coord,
        map: map,
        title: name,
        label: {
            text: `${codigo}`,
            fontSize: "8px"
        },
        icon: {
            url: `data:image/svg+xml;base64,${svg}`,
            scaledSize: new google.maps.Size(45, 45),
        },
        zIndex: 1000 + markers.length,
    })
    google.maps.event.addListener(marker, "click", () => {
        infoWindow.setContent(html);
        infoWindow.open(map, marker);
    })

    markers.push(marker)

}

const createLocationMarker = () => {
    let bounds = new google.maps.LatLngBounds();
    centroseducativos.forEach(ce => {
        let coord = new google.maps.LatLng(ce.latitud, ce.longitud);
        bounds.extend(coord);
        let name = ce.Centro_educativo;
        let cantidad = ce.cantidad;
        let estado = "ONLINE";
        let codigo = ce.codigo;
        createMarker(coord, name, cantidad, estado, codigo, [ce.cartel, ce.modalidad, ce.tipositio], ce.proveedor, ce.dashboard);
        map.fitBounds(bounds);

    })

    new markerClusterer.MarkerClusterer({
        map,
        markers,
    });
}


function initMap() {
    let sanjose = { lat: 9.934739, lng: -84.087502 }
    map = new google.maps.Map(document.getElementById("map"), {
        center: sanjose,
        zoom: 14,
        mapId: "acae8451aa7f5baa"
    })
    createLocationMarker();
    infoWindow = new google.maps.InfoWindow();
}