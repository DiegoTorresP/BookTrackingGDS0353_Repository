const solicitud = require("../models/solicitud");
const sendGridMail = require("@sendgrid/mail");
var mongoose = require('mongoose');
var type = mongoose.Types;
ObjectId = type.ObjectId;
sendGridMail.setApiKey(process.env.SENDGRID_API_KEY);
var solicitudesController = {};

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
      },
    ])
    .exec((err, Solicitud) => {
      if (err) {
        console.log("Error: ", err);
        return;
      }
      console.log("The INDEX");
      console.log(Solicitud);
      return res.render("solicitudes", { Solicitud: Solicitud });
    });
};

//Consulta por solicitante.
solicitudesController.consultar_solicitante = () => {};

//Consulta por libro
solicitudesController.consultar_libro = () => {};
//Consulta por estatus
solicitudesController.consultar_estatus_solic = () => {};

//Crear Solicitud
solicitudesController.crear_solicitud = (req, res) => {
  console.log("Creando nueva solicitud");
  const stock = req.params.UnidadesDisponibles;
  if (stock > 1) {
    const fecha = new Date();
    const id = req.params.id;
    //console.log(req.params.matricula);
    console.log(id);
    const Solicitud = new solicitud({
      Solicitante: 1220100050,
      Libro: id,
      FechaSolicitud: fecha.toISOString(),
      EstatusPrestamo: "En Espera",
      FechaEntrega: fecha.toISOString(),
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
  var fechaSolicitud = "";

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
        fechaSolicitud = solicitud.FechaSolicitud;
      })
    });
  //extraer informacion de alumnos
  
  
  const fecha = new Date();
  const asunto = "Solicitud de Libro Aceptada";
  fecha.setDate(fecha.getDate() + 3);
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
                    <a href="http://www.example.com/" style="text-decoration:none;"><img src="https://cdn.pixabay.com/photo/2022/03/13/05/00/logo-7065296_960_720.png" width="1000" alt="Logo" style="width:165px;max-width:80%;height:auto;border:none;text-decoration:none;color:#ffffff;"></a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:30px;background-color:#ffffff;border-radius:50px">
                    <h1 style="margin-top:0;margin-bottom:16px;font-size:26px;line-height:32px;font-weight:bold;letter-spacing:-0.02em;"> <center>Tu Solicitud de Prestamo fue Aceptada ✔</center></h1>
                    <p style="margin:0;"><center>Información de prestamo:</center>
                    <center>${nombreUsuario} tu solicitud del libro ${nombreLibro} con fecha del ${fechaSolicitud} ha sido aprobada.</center>
                    <center>Favor de pasar a recoger tu libro con tu código QR</center>
                    <center>Deberas entregarlo antes del ${fecha}.</center>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:0;font-size:24px;line-height:28px;font-weight:bold;">
                    <a href="http://www.example.com/" style="text-decoration:none;"><img src="https://cdn.pixabay.com/photo/2022/03/24/04/49/04-49-18-926_960_720.png" width="300" alt="" style="width:100%;height:auto;display:block;border:none;text-decoration:none;color:#363636;"></a>
                  </td>
                </tr>
                
               
                  <td style="padding:30px;text-align:center;font-size:12px;color:#cccccc;">
                    <p style="margin:0 0 8px 0;"><a href="http://www.facebook.com/" style="text-decoration:none;"><img src="https://assets.codepen.io/210284/facebook_1.png" width="40" height="40" alt="f" style="display:inline-block;color:#cccccc;"></a> <a href="http://www.twitter.com/" style="text-decoration:none;"><img src="https://assets.codepen.io/210284/twitter_1.png" width="40" height="40" alt="t" style="display:inline-block;color:#cccccc;"></a></p>
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
          EstatusPrestamo: "Aceptado",
          FechaEntrega: fecha,
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

  //añadir metodo sendEmail()
  function getMessage() {
    const body = "Denegación de Solicitud";
    return {
      to: "topd001130@gmail.com",
      from: "bibliotecacbtis75@gmail.com",
      subject: "Correo de Prueba",
      text: body,
      html: `<strong>${body}</strong>` ,
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
          EstatusPrestamo: "Denegado",
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

module.exports = solicitudesController;
