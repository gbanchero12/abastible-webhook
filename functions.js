const axios = require('axios');

function sendRut(rut, accion) {
    return {
        "responseId": "327578a2-5330-4294-b921-a67736e4a6d2-fddac391",
        "queryResult": {
          "queryText": "",
          "action": accion,
          "parameters": {
            "desbloqueoSAP": "desbloqueo",
            "rut": rut
          }
        }
      }
}



async function consultaRut(data) {

    try {
        const response = await axios({
            headers: { "Content-Type": "application/json" ,
        "Authorization":"Basic " + Buffer.from("clara.abastible@dworkers.store" + ":" + ".m2tr4c1p3t1l").toString('base64') },
            method: "POST",
            url: "https://indominusrex.cl/api-abastible/public/api/petitions",            
            data: 
              data
            
        });
      
        //console.log(response)
      
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