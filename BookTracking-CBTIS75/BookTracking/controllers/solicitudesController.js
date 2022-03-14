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
solicitudesController.consultar_solicitante = (req, res) => {
  
}

//Consulta por libro
solicitudesController.consultar_libro = (req, res) => {
  
};
//Consulta por estatus
solicitudesController.consultar_estatus_solic = (req, res) => {

};

module.exports = solicitudesController;
