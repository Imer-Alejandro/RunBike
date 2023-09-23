//filtro de busqueda en javascript
const container_item= document.querySelector('.listado_repuestos')


// value the input for search for name
let input_search=document.querySelector('.input_search')

//filter search for model function
function filter_search_name(name = input_search.value) {

    fetch('./apiPieza.json')
  .then(response => response.json())
  .then(data => {
    data.forEach(element => {
        if (element.modelo === name) {
            //delete other item 
            container_item.removeChild(document.querySelector('.container_item'))
            //create new item 
            let new_conten_item= document.createElement('div')
            new_conten_item.setAttribute('class','card_bicicleta')
            new_conten_item.innerHTML= `
            <img loading="lazy" src="${element.imagen}" >
            <div class="caracteristica_card">
                <div class="caracteristica"><h4>${element.marca} </h4></div>
                <div class="caracteristica"><h4>${element.categoria}</h4></div>
            </div>
            <h3>${element.modelo}</h3>
            <p>
            ${element.description}
            </p>
            <span>Precio: <label>${element.precio}</label></span>
            <button id="btn1" onclick="crear_articulo(${element.id})"><img src="iconos/anadir-al-carrito.png"  ></button>
            ` 
            
            let new_container =document.createElement('div')
            new_container.setAttribute('class','container_item')

            new_container.appendChild(new_conten_item)
            container_item.appendChild(new_container)
        }
        
    });
  })

 

}

//filter search for param

function filter_search_param(marca,precio,categoria) {
    
    let lista_resultado_busquedad = []

  fetch('./apiPieza.json')
  .then(response => response.json())
  .then(data => {
            data.forEach((element)=>{



                if (element.categoria === categoria && element.marca != marca && element.precio != precio  ) {
                    lista_resultado_busquedad.push(element)
                }
                else if (element.categoria != categoria && element.marca === marca && element.precio != precio) {
                    lista_resultado_busquedad.push(element)
                }
                else if (element.categoria != categoria && element.marca != marca  && element.precio === parseInt(precio)) {
                    lista_resultado_busquedad.push(element)
                }
                else if (element.categoria === categoria && element.marca === marca  ) {
                    lista_resultado_busquedad.push(element)
                }
                else if (element.categoria === categoria && element.marca === marca && element.precio === parseInt(precio)) {
                    lista_resultado_busquedad.push(element)
                    
                }else if (categoria === 'todas' ) {
                    lista_resultado_busquedad.push(element)
                    
                }


            })   

            mostral_resultado_busquedad(lista_resultado_busquedad) 
           
        })

       

    
}



function mostral_resultado_busquedad(params) {

    container_item.removeChild(document.querySelector('.container_item'))

    let new_container =document.createElement('div')
    new_container.setAttribute('class','container_item')

    params.forEach(element => {
            //create new item 
            let item= document.createElement('div')
            item.setAttribute('class','card_bicicleta')
            item.innerHTML= `
            <img loading="lazy" src="${element.imagen}" >
            <div class="caracteristica_card">
                <div class="caracteristica"><h4>${element.marca} </h4></div>
                <div class="caracteristica"><h4>${element.categoria}</h4></div>
            </div>
            <h3>${element.modelo}</h3>
            <p>
            ${element.description}
            </p>
            <span>Precio: <label>${element.precio}</label></span>
            <button id="btn1" onclick="crear_articulo_pd(${element.id})"><img src="iconos/anadir-al-carrito.png"  ></button>
            ` 
        new_container.appendChild(item);
    })
    container_item.appendChild(new_container)
}



// btn start rearch page ofert

if (document.querySelector('.btn_busquedad')) {
    document.querySelector('.btn_busquedad').addEventListener('click',()=>{
        let precio=document.querySelector('.parametro_precio')
        let marca=document.querySelector('.parametro_marca')
        let categoria=document.querySelector('.parametro_categoria')
        
    
        filter_search_param(marca.value,precio.value,categoria.value)
     
    })
}


                            


//carrito
function crear_articulo_pd(id) {

    fetch('./apiPieza.json')
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
  let nuevo_listado=[]

  
    if(!localStorage.getItem('carrito')){
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
          //update count of list
          document.querySelector(".count_list").innerHTML= listadoCarrito.length
    }
  // Guardar la nueva lista actualizada en el localStorage
  localStorage.setItem("carrito", JSON.stringify(listadoCarrito));


    
}






function abrir_Detalle_oferta_Repuestos(id) {
    //llamar a la api y cargar elemento del id 
    fetch('./apiPieza.json')
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


