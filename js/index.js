
//crear estado del carrito 

if(!localStorage.getItem("carrito")){
    localStorage.setItem('carrito','[]')
}

//crear registro de los datos del usuario

if(!localStorage.getItem("usuario")){
    localStorage.setItem('usuario','')
}

//actualizar el contador del carrito

document.querySelector('.count_list').innerHTML= JSON.parse(localStorage.getItem("carrito")).length

//funcion slider oferta
//variable de referencia del desplazamiento
var contador = 0

function mover_slider(id) {
    container_card=  document.querySelector('.desplazamiento_ejeX') 

    
    //identificar el boton 
    if(id === 'move_left'){
        contador-- 
    }
    else if (id === 'move_right') {
        contador++
    }
    //ejecutar el desplazamiento segun parametros 
    switch (contador) {
        case 0:
            container_card.style.marginLeft='10px' 
            container_card.style.transition='.5s'

            break;
        case 1:
            container_card.style.marginLeft='-200px'
            container_card.style.transition='.5s'
            break;
        case 2:
            container_card.style.marginLeft='-400px' 
            container_card.style.transition='.5s'

            break;
        case 3:
            container_card.style.marginLeft='-1300px' 
            container_card.style.transition='.5s'

            break;
        default:
            break;
    }


}

//funcion menu desplegable

function Open_and_Close_menu_lateral(valor) {
    if (valor === true) {
        document.querySelector('.menu_desplegable').style.display='block' 
    }else{
        document.querySelector('.menu_desplegable').style.display='none' 
    }
}
 


//cerrar ventana de los detalle de las ofertas

function cerrar_detalle_oferta() {
    document.querySelector('.container_detalleOferta').style.display='none'
}

function abrir_Detalle_oferta(id) {
    //llamar a la api y cargar elemento del id 
    fetch('/output.json')
  .then(response => response.json())
  .then(data => {

        data.forEach(element=>{
           if (element.id === parseInt(id)) {
            //remplazar los valores por los del elemento del id
            document.querySelector('.img_detalles_item').src=`${element.imagen}`
            document.querySelector('.detalles_modelo').textContent=`${element.modelo}`
            document.querySelector('.detalles_description').textContent=`${element.description}`
            document.querySelector('.detalles_marca').textContent=`${element.marca}`
            document.querySelector('.detalles_precio').textContent=`${element.precio}`
            document.querySelector('.detalles_categoria').textContent=`${element.categoria}`
            document.querySelector('.id_detalle_producto').id=`${element.id}`


           }
        })

    });

    //mostrar ventana
    document.querySelector('.container_detalleOferta').style.display='block'
    
}


