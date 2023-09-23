//filtro de busqueda en javascript
const container_item= document.querySelector('.listado_bicicletas')


// value the input for search for name
let input_search=document.querySelector('.input_search')

//filter search for model function
function filter_search_name(name = input_search.value) {

    fetch('./output.json')
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

  fetch('./output.json')
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
            <button id="btn1" onclick="crear_articulo(${element.id})"><img src="iconos/anadir-al-carrito.png"  ></button>
            ` 
        new_container.appendChild(item);
    })
    container_item.appendChild(new_container)
}



// btn start rearch page ofert

document.querySelector('.btn_busquedad').addEventListener('click',()=>{
    let precio=document.querySelector('.parametro_precio')
    let marca=document.querySelector('.parametro_marca')
    let categoria=document.querySelector('.parametro_categoria')
    

    filter_search_param(marca.value,precio.value,categoria.value)

})


                            
