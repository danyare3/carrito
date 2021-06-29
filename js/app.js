// Variables
const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarrito = document.querySelector("#vaciar-carrito");
const listaCursos = document.querySelector("#lista-cursos");
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners() {
  //cuando agregas un curso presionando 'agregar al carrito'
  listaCursos.addEventListener("click", agregarCurso);

  //Elimina cursos del carrito
  carrito.addEventListener("click", eliminarCurso);

  //vaciar carrito
  vaciarCarrito.addEventListener('click', () => {
    articulosCarrito = []; //resetamos el arreglo

    limpiarHtml();//eliminamos todo el html
  })

}

//funciones
function agregarCurso(e) {
  e.preventDefault();
  if (e.target.classList.contains("agregar-carrito")) {
    const cursoSeleccionado = e.target.parentElement.parentElement; //selecciona imagen, curso,parrafo
    leerDatosCurso(cursoSeleccionado);
  }
}

// funcion elimina curso del carrito
function eliminarCurso(e) {
  if (e.target.classList.contains('borrar-curso')) {
   // console.log(e.target.getAttribute('data-id'));

    const cursoId = e.target.getAttribute('data-id');

    //elimina del arreglo de articulosCarrito por el data-id
    articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId);

    carritoHtml();

  }
  
}





//lee el html al que le dimos click y extrae la informacion del curso
function leerDatosCurso(curso) {
  //crea un objeto con el contenido del curso
  const infoCurso = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector(".precio span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };

  //revisa si un elemento ya existe en el carrito
  const existe = articulosCarrito.some((curso) => curso.id === infoCurso.id);
  if (existe) {
    //actualizamos la cantidad
    const cursos = articulosCarrito.map((curso) => {
      if (curso.id === infoCurso.id) {
        curso.cantidad++;
        return curso; //retornael objeto actualizado
      } else {
        return curso; //retorna el objeto que no son duplicados
      }
    });
    articulosCarrito = [...cursos];
  } else {
    //agregas elementos al carrito
    articulosCarrito = [...articulosCarrito, infoCurso];
  }

  console.log(articulosCarrito);

  carritoHtml();
}

//muestra el carrito de compras en el Html
function carritoHtml() {
  //limpiar el Html
  limpiarHtml();

  //Recorre el carrito y genera el Html
  articulosCarrito.forEach((curso) => {
    const { imagen, titulo, precio, cantidad, id } = curso;
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>
            <img src='${imagen}'width='100'>
        </td>
        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td>
          <a href="#" class="borrar-curso" data-id='${id}'> x </a>
        </td>

    `;

    //muestra los  articulos en el tbody
    contenedorCarrito.appendChild(row);
  });
}

//limpia los cursos del tbody
function limpiarHtml() {
  //forma lenta
  // contenedorCarrito.innerHTML ='';

  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}
