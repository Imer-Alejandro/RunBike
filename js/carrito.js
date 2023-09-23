//carrito
function crear_articulo(id) {

    fetch('./output.json')
    .then(response => response.json())
    .then(data => {
       
        data.forEach(element => {
            if (element.id === parseInt(id)) {
                registrarProducto(element)     
            } 
        });
         
    })

    Toastify({
        text: "se añadio un articulo al carrito !",
        className: "info",
        style: {
          background: "#0099DD",
        },
        gravity: "bottom",
        position: "right",
        duration: 1500
      }).showToast();

}

function registrarProducto(producto) {

    // Obtener el listado del carrito del localStorage
  const listadoCarrito = JSON.parse(localStorage.getItem("carrito")) || [];

  
    if(!localStorage.getItem('carrito')){
        let nuevo_listado=[]
        nuevo_listado.push(producto)
        localStorage.setItem('carrito',JSON.stringify(nuevo_listado))
    }else{
        // Verificar si el elemento existe en el listado
        const elementoExiste = listadoCarrito.find((item) => item.id === producto.id);
        // Si el elemento existe, incrementar su propiedad cantidad
        if (elementoExiste) {
            elementoExiste.cantidad++;

           
        } else {
            // Si el elemento no existe, agregarlo al listado
            listadoCarrito.push(producto);

          
        }
         //actualizar contador
         document.querySelector(".count_list").innerText=listadoCarrito.length
          
    }
  // Guardar la nueva lista actualizada en el localStorage
  localStorage.setItem("carrito", JSON.stringify(listadoCarrito));


    
}

