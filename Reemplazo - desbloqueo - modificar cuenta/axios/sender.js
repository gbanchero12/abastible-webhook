const axios = require('axios');

function sendRemplazo(rut, sessionId) {
  const json = {
    "responseId": "ab6208eb-9810-4263-a65f-f4276db02676-5d846bd5",
    "queryResult": {
      "queryText": rut,
      "action": "Action.Reemplazo-rutSolicitante",
      "parameters": {
        "rutSolicitante": rut
      },
      "allRequiredParamsPresent": true,
      "fulfillmentText": "Fuera de servicio",
      "fulfillmentMessages": [
        {
          "text": {
            "text": [
              "Fuera de servicio"
            ]
          }
        }
      ],
      "outputContexts": [
        {							//sacar de acá el session ID
          "name": `projects/cobra-lijklx/agent/sessions/${sessionId}/contexts/defaultwelcomeintent-soportesap-followup`,
          "parameters": {
            "RUT": "11111111-1",
            "RUT.original": "11111111-1"
          }
        },
        {
          "name": "projects/cobra-lijklx/agent/sessions/25726c13-ef5b-de4b-ff2e-c6cea0d8c5c9/contexts/defaultwelcomeintent-soportesap-remplazo-followup",
          "parameters": {
            "RUT": "11111111-1",
            "RUT.original": "11111111-1"
          }
        },
        {
          "name": "projects/cobra-lijklx/agent/sessions/25726c13-ef5b-de4b-ff2e-c6cea0d8c5c9/contexts/__system_counters__",
          "parameters": {
            "no-input": 0,
            "no-match": 0,
            "RUT": "11111111-1",
            "RUT.original": "11111111-1"
          }
        }
      ],
      "intent": {
        "name": "projects/cobra-lijklx/agent/intents/7f20b4be-6680-48bb-8b71-e36789a96923",
        "displayName": "Default Welcome Intent - soporte sap - remplazo - rut"
      },
      "intentDetectionConfidence": 1,
      "languageCode": "es"
    },
    "originalDetectIntentRequest": {
      "source": "DIALOGFLOW_CONSOLE",
      "payload": {}
    },
    "session": "projects/cobra-lijklx/agent/sessions/25726c13-ef5b-de4b-ff2e-c6cea0d8c5c9"
  };

  let json_ = JSON.stringify(json);
  //console.log(json_);
  return json_;
}

function sendRemplazo2(rut, sessionId) {
  const json = {
    "responseId": "ab6208eb-9810-4263-a65f-f4276db02676-5d846bd5",
    "queryResult": {
      "queryText": rut,
      "action": "Action.Reemplazo-rutReemplazante",
      "parameters": {
        "rutReemplazante": rut
      },
      "allRequiredParamsPresent": true,
      "fulfillmentText": "",
      "fulfillmentMessages": [
        {
          "text": {
            "text": [
              ""
            ]
          }
        }
      ],
      "outputContexts": [
        {
          "name": `projects/agenteabastible-gdxr/agent/sessions/${sessionId}/contexts/soportesap-followup`,
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

  let json_ = JSON.stringify(json);
  console.log(json_);
  return json_;
}

function sendDate(fechaDesde, fechaHasta, sessionId) {
  const json =   {
    "responseId": "74243904-bdff-4c9a-bffc-093d04940807-fddac391",
    "queryResult": {
        "queryText": "11111111-1",
        "action": "Action.Reemplazo-fechas",
        "parameters": {
            "fechaInicio": fechaDesde,
            "fechaFinal": fechaHasta
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
        "name": `projects/agenteabastible-gdxr/agent/sessions/${sessionId}/contexts/soportesap-followup`
      }]}
};
let json_ = JSON.stringify(json);
  console.log(json_);
  return json_;

}

function sendDesbloqueo(rut, sessionId) {
  const json =  {
    "responseId": "responseId",
    "queryResult": {
      "queryText": rut,
      "action": "Action.desbloqueo",
      "parameters": {
        "rut": rut
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
          "name": `projects/agenteabastible-gdxr/agent/sessions/${sessionId}/contexts/soportesap-followup`,
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
  }
  let json_ = JSON.stringify(json);
  console.log(json_);
  return json_;
}





async function consultaRut(data) { //consulta hacia servicio de MC

  try {
    const response = await axios({
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Basic " + Buffer.from("clara.abastible@dworkers.store" + ":" + ".m2tr4c1p3t1l").toString('base64') //#pasar a var de config
      },
      method: "POST",
      url: "https://indominusrex.cl/api-abastible/public/api/petitions",
      data:
        data

    });

    //console.log(response)

    let data_ = response.data;
    //console.log("///////////respuesta Metro Capital: " + JSON.stringify(data_));
    return data_;
  }
  catch (err) { console.log("Error: " + err); }
}

module.exports ={
sendRemplazo,
sendDate,
sendRemplazo2,
sendDesbloqueo,
consultaRut
}