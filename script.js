//sacarle la clase a is-active a todos los li de las tabs

const tabs = document.getElementsByTagName('li')
const removeActiveClass = () =>{
    for (let i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove("is-active")
    } 
}

window.onload = () =>{
    removeActiveClass()    
    addListeners()
    obtenerGatitoRandom()
    obtenerRazas()
    
    }



//agregarsela al li del tab que fue clickead (TIP: usar parentElement para acceder al li)
const links = document.querySelectorAll("li > a")


const addClass = (event)=>{
    removeActiveClass()
    const link = event.target.parentElement
    link.classList.add("is-active")
}


const addListeners = () =>{
    for (let i = 0; i < links.length; i++) {
       links[i].addEventListener('click', addClass)
       links[i].addEventListener('click', returnIsHiddenClass)        
    }
}

//agregar la clase is-hidden a todos los elementos con clase tab-section

const isHidden = document.querySelectorAll(".tab-section")

const addIsHiddenClass = () => {
    for (let i = 0; i < isHidden.length; i++) {
        if(!isHidden[i].classList.contains("is-hidden")){
            isHidden[i].classList.add("is-hidden")
        }        
    }
}
addIsHiddenClass()

//sacarle la clase is-hidden al elemento cuyo id corresponda con la propiedad href del elemento clickeado


const returnIsHiddenClass = (event) =>{    
    const aClickeado = event.target   
    addIsHiddenClass()
    for (let i = 0; i < isHidden.length; i++){
        if(isHidden[i].id === aClickeado.hash.slice(1)){
            isHidden[i].classList.remove('is-hidden')
        }
    }
}


const actualizarGatito = (data) => {
    const img = document.getElementById('cat-img')
    img.src = data.url
    img.width = data.width
    img.height = data.height
  }

const obtenerGatitoRandom = () => {
    addIsLoadingClass()   
    axios
      .get('https://api.thecatapi.com/v1/images/search')
      .then((response) =>{
        actualizarGatito(response.data[0])
        removeIsLoadingClass(response)   
      })
  }

const otreGatiteBtn = document.getElementById('random-cat-btn')
otreGatiteBtn.addEventListener('click', obtenerGatitoRandom)
const addIsLoadingClass = () =>{
    otreGatiteBtn.classList.add("is-loading")
}

const removeIsLoadingClass = () =>{
    otreGatiteBtn.classList.remove("is-loading")
}


//Buscador de razas

//const searchInput = document.getElementById("breed-search-input")
const breedSearch = document.getElementById('breed-search-btn')
const input = document.getElementById("breed-search-input")
// const addBreedToTable = () =>{


const table = document.getElementById("breed-search-results")
table.innerHTML= ''

const actualizarResultados = (data) => {    
    const obtenerTabla = `<tr>
    <td>${data}</td>
    </tr>`      
    table.innerHTML += obtenerTabla
}


const obtenerRaza = (event) => {
    
    if (event.keyCode === 13 || event.type === 'click'){
    const breed= document.getElementById("breed-search-input").value
    breedSearch.classList.add('is-loading')
    input.classList.add('is-loading')
    axios
    .get(`https://api.thecatapi.com/v1/breeds/search?q=${breed}`)   
    .then((response)=> {
        actualizarResultados(response.data[0].name)
        breedSearch.classList.remove('is-loading')
        input.classList.remove('is-loading')
    })
}
}
input.addEventListener('keydown', obtenerRaza)
breedSearch.addEventListener('click', obtenerRaza)


//Razas

const select = document.getElementById("breed-dropdown")
select.innerHTML = ""

const actualizarRazas = (razas) =>{
    resultado = razas.map( raza =>
        {
        const option = document.createElement('option')
        option.setAttribute("value", `${raza.id}`)
        option.innerHTML= `${raza.name}`        
        select.append(option)
        })
        
}

const obtenerRazas = () => {
    axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then((response) => {
        actualizarRazas(response.data)
        select.firstChild.setAttribute("selected", "selected")  
        traerInfoGatite()      
    })
}

const obtenerInfo = (data) => {
    
    const razaInfo = document.getElementById("breed-description")
    razaInfo.innerHTML = data.breeds[0].description
    const nombreGatite = document.getElementById("breed-name")
    nombreGatite.innerHTML = data.breeds[0].name
    const temperamentArray = data.breeds[0].temperament.split(',')    
    let characteristics = document.getElementById("breed-temperament")
    characteristics.innerHTML = ""
    temperamentArray.map(temperament => {
    const tag = document.createElement('span')
    tag.className = "tag"    
    tag.innerHTML = temperament
    characteristics.append(tag)
    } )



    
}
const obtenerImagen= (data) =>{    
    const img = document.getElementById("breed-img")
    img.src= data.url
}
const traerInfoGatite = (event) => {
    let id 
    if(event === undefined){       
        const raza = document.getElementById("breed-dropdown")        
       id = raza.firstChild.value
      
    } else{
       id = event.target.value
    }
    
    axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${id}
    `)
    .then((response) => {
        obtenerInfo(response.data[0])    
        obtenerImagen(response.data[0])})
   
}

select.addEventListener('change', traerInfoGatite)
    