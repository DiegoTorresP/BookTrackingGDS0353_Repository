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
    console.log(libro);
    return res.render("admin_buscar", {
      Libro: libro, edi:edi
    });
    });
  });
};

//Mostar todos los libros a alumnos
libroController.mostarLibro = (req, res) => {
  Libro.find({}).exec((err, Libro) => {
    if (err) {
      console.log("Error: ", err);
      return;
    }
    console.log("The INDEX");
    console.log(Libro);
    return res.render("alumnos_buscar_solicitar_libro", {
      Libro: Libro,
    });
  });
};

//Crear la referencia de link
var link;
libroController.imagen = (req, res) => {
  let url = req.file.fileRef;
  var url2=url.metadata.selfLink;
  url2=url2.substring(37)
  link= "https://firebasestorage.googleapis.com/v0"+url2+"?alt=media&"
};

libroController.crear = (req, res) => {
  console.log("Registrando Libro");

  const Autor = req.body.autor;

  var Autor_c= Autor.split(',');
    
  const libro = new Libro({
    Nombre: req.body.nombre,
    Autor: Autor_c,
    Editorial: req.body.editorial,
    Lugar_Edicion: req.body.lugarE,
    Fecha_Edicion: req.body.fechaE,
    Año_Entrada: req.body.anioE,
    Unidades_Disponibles: req.body.unidadesD,
    Total_Unidades: req.body.totalU,
    Num_Pag: req.body.numP,
    Num_Inventario: req.body.numI,
    Anaquel_Charola: req.body.anaquel,
    Clasificacion: req.body.clasificacion,
    Observaciones: req.body.observaciones,
    Descripcion: req.body.descripcion,
    Foto: link,
  });

  libro.save(function (err, libro) {
    if (err) {
      return res.status(500).json({
        message: "Error al crear el Libro",
      });
    }
    link=null;
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

//Consultar historial libro
libroController.detalleHistorialLibro = (req, res) => {
  const id = req.params.id;
  console.log(id)
  Libro.find({ _id: id }).exec((err, Libro) => {
    if (err) {
      console.log("Error: ", err);
      return;
    }
    console.log("The INDEX");
    console.log(Libro);
    return res.render("alumnos_vista_libro_historial", {
      Libro: Libro,
    });
  });
};

//Consultar libro
libroController.detalleLibro = (req, res) => {
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
  const Autor = req.body.autor;
  //Convierte una cadena a un arreglo
  var Autor_c= Autor.split(',');

  const Editorial = req.body.editorial;
  const Lugar_Edicion = req.body.lugarE;
  const Fecha_Edicion = req.body.fechaE;
  const Año_Entrada = req.body.anioE;
  const Unidades_Disponibles = req.body.unidadesD;
  const Total_Unidades = req.body.totalU;
  const Num_Pag = req.body.numP;
  const Num_Inventario = req.body.numI;
  const Anaquel_Charola = req.body.anaquel;
  const Clasificacion = req.body.clasificacion;
  const Observaciones = req.body.observaciones;
  const Descripcion = req.body.descripcion;
  const Foto = link;

  Libro.updateOne(
    { Nombre: Nombre },
    {
      $set: {
        Nombre: Nombre,
        Autor: Autor_c,
        Editorial: Editorial,
        Lugar_Edicion: Lugar_Edicion,
        Fecha_Edicion: Fecha_Edicion,
        Año_Entrada: Año_Entrada,
        Unidades_Disponibles: Unidades_Disponibles,
        Total_Unidades: Total_Unidades,
        Num_Pag: Num_Pag,
        Num_Inventario: Num_Inventario,
        Anaquel_Charola: Anaquel_Charola,
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
    link=null;
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

//actualizacion Unidades_Disponibles
 libroController.actualizarUnidades = (req, res) => {
  const id = req.params.id;

  Libro.updateOne(
    { "_id": id },
    {
      $inc: {
        Unidades_Disponibles: -1,
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

//actualizacion Unidades_Disponibles
libroController.actualizarUnidadesAlumno = (req, res) => {
  const id = req.params.id;

  Libro.updateOne(
    { "_id": id },
    {
      $inc: {
        Unidades_Disponibles: -1,
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

//actualizacion Unidades_Disponibles por denegacion
libroController.actualizarUnidades_denegadas = (req, res) => {
  const id = req.params.id;

  Libro.updateOne(
    { "_id": id },
    {
      $inc: {
        Unidades_Disponibles: 1,
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
