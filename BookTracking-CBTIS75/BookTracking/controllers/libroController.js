const { updateOne } = require("../models/libro");
const Libro = require("../models/libro");

var libroController = {};

//Mostar todos los libros a administrar
libroController.mostar = (req, res) => {
  Libro.find({}).exec((err, libro) => {
    if (err) {
      console.log("Error: ", err);
      return;
    }
    Libro.aggregate(
      [{
        $group:
        {
          _id:"$Editorial"
        }
      }
      ]
    ).exec((err, edi)=>{
      console.log("The INDEX");
    console.log(edi);
    return res.render("admin_buscar", {
      Libro: libro, edi:edi
    });
    })
  });
};

//Mostar todos los libros a alumnos
libroController.mostarAlumno = (req, res) => {
  Libro.find({}).exec((err, Libro) => {
    if (err) {
      console.log("Error: ", err);
      return;
    }
    console.log("The INDEX");
    console.log(Libro);
    return res.render("buscar_solicitar_libro", {
      Libro: Libro,
    });
  });
};

libroController.crear = (req, res) => {
  console.log("Registrando Libro");

  var arr = [];
    
  
  const libro = new Libro({
    Nombre: req.body.nombre,
    Autor: arr.push(req.body.autor,req.body.autor1),
    Editorial: req.body.editorial,
    LugarEdicion: req.body.lugarE,
    FechaEdicion: req.body.fechaE,
    AñoEntrada: req.body.anioE,
    UnidadesDisponibles: req.body.unidadesD,
    TotalUnidades: req.body.totalU,
    NumPag: req.body.numP,
    NumInventario: req.body.numI,
    AnaquelCharola: req.body.anaquel,
    Clasificacion: req.body.clasificacion,
    Observaciones: req.body.observaciones,
    Descripcion: req.body.descripcion,
    Foto: "",
  });

  libro.save(function (err, libro) {
    if (err) {
      return res.status(500).json({
        message: "Error al crear el Libro",
      });
    }
    res.redirect("/administrar/admin_buscar");
  });
};

//Consultar administrador
libroController.detalle = (req, res) => {
  const id = req.params.id;
  Libro.find({ _id: id }).exec((err, Libro) => {
    if (err) {
      console.log("Error: ", err);
      return;
    }
    console.log("The INDEX");
    console.log(Libro);
    return res.render("admin_vista_libro", {
      Libro: Libro,
    });
  });
};

//Consultar alumno
libroController.detalleAlumno = (req, res) => {
  const id = req.params.id;
  console.log(id)
  Libro.find({ _id: id }).exec((err, Libro) => {
    if (err) {
      console.log("Error: ", err);
      return;
    }
    console.log("The INDEX");
    console.log(Libro);
    return res.render("alumnos_vista_libro", {
      Libro: Libro,
    });
  });
};

//Editar el libro
libroController.editar = (req, res) => {
  const Nombre = req.body.nombre;
  const Autor = [req.body.autor];
  var arr = [];
  for (var i = 0; i < Autor.length; i++) {
    arr.push({
      Nombre: Autor[i],
    });
  }

  const Editorial = req.body.editorial;
  const LugarEdicion = req.body.lugarE;
  const FechaEdicion = req.body.fechaE;
  const AñoEntrada = req.body.anioE;
  const UnidadesDisponibles = req.body.unidadesD;
  const TotalUnidades = req.body.totalU;
  const NumPag = req.body.numP;
  const NumInventario = req.body.numI;
  const AnaquelCharola = req.body.anaquel;
  const Clasificacion = req.body.clasificacion;
  const Observaciones = req.body.observaciones;
  const Descripcion = req.body.descripcion;
  const Foto = "";

  Libro.updateOne({ Nombre:Nombre},
                  { $addToSet: 
                  { Autor: 
                  { $each: [Autor] }}}
  )

  Libro.updateOne(
    { Nombre: Nombre },
    {
      $set: {
        Nombre: Nombre,
        Editorial: Editorial,
        LugarEdicion: LugarEdicion,
        FechaEdicion: FechaEdicion,
        AñoEntrada: AñoEntrada,
        UnidadesDisponibles: UnidadesDisponibles,
        TotalUnidades: TotalUnidades,
        NumPag: NumPag,
        NumInventario: NumInventario,
        AnaquelCharola: AnaquelCharola,
        Clasificacion: Clasificacion,
        Observaciones: Observaciones,
        Descripcion: Descripcion,
        Foto: Foto,
      },
    }
  ).exec((err, Libro) => {
    if (err) {
      console.log("Error al actalizar el libro:", err);
      return;
    }
    console.log("The INDEX");
    console.log(Libro);
    res.redirect("/administrar/admin_buscar");
  });
};

//Eliminar
libroController.eliminar = (req, res) => {
  const id = req.params.id;
  console.log(id);
  Libro.findByIdAndRemove(id, (err, libro) => {
    if (err) {
      return res.status(500).json({ message: "Error al eliminar" });
    }
  });
  res.redirect("/administrar/admin_buscar");
};

//Consultas

//Consultar por nombre
libroController.consultar_nombre = (req, res) => {
  const busqueda = req.body.nombre;

  Libro.find({ Nombre: { $regex: busqueda, $options: "i" } }, {}).exec(
    (err, libro) => {
      if (err) {
        console.log("Error: ", err);
        return;
      }
      Libro.aggregate(
        [{
          $group:
          {
            _id:"$Editorial"
          }
        }
        ]
      ).exec((err, edi)=>{
        console.log("The INDEX");
      console.log(edi);
      return res.render("admin_buscar", {
        Libro: libro, edi:edi
      });
      });
    }
  );
};

//Consultar por autor
libroController.consultar_autor = (req, res) => {
  const busqueda = req.body.autor;

  Libro.find({ Autor: { $regex: busqueda, $options: "i" } }, {}).exec(
    (err, libro) => {
      if (err) {
        console.log("Error: ", err);
        return;
      }

      Libro.aggregate(
        [{
          $group:
          {
            _id:"$Editorial"
          }
        }
        ]
      ).exec((err, edi)=>{
        console.log("The INDEX");
      console.log(edi);
      return res.render("admin_buscar", {
        Libro: libro, edi:edi
      });
      })
    }
  );
};

//Consultar por editorial
libroController.consultar_editorial = (req, res) => {
  const busqueda = req.body.editorial;

  Libro.find({ Editorial: { $regex: busqueda, $options: "i" } }, {}).exec(
    (err, libro) => {
      if (err) {
        console.log("Error: ", err);
        return;
      }
      Libro.aggregate(
        [{
          $group:
          {
            _id:"$Editorial"
          }
        }
        ]
      ).exec((err, edi)=>{
        console.log("The INDEX");
      console.log(edi);
      return res.render("admin_buscar", {
        Libro: libro, edi:edi
      });
      })
    }
  );
};

//actualizacion UnidadesDisponibles
 libroController.actualizarUnidades = (req, res) => {
  const id = req.params.id;

  Libro.updateOne(
    { "_id": id },
    {
      $inc: {
        UnidadesDisponibles: -1,
      },
    }
  ).exec((err, Libro) => {
    if (err) {
      console.log("Error al actualizar el libro:", err);
      return;
    }
    console.log("The INDEX");
    console.log(Libro);
    res.redirect("/alumnos/historial_prestamos");
  });
};

//actualizacion UnidadesDisponibles por denegacion
libroController.actualizarUnidades_denegadas = (req, res) => {
  const id = req.params.id;

  Libro.updateOne(
    { "_id": id },
    {
      $inc: {
        UnidadesDisponibles: 1,
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

module.exports = libroController;
