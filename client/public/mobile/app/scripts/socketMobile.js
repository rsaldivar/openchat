var tiempoEspera=172800;var socket=null;function download(a,b){window.open(a,"_system")}function onPause(){if(!localStorage.cameraOn){if(socket!=null&&socket.id!=null&&socket.id!=undefined){socket.emit("MobileD",localStorage.CveUsuario,function(a){socket.close();socket=null})}}}function onResume(){if(socket==null){initSocket()}}function initSocket(){document.addEventListener("pause",onPause,false);document.addEventListener("resume",onResume,false);var a=this;var b=false;localStorage.Mobile=true;if($("body").hasClass("ios")||$("body").hasClass("android")){window.FirebasePlugin.getToken(function(c){console.log(c);localStorage.TFB=c;if($("body").hasClass("ios")){window.FirebasePlugin.hasPermission(function(d){if(!d.isEnabled){window.FirebasePlugin.grantPermission()}})}window.FirebasePlugin.onNotificationOpen(function(d){if(d.tap){location.hash="Consult/"+d.Id}else{if(confirm(d.title)){location.hash="Consult/"+d.Id}}},function(d){console.error(d)})},function(c){console.error(c)})}socket=io.connect(localStorage.UrlNode,{query:"serial=de69977aedd808eaf8b7296768cfb91356bee5b9",transports:["websocket","polling"],reconnection:true,reconnectionDelay:60000000,reconnectionAttempts:tiempoEspera});console.log("Node.js Server connecting...");socket.on("connect",function(){loading_hide();var c={requestId:new Date()};socket.emit("new user",localStorage,c,localStorage.Version);socket.emit("get unseen count",localStorage.CveUsuario);socket.on("new guid",function(d){localStorage.Guid=d.Guid});socket.on("session iniciada previamente cerrar",function(d){alert(lang.session_started_another);logoutPreviousSession()});socket.on("session iniciada previamente notificar",function(d){console.log("Bienvenido ya se cerro la otra sesión activa.")});socket.on("limite license",function(){alert(lang.license_limit_reached);logout()});socket.on("cierre de session",function(){logout()});socket.on("new alert",function(d){alert(d.text,d.alertType)});socket.on("update user data",function(d){var f=d.map(function(g){return g}).indexOf(localStorage.CveUsuario);if(f!=-1){var e={Url:getUrl(Servicio.Usuario,"ObtenerUsuario"),Metodo:"GET",Funcion:function(h){console.log(h);for(var g in localStorage){if(h.hasOwnProperty(g)){localStorage[g]=h[g]}}},};getService(e)}});socket.on("update application",function(f){var d=new Date().toString(lang.format_date+" - hh:mm tt");var e=[{xtype:"notificationUpdate",mensaje:f.Detalle,fechaNotificacion:d,}];agregarElementos(e,"pnlNotifications");_$("notificationsEmtpyLabel").hide();_$("badge-notifications").addTotalNotifications(1)})});socket.on("error",function(c){if(!isClient()){loading()}});socket.on("connect_timeout",function(){ErrorEnConexion(lang.error_server_timeout)});socket.on("reconnect",function(){if(!isClient()){}});socket.on("reconnect_error",function(){ErrorEnConexion(lang.error_server_access)});socket.on("disconnect",function(){ErrorEnConexion(lang.problem_connecting)})}function ErrorEnConexion(a){if(!isClient()&&localStorage.IdUsuario!=null){if(localStorage.TimeOut==null&&(localStorage.blocked&&!localStorage.blocked)){localStorage.TimeOut=0}localStorage.TimeOut++;if(localStorage.TimeOut>tiempoEspera){loading();localStorage.blocked=true}else{if(localStorage.TimeOut%1000===0){alert(lang.error_socket_connection_first+" "+localStorage.TimeOut+" "+lang.of+" "+tiempoEspera+" "+lang.error_socket_connection_last,"warning")}}}if(localStorage.IdUsuario==null){logout()}};