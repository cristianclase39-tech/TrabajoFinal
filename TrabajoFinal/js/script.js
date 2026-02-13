// URL del archivo JSON con los productos
const DATA_URL = "data/data.json";

// Elementos del HTML que voy a usar
const contenedor = document.getElementById("contenedor-productos");
const filtroCategorias = document.getElementById("filtro-categoria");
const filtroPrecio = document.getElementById("filtro-precio");
const contadorResultados = document.getElementById("contador-resultados");

// Cuando carga la pagina ejecuto esto
document.addEventListener("DOMContentLoaded", () => {
    cargarProductos();
    
    // eventos para los filtros
    filtroCategorias.addEventListener("change", cargarProductos);
    filtroPrecio.addEventListener("change", cargarProductos);
});

// Funcion principal que carga los productos del JSON
// Se ejecuta al cargar la pagina y cuando cambias los filtros
async function cargarProductos() {
    // Mensaje de cargando
    contenedor.innerHTML = '<p class="loading-msg">Cargando catálogo...</p>';

    try {
        const respuesta = await fetch(DATA_URL);
        if (!respuesta.ok) throw new Error("Error cargando JSON");
        
        const datos = await respuesta.json();
        const productos = datos.items;

        // Aplicar filtros
        const categoria = filtroCategorias.value;
        const precio = filtroPrecio.value;

        const filtrados = productos.filter(item => {
            // filtro de categoria
            const coincideCategoria = categoria === "all" || item.categoria === categoria;
            
            // filtro de precio
            let coincidePrecio = false;
            if (precio === "all") coincidePrecio = true;
            else if (precio === "under-20") coincidePrecio = item.precio < 20;
            else if (precio === "20-50") coincidePrecio = item.precio >= 20 && item.precio <= 50;
            else if (precio === "over-50") coincidePrecio = item.precio > 50;

            return coincideCategoria && coincidePrecio;
        });

        // Mostrar productos y actualizar contador
        mostrarProductos(filtrados);
        actualizarContador(filtrados.length);

    } catch (e) {
        console.error(e);
        contenedor.innerHTML = '<p class="error-msg">Ha ocurrido un error. Intenta recargar.</p>';
    }
}

// Funcion que muestra las tarjetas de productos
function mostrarProductos(items) {
    contenedor.innerHTML = "";

    if (items.length === 0) {
        contenedor.innerHTML = '<div class="no-results">No hay productos con estos filtros.</div>';
        return;
    }

    console.log("Mostrando productos:", items.length); // debug

    items.forEach(producto => {
        const tarjeta = document.createElement("article");
        tarjeta.className = "product-card";
        
        // por si no hay imagen pongo una por defecto
        const imagenSrc = producto.imagen || 'assets/img/placeholder.jpg';

        tarjeta.innerHTML = `
        <div class="card-img-container">
            <span class="tag">${producto.tags[0] || 'VINTAGE'}</span>
            <img src="${imagenSrc}" alt="${producto.nombre}">
        </div>
        <div class="card-body">
            <span class="card-category">${producto.categoria}</span>
            <h4 class="card-title">${producto.nombre}</h4>
            <div class="card-footer">
                <span class="item-stock">Stock: ${producto.stock}</span>
                <span class="card-price">${producto.precio.toFixed(2)}€</span>
            </div>
        </div>
        `;
        
        contenedor.appendChild(tarjeta);
    });
}

// Actualiza el texto del contador de resultados
function actualizarContador(cantidad) {
    contadorResultados.textContent = `Resultados: ${cantidad} productos`;
}
