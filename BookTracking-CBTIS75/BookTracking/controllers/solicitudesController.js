const solicitud = require("../models/solicitud");
var moment = require("moment"); // require

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
solicitudesController.consultar_solicitante = (req, res) => {};

//Consulta por libro
solicitudesController.consultar_libro = (req, res) => {};
//Consulta por estatus
solicitudesController.consultar_estatus_solic = (req, res) => {};

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
      Solicitante: 17211040031166,
      Libro: id,
      FechaSolicitud: fecha.toISOString(),
      EstatusPrestamo: "En Espera",
      FechaEntrega:fecha.toISOString(),
      Incidencias: false,
    });
    console.log(Solicitud);
    Solicitud.save(function (err, solicitud) {
      if (err) {
        return res.status(500).json({
          message: "Error al crear solicitud",
        });
      }
      res.redirect("/alumnos/actualizar_unidades/"+id);
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
  const fecha = new Date();
  fecha.setDate(fecha.getDate()+3);
  solicitud.updateOne(
    { "_id": id },
    {
      $set: {
        EstatusPrestamo: "Aceptado",
        FechaEntrega:fecha
      },
    }
  ).exec((err, Libro) => {
    if (err) {
      console.log("Error al actualizar el libro:", err);
      return;
    }
    console.log("The INDEX");
    console.log(Libro);
    res.redirect("/administrar/solicitudes");
  });
};

 

module.exports = solicitudesController;
