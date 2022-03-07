function mostrar(){
    Swal.fire({
        title: 'Estas seguro de eliminar',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        denyButtonText: `Cancelar`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            var id=document.getElementById(id1)
            console.log(id)
          href = "/administrar/eliminar/"+id
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
