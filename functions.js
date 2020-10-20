const axios = require('axios');

function sendRut(rut, accion, parametro = "rut") {
    return {
        "responseId": "",
        "queryResult": {
          "queryText": "",
          "action": accion,
          "parameters": {
            "desbloqueoSAP": "desbloqueo",
            parametro: rut
          }
        }
      }
}

function sendDate(accion, fechaDesde, fechaHasta){
  return {
      "responseId": "",
      "queryResult": {
        "queryText": "",
        "action": accion,
        "parameters": {
          "fechaDesde": fechaDesde,
          "fechaHasta": fechaHasta
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
    sendRut,
    sendDate
}