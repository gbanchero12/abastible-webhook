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
    const LARGO_RUT_MAX = 10;
    const LARGO_USER_SAP_MAX = 12;

    /*Se pueden cargar a partir de una llamada a un endpoint*/
    const CARGOS = ["Presidente", "Gerente","Analista Jr","Analista Sr.","Cadete","Jefe 1","Jefe 2","Jefe de zona Norte","Supervisor 1","Supervisor 2","Otro","Jefe de zona Sur","Jefe de zona Oeste","Jefe de zona Este"];
    const AREAS = ["Mantenimiento","Comercial","Finanzas","Administración","Recursos Humanos","Gerencia general","Gerencias regionales","RSE","Área ejemplo","Otra","Área ejemplo 3","Área ejemplo 4","Área ejemplo 5","Área ejemplo 6","Área ejemplo 7","Área ejemplo 8","Area ejemplo 3","Area ejemplo 4","Area ejemplo 5","Area ejemplo 6","Area ejemplo 7","Area ejemplo 8"];

    let respuesta;
    try {

         /*Chatbot Abastible 1.1 - Nueva Cuenta*/

         if (ACTION === "Action.NuevaCuenta.RutSolicitante") {
            let rutSolicitante = PARAMETERS.rutSolicitante;
            
            
            if (rutSolicitante === "11111111-1" && rutSolicitante.length <= LARGO_RUT_MAX) { 
                //***Voy al servicio a consultar si existe el Rut y si tiene perfil Jefatura***
                respuesta = functions.formResponseNewAccount("Ingrese los siguientes datos correspondientes al nuevo usuario:", "DWI-soportesap-nuevacuenta-rutsolicitante-followup", SESSION_ID, 1,PROYECT_ID);
            }else {
                //Si el Rut no existe devuelvo esto:
                respuesta = functions.basicResponse("Rut no existe. Intente nuevamente con otro RUT. (11111111-1)", "DefaultWelcomeIntent-soportesap-nuevacuenta-followup", SESSION_ID, 1);
                //Si el perfil no está habilitado devuelvo esto:
                if(rutSolicitante === "11111111-2") //este IF no va, es solo para simular perfil no habilitado
                respuesta = functions.basicResponse("Su perfil no tiene autorización para crear nueva cuenta. Intente nuevamente con otro RUT. (11111111-1)", "DefaultWelcomeIntent-soportesap-nuevacuenta-followup", SESSION_ID, 1);
            }
        }

        if (ACTION === "Action.NuevaCuenta.rutSolicitante-fallback") {
            respuesta = functions.basicResponse("Ingrese Rut con el siguiente formato XXXXXXXX-X", "DefaultWelcomeIntent-soportesap-nuevacuenta-followup", SESSION_ID, 1);
        }


        if(ACTION === "Action.NuevaCuenta.PrimerForm"){
            let rutNuevoUsuario = req.body.originalDetectIntentRequest.payload.formData["Rut Usuario Nuevo"];
            let nombre = req.body.originalDetectIntentRequest.payload.formData["Nombre"];
            let apellido = req.body.originalDetectIntentRequest.payload.formData["Apellido"];

            
            
            /*Check usuario existe*/

            if(rutNuevoUsuario === "11111111-2")    // No existe
                {
                    respuesta = functions.suggestionResponse("Ingrese Cargo: (Jefe)","DWI-soportesap-nuevacuenta-rutsolicitante-primerForm-followup",SESSION_ID,1,PROYECT_ID, CARGOS);
                }else{ //Si existe
                    respuesta = functions.formResponseNewAccountHidden("Rut existente. Ingrese un Rut nuevo por favor:","DWI-soportesap-nuevacuenta-rutsolicitante-followup",SESSION_ID,1,PROYECT_ID,nombre,apellido)
                }
        }

        if(ACTION === "Action.NuevaCuenta.Cargo"){
            let cargo = PARAMETERS.cargo;

            
            
            /*Check usuario existe*/

            if(CARGOS.includes(cargo)) //el cargo está dentro de la lista
                {
                    respuesta = functions.suggestionResponse("Ingrese Área: (Área ejemplo)","DWI-soportesap-nuevacuenta-rutsolicitante-primerForm-cargo-followup",SESSION_ID,1,PROYECT_ID, AREAS);
                }else{ //Si no está en la lista de cargos
                    respuesta = functions.suggestionResponse("Cargo desconocido, ingrese cargo nuevamente:","DWI-soportesap-nuevacuenta-rutsolicitante-primerForm-followup",SESSION_ID,1,PROYECT_ID, CARGOS);
                }
        }

        if(ACTION === "Action.NuevaCuenta.Area"){
            let area = PARAMETERS.area;

            /*Check usuario existe*/
            if(AREAS.includes(area)) //el area está dentro de la lista
                {
                    respuesta = functions.
                        formResponseNewAccount2("Perfecto! Necesito estos últimos datos correspondientes al nuevo usuario a crear:","DWI-soportesap-nuevacuenta-rutsolicitante-primerForm-cargo-area-followup",SESSION_ID,1,PROYECT_ID);
                }else{ //Si no está en la lista de areas
                    respuesta = functions.
                        suggestionResponse("Área desconocida, ingrese área nuevamente por favor:","DWI-soportesap-nuevacuenta-rutsolicitante-primerForm-cargo-followup",SESSION_ID,1,PROYECT_ID, AREAS);
                }
        }

        if(ACTION === "Action.NuevaCuenta.SegundoForm"){
            let correoNuevoUsuario = req.body.originalDetectIntentRequest.payload.formData["Correo Nuevo Usuario"];
            let nuevoUsuario = req.body.originalDetectIntentRequest.payload.formData["Usuario SAP"];

            console.log("//////////////////////" + correoNuevoUsuario)
            console.log(JSON.stringify(req.body.originalDetectIntentRequest.payload));
            console.log("//////////////////////" + nuevoUsuario)
            //caso 1: me vienen el usuario y el correo NUEVOS
            if(nuevoUsuario.length <= LARGO_USER_SAP_MAX && correoNuevoUsuario === "fsilva@gmail.com" && nuevoUsuario === "fsilva")              
                respuesta = functions.basicResponse("Ingrese usuario a homologar:","nuevacuenta-rutsolicitante-primerForm-cargo-area-segundoForm-followup",SESSION_ID,1);
            

            //caso 2: me vienen usuario y correo EXISTENTES
            if(correoNuevoUsuario !== "fsilva@gmail.com" && nuevoUsuario !== "fsilva")             
                respuesta = functions.formResponseHidden("Usuario y correo ya existen, ingrese nuevamente por favor:","DWI-soportesap-nuevacuenta-rutsolicitante-primerForm-cargo-area-followup",SESSION_ID,1,PROYECT_ID,"EMPTY","EMPTY","Usuario SAP","Correo Nuevo Usuario");
            

            //caso 3: me vienen correo EXISTENTES
            if(correoNuevoUsuario !== "fsilva@gmail.com" && nuevoUsuario === "fsilva")
                respuesta = functions.formResponseHiddenUser("Correo ya existe. Ingrese nuevamente:","DWI-soportesap-nuevacuenta-rutsolicitante-primerForm-cargo-area-followup",SESSION_ID,1,PROYECT_ID,"EMPTY","EMPTY",nuevoUsuario,"Usuario SAP","Correo Nuevo Usuario");            
                
            //caso 4: me vienen usuario EXISTENTES
            if(correoNuevoUsuario === "fsilva@gmail.com" && nuevoUsuario !== "fsilva")
                respuesta = functions.formResponseHiddenMail("Usuario ya existe. Ingrese nuevamente:","DWI-soportesap-nuevacuenta-rutsolicitante-primerForm-cargo-area-followup",SESSION_ID,1,PROYECT_ID,"EMPTY","EMPTY",correoNuevoUsuario,"Usuario SAP","Correo Nuevo Usuario");            

            //caso 5: largo de usuario
            if(nuevoUsuario.length > LARGO_USER_SAP_MAX && correoNuevoUsuario === "fsilva@gmail.com" && nuevoUsuario === "fsilva")
            respuesta = functions.formResponseHiddenMail("El usuario puede contener hasta 12 caracteres. Ingrese nuevamente:","DWI-soportesap-nuevacuenta-rutsolicitante-primerForm-cargo-area-followup",SESSION_ID,1,PROYECT_ID,"EMPTY","EMPTY",correoNuevoUsuario,"Usuario SAP","Correo Nuevo Usuario");            
        }

        if(ACTION === "Action.NuevaCuenta.UsuarioAHomologar"){
            let usuarioAhomologar = PARAMETERS.usuarioAhomologar;

            if(usuarioAhomologar === "fsilva"){
                respuesta = functions.suggestionChipsResponse("¿Es una cuenta temporal?","cargo-area-segundoForm-usuAhomologar-followup",SESSION_ID,1);
            }else{
                respuesta = functions.basicResponse("Usuario inexistente. Ingrese usuario a homologar:","nuevacuenta-rutsolicitante-primerForm-cargo-area-segundoForm-followup",SESSION_ID,1);
            }

        }

        if(ACTION === "Action.NuevaCuenta.NO"){
            respuesta = functions
                .basicResponse("Su solicitud se gestionó correctamente. Recibirá un email a su casilla la brevedad.","endNo",SESSION_ID,1);
        }

        if(ACTION === "Action.NuevaCuenta.SI"){
            respuesta = functions
                .oneDatePikerResponse("Ingrese fecha de caducidad","cargo-area-segundoForm-usuAhomologar-yes-followup",SESSION_ID,1);
        }

        if(ACTION === "Action.NuevaCuenta.FechaCaducidad"){
            let fecha = req.body.originalDetectIntentRequest.payload.formData["Fecha"];
            console.log("///////////////////////////////////////////////////",fecha)
            if(new Date(fecha) <= new Date()){
                respuesta = functions.oneDatePikerResponse("Debe de ser una fecha futura, ingrese nuevamente:", "cargo-area-segundoForm-usuAhomologar-yes-followup", SESSION_ID, 1,PROYECT_ID);
            }else{
                respuesta = functions.basicResponse("Su solicitud se gestionó correctamente. Recibirá un email a su casilla la brevedad.", "EndYes", SESSION_ID, 1,PROYECT_ID);
            }
        }
        

        






































        

        /*Chatbot Abastible 1.1 - Asignacion Transacción*/
        


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

            if(usuarioAasignar === "fsilva"){
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

            if(usuarioAmodificar === "fsilva"){
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
            if(email === "fsilva@gmail.com" && usuario === "fsilva")              
                respuesta = functions.basicResponse("Su solicitud se gestionó correctamente. Recibirá un email a su casilla la brevedad.","DWI-sopsap-modifcuen-rutSoli-UsuAMod-rutUsuNue-Form-followup",SESSION_ID,1);
            

            //caso 2: me vienen usuario y correo existentes
            if(email !== "fsilva@gmail.com" && usuario !== "fsilva")             
                respuesta = functions.formResponseHidden("Usuario y correo ya existen, ingrese nuevamente por favor:","DWI-sopsap-modifcuen-rutSoli-UsuAMod-rutUsuNue-followup",SESSION_ID,1,PROYECT_ID,nombre,apellido);
            

            //caso 3: me vienen correo existente
            if(email !== "fsilva@gmail.com" && usuario === "fsilva")
                respuesta = functions.formResponseHiddenUser("Correo ya existe. Ingrese nuevamente:","DWI-sopsap-modifcuen-rutSoli-UsuAMod-rutUsuNue-followup",SESSION_ID,1,PROYECT_ID,nombre,apellido,usuario);            
                
            //caso 4: me vienen usuario existente
            if(email === "fsilva@gmail.com" && usuario !== "fsilva")
                respuesta = functions.formResponseHiddenMail("Usuario ya existe. Ingrese nuevamente:","DWI-sopsap-modifcuen-rutSoli-UsuAMod-rutUsuNue-followup",SESSION_ID,1,PROYECT_ID,nombre,apellido,email);            
                
        }

        
























        /*Chatbot Abastible 1.0 - Desbloqueo y Reemplazo*/

        if (ACTION === "Action.desbloqueo") {
            let rut = PARAMETERS.rut;
            
            //let response = await functions.consultaRut(functions.sendDesbloqueo(rut, SESSION_ID));  
            
            if (rut === "11111111-1") { 
                respuesta = functions.basicResponse(response.fulfillmentText, "PRUEBA", SESSION_ID, 1);
            } else {
                respuesta = functions.basicResponse("No se encontró el RUT. Intente nuevamente con otro RUT. (11111111-1)", "DefaultWelcomeIntent-soportesap-desbloqueo-followup", SESSION_ID, 1);
            }
        }

        if (ACTION === "Action.Reemplazo-rutSolicitante") {
            
            let rut = PARAMETERS.rutSolicitante;

            //let response = await functions.consultaRut(functions.sendRemplazo(rut, SESSION_ID));

            if (rut === "11111111-1") { //Se encontró Rut
                respuesta = functions.basicResponse("Ingrese el rut del reemplazado. (11111111-2)", "DefaultWelcomeIntent-soportesap-remplazo-rut-followup", SESSION_ID, 1);
            } else {//No se encontró Rut
                respuesta = functions.basicResponse("No se encontró el RUT. Intente nuevamente con otro RUT.", "DefaultWelcomeIntent-soportesap-remplazo-followup", SESSION_ID, 1);
            }           

        }       


        if (ACTION === "Action.Reemplazo-rutReemplazante") {
            let rut = PARAMETERS.rutReemplazado;
            //let response = await functions.consultaRut(functions.sendRemplazo2(rut, SESSION_ID));

            
            if (rut === "11111111-2") { // se econtro rus reemplazante
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
