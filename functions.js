
const sender = require('./axios/sender');

function mapDataFromRequest(req){
  if (req.body !== undefined && Array.isArray(req.body.queryResult.outputContexts)) {
    let firstContext = req.body.queryResult.outputContexts[0].name + "";
    firstContext = firstContext.split("/");
    const ACTION = req.body.queryResult.action;
    const PARAMS = req.body.queryResult.parameters;
    const SESSION_ID = firstContext[4];
    const RESPONSE_ID = req.body.responseId;
    const PROYECT_ID = "cobra-lijklx"; // va en variables de enviroment
    return {firstContext,SESSION_ID,RESPONSE_ID,ACTION,PARAMS,PROYECT_ID};
}
else{
  console.error("Data not recived well, check the request.")
}
}

function basicResponse(text, context, sessionId, lifespanCount = 1, proyectId = "cobra-lijklx") {
  let respuesta = {
    "fulfillmentText": text,
    "outputContexts": [
      {
        "name": `projects/${proyectId}/agent/sessions/${sessionId}/contexts/${context}`,
        "lifespanCount": lifespanCount
      }]
  }
  return respuesta;
}
/*
*Respuesa para generar formulario con 2 fechas
*/
function datePikerResponse(text, context, sessionId, lifespanCount = 1, proyectId = "cobra-lijklx") {
  return {

    "outputContexts": [
      {
        "name": `projects/${proyectId}/agent/sessions/${sessionId}/contexts/${context}`,
        "lifespanCount": lifespanCount
      }],
    "fulfillmentMessages": [
      {
        "payload": {
          "platform": "kommunicate",
          "message": text,
          "metadata": {
            "payload": [
              {
                "type": "date",
                "data": {
                  "label": "Fecha Inicio",
                  "name": "fechaInicio",
                  "validation": { "errorText": "Field is mandatory" }
                }
              },
              {
                "type": "date",
                "data": {
                  "label": "Fecha Final",
                  "name": "fechaFinal",
                  "validation": { "errorText": "Field is mandatory" }
                }
              },
              {
                "data": {
                  "action": {
                    "type": "submit",
                    "label": "Enviar",
                    "formAction": "https://abastible-chatbot.herokuapp.com/postData",
                    "requestType": "postBackToBotPlatform"
                  },
                  "name": "Enviar",
                  "type": "submit"
                },
                "type": "submit"
              }
            ],
            "contentType": "300",
            "templateId": "12"
          }
        }
      }
    ],

  }
}

/*
*Interección con API de MC
*/
function sendRemplazo(rut, sessionId) { return sender.sendRemplazo(rut,sessionId) }

function sendRemplazo2(rut, sessionId) { return sender.sendRemplazo2(rut,sessionId) }

function sendDate(fechaDesde, fechaHasta, sessionId) { return sender.sendDate(fechaDesde,fechaHasta,sessionId) }

function sendDesbloqueo(rut, sessionId) { return sender.sendDesbloqueo(rut,sessionId) }


module.exports = {
  basicResponse,
  datePikerResponse,
  mapDataFromRequest,
  sendRemplazo,
  sendRemplazo2,
  sendDate,
  sendDesbloqueo
}

