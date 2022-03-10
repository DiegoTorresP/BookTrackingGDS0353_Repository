function Eliminar(){
  var id=document.getElementById('idA').innerHTML;;
    Swal.fire({
        title: 'Estas seguro de eliminar',
        showDenyButton: true,
        confirmButtonText: 'Confirmar',
        denyButtonText: `Cancelar`,
      }).then((result) => {
        if (result.isConfirmed) {
          console.log(id)
          //window.location ='/administrar/eliminar/'+id
        } else if (result.isDenied) {
          Swal.fire('Cancelado', '', 'info')
        }
      })
}

function registar(){
    Swal.fire({
        icon: 'success',
        title: 'Guardado con exito',
        showConfirmButton: false,
        timer: 3000
      })
}
