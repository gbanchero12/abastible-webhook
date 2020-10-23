process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const express = require('express');
const bodyParser = require('body-parser');
const server = express();
const functions = require('./functions');
const { consultaRut } = require('./functions');
server.use(bodyParser.json());


server.get("/", (req, res) => {
    res.send("OK");
});

server.post("/", async (req, res) => {


    let SESSION_ID;
    let RESPONSE_ID;
    let PROYECT_ID = "cobra-lijklx"; //process.env.PROYECT_ID
    if (req.body !== undefined && Array.isArray(req.body.queryResult.outputContexts)) {
        let firstContext = req.body.queryResult.outputContexts[0].name + "";
        firstContext = firstContext.split("/");
        SESSION_ID = firstContext[4];
        RESPONSE_ID = req.body.responseId;
    }

    let respuesta;
    try {
        let action = req.body.queryResult.action;
        let parametros = req.body.queryResult.parameters;
        
        //desbloqueo
        if (action === "Action.desbloqueo") {
            let rut = parametros.rut;
            
            let response = await functions.consultaRut(functions.sendDesbloqueo(rut, SESSION_ID));  
            
            if (response.fulfillmentText !== undefined) { 
                respuesta = functions.respuestaBasica(response.fulfillmentText, "PRUEBA", SESSION_ID, 2);
            } else {
                respuesta = functions.respuestaBasica("No se encontró el RUT. Intente nuevamente con otro RUT. (11111111-1)", "DefaultWelcomeIntent-soportesap-desbloqueo-followup", SESSION_ID, 2);
            }
        }

        if (action === "Action.Reemplazo-rutSolicitante") {
            
            let rut = parametros.rutSolicitante;

            let response = await functions.consultaRut(functions.sendRemplazo(rut, SESSION_ID));

            if (response.fulfillmentText !== undefined) { //Se encontró Rut
                respuesta = functions.respuestaBasica("Ingrese el rut del reemplazado. (11111111-2)", "DefaultWelcomeIntent-soportesap-remplazo-rut-followup", SESSION_ID, 1);
            } else {//No se encontró Rut
                respuesta = functions.respuestaBasica("No se encontró el RUT. Intente nuevamente con otro RUT.", "DefaultWelcomeIntent-soportesap-remplazo-followup", SESSION_ID, 1);
            }           

        }


        if (action === "Action.Reemplazo-rutReemplazante") {
            let rut = parametros.rutReemplazado;
            let response = await functions.consultaRut(functions.sendRemplazo2(rut, SESSION_ID));

            
            if (response.fulfillmentText !== undefined) { // se econtro rus reemplazante
                respuesta = functions.respuestaDatePiker("DefaultWelcomeIntent-soportesap-remplazo-rut-rutRemplazo-followup", SESSION_ID, 1);
                //respuesta = functions.respuestaBasica("Fecha de inicio del remplazo", "DefaultWelcomeIntent-soportesap-remplazo-rut-rutRemplazo-followup", SESSION_ID, 1);
            } else {
                //no se encontró
                respuesta = functions.respuestaBasica("No se encontró el RUT. Intente nuevamente con otro RUT.", "DefaultWelcomeIntent-soportesap-remplazo-rut-followup", SESSION_ID, 1);
            }
        }

        if (action === "Action.Reemplazo-fechas") {
            let fechaInicio = req.body.originalDetectIntentRequest.payload.formData["Fecha Inicio"];
            let fechaFinal = req.body.originalDetectIntentRequest.payload.formData["Fecha Final"];
           
            console.log(fechaInicio,fechaFinal)

            if (fechaInicio < fechaFinal) {
                let response = await functions.consultaRut(functions.sendDate(fechaInicio, fechaFinal, SESSION_ID));
                respuesta = functions.respuestaBasica(response.fulfillmentText, "END", SESSION_ID, 1);
            } else {
                respuesta = functions.respuestaDatePiker("La fecha de inicio debe de ser menor. Ingrese nuevamente por favor.","DefaultWelcomeIntent-soportesap-remplazo-rut-rutRemplazo-followup", SESSION_ID, 1);
            }
        }

        //fallbacks
        if (action === "fallback-desbloqueo") {
            respuesta = functions.respuestaBasica("Debe de ingresar un rut con el siguiente formato XXXXXXXX-X. Intente nuevamente con otro RUT.", "DefaultWelcomeIntent-soportesap-desbloqueo-followup", SESSION_ID, 1);
        }

        if (action === "Rut.fallback") {
            respuesta = functions.respuestaBasica("Debe de ingresar un rut con el siguiente formato XXXXXXXX-X. Intente nuevamente con otro RUT.", "DefaultWelcomeIntent-soportesap-remplazo-rut-followup", SESSION_ID, 1);
        }

        if (action === "Rut.fallback.first") {
            respuesta = functions.respuestaBasica("Debe de ingresar un rut con el siguiente formato XXXXXXXX-X. Intente nuevamente con otro RUT.", "DefaultWelcomeIntent-soportesap-remplazo-followup", SESSION_ID, 1);
        }

        if (action === "Fechas.fallback") {
            respuesta = functions.respuestaBasica("Debe de ingresar una fecha con el siguiente formato DD-MM-YYY. Intente nuevamente con otra fecha.", "DefaultWelcomeIntent-soportesap-remplazo-rut-rutRemplazo-followup", SESSION_ID, 1);
        }

        
        
    } catch (error) {
        console.log("Error:" + error);
    }
    
    
    res.send(respuesta);
});




!process.env.LOCAL ? server.listen(3000) : server.listen(process.env.PORT);
