# Ecommerce Website - Maquetado y Funcionalidades con API

Este proyecto es un ecommerce que vende todo tipo de productos como alimentos, maquillaje, cuidado de la piel, cuidado del cabello y más. El proyecto ahora incluye una integración con JavaScript para agregar funcionalidades dinámicas como filtrado de productos, búsqueda en tiempo real y gestión de carrito de compras.

## Contenido del Proyecto

- **HTML**: Estructura básica de la página web.
- **CSS**: Estilos personalizados para el diseño y la maquetación.
- **JavaScript**: Integración con una API para obtener productos, gestionar un carrito de compras, filtrar por categorías y buscar productos en tiempo real.

### Nuevas Funcionalidades

1. **Carga Dinámica de Productos desde la API**:
   Los productos se obtienen dinámicamente desde la API de DummyJSON (`https://dummyjson.com/products`). Estos se muestran en la página principal con su respectiva información, como título, precio, descuento y stock disponible.

2. **Búsqueda en Tiempo Real**:
   A medida que el usuario escribe en el campo de búsqueda, los productos se filtran dinámicamente en función del título, descripción o etiquetas asociadas.

3. **Filtrado por Categorías**:
   Los usuarios pueden seleccionar una categoría de un desplegable para ver únicamente los productos de esa categoría.

4. **Carrito de Compras**:
   Los usuarios pueden añadir productos al carrito de compras. El número de productos en el carrito y el precio total se actualizan en tiempo real cada vez que se agrega un producto.

### Características

- **Maquetado Responsive**: Adaptado para dispositivos móviles y pantallas de escritorio.
- **Interactividad con JavaScript**: Uso de funciones asíncronas para cargar y gestionar productos.
- **Filtros Dinámicos**: Búsqueda en tiempo real y filtrado por categorías.
- **Carrito de Compras Dinámico**: Actualización del número de productos y el total del carrito.

## Cómo Inicializar el Proyecto

No es necesario instalar dependencias adicionales. Simplemente sigue los pasos a continuación para ejecutar el proyecto en tu navegador:

### Pasos

1. **Clonar el Repositorio**:

   Clona el repositorio en tu máquina local utilizando `git`:

   ```bash
   git clone https://github.com/Melissa1221/BC56-FRONTEND-REACT-NTT.git
   ```

2. **Abrir el Archivo HTML**:

   Navega hasta el directorio del proyecto y abre el archivo `index.html` en tu navegador preferido:

   ```bash
   cd BC56-FRONTEND-REACT-NTT
   ```

   Luego, abre el archivo `index.html` directamente desde el explorador de archivos o usando un servidor local como la extensión de **Live Server** de VS Code.

3. **Explorar la Funcionalidad**:

   - Navega por los productos cargados dinámicamente.
   - Usa el campo de búsqueda para encontrar productos específicos.
   - Filtra productos por categoría usando el desplegable de categorías.
   - Añade productos al carrito y observa cómo el total y el número de productos se actualizan en tiempo real.

```
BC56-FRONTEND-REACT-NTT/
│
├── assets/              # Imágenes y otros recursos multimedia.
├── css/                 # Archivos de estilos CSS.
│   └── styles.css       # Estilos principales.
├── index.html           # Archivo HTML principal.
├── js/                  # Archivos JavaScript.
│   ├── main.js          # Funcionalidades principales.
│   └── sidebar.js       # Funcionalidades del sidebar.
│
├── README.md            # Este archivo.
```

## Funcionalidades en Detalle

### Carga Dinámica de Productos

La función `getAllProducts()` realiza una petición a la API de DummyJSON para obtener una lista de productos y renderizarlos en la página. Los productos se muestran con información relevante como imagen, precio, descuento y stock.

### Búsqueda en Tiempo Real

La función `filterProducts(searchTerm)` permite filtrar los productos que coinciden con el término de búsqueda a medida que el usuario escribe. Filtra por título, descripción o etiquetas.

### Filtrado por Categorías

La función `loadCategories()` obtiene una lista de categorías de productos desde la API. Al seleccionar una categoría en el desplegable, los productos se filtran dinámicamente.

### Carrito de Compras

Cada vez que un usuario añade un producto al carrito, la función `updateCartCounter(productPrice)` actualiza el número de productos en el carrito y el precio total, mostrando estos valores en la parte superior del sitio.

