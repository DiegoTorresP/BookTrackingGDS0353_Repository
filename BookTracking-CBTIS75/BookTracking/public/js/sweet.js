//Eliminar un alumno
function Eliminar(ida) {
  Swal.fire({
    title: "Estas seguro de eliminar",
    showDenyButton: true,
    confirmButtonText: "Confirmar",
    denyButtonText: `Cancelar`,
  }).then((result) => {
    if (result.isConfirmed) {
      console.log(ida);
      Swal.fire({
        icon: "success",
        title: "Eliminado con exito",
        showConfirmButton: false,
        timer: 3000,
      });
      window.location = "/administrar/eliminar/" + ida;
    } else if (result.isDenied) {
      Swal.fire("Cancelado", "", "info");
    }
  });
}
//Eliminar un libro
function Eliminar_libro(id) { 
  Swal.fire({
    title: "Estas seguro de eliminar",
    showDenyButton: true,
    confirmButtonText: "Confirmar",
    denyButtonText: `Cancelar`,
  }).then((result) => {
    if (result.isConfirmed) {
      console.log(id);
      Swal.fire({
        icon: "success",
        title: "Eliminado con exito",
        showConfirmButton: false,
        timer: 3000,
      });
      window.location = "/administrar/eliminar_libro/" + id;
    } else if (result.isDenied) {
      Swal.fire("Cancelado", "", "info");
    }
  });
}
//Animacion al registar
function registar() {
  Swal.fire({
    icon: "success",
    title: "Guardado con exito",
    showConfirmButton: false,
    timer: 3000,
  });
}

//Deshabilitar retroceso por navegador
function deshabilitaRetroceso(){
  window.location.hash="no-back-button";
  window.location.hash="Again-No-back-button" //chrome
  window.onhashchange=function(){window.location.hash="";}
}

//Animacion al generar qr
function qr() {
  Swal.fire({
    icon: "success",
    title: "Codigo generado con exito",
    showConfirmButton: false,
    timer: 7000,
  });
  window.location = "/alumnos/generar_qr";
}