const axios = require('axios');

function sendRemplazo(rut, accion) {
  return {
    "responseId": "",
    "queryResult": {
      "queryText": "",
      "action": accion,
      "parameters": {
        rutSolicitante: rut,
      },

      "allRequiredParamsPresent": true,
      "fulfillmentText": "El usuario con R.U.T  no se encuentra en sistema.",
      "fulfillmentMessages": [
        {
          "text": {
            "text": [
              "El usuario con R.U.T  no se encuentra en sistema."
            ]
          }
        }
      ],
      "outputContexts": [
        {
          "name": "projects/agenteabastible-gdxr/agent/sessions/e149b643-d4da-54b2-20b8-8bb92109c869/contexts/soportesap-followup",
          "lifespanCount": 1,
          "parameters": {
            "tipoSoporte.original": "Soporte SAP",
            "reemplazoTemporal.original": "Reemplazo temporal",
            "rutSolicitante": "11111111-1",
            "reemplazoTemporal": "Reemplazo temporal",
            "tipoSoporte": "soporteSAP",
            "rutSolicitante.original": "11111111-1"
          }
        }
      ],
      "intent": {
        "name": "projects/agenteabastible-gdxr/agent/intents/8fc06b6d-c302-452e-9299-ce82efce104c",
        "displayName": "soporteSAP - reemplazo temporal - solicitante"
      },
      "intentDetectionConfidence": 1,
      "diagnosticInfo": {
        "webhook_latency_ms": 575
      },
      "languageCode": "es"
    },
    "webhookStatus": {
      "message": "Webhook execution successful"
    }
  };
}

function sendRemplazo2(rut, accion) {
  return {
    "responseId": "",
    "queryResult": {
      "queryText": "",
      "action": accion,
      "parameters": {
        rutReemplazante: rut,
        desbloqueoSAP:""
      },

      "allRequiredParamsPresent": true,
      "fulfillmentText": "El usuario con R.U.T  no se encuentra en sistema.",
      "fulfillmentMessages": [
        {
          "text": {
            "text": [
              "El usuario con R.U.T  no se encuentra en sistema."
            ]
          }
        }
      ],
      "outputContexts": [
        {
          "name": "projects/agenteabastible-gdxr/agent/sessions/e149b643-d4da-54b2-20b8-8bb92109c869/contexts/soportesap-followup",
          "lifespanCount": 1,
          "parameters": {
            "tipoSoporte.original": "Soporte SAP",
            "reemplazoTemporal.original": "Reemplazo temporal",
            "rutSolicitante": "11111111-1",
            "reemplazoTemporal": "Reemplazo temporal",
            "tipoSoporte": "soporteSAP",
            "rutSolicitante.original": "11111111-1"
          }
        }
      ],
      "intent": {
        "name": "projects/agenteabastible-gdxr/agent/intents/8fc06b6d-c302-452e-9299-ce82efce104c",
        "displayName": "soporteSAP - reemplazo temporal - solicitante"
      },
      "intentDetectionConfidence": 1,
      "diagnosticInfo": {
        "webhook_latency_ms": 575
      },
      "languageCode": "es"
    },
    "webhookStatus": {
      "message": "Webhook execution successful"
    }
  };
}

function sendDate(accion, fechaDesde, fechaHasta) {
  return {
    "responseId": "",
    "queryResult": {
      "queryText": "",
      "action": accion,
      "parameters": {
        "fechaDesde": fechaDesde,
        "fechaHasta": fechaHasta
      },
      "allRequiredParamsPresent": true,
      "fulfillmentText": "El usuario con R.U.T  no se encuentra en sistema.",
      "fulfillmentMessages": [
        {
          "text": {
            "text": [
              "El usuario con R.U.T  no se encuentra en sistema."
            ]
          }
        }
      ],
      "outputContexts": [
        {
          "name": "projects/agenteabastible-gdxr/agent/sessions/e149b643-d4da-54b2-20b8-8bb92109c869/contexts/soportesap-followup",
          "lifespanCount": 1,
          "parameters": {
            "tipoSoporte.original": "Soporte SAP",
            "reemplazoTemporal.original": "Reemplazo temporal",
            "rutSolicitante": "11111111-1",
            "reemplazoTemporal": "Reemplazo temporal",
            "tipoSoporte": "soporteSAP",
            "rutSolicitante.original": "11111111-1"
          }
        }
      ],
      "intent": {
        "name": "projects/agenteabastible-gdxr/agent/intents/8fc06b6d-c302-452e-9299-ce82efce104c",
        "displayName": "soporteSAP - reemplazo temporal - solicitante"
      },
      "intentDetectionConfidence": 1,
      "diagnosticInfo": {
        "webhook_latency_ms": 575
      },
      "languageCode": "es"
    },
    "webhookStatus": {
      "message": "Webhook execution successful"
    }
  };
}

function sendDesbloqueo(rut, accion) {
  return {
    "responseId": "",
    "queryResult": {
      "queryText": rut,
      "action": accion,
      "parameters": {
        rut: rut,
        desbloqueoSAP:"desbloqueo"
      },

      "allRequiredParamsPresent": true,
      "fulfillmentText": "El usuario con R.U.T  no se encuentra en sistema.",
      "fulfillmentMessages": [
        {
          "text": {
            "text": [
              "El usuario con R.U.T  no se encuentra en sistema."
            ]
          }
        }
      ],
      "outputContexts": [
        {
          "name": "projects/agenteabastible-gdxr/agent/sessions/e149b643-d4da-54b2-20b8-8bb92109c869/contexts/soportesap-followup",
          "lifespanCount": 1,
          "parameters": {
            "tipoSoporte.original": "Soporte SAP",
            "reemplazoTemporal.original": "Reemplazo temporal",
            "rutSolicitante": "11111111-1",
            "reemplazoTemporal": "Reemplazo temporal",
            "tipoSoporte": "soporteSAP",
            "rutSolicitante.original": "11111111-1"
          }
        }
      ],
      "intent": {
        "name": "projects/agenteabastible-gdxr/agent/intents/8fc06b6d-c302-452e-9299-ce82efce104c",
        "displayName": "soporteSAP - reemplazo temporal - solicitante"
      },
      "intentDetectionConfidence": 1,
      "diagnosticInfo": {
        "webhook_latency_ms": 575
      },
      "languageCode": "es"
    },
    "webhookStatus": {
      "message": "Webhook execution successful"
    }
  };
}
  




async function consultaRut(data) {

  try {
    const response = await axios({
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Basic " + Buffer.from("clara.abastible@dworkers.store" + ":" + ".m2tr4c1p3t1l").toString('base64')
      },
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
        "name": `projects/${proyectId}/agent/sessions/${sessionId}/contexts/${context}`,
        "lifespanCount": lifespanCount
      }]
  }
  return respuesta;
}


module.exports = {
  consultaRut,
  respuestaBasica,
  sendRemplazo,
  sendDate,
  sendRemplazo2,
  sendDesbloqueo
}