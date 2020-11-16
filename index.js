//process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const express = require('express');
const bodyParser = require('body-parser');
const server = express();
const functions = require('./functions');
server.use(bodyParser.json());

server.get("/", (req, res) => {
    res.send("OK");
});

server.post("/", async (req, res) => {
    
    const request = functions.mapDataFromRequest(req);
    const SESSION_ID = request.SESSION_ID;
    const RESPONSE_ID = request.RESPONSE_ID;
    const PROYECT_ID = request.PROYECT_ID;
    const ACTION = request.ACTION;
    const PARAMETERS = request.PARAMS;

    let respuesta;
    try {
        

        /*Chatbot Abastible 1.1 - Modificar Cuenta, Nueva Cuenta, Asignación Transacción*/

        if (ACTION === "Action.RutSolicitante") {
            let rutSolicitante = PARAMETERS.rutSolicitante;
            
            //***Voy al servicio a consultar si existe el Rut y si tiene perfil Jefatura***
            
            if (rutSolicitante === "11111111-1") { 
                respuesta = functions.basicResponse("Ingrese usuario de SAP a modificar:", "DefaultWelcomeIntent-soportesap-modificarcuenta-rutSolicitante-followup", SESSION_ID, 1,PROYECT_ID);
            }else {
                //Si el Rut no existe devuelvo esto:
                respuesta = functions.basicResponse("Rut no existe. Intente nuevamente con otro RUT. (11111111-1)", "DefaultWelcomeIntent-soportesap-modificarcuenta-followup", SESSION_ID, 1);
                //Si el perfil no está habilitado devuelvo esto:
                if(rutSolicitante === "11111111-2") //este IF no va, es solo para simular perfil no habilitado
                respuesta = functions.basicResponse("Su perfil no tiene autorización para modificar una cuenta. Intente nuevamente con otro RUT. (11111111-1)", "DefaultWelcomeIntent-soportesap-modificarcuenta-followup", SESSION_ID, 1);
            }
        }

        if(ACTION === "Action.UserSapAModificar"){
            let usuarioAmodificar = PARAMETERS.usuarioAmodificar;
            
            //***Voy al servicio a consultar si existe el Rut y si tiene perfil Jefatura***

            if(usuarioAmodificar === "gbanchero"){
                //Si existe el usuario
                respuesta = functions.basicResponse("Perfecto! Ingrese RUT de usuario a modificar:", "DefaultWelcomeIntent-soportesap-modificarcuenta-rutSolicitante-followup", SESSION_ID, 1,PROYECT_ID);
            }else{
                //Si no existe el usuario
                respuesta = functions.basicResponse("El usuario no fue encontrado. Ingrese usuario a modificar nuevamente:", "DefaultWelcomeIntent-soportesap-modificarcuenta-rutSolicitante-userSapAMod-followup", SESSION_ID, 1,PROYECT_ID);
            }

        }


        /*Chatbot Abastible 1.0 - Desbloqueo y Reemplazo*/

        if (ACTION === "Action.desbloqueo") {
            let rut = PARAMETERS.rut;
            
            let response = await functions.consultaRut(functions.sendDesbloqueo(rut, SESSION_ID));  
            
            if (response.fulfillmentText !== undefined) { 
                respuesta = functions.respuestaBasica(response.fulfillmentText, "PRUEBA", SESSION_ID, 1);
            } else {
                respuesta = functions.respuestaBasica("No se encontró el RUT. Intente nuevamente con otro RUT. (11111111-1)", "DefaultWelcomeIntent-soportesap-desbloqueo-followup", SESSION_ID, 1);
            }
        }

        if (ACTION === "Action.Reemplazo-rutSolicitante") {
            
            let rut = PARAMETERS.rutSolicitante;

            let response = await functions.consultaRut(functions.sendRemplazo(rut, SESSION_ID));

            if (response.fulfillmentText !== undefined) { //Se encontró Rut
                respuesta = functions.respuestaBasica("Ingrese el rut del reemplazado. (11111111-2)", "DefaultWelcomeIntent-soportesap-remplazo-rut-followup", SESSION_ID, 1);
            } else {//No se encontró Rut
                respuesta = functions.respuestaBasica("No se encontró el RUT. Intente nuevamente con otro RUT.", "DefaultWelcomeIntent-soportesap-remplazo-followup", SESSION_ID, 1);
            }           

        }


        if (ACTION === "Action.Reemplazo-rutReemplazante") {
            let rut = PARAMETERS.rutReemplazado;
            let response = await functions.consultaRut(functions.sendRemplazo2(rut, SESSION_ID));

            
            if (response.fulfillmentText !== undefined) { // se econtro rus reemplazante
                respuesta = functions.respuestaDatePiker("Indique la fecha de inicio y fecha final de reemplazo","DefaultWelcomeIntent-soportesap-remplazo-rut-rutRemplazo-followup", SESSION_ID, 1);
                //respuesta = functions.respuestaBasica("Fecha de inicio del remplazo", "DefaultWelcomeIntent-soportesap-remplazo-rut-rutRemplazo-followup", SESSION_ID, 1);
            } else {
                //no se encontró
                respuesta = functions.respuestaBasica("No se encontró el RUT. Intente nuevamente con otro RUT.", "DefaultWelcomeIntent-soportesap-remplazo-rut-followup", SESSION_ID, 1);
            }
        }

        if (ACTION === "Action.Reemplazo-fechas") {
            
            let fechaInicio = req.body.originalDetectIntentRequest.payload.formData["Fecha Inicio"];
            let fechaFinal = req.body.originalDetectIntentRequest.payload.formData["Fecha Final"];
           
            if (fechaInicio < fechaFinal) {
                let response = await functions.consultaRut(functions.sendDate(fechaInicio, fechaFinal, SESSION_ID));
                respuesta = functions.respuestaBasica(response.fulfillmentText, "END", SESSION_ID, 1);
            } else {
                respuesta = functions.respuestaDatePiker("La fecha de inicio debe de ser menor. Ingrese nuevamente por favor.","DefaultWelcomeIntent-soportesap-remplazo-rut-rutRemplazo-followup", SESSION_ID, 1);
            }
        }

        
        if (ACTION === "fallback-desbloqueo") {
            respuesta = functions.respuestaBasica("Debe de ingresar un rut con el siguiente formato XXXXXXXX-X. Intente nuevamente con otro RUT.", "DefaultWelcomeIntent-soportesap-desbloqueo-followup", SESSION_ID, 1);
        }

        if (ACTION === "Rut.fallback") {
            respuesta = functions.respuestaBasica("Debe de ingresar un rut con el siguiente formato XXXXXXXX-X. Intente nuevamente con otro RUT.", "DefaultWelcomeIntent-soportesap-remplazo-rut-followup", SESSION_ID, 1);
        }

        if (ACTION === "Rut.fallback.first") {
            respuesta = functions.respuestaBasica("Debe de ingresar un rut con el siguiente formato XXXXXXXX-X. Intente nuevamente con otro RUT.", "DefaultWelcomeIntent-soportesap-remplazo-followup", SESSION_ID, 1);
        }

        if (ACTION === "Fechas.fallback") {
            respuesta = functions.respuestaBasica("Debe de ingresar una fecha con el siguiente formato DD-MM-YYY. Intente nuevamente con otra fecha.", "DefaultWelcomeIntent-soportesap-remplazo-rut-rutRemplazo-followup", SESSION_ID, 1);
        }

        
        
    } catch (error) {
        console.log("Error:" + error);
    }
    
    
    res.send(respuesta);
});




!process.env.LOCAL ? server.listen(3000) : server.listen(process.env.PORT);
