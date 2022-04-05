/* CONSTANTES PARA ENTRAR A MDB */
const serverUrl = "https://localhost/";
const itemsPath = "items/";
const imgPath = "img/";

/* VARIABLE GLOBAL PARA BUSCADOR */
let datos = [];

/* DECLARACION DE FUNCION AL ABRIR LA WEB */

window.onload = getData();

/* CREAMOS UNA FUNCION PARA LLAMAR LOS TAGS QUE CONTIENEN LOS ELEMENTOS QUE NECESITAMOS */
const items = document.querySelector(".items");
function getData() {
  fetch(`${serverUrl}${itemsPath}`)
    .then((res) => res.json())
    .then((data) => printData(data));
}

/* CREAMOS UNA FUNCION PARA PINTAR EN PANTALLA LOS ELEMENTOS QUE NECESITAMOS */
function printData(data) {
  const itemContainer = document.createElement("div");
  itemContainer.className = "row";
  data.forEach((item) => {
    itemContainer.innerHTML += createDomElement(item);
    items.append(itemContainer);
  });
  datos = data.filter((nombre) => nombre.title);
  return datos;
}

/* CREACION DINAMICA DE CARDS ARTICULOS */

function createDomElement(item) {
  const itemHtml = `
  <div class="col-12 col-md-6">
    <div class="item mb-4">
      <div id="carousel-${item.id}" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="${serverUrl}${imgPath}${item.image.img1}" class="d-block w-100 item-image" alt="...">
          </div>
          <div class="carousel-item">
            <img src="${serverUrl}${imgPath}${item.image.img2}" class="d-block w-100 item-image" alt="...">
          </div>
          <div class="carousel-item">
            <img src="${serverUrl}${imgPath}${item.image.img3}" class="d-block w-100 item-image" alt="...">
          </div>
          <div class="carousel-item">
            <img src="${serverUrl}${imgPath}${item.image.img4}" class="d-block w-100 item-image" alt="...">
          </div>
          <div class="carousel-item">
            <img src="${serverUrl}${imgPath}${item.image.img5}" class="d-block w-100 item-image" alt="...">
          </div>
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#carousel-${item.id}" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carousel-${item.id}" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
        </div>
              <h5 class="item-title">${item.title}</h5>
              <p class="item-details">${item.details}</p>
              <h4 class="item-price">${item.precio}</h4>
              <button class="item-button btn btn-primary addToCart"><p>12 cuotas</p>$${item.precio}</button>
            </div>
        </div>
    </div>`;
  return itemHtml;
}


/* BUSCARDOR SENSITIVO */

const formulario = document.querySelector("#formulario");
const boton = document.querySelector("#boton");
const resultado = document.querySelector("#resultado");

const filtrar = (event) => {
  event.preventDefault();
  const texto = formulario.value.toLowerCase();
  resultado.innerHTML = "";
  for (let producto of datos) {
    let nombre = producto.title.toLowerCase();
    if (nombre.indexOf(texto) !== -1) {
      resultado.innerHTML += `
      <li>
        ${producto.title}
      </li>
      `;
    }
  }
  if (resultado.innerHTML === "") {
    resultado.innerHTML += `
      <li>
        Producto no encontrado...
      </li>
      `;
  }
};

boton.addEventListener("click", filtrar);
formulario.addEventListener("keyup", filtrar);


/* CREACION DEL MENU DE CATEGORIAS */


