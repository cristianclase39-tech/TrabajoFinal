# 🔍 EXPLICACIÓN DEL CÓDIGO DE FILTROS

## 📌 ¿Qué hace este código?

Este código permite **filtrar productos** en la tienda según dos criterios:

1. **Categoría** (Ropa, Accesorios, Decoración, etc.)
2. **Precio** (Menos de 20€, 20-50€, Más de 50€)

---

## 🎯 VISIÓN GENERAL

```
Usuario selecciona filtros → JavaScript filtra productos → Muestra solo los que coinciden
```

---

## 📖 EXPLICACIÓN PASO A PASO

### **PASO 1: Cargar los productos desde el JSON**

```javascript
async function cargarProductos() {
  const respuesta = await fetch(DATA_URL);
  const datos = await respuesta.json();
  const productos = datos.items;
```

**¿Qué hace?**

- `fetch(DATA_URL)` → Pide los datos al archivo `data.json`
- `await` → Espera a que lleguen los datos (sin bloquear la página)
- `respuesta.json()` → Convierte la respuesta en un objeto JavaScript
- `datos.items` → Extrae la lista de productos

**Analogía:**

> Es como ir a una biblioteca, pedir un libro (fetch), esperar a que te lo traigan (await), y abrirlo para leer (json).

---

### **PASO 2: Obtener los valores de los filtros**

```javascript
const categoria = filtroCategorias.value;
const precio = filtroPrecio.value;
```

**¿Qué hace?**

- Lee qué opción seleccionó el usuario en cada `<select>`
- Ejemplo: `categoria = "ropa"` y `precio = "under-20"`

**Analogía:**

> Es como preguntarle al usuario: "¿Qué tipo de producto buscas?" y "¿Cuánto quieres gastar?"

---

### **PASO 3: Filtrar por CATEGORÍA**

```javascript
  const filtrados = productos.filter((item) => {
    const coincideCategoria =
      categoria === "all" || item.categoria === categoria;
```

**¿Qué hace?**

- `categoria === "all"` → Si el usuario eligió "Todos", acepta cualquier producto
- `item.categoria === categoria` → Si no, solo acepta productos de esa categoría
- Usa `||` (OR) → Basta con que se cumpla UNA de las dos condiciones

**Ejemplo:**

- Usuario elige **"Ropa"**
- Producto 1: `categoria = "ropa"` → ✅ **Pasa el filtro**
- Producto 2: `categoria = "decoracion"` → ❌ **No pasa**

---

### **PASO 4: Filtrar por PRECIO**

```javascript
let coincidePrecio = false;
if (precio === "all") coincidePrecio = true;
else if (precio === "under-20") coincidePrecio = item.precio < 20;
else if (precio === "20-50")
  coincidePrecio = item.precio >= 20 && item.precio <= 50;
else if (precio === "over-50") coincidePrecio = item.precio > 50;
```

**¿Qué hace?**

- Comprueba en qué rango de precio está el producto
- Usa `if/else if` para evaluar cada caso

**Desglose:**

1. **`precio === "all"`** → Si el usuario eligió "Todos los precios", acepta cualquier producto
2. **`precio === "under-20"`** → Solo productos que cuestan **menos de 20€**
3. **`precio === "20-50"`** → Solo productos entre **20€ y 50€** (inclusive)
4. **`precio === "over-50"`** → Solo productos que cuestan **más de 50€**

**Ejemplo:**

- Usuario elige **"Menos de 20€"**
- Producto 1: `precio = 15` → ✅ **Pasa el filtro** (15 < 20)
- Producto 2: `precio = 35` → ❌ **No pasa** (35 no es menor que 20)

---

### **PASO 5: Combinar ambos filtros**

```javascript
    return coincideCategoria && coincidePrecio;
  });
```

**¿Qué hace?**

- Usa `&&` (AND) → El producto debe cumplir **AMBOS** filtros
- Solo devuelve productos que pasen categoría **Y** precio

**Ejemplo completo:**

- Usuario elige: **"Ropa"** + **"Menos de 20€"**
- Producto 1: `categoria = "ropa"`, `precio = 15` → ✅ **Pasa** (cumple ambos)
- Producto 2: `categoria = "ropa"`, `precio = 35` → ❌ **No pasa** (no cumple precio)
- Producto 3: `categoria = "decoracion"`, `precio = 15` → ❌ **No pasa** (no cumple categoría)

---

### **PASO 6: Mostrar los productos filtrados**

```javascript
  mostrarProductos(filtrados);
}
```

**¿Qué hace?**

- Llama a otra función que crea las tarjetas HTML con los productos filtrados
- Solo muestra los productos que pasaron ambos filtros

---

## 🧠 CONCEPTOS CLAVE

### **1. `filter()` - El corazón del código**

```javascript
productos.filter((item) => { ... })
```

- **¿Qué es?** Un método de JavaScript que recorre un array y devuelve solo los elementos que cumplen una condición
- **¿Cómo funciona?** Evalúa cada producto (`item`) y decide si lo incluye o no

**Analogía:**

> Es como un colador: pones todos los productos, y solo pasan los que cumplen las condiciones.

---

### **2. Operadores lógicos**

#### **`||` (OR - "O")**

```javascript
categoria === "all" || item.categoria === categoria;
```

- Basta con que **UNA** condición sea verdadera
- Ejemplo: "¿Es 'Todos' O coincide la categoría?"

#### **`&&` (AND - "Y")**

```javascript
return coincideCategoria && coincidePrecio;
```

- **AMBAS** condiciones deben ser verdaderas
- Ejemplo: "¿Coincide la categoría Y el precio?"

---

### **3. Comparadores**

| Símbolo | Significado   | Ejemplo             |
| ------- | ------------- | ------------------- |
| `===`   | Igual a       | `precio === "all"`  |
| `<`     | Menor que     | `item.precio < 20`  |
| `>`     | Mayor que     | `item.precio > 50`  |
| `>=`    | Mayor o igual | `item.precio >= 20` |
| `<=`    | Menor o igual | `item.precio <= 50` |

---

## 🎨 DIAGRAMA DE FLUJO

```
┌─────────────────────────────────┐
│  Usuario selecciona filtros     │
└────────────┬────────────────────┘
             │
             ▼
┌─────────────────────────────────┐
│  Cargar productos del JSON      │
└────────────┬────────────────────┘
             │
             ▼
┌─────────────────────────────────┐
│  Para cada producto:            │
│  ¿Coincide categoría?           │
│  ¿Coincide precio?              │
└────────┬────────────┬───────────┘
         │            │
    ✅ SÍ        ❌ NO
         │            │
         ▼            ▼
    Incluir      Descartar
         │
         ▼
┌─────────────────────────────────┐
│  Mostrar productos filtrados    │
└─────────────────────────────────┘
```

---

## 💡 ¿POR QUÉ ESTÁ BIEN HECHO?

### ✅ **Eficiente**

- Solo recorre el array una vez
- No hace peticiones innecesarias al servidor

### ✅ **Flexible**

- Fácil añadir más filtros (talla, color, etc.)
- Solo hay que agregar más condiciones

### ✅ **Legible**

- Variables con nombres claros (`coincideCategoria`, `coincidePrecio`)
- Lógica separada en pasos

### ✅ **Automático**

- Cada vez que el usuario cambia un filtro, se ejecuta solo
- No necesita botón "Aplicar filtros"

---

## 🔧 EJEMPLO PRÁCTICO COMPLETO

### **Situación:**

- Usuario elige: **"Accesorios"** + **"20-50€"**

### **Productos en el JSON:**

```javascript
[
  { nombre: "Gorra Vintage", categoria: "accesorios", precio: 25 },
  { nombre: "Lámpara Retro", categoria: "decoracion", precio: 30 },
  { nombre: "Bolso de Cuero", categoria: "accesorios", precio: 45 },
  { nombre: "Reloj de Pared", categoria: "decoracion", precio: 15 },
];
```

### **Proceso de filtrado:**

1. **Gorra Vintage**
   - Categoría: `"accesorios" === "accesorios"` → ✅
   - Precio: `25 >= 20 && 25 <= 50` → ✅
   - **Resultado: INCLUIDO** ✅

2. **Lámpara Retro**
   - Categoría: `"decoracion" === "accesorios"` → ❌
   - **Resultado: DESCARTADO** ❌

3. **Bolso de Cuero**
   - Categoría: `"accesorios" === "accesorios"` → ✅
   - Precio: `45 >= 20 && 45 <= 50` → ✅
   - **Resultado: INCLUIDO** ✅

4. **Reloj de Pared**
   - Categoría: `"decoracion" === "accesorios"` → ❌
   - **Resultado: DESCARTADO** ❌

### **Productos mostrados:**

- Gorra Vintage (25€)
- Bolso de Cuero (45€)

---

## 🎤 FRASE PARA LA PRESENTACIÓN

> _"Este código usa el método `filter()` de JavaScript para recorrer todos los productos y quedarse solo con los que cumplen AMBOS filtros: categoría Y precio. Es eficiente porque solo recorre el array una vez, y es flexible porque puedo añadir más filtros fácilmente."_

---

## 📚 RESUMEN EN 3 PUNTOS

1. **Carga** los productos del JSON con `fetch()`
2. **Filtra** usando `filter()` con dos condiciones (categoría Y precio)
3. **Muestra** solo los productos que pasaron ambos filtros

---

**¡Listo para presentar! 🚀**
