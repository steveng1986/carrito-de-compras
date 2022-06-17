//variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito')
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = []

cargarEventListeners();
function cargarEventListeners() {
    //cuando agregas un curso presionando "agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso);

    carrito.addEventListener('click', eliminarCurso)
    //vaciar carrito 

    vaciarCarritoBtn.addEventListener('click', vaciarCarrito)
}

//funciones
function agregarCurso(e) {
    e.preventDefault();
    if( e.target.classList.contains('agregar-carrito') ) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}

function eliminarCurso(e) {
    // console.log(e.target.classList)
    if(e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id'); 
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId )

        carritoHtml()
    }
}
function vaciarCarrito() {
    articulosCarrito = []
    limpiarHtml() 
}

//lee el contenido del HTML al que le dimos click y extrae la informacion del curso
function leerDatosCurso(curso) {
    console.log(curso);

    //crear un objeto con el contenido del curso actual

    const infoCurso = {
        imagen: curso.querySelector('img').src, 
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
    //revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id );
    if(existe) {
        const cursos = articulosCarrito.map( curso => {
            if(curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso;
            } else {
                return curso;
            }
        })
        articulosCarrito = [...cursos];
    } else {
        // agrega elementos al arreglo de carrito
        articulosCarrito = [...articulosCarrito, infoCurso]
    }


    carritoHtml()
}

function carritoHtml() {
    limpiarHtml()
    articulosCarrito.forEach( curso => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${curso.imagen}" width="100" />
            </td>
            <td>
                ${curso.titulo}
            </td>
            <td>
                ${curso.precio}
            </td>
            <td>
                ${curso.cantidad}
            </td>
            <td>
                <a href="#" class="borrar-curso" data-id=${curso.id}> X <a/>
            </td>

        `
        console.log(row)
        contenedorCarrito.appendChild(row)
    })
}

function limpiarHtml() {
    contenedorCarrito.innerHTML = ''
}


