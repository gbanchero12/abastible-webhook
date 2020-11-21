
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
*Respuesa para generar formulario con 1 fechaa
*/
function oneDatePikerResponse(text, context, sessionId, lifespanCount = 1, proyectId = "cobra-lijklx") {
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
                  "label": "Fecha",
                  "name": "fecha",
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
*Respuesa para generar formulario para modificación de cuenta 1
* NOMBRE APELLIDO USAURIO EMAIL
*/
function formResponse(text, context, sessionId, lifespanCount = 1, proyectId = "cobra-lijklx") {
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
                "type": "text",
                "data": {
                  "label": "Nombre",
                  "name": "nombre",                 
                  "validation": { "regex": "[A-Za-z0-9]",
                  "errorText": "Campo obligatorio"}
                }
              },
              {
                "type": "text",
                "data": {
                  "label": "Apellido",
                  "name": "apellido",                  
                  "validation": { "regex": "[A-Za-z0-9]",
                  "errorText": "Campo obligatorio"}
                }
              },
              {
                "type": "text",
                "data": {
                  "label": "Usuario",
                  "name": "usuario",                  
                  "validation": { "regex": "[A-Za-z0-9_-\"'!#$%&/()¬=?¡\]]",
                  "errorText": "Campo obligatorio"}
                }
              },
              {
                "type": "text",
                "data": {
                  "label": "Email",
                  "validation": {
                  "regex": "^(([^<>()\\[\\]\\.;:\\s@\"]+(\\.[^<>()[\\]\\.,;:\\s@\"]+)*)|(\".+\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$",
                  "errorText": "Verifique su correo"
                }
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
*Respuesa para generar formulario para modificación de cuenta 2
*/
function formResponseHidden(text, context, sessionId, lifespanCount = 1, proyectId = "cobra-lijklx", nombre, apellido, labelUsuario = "Usuario", labelEmail = "Email") {
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
                "type": "hidden",
                "data": {
                  "name": "Nombre",
                  "value": nombre
                }
              },
              {
                "type": "hidden",
                "data": {
                  "name": "Apellido",
                  "value": apellido
                }
              },
              {
                "type": "text",
                "data": {
                  "label": labelUsuario,
                  "name": "usuario",                  
                  "validation": { "regex": "^[A-Za-z0-9_-\"'!#$%&/()¬=?¡\]]$",
                  "errorText": "Campo obligatorio"}
                }
              },
              {
                "type": "text",
                "data": {
                  "label": labelEmail,
                  "validation": {
                  "regex": "^(([^<>()\\[\\]\\.;:\\s@\"]+(\\.[^<>()[\\]\\.,;:\\s@\"]+)*)|(\".+\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$",
                  "errorText": "Verifique su correo"
                }
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
*Respuesa para generar formulario para modificación de cuenta 3
*/
function formResponseHiddenMail(text, context, sessionId, lifespanCount = 1, proyectId = "cobra-lijklx", nombre, apellido, email, labelUsuario = "Usuario", labelEmail = "Email") {
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
                "type": "hidden",
                "data": {
                  "name": "Nombre",
                  "value": nombre
                }
              },
              {
                "type": "hidden",
                "data": {
                  "name": "Apellido",
                  "value": apellido
                }
              },
              {
                "type": "hidden",
                "data": {
                  "name": labelEmail,
                  "value": email
                }
              },
              {
                "type": "text",
                "data": {
                  "label": labelUsuario,
                  "name": "usuario",                  
                  "validation": { "regex": "[A-Za-z0-9_-\"'!#$%&/()¬=?¡\]]",
                  "errorText": "Campo obligatorio"}
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
*Respuesa para generar formulario para modificación de cuenta 4
*/
function formResponseHiddenUser(text, context, sessionId, lifespanCount = 1, proyectId = "cobra-lijklx", nombre, apellido, user, labelUsuario = "Usuario", labelEmail = "Email") {
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
                "type": "hidden",
                "data": {
                  "name": "Nombre",
                  "value": nombre
                }
              },
              {
                "type": "hidden",
                "data": {
                  "name": "Apellido",
                  "value": apellido
                }
              },
              {
                "type": "hidden",
                "data": {
                  "name": labelUsuario,
                  "value": user
                }
              },
              {
                "type": "text",
                "data": {
                  "label": labelEmail,
                  "validation": {
                  "regex": "^(([^<>()\\[\\]\\.;:\\s@\"]+(\\.[^<>()[\\]\\.,;:\\s@\"]+)*)|(\".+\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$",
                  "errorText": "Verifique su correo"
                }
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

function suggestionChipsResponse(text, context, sessionId, lifespanCount = 1, proyectId = "cobra-lijklx") {
  return {"outputContexts": [
    {
      "name": `projects/${proyectId}/agent/sessions/${sessionId}/contexts/${context}`,
      "lifespanCount": lifespanCount
    }],
  "fulfillmentMessages": [
    {
      "payload": {
        "message": text,
        "platform": "kommunicate",
        "metadata": {
          "contentType": "300",
          "templateId": "6",
          "payload": [{
            "title": "Si",
            "message": "Si"
          }, {
            "title": "No",
            "message": "No"
          }]
        }
      }
    }
  ],
}
}




/*
*Respuesa para generar formulario para creación de nueva cuenta 1
* NOMBRE APELLIDO RUT
*/
function formResponseNewAccount(text, context, sessionId, lifespanCount = 1, proyectId = "cobra-lijklx") {
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
                "type": "text",
                "data": {
                  "label": "Nombre",
                  "name": "nombre",                 
                  "validation": { "regex": "[A-Za-z0-9]",
                  "errorText": "Verifique nombre."}
                }
              },
              {
                "type": "text",
                "data": {
                  "label": "Apellido",
                  "name": "apellido",                  
                  "validation": { "regex": "[A-Za-z0-9]",
                  "errorText": "Verifique apellido."}
                }
              },
              {
                "type": "text",
                "data": {
                  "label": "Rut Usuario Nuevo",
                  "name": "rutUsuarioNuevo",                  
                  "validation": { "regex": "^[0-9-]*$",
                  "errorText": "Ingrese Rut sin puntos con guión. (Ejemplo: 12345678-9)"}
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
*Respuesa para generar formulario para creación de nueva cuenta 2
* RUT
*/
function formResponseNewAccountHidden(text, context, sessionId, lifespanCount = 1, proyectId = "cobra-lijklx", nombre, apellido) {
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
                "type": "hidden",
                "data": {
                  "name": "Nombre",
                  "value": nombre
                }
              },
              {
                "type": "hidden",
                "data": {
                  "name": "Apellido",
                  "value": apellido
                }
              },             
              {
                "type": "text",
                "data": {
                  "label": "Rut Usuario Nuevo",
                  "name": "rutUsuarioNuevo",                  
                  "validation": { "regex": "^[0-9-]*$",
                  "errorText": "Ingrese Rut sin puntos con guión. (Ejemplo: 12345678-9)"}
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
*Respuesa para generar formulario para creación de nueva cuenta 1
* EMAIL NUEVO USUARIO
*/
function formResponseNewAccount2(text, context, sessionId, lifespanCount = 1, proyectId = "cobra-lijklx") {
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
                "type": "text",
                "data": {
                  "label": "Usuario SAP",
                  "name": "usuarioSAP",                  
                  "validation": { "regex": "[A-Za-z0-9_-\"'!#$%&/()¬=?¡\]]",
                  "errorText": "Campo obligatorio"
                }
                }
              },
              {
                "type": "text",
                "data": {
                  "label": "Correo Usuario Nuevo",                  
                  "validation": {
                  "regex": "^(([^<>()\\[\\]\\.;:\\s@\"]+(\\.[^<>()[\\]\\.,;:\\s@\"]+)*)|(\".+\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$",
                  "errorText": "Verifique correo"
                }
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
*Respuesa para generar opciones autosugeridas para creación de nueva cuenta
* Se útiliza para validar cargos y áreas
*/
function suggestionResponse(text, context, sessionId, lifespanCount = 1, proyectId = "cobra-lijklx", source = []) {

  return {
    "outputContexts": [
      {
        "name": `projects/${proyectId}/agent/sessions/${sessionId}/contexts/${context}`,
        "lifespanCount": lifespanCount
      }],
    "fulfillmentMessages": [
      {
        "payload": 
          {
            "message": text,
            "platform": "kommunicate",
            "metadata": {
              "KM_AUTO_SUGGESTION": {
                "source": source
              }
            }
          }
        
      }
    ]
  };
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
  sendDesbloqueo,
  formResponse,
  formResponseHidden,
  formResponseHiddenMail,
  formResponseHiddenUser,
  oneDatePikerResponse,
  suggestionChipsResponse,
  formResponseNewAccount,
  formResponseNewAccountHidden,
  suggestionResponse,
  formResponseNewAccount2,
}

