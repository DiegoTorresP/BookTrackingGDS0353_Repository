const solicitud = require("../models/solicitud");
const libros = require("../models/libro");
var cron = require('node-cron');

const sendGridMail = require("@sendgrid/mail");
var mongoose = require('mongoose');
var type = mongoose.Types;
ObjectId = type.ObjectId;
sendGridMail.setApiKey(process.env.SENDGRID_API_KEY);
var solicitudesController = {};
//Se crea tarea en cron para notificación de devolución
  /*
  
   # ┌────────────── second (optional)
   # │ ┌──────────── minute
   # │ │ ┌────────── hour
   # │ │ │ ┌──────── day of month
   # │ │ │ │ ┌────── month
   # │ │ │ │ │ ┌──── day of week
   # │ │ │ │ │ │
   # │ │ │ │ │ │
   # * * * * * *
  */
   cron.schedule('00 10 * * *', () => {
    console.log('Avisos');
    solicitud
    .aggregate([
      {
        $lookup: {
          from: "usuarios",
          localField: "Solicitante",
          foreignField: "_id",
          as: "nombre",
        },
      },
      {
        $unwind: "$nombre",
      },
      {
        $lookup: {
          from: "libros",
          localField: "Libro",
          foreignField: "_id",
          as: "libro",
        },
      },
      {
        $unwind: "$libro",
      },
      {
        $match:{
          Estatus_Prestamo:"Entregado"
        }
      }
    ])
    .exec((err, Solicitud) => {
      if (err) {
        console.log("Error: ", err);
        return;
      }
      console.log("The INDEX");
      console.log(Solicitud); 
      const fechaactual = new Date();
      var correoUsuario = "";
      var nombreUsuario = "";
      var nombreLibro = "";
      var fecha_entrega = "";
      Solicitud.forEach(function(solicitudes){
        //if para estatus de Entregado: se valida y manda correo cuando la fecha de entrega es en un dia.
        if(solicitudes.Fecha_Entrega.getUTCFullYear() == fechaactual.getFullYear() && solicitudes.Fecha_Entrega.getMonth()+1 == fechaactual.getMonth()+1 && solicitudes.Fecha_Entrega.getDate()-1 == fechaactual.getDate() ){
          //Enviando Correo
          console.log('Enviando correo')
          correoUsuario = solicitudes.nombre.Correo_Electronico_1;
          nombreUsuario = solicitudes.nombre.Nombre_s +" "+ solicitudes.nombre.Apellido_Paterno+" "+solicitudes.nombre.Apellido_Materno;
          nombreLibro = solicitudes.libro.Nombre;
          const asunto = "Recordatorio de entrega";
          // Creamos array con los meses del año
          const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
          // Creamos array con los días de la semana
          const dias_semana = ['Domingo', 'Lunes', 'martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
          //Procesamos fecha en Español
          fecha_entrega =dias_semana[ solicitudes.Fecha_Entrega.getDay()] + ', ' +  solicitudes.Fecha_Entrega.getDate() + ' de ' + meses[ solicitudes.Fecha_Entrega.getMonth()] + ' de ' +  solicitudes.Fecha_Entrega.getUTCFullYear();
          function getMessage() {
            const correo = `<!DOCTYPE html>
            <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width,initial-scale=1">
              <meta name="x-apple-disable-message-reformatting">
              <title></title>
              <style>
                table, td, div, h1, p {
                  font-family: Arial, sans-serif;
                }
                @media screen and (max-width: 530px) {
                  .unsub {
                    display: block;
                    padding: 8px;
                    margin-top: 14px;
                    border-radius: 6px;
                    background-color: #ffffff;
                    text-decoration: none !important;
                    font-weight: bold;
                  }
                  .col-lge {
                    max-width: 100% !important;
                  }
                }
                @media screen and (min-width: 531px) {
                  .col-sml {
                    max-width: 27% !important;
                  }
                  .col-lge {
                    max-width: 73% !important;
                  }
                }
              </style>
            </head>
            <body style="margin:0;padding:0;word-spacing:normal;background-color:#ffffff;">
              <div role="article" aria-roledescription="email" lang="en" style="text-size-adjust:100%;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;background-color:black;">
                <table role="presentation" style="width:100%;border:none;border-spacing:0;">
                  <tr>
                    <td align="center" style="padding:0;">
                      <!--[if mso]>
                      <table role="presentation" align="center" style="width:600px;">
                      <tr>
                      <td>
                      <![endif]-->
                      <table role="presentation" style="width:94%;max-width:600px;border:none;border-spacing:0;text-align:left;font-family:Arial,sans-serif;font-size:16px;line-height:22px;color:#363636;">
                        <tr>
                          <td style="padding:40px 30px 30px 30px;text-align:center;font-size:24px;font-weight:bold;">
                            <a href="http://www.example.com/" style="text-decoration:none;"><img src="https://diegotorresp.github.io/resources/bt.png" width="1000" alt="Logo" style="width:165px;max-width:80%;height:auto;border:none;text-decoration:none;color:#ffffff;"></a>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding:30px;background-color:#ffffff;border-radius:50px">
                            <h1 style="margin-top:0;margin-bottom:16px;font-size:26px;line-height:32px;font-weight:bold;letter-spacing:-0.02em;"> <center>Recordatorio 🕓</center></h1>
                            <p style="margin:0;"><center>Recordatorio:</center>
                            <center>${nombreUsuario} te recordamos que la entrega del libro ${nombreLibro} es el mañana ${fecha_entrega}.</center>
                            <center>Te solicitamos entregarlo en día señalado para evitar sanciones</center>
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding:0;font-size:24px;line-height:28px;font-weight:bold;">
                            <a href="http://www.example.com/" style="text-decoration:none;"><img src="https://diegotorresp.github.io/resources/libroscorreo.png" width="300" alt="" style="width:100%;height:auto;display:block;border:none;text-decoration:none;color:#363636;"></a>
                          </td>
                        </tr>
                        
                       
                          <td style="padding:30px;text-align:center;font-size:12px;color:#cccccc;">
                            <p style="margin:0 0 8px 0;"><a href="" style="text-decoration:none;"><img src="https://assets.codepen.io/210284/facebook_1.png" width="40" height="40" alt="f" style="display:inline-block;color:#cccccc;"></a> <a href="" style="text-decoration:none;"><img src="https://assets.codepen.io/210284/twitter_1.png" width="40" height="40" alt="t" style="display:inline-block;color:#cccccc;"></a></p>
                            <p style="margin:0;font-size:14px;line-height:20px;">&reg; Cbtis2022<br></p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </div>
            </body>
            </html>`
            return {
              to: correoUsuario,
              from: "bibliotecacbtis75@gmail.com",
              subject: asunto,
              text: "Correo Recordatorio",
              html: correo ,
            };
          }
        
          async function sendEmail() {
            try {
              await sendGridMail.send(getMessage());
              console.log("Test email sent successfully");
            } catch (error) {
              console.error("Error sending test email");
              console.error(error);
              if (error.response) {
                console.error(error.response.body);
              }
            }
          }

          (async () => {
            console.log("Sending test email");
            await sendEmail();
          })();

        }
      }); 
    });
  });

  //Se crea tarea en cron para notificación cancelacion por tiempo
  /*
  
   # ┌────────────── second (optional)
   # │ ┌──────────── minute
   # │ │ ┌────────── hour
   # │ │ │ ┌──────── day of month
   # │ │ │ │ ┌────── month
   # │ │ │ │ │ ┌──── day of week
   # │ │ │ │ │ │
   # │ │ │ │ │ │
   # * * * * * *
  */
   cron.schedule('00 8-14 * * *', () => {
    console.log('Avisos Entregas');
    solicitud
    .aggregate([
      {
        $lookup: {
          from: "usuarios",
          localField: "Solicitante",
          foreignField: "_id",
          as: "nombre",
        },
      },
      {
        $unwind: "$nombre",
      },
      {
        $lookup: {
          from: "libros",
          localField: "Libro",
          foreignField: "_id",
          as: "libro",
        },
      },
      {
        $unwind: "$libro",
      },
      {
        $match:{
          Estatus_Prestamo:"Aceptado"
        }
      }
    ])
    .exec((err, Solicitud) => {
      if (err) {
        console.log("Error: ", err);
        return;
      }
      console.log("The INDEX");
      console.log(Solicitud); 
      const fechaactual = new Date();
      var correoUsuario = "";
      var nombreUsuario = "";
      var nombreLibro = "";
      var fecha_entrega = "";
      Solicitud.forEach(function(solicitudes){
        //if para estatus de Entregado: se valida y manda correo cuando la fecha de entrega es en un dia.
        if(solicitudes.Fecha_Entrega.getUTCFullYear() == fechaactual.getFullYear() && solicitudes.Fecha_Entrega.getMonth()+1 == fechaactual.getMonth()+1 && solicitudes.Fecha_Entrega.getDate() == fechaactual.getDate() && solicitudes.Fecha_Entrega.getHours() < fechaactual.getHours() ){
          //Enviando Correo
          console.log('Enviando correo')
          correoUsuario = solicitudes.nombre.Correo_Electronico_1;
          nombreUsuario = solicitudes.nombre.Nombre_s +" "+ solicitudes.nombre.Apellido_Paterno+" "+solicitudes.nombre.Apellido_Materno;
          nombreLibro = solicitudes.libro.Nombre;
          const asunto = "Prestamo Cancelado";
          // Creamos array con los meses del año
          const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
          // Creamos array con los días de la semana
          const dias_semana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
          //Procesamos fecha en Español
          fecha_entrega =dias_semana[ solicitudes.Fecha_Entrega.getDay()] + ', ' +  solicitudes.Fecha_Entrega.getDate() + ' de ' + meses[ solicitudes.Fecha_Entrega.getMonth()] + ' de ' +  solicitudes.Fecha_Entrega.getUTCFullYear();
          function getMessage() {
            const correo = `<!DOCTYPE html>
            <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width,initial-scale=1">
              <meta name="x-apple-disable-message-reformatting">
              <title></title>
              <style>
                table, td, div, h1, p {
                  font-family: Arial, sans-serif;
                }
                @media screen and (max-width: 530px) {
                  .unsub {
                    display: block;
                    padding: 8px;
                    margin-top: 14px;
                    border-radius: 6px;
                    background-color: #ffffff;
                    text-decoration: none !important;
                    font-weight: bold;
                  }
                  .col-lge {
                    max-width: 100% !important;
                  }
                }
                @media screen and (min-width: 531px) {
                  .col-sml {
                    max-width: 27% !important;
                  }
                  .col-lge {
                    max-width: 73% !important;
                  }
                }
              </style>
            </head>
            <body style="margin:0;padding:0;word-spacing:normal;background-color:#ffffff;">
              <div role="article" aria-roledescription="email" lang="en" style="text-size-adjust:100%;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;background-color:black;">
                <table role="presentation" style="width:100%;border:none;border-spacing:0;">
                  <tr>
                    <td align="center" style="padding:0;">
                      <!--[if mso]>
                      <table role="presentation" align="center" style="width:600px;">
                      <tr>
                      <td>
                      <![endif]-->
                      <table role="presentation" style="width:94%;max-width:600px;border:none;border-spacing:0;text-align:left;font-family:Arial,sans-serif;font-size:16px;line-height:22px;color:#363636;">
                        <tr>
                          <td style="padding:40px 30px 30px 30px;text-align:center;font-size:24px;font-weight:bold;">
                            <a href="http://www.example.com/" style="text-decoration:none;"><img src="https://diegotorresp.github.io/resources/bt.png" width="1000" alt="Logo" style="width:165px;max-width:80%;height:auto;border:none;text-decoration:none;color:#ffffff;"></a>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding:30px;background-color:#ffffff;border-radius:50px">
                            <h1 style="margin-top:0;margin-bottom:16px;font-size:26px;line-height:32px;font-weight:bold;letter-spacing:-0.02em;"> <center>Cancelación de prestamo ❌</center></h1>
                            <p style="margin:0;"><center>Anuncio:</center>
                            <center>${nombreUsuario} tu prestamo del libro ${nombreLibro} se ha cancelado dado que el horario de entrega ${solicitudes.Fecha_Entrega.getHours()}:00 ha pasado.</center>
                            <center>Te solicitamos volver a hacer el proceso</center>
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding:0;font-size:24px;line-height:28px;font-weight:bold;">
                            <a href="http://www.example.com/" style="text-decoration:none;"><img src="https://diegotorresp.github.io/resources/libroscorreo.png" width="300" alt="" style="width:100%;height:auto;display:block;border:none;text-decoration:none;color:#363636;"></a>
                          </td>
                        </tr>
                        
                       
                          <td style="padding:30px;text-align:center;font-size:12px;color:#cccccc;">
                            <p style="margin:0 0 8px 0;"><a href="" style="text-decoration:none;"><img src="https://assets.codepen.io/210284/facebook_1.png" width="40" height="40" alt="f" style="display:inline-block;color:#cccccc;"></a> <a href="" style="text-decoration:none;"><img src="https://assets.codepen.io/210284/twitter_1.png" width="40" height="40" alt="t" style="display:inline-block;color:#cccccc;"></a></p>
                            <p style="margin:0;font-size:14px;line-height:20px;">&reg; Cbtis2022<br></p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </div>
            </body>
            </html>`
            return {
              to: correoUsuario,
              from: "bibliotecacbtis75@gmail.com",
              subject: asunto,
              text: "Correo Recordatorio",
              html: correo ,
            };
          }
        
          async function sendEmail() {
            try {
              await sendGridMail.send(getMessage());
              console.log("Test email sent successfully");
            } catch (error) {
              console.error("Error sending test email");
              console.error(error);
              if (error.response) {
                console.error(error.response.body);
              }
            }
          }

          (async () => {
            console.log("Sending test email");
            await sendEmail();
          })();
          //Aqui actualizacion estatus
          solicitud
            .updateOne(
              { _id: solicitudes._id },
              {
                $set: {
                  Estatus_Prestamo: "Cancelado",
                },
              }
            ).exec((err, res) => {
              if (err) {
                console.log("Error: ", err);
                return;
              }
              console.log("Actualizacion Realizada");
              console.log(res);
            });
            //Aqui actualizacion de libro
            libros
            .updateOne(
              { _id: solicitudes.libro._id },
              {
                $inc: {
                  Unidades_Disponibles: 1,
                },
              }
            ).exec((err, res) => {
              if (err) {
                console.log("Error: ", err);
                return;
              }
              console.log("Actualizacion Realizada");
              console.log(res);
            });
        }
      }); 
    });
  });


//Mostar todos los alumnos
solicitudesController.mostar = (req, res) => {
  solicitud
    .aggregate([
      {
        $lookup: {
          from: "usuarios",
          localField: "Solicitante",
          foreignField: "_id",
          as: "nombre",
        },
      },
      {
        $unwind: "$nombre",
      },
      {
        $lookup: {
          from: "libros",
          localField: "Libro",
          foreignField: "_id",
          as: "libro",
        },
      },
      {
        $unwind: "$libro",
      }
    ])
    .exec((err, Solicitud) => {
      if (err) {
        console.log("Error: ", err);
        return;
      }
      console.log("The INDEX");
      console.log(Solicitud);
      console.log('Fecha: '+Solicitud.Fecha_Entrega);
      return res.render("admin_solicitudes", { Solicitud: Solicitud });
    });
};

//Consulta por solicitante.
solicitudesController.consultar_solicitante = () => {};

//Consulta por libro
solicitudesController.consultar_libro = () => {};
//Consulta por estatus
solicitudesController.consultar_estatus_solic = () => {};

//Crear solicitud manual
solicitudesController.crear_solicitud_manual =  (req, res)=>{
  console.log("Creando nueva solicitud manual");
  const stock = req.params.Unidades_Disponibles;
  if (stock > 1) {
    const fecha = new Date();
    const id = req.params.id;
    const sol = req.body.solicitante;
    console.log("Solicitante: "+sol)
    //console.log(req.params.matricula);
    console.log(id);
    const Solicitud = new solicitud({
      Solicitante: sol,
      Libro: id,
      Fecha_Solicitud: fecha.toISOString(),
      Estatus_Prestamo: "En Espera",
      Fecha_Entrega: fecha.toISOString(),
      Incidencias: false,
    });
    console.log(Solicitud);
    Solicitud.save(function (err) {
      if (err) {
        return res.status(500).json({
          message: "Error al crear solicitud",
        });
      }
      res.redirect("/administrar/actualizar_unidades/" + id);
    });
  } else {
    //Cambiar por Sweet Alert
    return res.status(500).json({
      message: "Error, no hay stock",
    });
  }
}


//Crear Solicitud
solicitudesController.crear_solicitud = (req, res) => {
  console.log("Creando nueva solicitud");
  const stock = req.params.Unidades_Disponibles;
  if (stock > 1) {
    const fecha = new Date();
    const id = req.params.id;
    const usuario = req.session.usuario;
    //console.log(req.params.matricula);
    console.log(id);
    const Solicitud = new solicitud({
      Solicitante: usuario,
      Libro: id,
      Fecha_Solicitud: fecha.toISOString(),
      Estatus_Prestamo: "En Espera",
      Fecha_Entrega: fecha.toISOString(),
      Incidencias: false,
    });
    console.log(Solicitud);
    Solicitud.save(function (err) {
      if (err) {
        return res.status(500).json({
          message: "Error al crear solicitud",
        });
      }
      res.redirect("/alumnos/actualizar_unidades/" + id);
    });
  } else {
    //Cambiar por Sweet Alert
    return res.status(500).json({
      message: "Error, no hay stock",
    });
  }
};

//actualizacion estatus
solicitudesController.actualizarEstatus = (req, res) => {
  const id = req.params.id;
  var correoUsuario = "";
  var nombreUsuario = "";
  var nombreLibro = "";
  var Fecha_Solicitud = "";

  //hacer consulta con id a coleccion de solicitudes
  solicitud
  .aggregate([
    {
      $lookup: {
        from: "usuarios",
        localField: "Solicitante",
        foreignField: "_id",
        as: "nombre",
      },
    },
    {
      $unwind: "$nombre",
    },
    {
      $lookup: {
        from: "libros",
        localField: "Libro",
        foreignField: "_id",
        as: "libro",
      },
    },
    {
      $unwind: "$libro",
    },{
      $match:{
        _id:ObjectId(id)
      }
    }

  ])  
    .exec((err, Solicitud) => {
      if (err) {
        console.log("Error: ", err);
        return;
      }
      console.log("Solicitud");
      console.log(Solicitud);
      Solicitud.forEach(function(solicitud){
        correoUsuario = solicitud.nombre.Correo_Electronico_1;
        nombreUsuario = solicitud.nombre.Nombre_s +" "+ solicitud.nombre.Apellido_Paterno+" "+solicitud.nombre.Apellido_Materno;
        nombreLibro = solicitud.libro.Nombre;
        // Creamos array con los meses del año
        const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
        // Creamos array con los días de la semana
        const dias_semana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
        //Procesamos fecha en Español
        Fecha_Solicitud =dias_semana[ solicitud.Fecha_Solicitud.getDay()] + ', ' +  solicitud.Fecha_Solicitud.getDate() + ' de ' + meses[ solicitud.Fecha_Solicitud.getMonth()] + ' de ' +  solicitud.Fecha_Solicitud.getUTCFullYear();
      })
    });
  //extraer informacion de alumnos
  const fecha = new Date();
  const asunto = "Solicitud de Libro Aceptada";
  //Convertirmos a Español y verificamos horario
  const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  const dias_semana = ['Domingo', 'Lunes', 'martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  //Procesamos fecha en Español y validamos hora
  if(fecha.getDay()==0){
    //si es domingo
    fecha.setDate(fecha.getDate() + 1);
    fecha.setHours(08);
    fecha.setMinutes(00);
  }else if (fecha.getDay()==6){
    //Si es sabado
    fecha.setDate(fecha.getDate() + 2);
    fecha.setHours(08);
    fecha.setMinutes(00);
  }else if(fecha.getHours()>13){
    //Si pasa de las 13 horas entrega al dia siguiente
    fecha.setDate(fecha.getDate() + 1);
    fecha.setHours(08);
    fecha.setMinutes(00);
  }
  //Agregar un hora a la fecha para la entrega
  fecha.setHours(fecha.getHours()+1);
  //Agregar un hora a la fecha para la entrega
  if(fecha.getMinutes()!=0){
    fecha.setHours(fecha.getHours()+1);
    fecha.setMinutes(0);
  }
  var fecha_esp=dias_semana[ fecha.getDay()] + ', ' +  fecha.getDate() + ' de ' + meses[ fecha.getMonth()] + ' de ' +  fecha.getUTCFullYear();  
  
  //añadir metodo sendEmail()
  function getMessage() {
    const correo = `<!DOCTYPE html>
    <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width,initial-scale=1">
      <meta name="x-apple-disable-message-reformatting">
      <title></title>
      <style>
        table, td, div, h1, p {
          font-family: Arial, sans-serif;
        }
        @media screen and (max-width: 530px) {
          .unsub {
            display: block;
            padding: 8px;
            margin-top: 14px;
            border-radius: 6px;
            background-color: #ffffff;
            text-decoration: none !important;
            font-weight: bold;
          }
          .col-lge {
            max-width: 100% !important;
          }
        }
        @media screen and (min-width: 531px) {
          .col-sml {
            max-width: 27% !important;
          }
          .col-lge {
            max-width: 73% !important;
          }
        }
      </style>
    </head>
    <body style="margin:0;padding:0;word-spacing:normal;background-color:#ffffff;">
      <div role="article" aria-roledescription="email" lang="en" style="text-size-adjust:100%;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;background-color:black;">
        <table role="presentation" style="width:100%;border:none;border-spacing:0;">
          <tr>
            <td align="center" style="padding:0;">
              <!--[if mso]>
              <table role="presentation" align="center" style="width:600px;">
              <tr>
              <td>
              <![endif]-->
              <table role="presentation" style="width:94%;max-width:600px;border:none;border-spacing:0;text-align:left;font-family:Arial,sans-serif;font-size:16px;line-height:22px;color:#363636;">
                <tr>
                  <td style="padding:40px 30px 30px 30px;text-align:center;font-size:24px;font-weight:bold;">
                    <a href="http://www.example.com/" style="text-decoration:none;"><img src="https://diegotorresp.github.io/resources/bt.png" width="1000" alt="Logo" style="width:165px;max-width:80%;height:auto;border:none;text-decoration:none;color:#ffffff;"></a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:30px;background-color:#ffffff;border-radius:50px">
                    <h1 style="margin-top:0;margin-bottom:16px;font-size:26px;line-height:32px;font-weight:bold;letter-spacing:-0.02em;"> <center>Tu Solicitud de Prestamo fue Aceptada ✔</center></h1>
                    <p style="margin:0;"><center>Información de prestamo:</center>
                    <center>${nombreUsuario} tu solicitud del libro ${nombreLibro} con fecha del ${Fecha_Solicitud} ha sido aprobada.</center>
                    <center>Favor de pasar a recoger tu libro con tu código QR</center>
                    <center>Deberas recogerlo en biblioteca el ${fecha_esp} antes de las ${fecha.getHours()}:${fecha.getMinutes()}0 hrs.</center>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:0;font-size:24px;line-height:28px;font-weight:bold;">
                    <a href="http://www.example.com/" style="text-decoration:none;"><img src="https://diegotorresp.github.io/resources/libroscorreo.png" width="300" alt="" style="width:100%;height:auto;display:block;border:none;text-decoration:none;color:#363636;"></a>
                  </td>
                </tr>
                
               
                  <td style="padding:30px;text-align:center;font-size:12px;color:#cccccc;">
                    <p style="margin:0 0 8px 0;"><a href="" style="text-decoration:none;"><img src="https://assets.codepen.io/210284/facebook_1.png" width="40" height="40" alt="f" style="display:inline-block;color:#cccccc;"></a> <a href="" style="text-decoration:none;"><img src="https://assets.codepen.io/210284/twitter_1.png" width="40" height="40" alt="t" style="display:inline-block;color:#cccccc;"></a></p>
                    <p style="margin:0;font-size:14px;line-height:20px;">&reg; Cbtis2022<br></p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </div>
    </body>
    </html>`
    return {
      to: correoUsuario,
      from: "bibliotecacbtis75@gmail.com",
      subject: asunto,
      text: "Correo de confirmación",
      html: correo ,
    };
  }

  async function sendEmail() {
    try {
      await sendGridMail.send(getMessage());
      console.log("Test email sent successfully");
    } catch (error) {
      console.error("Error sending test email");
      console.error(error);
      if (error.response) {
        console.error(error.response.body);
      }
    }
  }

  solicitud
    .updateOne(
      { _id: id },
      {
        $set: {
          Estatus_Prestamo: "Aceptado",
          Fecha_Entrega: fecha,
        },
      }
    )
    .exec((err, Libro) => {
      if (err) {
        console.log("Error al actualizar el libro:", err);
        return;
      }
      console.log("The INDEX");
      console.log(Libro);
      (async () => {
        console.log("Sending test email");
        await sendEmail();
      })();
      res.redirect("/administrar/solicitudes");
    });
};

//actualizacion estatus por Denegacion
solicitudesController.actualizarEstatus_denegado = (req, res) => {
  const id = req.params.id;
  var correoUsuario = "";
  var nombreUsuario = "";
  var nombreLibro = "";
  var Fecha_Solicitud = "";

  //hacer consulta con id a coleccion de solicitudes
  solicitud
  .aggregate([
    {
      $lookup: {
        from: "usuarios",
        localField: "Solicitante",
        foreignField: "_id",
        as: "nombre",
      },
    },
    {
      $unwind: "$nombre",
    },
    {
      $lookup: {
        from: "libros",
        localField: "Libro",
        foreignField: "_id",
        as: "libro",
      },
    },
    {
      $unwind: "$libro",
    },{
      $match:{
        _id:ObjectId(id)
      }
    }

  ])  
    .exec((err, Solicitud) => {
      if (err) {
        console.log("Error: ", err);
        return;
      }
      console.log("Solicitud"); 
      console.log(Solicitud);
      Solicitud.forEach(function(solicitud){
        correoUsuario = solicitud.nombre.Correo_Electronico_1;
        nombreUsuario = solicitud.nombre.Nombre_s +" "+ solicitud.nombre.Apellido_Paterno+" "+solicitud.nombre.Apellido_Materno;
        nombreLibro = solicitud.libro.Nombre;
        // Creamos array con los meses del año
        const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
        // Creamos array con los días de la semana
        const dias_semana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
        //Procesamos fecha en Español
        Fecha_Solicitud = dias_semana[ solicitud.Fecha_Solicitud.getDay()] + ', ' +  solicitud.Fecha_Solicitud.getDate() + ' de ' + meses[ solicitud.Fecha_Solicitud.getMonth()] + ' de ' +  solicitud.Fecha_Solicitud.getUTCFullYear();
      })
    });
  //extraer informacion de alumnos
  
  const asunto = "Solicitud de Libro Rechazada";
  //añadir metodo sendEmail()
  function getMessage() {
    const correo = `<!DOCTYPE html>
    <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width,initial-scale=1">
      <meta name="x-apple-disable-message-reformatting">
      <title></title>
      <style>
        table, td, div, h1, p {
          font-family: Arial, sans-serif;
        }
        @media screen and (max-width: 530px) {
          .unsub {
            display: block;
            padding: 8px;
            margin-top: 14px;
            border-radius: 6px;
            background-color: #ffffff;
            text-decoration: none !important;
            font-weight: bold;
          }
          .col-lge {
            max-width: 100% !important;
          }
        }
        @media screen and (min-width: 531px) {
          .col-sml {
            max-width: 27% !important;
          }
          .col-lge {
            max-width: 73% !important;
          }
        }
      </style>
    </head>
    <body style="margin:0;padding:0;word-spacing:normal;background-color:#ffffff;">
      <div role="article" aria-roledescription="email" lang="en" style="text-size-adjust:100%;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;background-color:black;">
        <table role="presentation" style="width:100%;border:none;border-spacing:0;">
          <tr>
            <td align="center" style="padding:0;">
              <!--[if mso]>
              <table role="presentation" align="center" style="width:600px;">
              <tr>
              <td>
              <![endif]-->
              <table role="presentation" style="width:94%;max-width:600px;border:none;border-spacing:0;text-align:left;font-family:Arial,sans-serif;font-size:16px;line-height:22px;color:#363636;">
                <tr>
                  <td style="padding:40px 30px 30px 30px;text-align:center;font-size:24px;font-weight:bold;">
                    <a href="" style="text-decoration:none;"><img src="https://diegotorresp.github.io/resources/bt.png" width="1000" alt="Logo" style="width:165px;max-width:80%;height:auto;border:none;text-decoration:none;color:#ffffff;"></a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:30px;background-color:#ffffff;border-radius:50px">
                    <h1 style="margin-top:0;margin-bottom:16px;font-size:26px;line-height:32px;font-weight:bold;letter-spacing:-0.02em;"> <center>Tu Solicitud de Prestamo fue Rechazada ❌</center></h1>
                    <p style="margin:0;"><center>Información de prestamo:</center>
                    <center>${nombreUsuario} tu solicitud del libro ${nombreLibro} con fecha del ${Fecha_Solicitud} ha sido RECHAZADA.</center>
                    <center>Si crees que se debe a un Error solicita nuevamente el Libro o bien puedes pedir una aclaración en biblioteca</center>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:0;font-size:24px;line-height:28px;font-weight:bold;">
                    <a href="" style="text-decoration:none;"><img src="https://diegotorresp.github.io/resources/libroscorreo.png" width="300" alt="" style="width:100%;height:auto;display:block;border:none;text-decoration:none;color:#363636;"></a>
                  </td>
                </tr>
                
               
                  <td style="padding:30px;text-align:center;font-size:12px;color:#cccccc;">
                    <p style="margin:0 0 8px 0;"><a href="" style="text-decoration:none;"><img src="https://assets.codepen.io/210284/facebook_1.png" width="40" height="40" alt="f" style="display:inline-block;color:#cccccc;"></a> <a href="" style="text-decoration:none;"><img src="https://assets.codepen.io/210284/twitter_1.png" width="40" height="40" alt="t" style="display:inline-block;color:#cccccc;"></a></p>
                    <p style="margin:0;font-size:14px;line-height:20px;">&reg; Cbtis2022<br></p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </div>
    </body>
    </html>`
    return {
      to: correoUsuario,
      from: "bibliotecacbtis75@gmail.com",
      subject: asunto,
      text: "Correo Informativo",
      html: correo ,
    };
  }

  async function sendEmail() {
    try {
      await sendGridMail.send(getMessage());
      console.log("Test email sent successfully");
    } catch (error) {
      console.error("Error sending test email");
      console.error(error);
      if (error.response) {
        console.error(error.response.body);
      }
    }
  }

  solicitud
    .updateOne(
      { _id: id },
      {
        $set: {
          Estatus_Prestamo: "Denegado",
        },
      }
    )
    .exec((err, Libro) => {
      if (err) {
        console.log("Error al actualizar el libro:", err);
        return;
      }
      console.log("The INDEX");
      console.log(Libro);
      (async () => {
        console.log("Sending test email");
        await sendEmail();
      })();
      res.redirect("/administrar/actualizar_denegacion/"+id);
    });
};

//Mostar historial


solicitudesController.mostarHistorial = (req, res) => {
  
  const usuario = req.session.usuario;
  console.log(req.session.usuario)
  solicitud
    .aggregate([
       
      {
        $lookup: {
          from: "usuarios",
          localField: "Solicitante",
          foreignField: "_id",
          as: "nombre",
        },
      },
      {
        $unwind: "$nombre",
      },
      {
        $lookup: {
          from: "libros",
          localField: "Libro",
          foreignField: "_id",
          as: "libro",
        },
      },
      {
        $unwind: "$libro",
      },
      {
        $match: {
          Solicitante:Number(usuario)
        }
      }
    ])
    .exec((err, Solicitud) => {
   
      if (err) {
        console.log("Error: ", err);
        return;
      }
      console.log("The INDEX");
      console.log(Solicitud);
      return res.render("alumnos_entregas_solicitudes_prestamos", { Solicitud : Solicitud});
    });
};

module.exports = solicitudesController;
