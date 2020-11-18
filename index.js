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
        

        /*Chatbot Abastible 1.1 - Asignacion Transacción*/
        //
        // Params           Action                                                  Context heredado                                                            Comentarios
        //1 rutSolicitante  Action.AsignacionTransaccion.RutSolicitante             DWI-soportesap-asignTransac-followup
        //2 usuarioAasignar Action.AsignacionTransaccion.UsuarioAasignar            DWI-soportesap-asignTransac-rutSolicitante-followup
        //3 transacción     Action.AsignacionTransaccion.Transaccion                DWI-soportesap-asignTransac-rutSolicitante-UsuAasignar-followup             Cuando existe arroja: Es temporal? bubbles SI NO
        //4 YES [Fecha]     Action.AsignacionTransaccion.Yes                        DWI-soportesap-asignTransac-rutSolicitante-UsuAasignar-transaccion-followup 
        //5 NO                                                                                                                                                  Recibe No como accion! Su solicitud se gestionó correctamente. Recibirá un email a su casilla la brevedad.

        //6 Fecha           Action.AsignacionTransaccion.Fecha.Dato                 DWI-soportesap-asignTransac-rutSolicitante-UsuAasignar-transaccion-yes-followup




        if (ACTION === "Action.AsignacionTransaccion.RutSolicitante") {
            let rutSolicitante = PARAMETERS.rutSolicitante;//controlar cantidad de caracteres 
            
            
            if (rutSolicitante === "11111111-1") { 
                //***Voy al servicio a consultar si existe el Rut y si tiene perfil Jefatura***
                respuesta = functions.basicResponse("Ingrese usuario de SAP a asignar transaccion:", "DWI-soportesap-asignTransac-rutSolicitante-followup", SESSION_ID, 1,PROYECT_ID);
            }else {
                //Si el Rut no existe devuelvo esto:
                respuesta = functions.basicResponse("Rut no existe. Intente nuevamente con otro RUT. (11111111-1)", "DWI-soportesap-asignTransac-followup", SESSION_ID, 1);
                //Si el perfil no está habilitado devuelvo esto:
                if(rutSolicitante === "11111111-2") //este IF no va, es solo para simular perfil no habilitado
                respuesta = functions.basicResponse("Su perfil no tiene autorización para asignar transaccion. Intente nuevamente con otro RUT. (11111111-1)", "DWI-soportesap-asignTransac-followup", SESSION_ID, 1);
            }
        }

        if(ACTION === "Action.AsignacionTransaccion.RutSolicitante.fallback"){
            respuesta = functions.basicResponse("Ingrese un Rut válido", "DWI-soportesap-asignTransac-followup", SESSION_ID, 1,PROYECT_ID);
        }

        if(ACTION === "Action.AsignacionTransaccion.UsuarioAasignar"){
            let usuarioAasignar = PARAMETERS.usuarioAasignar;//controlar cantidad de caracteres 
            
            //***Voy al servicio a consultar si existe el usuario***

            if(usuarioAasignar === "gbanchero"){
                //Si existe el usuario
                respuesta = functions.basicResponse("Perfecto! Ingrese transacción a asignar:", "DWI-soportesap-asignTransac-rutSolicitante-UsuAasignar-followup", SESSION_ID, 1,PROYECT_ID);
            }else{
                //Si no existe el usuario 
                respuesta = functions.basicResponse("El usuario no fue encontrado. Ingrese usuario para asignar transacción nuevamente:", "DWI-soportesap-asignTransac-rutSolicitante-followup", SESSION_ID, 1,PROYECT_ID);
            }
        }

        if(ACTION === "Action.AsignacionTransaccion.Transaccion"){
            let transaccion = PARAMETERS.transaccion; //controlar cantidad de caracteres 
            
            //***Voy al servicio a consultar si existe la transacción***

            if(transaccion.toUpperCase() === "FBL1N"){
                //Si existe la transaccion
                respuesta = functions.suggestionChipsResponse("¿Es una asignación temporal?", "DWI-soportesap-asignTransac-rutSolicitante-UsuAasignar-transaccion-followup", SESSION_ID, 1,PROYECT_ID);
            }else{
                //Si la transaccion no existe
                respuesta = functions.basicResponse("La transacción no fue encontrada. Intente nuevamente:", "DWI-soportesap-asignTransac-rutSolicitante-UsuAasignar-followup", SESSION_ID, 1,PROYECT_ID);
            }
        }

        if(ACTION === "Action.AsignacionTransaccion.Transaccion.Fallback"){
            respuesta = functions.suggestionChipsResponse("Disculpa no te he comprendido. ¿Es una asignación temporal?", "DWI-soportesap-asignTransac-rutSolicitante-UsuAasignar-transaccion-followup", SESSION_ID, 1,PROYECT_ID);
        }

        if(ACTION === "Action.AsignacionTransaccion.Yes"){
            respuesta = functions.oneDatePikerResponse("Ingrese fecha de finalización:","DWI-soportesap-asignTransac-rutSolicitante-UsuAasignar-transaccion-yes-followup",SESSION_ID,1,PROYECT_ID);
        }

        if(ACTION === "Action.AsignacionTransaccion.Yes.Fecha.Fallback"){
            respuesta = functions.oneDatePikerResponse("Ingrese una fecha válida", "DWI-soportesap-asignTransac-rutSolicitante-UsuAasignar-transaccion-yes-followup", SESSION_ID, 1,PROYECT_ID);
        }

        

        if(ACTION === "Action.AsignacionTransaccion.Fecha.Dato"){
            let fecha = req.body.originalDetectIntentRequest.payload.formData["Fecha"];
            console.log("///////////////////////////////////////////////////",fecha)
            if(new Date(fecha) <= new Date()){
                respuesta = functions.oneDatePikerResponse("Debe de ser una fecha futura, ingrese nuevamente:", "DWI-soportesap-asignTransac-rutSolicitante-UsuAasignar-transaccion-yes-followup", SESSION_ID, 1,PROYECT_ID);
            }else{
                respuesta = functions.basicResponse("Su solicitud se gestionó correctamente. Recibirá un email a su casilla la brevedad.", "End", SESSION_ID, 1,PROYECT_ID);
            }
        }

        if(ACTION ==="Action.AsignacionTransaccion.Transaccion.NO")
            respuesta = functions.basicResponse("Su solicitud se gestionó correctamente. Recibirá un email a su casilla la brevedad.", "End", SESSION_ID, 1,PROYECT_ID);















        /*Chatbot Abastible 1.1 - Modificar Cuenta*/

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

        //**Fallback Rut Solicitante**

        if (ACTION === "Fallback.ModificarCuenta.RutSolicitante") {
            respuesta = functions.basicResponse("Debe de ingresar un Rut correcto. Intente nuevamente con otro RUT:", "DefaultWelcomeIntent-soportesap-modificarcuenta-followup", SESSION_ID, 1);
        }

        if(ACTION === "Action.UserSapAModificar"){
            let usuarioAmodificar = PARAMETERS.usuarioAmodificar;
            
            //***Voy al servicio a consultar si existe el Rut y si tiene perfil Jefatura***

            if(usuarioAmodificar === "gbanchero"){
                //Si existe el usuario
                respuesta = functions.basicResponse("Perfecto! Ingrese RUT de usuario a modificar:", "DefaultWelcomeIntent-soportesap-modificarcuenta-rutSolicitante-userSapAMod-followup", SESSION_ID, 1,PROYECT_ID);
            }else{
                //Si no existe el usuario 
                respuesta = functions.basicResponse("El usuario no fue encontrado. Ingrese usuario a modificar nuevamente:", "DefaultWelcomeIntent-soportesap-modificarcuenta-rutSolicitante-followup", SESSION_ID, 1,PROYECT_ID);
            }
        }

        if(ACTION === "Action.RutUsuNuevo"){
            let rutNuevoUsuario = PARAMETERS.rutNuevoUsuario;

            //***Voy al servicio a consultar si existe el Rut***

            if(rutNuevoUsuario === "11111111-1"){
                //Si no existe el Rut nuevo
                respuesta = functions.formResponse("Complete el siguiente formulario por favor:","DWI-sopsap-modifcuen-rutSoli-UsuAMod-rutUsuNue-followup",SESSION_ID,1);
            }else{
                //Si existe el Rut nuevo
                respuesta = functions.basicResponse("Ese Rut ya se encuantra registrado. Ingrese RUT de usuario a modificar:", "DefaultWelcomeIntent-soportesap-modificarcuenta-rutSolicitante-userSapAMod-followup", SESSION_ID, 1,PROYECT_ID);
            }
        }

        //**Fallback Rut Nuevo**

        if (ACTION === "Fallback.ModificarCuenta.RutNuevo") {
            respuesta = functions.basicResponse("Debe de ingresar un Rut correcto. Intente nuevamente con otro RUT:", "DefaultWelcomeIntent-soportesap-modificarcuenta-rutSolicitante-userSapAMod-followup", SESSION_ID, 1);
        }

        if(ACTION === "Action.FormularioModificarCuenta"){
           
            let email = req.body.originalDetectIntentRequest.payload.formData["Email"];
            let apellido = req.body.originalDetectIntentRequest.payload.formData["Apellido"];
            let nombre = req.body.originalDetectIntentRequest.payload.formData["Nombre"];
            let usuario = req.body.originalDetectIntentRequest.payload.formData["Usuario"];
            //***Voy al servicio a consultar si existe el correo y el usuario***
            console.log(apellido,nombre)
            console.log("////////////////////////////////////////",email,usuario)
            //caso 1: me vienen el usuario y el correo OK
            if(email === "gbanchero@gmail.com" && usuario === "gbanchero")              
                respuesta = functions.basicResponse("Su solicitud se gestionó correctamente. Recibirá un email a su casilla la brevedad.","DWI-sopsap-modifcuen-rutSoli-UsuAMod-rutUsuNue-Form-followup",SESSION_ID,1);
            

            //caso 2: me vienen usuario y correo existentes
            if(email !== "gbanchero@gmail.com" && usuario !== "gbanchero")             
                respuesta = functions.formResponseHidden("Usuario y correo ya existen, ingrese nuevamente por favor:","DWI-sopsap-modifcuen-rutSoli-UsuAMod-rutUsuNue-followup",SESSION_ID,1,PROYECT_ID,nombre,apellido);
            

            //caso 3: me vienen correo existente
            if(email !== "gbanchero@gmail.com" && usuario === "gbanchero")
                respuesta = functions.formResponseHiddenUser("Correo ya existe. Ingrese nuevamente:","DWI-sopsap-modifcuen-rutSoli-UsuAMod-rutUsuNue-followup",SESSION_ID,1,PROYECT_ID,nombre,apellido,usuario);            
                
            //caso 4: me vienen usuario existente
            if(email === "gbanchero@gmail.com" && usuario !== "gbanchero")
                respuesta = functions.formResponseHiddenMail("Usuario ya existe. Ingrese nuevamente:","DWI-sopsap-modifcuen-rutSoli-UsuAMod-rutUsuNue-followup",SESSION_ID,1,PROYECT_ID,nombre,apellido,email);            
                
        }

        
























        /*Chatbot Abastible 1.0 - Desbloqueo y Reemplazo*/

        if (ACTION === "Action.desbloqueo") {
            let rut = PARAMETERS.rut;
            
            let response = await functions.consultaRut(functions.sendDesbloqueo(rut, SESSION_ID));  
            
            if (response.fulfillmentText !== undefined) { 
                respuesta = functions.basicResponse(response.fulfillmentText, "PRUEBA", SESSION_ID, 1);
            } else {
                respuesta = functions.basicResponse("No se encontró el RUT. Intente nuevamente con otro RUT. (11111111-1)", "DefaultWelcomeIntent-soportesap-desbloqueo-followup", SESSION_ID, 1);
            }
        }

        if (ACTION === "Action.Reemplazo-rutSolicitante") {
            
            let rut = PARAMETERS.rutSolicitante;

            let response = await functions.consultaRut(functions.sendRemplazo(rut, SESSION_ID));

            if (response.fulfillmentText !== undefined) { //Se encontró Rut
                respuesta = functions.basicResponse("Ingrese el rut del reemplazado. (11111111-2)", "DefaultWelcomeIntent-soportesap-remplazo-rut-followup", SESSION_ID, 1);
            } else {//No se encontró Rut
                respuesta = functions.basicResponse("No se encontró el RUT. Intente nuevamente con otro RUT.", "DefaultWelcomeIntent-soportesap-remplazo-followup", SESSION_ID, 1);
            }           

        }       


        if (ACTION === "Action.Reemplazo-rutReemplazante") {
            let rut = PARAMETERS.rutReemplazado;
            let response = await functions.consultaRut(functions.sendRemplazo2(rut, SESSION_ID));

            
            if (response.fulfillmentText !== undefined) { // se econtro rus reemplazante
                respuesta = functions.datePikerResponse("Indique la fecha de inicio y fecha final de reemplazo","DefaultWelcomeIntent-soportesap-remplazo-rut-rutRemplazo-followup", SESSION_ID, 1);
                //respuesta = functions.respuestaBasica("Fecha de inicio del remplazo", "DefaultWelcomeIntent-soportesap-remplazo-rut-rutRemplazo-followup", SESSION_ID, 1);
            } else {
                //no se encontró
                respuesta = functions.basicResponse("No se encontró el RUT. Intente nuevamente con otro RUT.", "DefaultWelcomeIntent-soportesap-remplazo-rut-followup", SESSION_ID, 1);
            }
        }

        if (ACTION === "Action.Reemplazo-fechas") {
            
            let fechaInicio = req.body.originalDetectIntentRequest.payload.formData["Fecha Inicio"];
            let fechaFinal = req.body.originalDetectIntentRequest.payload.formData["Fecha Final"];
           
            if (fechaInicio < fechaFinal) {
                let response = await functions.consultaRut(functions.sendDate(fechaInicio, fechaFinal, SESSION_ID));
                respuesta = functions.basicResponse(response.fulfillmentText, "END", SESSION_ID, 1);
            } else {
                respuesta = functions.datePikerResponse("La fecha de inicio debe de ser menor. Ingrese nuevamente por favor.","DefaultWelcomeIntent-soportesap-remplazo-rut-rutRemplazo-followup", SESSION_ID, 1);
            }
        }

        
        if (ACTION === "fallback-desbloqueo") {
            respuesta = functions.basicResponse("Debe de ingresar un rut con el siguiente formato XXXXXXXX-X. Intente nuevamente con otro RUT.", "DefaultWelcomeIntent-soportesap-desbloqueo-followup", SESSION_ID, 1);
        }

        if (ACTION === "Rut.fallback") {
            respuesta = functions.basicResponse("Debe de ingresar un rut con el siguiente formato XXXXXXXX-X. Intente nuevamente con otro RUT.", "DefaultWelcomeIntent-soportesap-remplazo-rut-followup", SESSION_ID, 1);
        }

        if (ACTION === "Rut.fallback.first") {
            respuesta = functions.basicResponse("Debe de ingresar un rut con el siguiente formato XXXXXXXX-X. Intente nuevamente con otro RUT.", "DefaultWelcomeIntent-soportesap-remplazo-followup", SESSION_ID, 1);
        }

        if (ACTION === "Fechas.fallback") {
            respuesta = functions.basicResponse("Debe de ingresar una fecha con el siguiente formato DD-MM-YYY. Intente nuevamente con otra fecha.", "DefaultWelcomeIntent-soportesap-remplazo-rut-rutRemplazo-followup", SESSION_ID, 1);
        }

        
        
    } catch (error) {
        console.log("Error:" + error);
    }
    
    
    res.send(respuesta);
});




!process.env.LOCAL ? server.listen(3000) : server.listen(process.env.PORT);
