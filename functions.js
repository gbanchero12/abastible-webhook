const { response } = require('express');
const axios = require('axios');
function getPharmacyById(id) {
    var url = 'https://localesfasa.farmaciasahumada.cl/Locales.asmx/LocalDescripcion?codLocal=' + id;
    var headers = {
        "Content-Type": "application/json"
    }
    fetch(url, { method: 'GET', headers: headers })
        .then((res) => {
            return res.json()
        })
    /*.then((json) => {
        console.log(json);
        return res.json(json);
    });*/

}

async function getPharmacyList() {

    let res = await axios.get('https://localesfasa.farmaciasahumada.cl/Locales.asmx/InterfazLocal');  
    let data = res.data;
    return data;
  }

function sugerencias(){
    return {
        "message": "Seleccione o escriba una comuna para buscar su farmacia:",
        "platform": "kommunicate",
        "metadata": {
            "contentType": "300",
            "templateId": "6",
            "payload": [{
                "title": "Santiago",
                "message": "Santiago"
            }, {
                "title": "La Florida",
                "message": "La Florida"
            },
            {
                "title": "Providencia",
                "message": "Providencia"
            },
            {
                "title": "Los Condes",
                "message": "Los Condes"
            }, {
                "title": "La Barnechea",
                "message": "La Barnechea"
            }, {
                "title": "San Miguel",
                "message": "San Miguel"
            }, {
                "title": "Puente Alto",
                "message": "Puente Alto"
            }]
        }
    }
}

function respuestaBasica(textoEnviar) {
    let respuesta = {
        "fulfillmentText": textoEnviar
    }
    return respuesta;
}

function lugaresEncontrados (resultado) {
    let lugares = "\n";
    let contador = 1;
    resultado.forEach(lugar => {
        lugares += contador + ". Dirección: " + lugar.NombreLocal + " \nCiudad: " + lugar.Ciudad +  " \nHorario: " + lugar.Descripcion + ". \n";
        contador++;
    });
    return lugares;
}

module.exports = {
    getPharmacyById,
    getPharmacyList,
    respuestaBasica,
    lugaresEncontrados,
    sugerencias
}