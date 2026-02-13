# 🎤 GUION DE PRESENTACIÓN - TIENDA VINTAGE

---

## 🎬 ACTO 1: PITCH AL JEFE (5-7 minutos)

### _"Vendiendo la solución, no el código"_

---

### 1️⃣ **APERTURA - El Problema** (30 seg)

> _"Hoy en día, las tiendas vintage necesitan presencia online para llegar a más clientes. He creado una solución web que permite mostrar productos de forma atractiva y fácil de usar."_

**Mostrar:** Página de inicio en pantalla completa

---

### 2️⃣ **LA SOLUCIÓN - Diseño Visual** (1 min)

**Colores elegidos:**

- 🎨 **Beige cálido (#fcfbf4)**: Evoca nostalgia y vintage
- 🖤 **Gris oscuro (#2c3e50)**: Profesionalidad y contraste
- 🧡 **Naranja (#d35400)**: Llama la atención en botones importantes

> _"Los colores no son casuales: el beige recuerda a papel antiguo, perfecto para una tienda vintage. El naranja destaca donde queremos que el usuario haga clic."_

**Tipografías:**

- **Outfit**: Moderna y fácil de leer (textos)
- **Playfair Display**: Elegante y vintage (títulos)

> _"Combinamos lo moderno con lo clásico, igual que los productos que vendemos."_

---

### 3️⃣ **USABILIDAD - Fácil para Todos** (1.5 min)

**Demostrar en vivo:**

1. **Navegación simple:**

   > _"Solo dos páginas: Inicio y Tienda. No complicamos al usuario."_

2. **Filtros intuitivos:**

   > _"Dos filtros básicos: categoría y precio. Cualquier persona puede usarlos sin instrucciones."_
   - Mostrar: Filtrar por "Ropa" y "Menos de 20€"

3. **Información clara:**
   > _"Cada producto muestra lo esencial: nombre, precio y stock disponible."_

**Accesibilidad:**

- ✅ Textos grandes y legibles
- ✅ Botones con buen contraste
- ✅ Estructura clara (no hay que adivinar dónde clicar)

---

### 4️⃣ **RESPONSIVIDAD - Funciona en Todo** (1.5 min)

**Demostrar en vivo:**

1. **Escritorio (F12 → Responsive)**

   > _"En ordenador, vemos todo el catálogo en grid de 3-4 columnas."_

2. **Tablet (768px)**

   > _"En tablet, los filtros se adaptan y el grid se ajusta."_

3. **Móvil (375px)**
   > _"En móvil, una columna. Los filtros arriba, fácil de usar con el pulgar."_

> _"La misma web funciona perfectamente en cualquier dispositivo, sin necesidad de hacer una app."_

---

### 5️⃣ **RESULTADOS - El Valor** (1 min)

**Beneficios concretos:**

- 📱 **Accesible 24/7** desde cualquier dispositivo
- 🎯 **Fácil de usar** para cualquier edad
- 🚀 **Rápida** (carga en menos de 2 segundos)
- 💰 **Sin costes de mantenimiento** complejos

> _"Esta web permite a la tienda vender online sin complicaciones técnicas. El dueño solo necesita actualizar el archivo JSON con nuevos productos."_

---

### 6️⃣ **CIERRE** (30 seg)

> _"En resumen: una web bonita, fácil de usar y que funciona en todos los dispositivos. Justo lo que una tienda vintage necesita para vender online."_

**Preguntas del jefe:**

- _¿Cuánto tarda en cargar?_ → "Menos de 2 segundos"
- _¿Es fácil añadir productos?_ → "Sí, solo editar un archivo JSON"
- _¿Funciona en móvil?_ → "Perfectamente, lo acabo de demostrar"

---

---

## 💻 ACTO 2: DEEP DIVE TÉCNICO (8-10 minutos)

### _"Mostrando el cómo y el porqué"_

---

### 1️⃣ **DECISIONES TÉCNICAS** (2 min)

#### **¿Por qué CSS Vanilla (sin frameworks)?**

✅ **Ventajas:**

- Control total del diseño
- Sin dependencias externas
- Más ligero (6KB vs 150KB de Bootstrap)
- Aprendo CSS de verdad

❌ **Desventajas que asumí:**

- Más código manual
- Sin componentes predefinidos

> _"Para este proyecto elegí CSS puro porque es una tienda pequeña (40 productos). No necesitaba la complejidad de Bootstrap. Además, quería demostrar que sé CSS sin muletas."_

---

### 2️⃣ **ESTRUCTURA DEL PROYECTO** (1 min)

```
TrabajoMaicas/
├── index.html          # Página de inicio
├── tienda.html         # Catálogo de productos
├── css/
│   └── style.css       # Todos los estilos (300 líneas)
├── js/
│   └── script.js       # Lógica de filtros (100 líneas)
├── data/
│   └── data.json       # 40 productos
└── assets/
    └── img/            # Imágenes de productos
```

> _"Estructura simple y clara. Cualquier compañero puede entender dónde está cada cosa."_

---

### 3️⃣ **EL SNIPPET DE ORGULLO** (3 min)

#### **Sistema de Filtros Dinámicos**

**Mostrar código en `script.js`:**

```javascript
// Funcion principal que carga los productos del JSON
async function cargarProductos() {
  const respuesta = await fetch(DATA_URL);
  const datos = await respuesta.json();
  const productos = datos.items;

  // Aplicar filtros
  const categoria = filtroCategorias.value;
  const precio = filtroPrecio.value;

  const filtrados = productos.filter((item) => {
    // filtro de categoria
    const coincideCategoria =
      categoria === "all" || item.categoria === categoria;

    // filtro de precio
    let coincidePrecio = false;
    if (precio === "all") coincidePrecio = true;
    else if (precio === "under-20") coincidePrecio = item.precio < 20;
    else if (precio === "20-50")
      coincidePrecio = item.precio >= 20 && item.precio <= 50;
    else if (precio === "over-50") coincidePrecio = item.precio > 50;

    return coincideCategoria && coincidePrecio;
  });

  mostrarProductos(filtrados);
}
```

**Explicación línea por línea:**

1. **`async/await`**: Espero a que cargue el JSON sin bloquear la página
2. **`fetch(DATA_URL)`**: Cargo los datos desde el archivo JSON
3. **`filter()`**: Filtro el array según las condiciones
4. **Lógica de filtros**: Combino categoría Y precio con `&&`
5. **Variables en español**: Más fácil de entender para mí

> _"Estoy orgulloso de esto porque combina dos filtros de forma eficiente. Cada vez que cambias un select, se ejecuta automáticamente."_

**Demostrar en vivo:**

- Cambiar filtro de categoría → Ver cómo se actualiza
- Cambiar filtro de precio → Ver cómo se combina

---

### 4️⃣ **OPTIMIZACIONES APLICADAS** (2 min)

#### **1. Imágenes**

- ✅ Formato JPG optimizado
- ✅ Tamaño máximo 200KB por imagen
- ❌ _No usé WebP porque quería compatibilidad total_

#### **2. CSS**

- ✅ Un solo archivo (evita múltiples peticiones HTTP)
- ✅ Sin variables CSS innecesarias (eliminé las que no usaba)
- ✅ Selectores simples (no hay anidación profunda)

**Antes (demasiado complejo):**

```css
:root {
  --s-sm: 0.5rem;
  --s-md: 1rem;
  --s-lg: 2rem;
  --s-xl: 4rem;
}
```

**Después (valores directos):**

```css
.filters {
  padding: 2rem;
  margin-bottom: 1rem;
}
```

#### **3. JavaScript**

- ✅ Sin librerías externas (solo Vanilla JS)
- ✅ `console.log()` para debug (lo dejé para mostrar que sé debuggear)
- ✅ Código en español (más fácil de mantener para mí)

#### **4. Fuentes**

- ✅ Google Fonts con `preconnect` (carga más rápida)
- ✅ Solo 2 fuentes (no sobrecargo)

---

### 5️⃣ **RETOS Y SOLUCIONES** (1.5 min)

#### **Reto 1: Grid Responsivo**

**Problema:** ¿Cómo hacer que las tarjetas se adapten?

**Solución:**

```css
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
}
```

> _"Con `auto-fill` y `minmax()`, el grid se adapta solo. No necesito media queries para esto."_

#### **Reto 2: Filtros Combinados**

**Problema:** ¿Cómo combinar categoría Y precio?

**Solución:**

```javascript
return coincideCategoria && coincidePrecio;
```

> _"Uso el operador `&&` para que ambos filtros se cumplan a la vez."_

---

### 6️⃣ **COSAS QUE MEJORARÍA** (1 min)

**Siendo honesto:**

❌ **No implementé:**

- Carrito de compra (fuera del alcance)
- Búsqueda por texto (me centré en filtros)
- Animaciones complejas (preferí simplicidad)

✅ **Lo que sí funciona bien:**

- Filtros rápidos y precisos
- Diseño limpio y profesional
- Código mantenible

> _"Preferí hacer pocas cosas pero bien hechas, que muchas a medias."_

---

### 7️⃣ **PREGUNTAS TÉCNICAS ESPERADAS**

**P: ¿Por qué no usaste un framework JS como React?**

> _"Para 40 productos estáticos, Vanilla JS es suficiente y más rápido. React sería overkill."_

**P: ¿Por qué las variables en español?**

> _"Porque pienso en español y me resulta más natural. En un equipo internacional usaría inglés."_

**P: ¿Cómo añadirías más productos?**

> _"Solo editar el `data.json` y añadir las imágenes. El JavaScript lo renderiza automáticamente."_

**P: ¿Es accesible para lectores de pantalla?**

> _"Parcialmente. Usé etiquetas semánticas (`<header>`, `<main>`, `<article>`) pero no añadí ARIA labels."_

---

### 8️⃣ **CIERRE TÉCNICO** (30 seg)

> _"En resumen: un proyecto simple pero bien ejecutado. CSS puro, JavaScript vanilla, estructura clara y código en español para facilitar el mantenimiento. No es perfecto, pero cumple su objetivo y demuestra que entiendo los fundamentos."_

---

---

## 📝 TIPS PARA RECORDAR

### **ACTO 1 (Jefe):**

1. 🎨 **Colores** → Por qué cada uno
2. 👤 **Usabilidad** → Demostrar filtros
3. 📱 **Responsive** → Mostrar en 3 tamaños
4. 💰 **Valor** → Beneficios concretos

### **ACTO 2 (Técnico):**

1. 🛠️ **Decisión** → Por qué CSS vanilla
2. 📂 **Estructura** → Mostrar carpetas
3. ⭐ **Orgullo** → Explicar filtros línea por línea
4. 🚀 **Optimización** → Qué hice para que sea rápida
5. 💡 **Honestidad** → Qué mejoraría

---

## 🎯 FRASE CLAVE PARA CADA ACTO

**ACTO 1:**

> _"Una web bonita, fácil de usar y que funciona en todos los dispositivos."_

**ACTO 2:**

> _"Código simple, estructura clara y optimizado para lo que necesita."_

---

**¡Suerte en la presentación! 🚀**
