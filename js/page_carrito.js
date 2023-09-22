

// Obtener el listado del carrito del localStorage
const listadoCarrito = JSON.parse(localStorage.getItem("carrito")) || [];
//contenedor elemento

let container_item= document.querySelector('.contenedor_item')


listadoCarrito.forEach(element => {
    new_item=document.createElement('div')
    new_item.classList.add("item")
    new_item.setAttribute("id", `${element.id}`)
    new_item.innerHTML=`
    <img src="${element.imagen}">
    
    <div class="detalles">
        <h3>${element.modelo}</h3>
        <p>
            ${element.description}
        </p>
       <span>Precio:<label>${element.precio}</label></span>
    </div>

    <div class="mas_Detalle" onclick="abrir_Detalle(${element.id})" title="ver informacion del pedido">
        <span>mas detalle</span>
    </div>

    <div class="contador"> 
        <button title="quitar Articulos"  onclick="descontar_cantidad(${element.id})" ><span>-</span></button>
        <input type="number" value="${element.cantidad}" disabled >
        <button title="añadir Articulos" onclick="incrementar_cantidad(${element.id})" onclick><span>+</span></button>
    </div>


    `
    container_item.appendChild(new_item)
}); 


function abrir_Detalle(id) {

    listadoCarrito.forEach(element=>{
        if (element.id === parseInt(id)) {
         //remplazar los valores por los del elemento del id
         document.querySelector('.img_detalle').src=`${element.imagen}`
         document.querySelector('.modelo_detalle').textContent=`${element.modelo}`
         document.querySelector('.description_detalle').textContent=`${element.description}`
         document.querySelector('.marca_detalle').textContent=`${element.marca}`
         document.querySelector('.precio_detalle').textContent=`${element.precio}`
         document.querySelector('.categoria_detalle').textContent=`${element.categoria}`
         document.querySelector('.unidades_detalle').textContent=`${element.cantidad}`
         document.querySelector('.id_item').name=`${element.id}`

         

        }
     })
  
      //mostrar ventana
      document.querySelector('.container_detalleOferta').style.display='block'
      
}



//eliminar producto del carrito

function delete_item(id) {
    //eliminar del html
    container_item.removeChild(document.getElementById(`${id}`))

        
    // Obtener el array de productos del localStorage
    const productos = JSON.parse(localStorage.getItem("carrito"));

    // Buscar el índice del producto con el id especificado
    const indice = productos.findIndex((producto) => producto.id === id);

    // Eliminar el producto del array
    productos.splice(indice, 1);

    // Guardar el array de productos actualizado en el localStorage
    localStorage.setItem("carrito", JSON.stringify(productos));

    //actualizar el total a pagar
    total_venta()

    //cerrar el modal de eliminar producto
    document.querySelector('.container_detalleOferta').style.display='none'

    // Actualizar el contador
    document.querySelector(".count_list").innerHTML=productos.length

    //notificacion de action
    Toastify({
        text: "se elimino un articulo al carrito !",
        className: "info",
        style: {
          background: "#c52525",
        },
        gravity: "bottom",
        position: "right",
        duration: 1500
      }).showToast();

      

}

//ejecutar el total a pagar desde que cargue la page
total_venta()


//calcular total de la venta

function total_venta() {


    // Obtener los precios y cantidades de los productos 
  const precios = [];
  const cantidades =[];

    const listado=JSON.parse(localStorage.getItem("carrito"))

    listado.forEach(element=>{
        precios.push(parseInt(element.precio))
        cantidades.push(parseInt(element.cantidad));

    })

  // Multiplicar el precio por la cantidad de cada producto
  const productosMultiplicados = precios.map((precio, indice) => precio * cantidades[indice]);

  // Sumar el precio a pagar de cada producto
  const totalAPagar = productosMultiplicados.reduce((a, b) => a + b, 0);

  // Devolver el precio total de la venta
  document.querySelector('.total_pago_compra').innerHTML=totalAPagar
}




function incrementar_cantidad(id) {
    //aumentar la cantidad del producto
    const productoSelecionado=document.getElementById(`${id}`).childNodes[7].childNodes[3].value++
  

        // //actualizar la cantidad del producto del carrito almacenado

        // Obtenemos el carrito de compra almacenado en el localStorage
        const carrito = JSON.parse(localStorage.getItem('carrito'));

    // Buscamos el producto en el carrito utilizando el id
    const producto = carrito.find(item => item.id === id);

        if (producto) {
            // Incrementamos la cantidad en 1
            producto.cantidad += 1;

            // Actualizamos el carrito en el localStorage
            localStorage.setItem('carrito', JSON.stringify(carrito));   
        }

        //actualozar el valor total del carrito con los valores incrementado
        total_venta()

}

function descontar_cantidad(id) {
   //disminuir la cantidad del producto
   const productoSelecionado=document.getElementById(`${id}`).childNodes[7].childNodes[3]
     
   //validar no rebajar a valores negativos la cantidad
    if (productoSelecionado.value != 0) {
        productoSelecionado.value--
    }else{
        delete_item(id) 

         //notificacion de action
        Toastify({
            text: "se elimino un articulo del carrito !",
            className: "info",
            style: {
            background: "#c52525",
            },
            gravity: "bottom",
            position: "right",
            duration: 1500
        }).showToast();

    }

    //actualozar el valor total del carrito con los valores se rebaje
    total_venta()

}



function metodo_pago() {
    const tipoTargeta = document.querySelector('.tipo_targeta')
    const numeroTargeta = document.querySelector('.numero_targeta')
    const fechaVencimiento = document.querySelector('.fecha_vencimineto')


    //contenedor elementos del carrito
    let container_item = document.querySelector('.contenedor_item')
    
    if (tipoTargeta.value != '' && numeroTargeta.value != '' && fechaVencimiento.value !='') {

        
        while(container_item.hasChildNodes()){ 
            container_item.removeChild(container_item.firstChild);	
        }
        

         //notificacion de action
         Toastify({
            text: "se realizo con exito el pedido !",
            className: "info",
            style: {
            background: "#49d645",
            },
            gravity: "bottom",
            position: "right",
            duration: 2000
        }).showToast();


        fechaVencimiento.value = ''
        numeroTargeta.value= ''
        fechaVencimiento.value= ''

        localStorage.setItem('carrito','')

        

        // Actualizar el contador
    document.querySelector(".count_list").innerHTML= 0
    document.querySelector(".total_pago_compra").innerHTML= 0



    }else{
        alert('ingrese los datos de la targeta para realizar el perdido !')
    }
}
 
