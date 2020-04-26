//El backend se encarga de manejar los datos. Tiene una base de datos donde almacenarlos, y crea toda una aplicacion que permita al frontend hacerle pedidos (consultas) a esa aplicacion y la aplicacion devuelve datos reales. 
//Una vez obtenidos esos datos la parte del frontend se encarga de mostrar esos datos e interactuar con ellos. 
//Una aplicacion que no tiene backend es una aplicacion estatica. No varia nunca.Toda aplicacion que se actualiza constantemente necesita un backend y es necesario saber como comunicarse con este

//Para las consultas a backend vamos a utilizar una libreria. Axios
//hay que copiar los links cdn en el codigo HTML en el head

//API application programing interface
// FRONTEND ---> BACKEND ----> BASE DE DATOS
// CLIENTE       SERVIDOR      SERVIDOR


// HTTP
// Hypertext Transfer Protocol
//El backend es un intermediario que toma los pedidos del frontend, analiza eso y busca en la base de datos esa informacion. La procesa para poder devolverla al frontend de forma precisa y la devuelve.
//Para esto tenemos que comunicarnos de alguna forma con el backend. Para esto el backend nos da una interface. Es una forma de pedile informacion al backend
//EL backend crea esta api que es toda una lista de todas las cosas que podemos pedir y de que forma pedirlas. 
//Cada API tiene su documentacion.
//Generalmente la estructura de la informacion es un array de objetos.

const actualizarGatito =(data) => {
    const img= document.getElementById('cat-img')
    img.src = data.url
    img.width = data.width
    img.height = data.height
}

window.onload = () => {
    axios
    .get('http://api.thecataip.com/v1/images/search')//es un metodo asincrono
    .then((response) => actualizarGatito(response.data[0]))
}

//La informacion, la respuesta especifica esta dentro de data.
//Axios es una libreria que permite hacer pedidos http. 
//Dentro de network(en el inspector) estan todos los pedidos que hace una pagina en todo momento.Cuando entramos a una pagina se esta haciendo un pedido a un servidor para solicitar los archivos necesarios para cargar la pagina. 
 
//Request method. Los metodos son intenciones. Es una forma de decirle por un lado al navegador y por otro al backend que es lo que estamos queriendo hacer. 
//Los ppales metodos son:
//- get - create
//- host - read
//- put - update
//- delete - delete
//Son etiquetas que nos permiten indicar cuando estamos haciendo un pedido, que es lo que queremos hacer en ese pedido
//Es una convencion que le permite al backend que le sea mas facil y mas claro poder identificar que es lo que estamos pretendiendo con un pedido. Permite reutilizar url
//El codigo status es un codigo estandarizado que nos dice como fue la respuesta. En vez de dejarle la libertad a la api de responderle a quien hizo la consulta sobre como fue el pedido, hay ciertas convenciones de codigo que van del 100 al 500 que muestran el resultado de esa operacion.
//Los headers del pedido es informacion extra que va con el pedido. Hay headers que podemos modificar. 
//Los headers de la respuesta es informacion extra con el detalle de la respuesta que nos llega a nuestro pedido.


//Metodo sincrono. El resultado se muestra en el momento que la linea de codigo se procesa. Tambien se conoce como operaciones bloqueantes, quiere decir que el codigo, la ejecucion del programa se bloquea hasta que la operacion no termina. Bloquea la ejecucion del programa hasta que termina la ejecucion  de la propia linea.

//El codigo asincrono es codigo no bloqueante. Los resultados de las operaciones que estamos haciendo no sabemos cuando los vamos a tener. 

//Set timeOut y setInterval son dos metodos asincronos que tiene javascript
//setInterval toma un callback y un intervalo de milisegundos

let contador = 0
const consolear = () => console.log(contador++)
setInterval(consolear, 300)//cada vez que pasan 300 milisegundos ejecuta el callback

//setTimeout ejecuta el callback en una cuenta regresiva. Lo ejecuta una sola vez. Cuando llega el tiempo a 0 ejecuta el callback
setTimeout(consolear, 3000)

//Los pedidos http tbn son operaciones asincronas. Esto permite que se puedan ir actualizando distintas partes de las paginas en simultaneo.
//Trabajando con operaciones asincronas hay que tener en cuenta dos cosas
//Primero cuando se va a realizar el llamado. En el ejemplo se hace cuando carga la pagina.
//Para trabajar con la respuesta se utiliza el metodo then que viene concatenado a get. Es lo que se llama una promesa (promise). Get devuelve una promesa y then es un metodo de las promesas de js. Una promesa es una operacion asincrona. No es algo que se hace inmediatamente, hacemos un pedido de una promesa y despues obtenemos el resultado en un tiempo. Esa promesa se puede cumplir como no. 
//Al devolvernos las promesas tienen un metodo then que se ejecuta cuando las promesas se cumplen. Accion que queremos ejecutar cuando la promesa se cumpla. Se va a ejecutar cuando obtengamos la respuesta del pedido al servidor.
//El callback va a tener la informacion de la respuesta (res). Si queremos especificamente la informacion de la respuesta hay que agregarle .data
const actualizarGatito = (data) => {
    const img = document.getElementById('cat-img')
    img.src = data.url
    img.width = data.width
    img.height = data.height
  }

  const actualizarFrase = (data) =>{
    const fact = document.getElementById('cat-fact')
    const aleatorio = Math.round(Math.random()*data.length)
    fact.innerHTML = data[aleatorio].description
  }

  const obtenerGatitoRandom = () => {
    axios
      .get('https://api.thecatapi.com/v1/images/search')
      .then((response) => actualizarGatito(response.data[0]))
    
    axios
        .get('https://api.thecatapi.com/v1/breeds/')
        .then((response) => actualizarFrase(response.data))
  }  

  window.onload = () => {
    const botonGatoAleatorio = document.getElementById('random-cat-btn')
    botonGatoAleatorio.addEventListener('click', obtenerGatitoRandom)
    obtenerGatitoRandom()
    obtenerRazas()
  }

  
  const actualizarRazas = (razas) => {
    const dropdown = document.querySelector('.dropdown-content')
    dropdown.innerHTML = ''
  
    const htmlRazas = razas
      .map((raza) => `<a class="dropdown-item">${raza.name}</a>`)
      .join('')
    console.log(htmlRazas)
    dropdown.innerHTML = htmlRazas
  }
  

  const obtenerRazas = () => {
    axios
      .get('https://api.thecatapi.com/v1/breeds')
      .then((response) => actualizarRazas(response.data))
      
  }
