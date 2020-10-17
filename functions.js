const axios = require('axios');

function sendRut(rut, accion) {
    return {
        "responseId": "beb71ea7-5cf5-4d31-b70a-879987482809-fddac391",
        "queryResult": {
            "queryText": "",
            "action": accion,
            "parameters": {
                "rut": rut
            },
            "allRequiredParamsPresent": true,
            "fulfillmentText": "Ups, por el momento me encuentro fuera de servicio.",
            "fulfillmentMessages": [
                {
                    "text": {
                        "text": [
                            "Ups, por el momento me encuentro fuera de servicio."
                        ]
                    }
                }
            ]
        }

    };
}



async function consultaRut(data) {

    try {
        const response = await axios({
            headers: { "Content-Type": "application/json" ,
        "Authorization":"Basic Y2xhcmEuYWJhc3RpYmxlQGR3b3JrZXJzLnN0b3JlOi5tMnRyNGMxcDN0MWw="},
            method: "post",
            url: "https://indominusrex.cl/api-abastible/public/api/petitions",
            auth: {
              username: "clara.abastible@dworkers.store",
              password: ".m2tr4c1p3t1l"
            },
            data: {
              data
            }
        });
      
        console.log(response)
      
        let data_ = response.data;
        return data_;
    }
    catch (err) { console.log("Error: " + err); }
}



function respuestaBasica(textoEnviar, context, sessionId, lifespanCount = 2, proyectId = "cobra-lijklx") {
    let respuesta = {
        "fulfillmentText": textoEnviar,
        "outputContexts": [
            {
              "name":`projects/${proyectId}/agent/sessions/${sessionId}/contexts/${context}`,
              "lifespanCount": lifespanCount
            }]
    }
    return respuesta;
}


module.exports = {
    consultaRut,
    respuestaBasica,
    sendRut
}