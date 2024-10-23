# Ecommerce Website - Proyecto Bootcamp (React)

Este proyecto es una aplicación **Ecommerce** desarrollada utilizando **React**, **TypeScript**, **Vite**, y **CSS**. Permite consumir productos desde una API (`dummyjson.com`) y mostrarlos en diferentes categorías, con funciones como búsqueda, filtrado por categorías, manejo de carrito de compras, y lista de deseos.

## Tecnologías Utilizadas

- **React**: Framework para construir interfaces de usuario y gestionar el estado.
- **TypeScript**: Tipado estático que asegura mayor seguridad y robustez en el código.
- **Vite**: Herramienta rápida para el desarrollo y compilación del proyecto.
- **CSS**: Diseño y estilo personalizado del sitio.

## Funcionalidades Principales

- **Consumo de API**: Los productos y categorías se obtienen dinámicamente desde una API externa.
- **Interfaz Adaptable**: La aplicación es responsive, adaptándose a dispositivos móviles y de escritorio.
- **Manejo de Carrito de Compras**: Los usuarios pueden agregar, eliminar y modificar la cantidad de productos en su carrito.
- **Lista de Deseos**: Opción para añadir productos a la lista de deseos.
- **Filtrado y Búsqueda**:
  - Filtrado de productos por categoría.
  - Búsqueda en tiempo real de productos por nombre o descripción.
- **Visualización de Precio Total**: Se muestra el precio total de los productos seleccionados en el carrito.

### Nueva Funcionalidad: Página "Resumen" del Carrito

Se ha añadido una nueva página llamada **"Resumen"** para visualizar la lista de productos agregados al carrito, permitiendo:

- **Visualización de Productos en el Carrito**: Lista los productos con imagen, nombre, precio, cantidad y opción para eliminar.
- **Controles de Incremento/Decremento**: Botones para modificar la cantidad de productos directamente desde la página de resumen.
- **Eliminación de Productos**: Permite eliminar productos del carrito, actualizando la cantidad total y el icono del carrito.
- **Precio Total Actualizado**: El total a pagar se actualiza en base a la cantidad y precios de los productos en el carrito.
- **Formulario de Envío de Productos**: Debajo del resumen, hay un formulario para completar los datos de envío (nombres, apellidos, distrito, dirección, referencia y celular), con validaciones incluidas.

#### Importante: Acceso a la página de Resumen

Para acceder a la página de **"Resumen"** y visualizar el carrito de compras, debes hacer clic en el **ícono del carrito** que se encuentra en la barra superior.

### Validaciones del Formulario de Envío

- **Validaciones de Campo**: Todos los campos del formulario son obligatorios y deben cumplir con los siguientes criterios:
  - **Nombres/Apellidos**: No se permiten números, y si se ingresan, se mostrará un mensaje de error.
  - **Distrito**: Es un campo desplegable que carga su contenido dinámicamente desde un archivo de distritos.
  - **Dirección y Referencia**: Campos de texto obligatorios.
  - **Celular**: Debe contener exactamente 9 dígitos.
- **Comportamiento del Botón "Comprar"**:
  - Si el formulario está incompleto, se mostrarán mensajes de error debajo de cada campo.
  - Si todos los campos son válidos, aparecerá una alerta personalizada indicando que el pedido fue registrado con éxito, y se limpiarán los datos del carrito y del formulario.

## Cómo Inicializar el Proyecto

Para ejecutar el proyecto en tu máquina local, sigue los pasos a continuación.

### Requisitos

- **Node.js** instalado en tu sistema.

### Pasos para la instalación

1. **Clonar el repositorio**:

   Utiliza el siguiente comando para clonar el repositorio en tu máquina local:

   ```bash
   git clone https://github.com/Melissa1221/BC56-FRONTEND-REACT-NTT.git
   ```

2. **Instalar dependencias**:

   Ingresa en el directorio del proyecto y ejecuta el siguiente comando para instalar las dependencias necesarias:

   ```bash
   cd BC56-FRONTEND-REACT-NTT
   npm install
   ```

3. **Iniciar el servidor de desarrollo**:

   Una vez instaladas las dependencias, inicia el servidor de desarrollo con el siguiente comando:

   ```bash
   npm run dev
   ```

   Esto abrirá la aplicación automáticamente en tu navegador en la URL `http://localhost:3000`.

## Estructura del Proyecto

```plaintext
Ecommerce-Project/
│
├── node_modules/        # Módulos de Node.js instalados.
├── public/              # Archivos estáticos.
├── src/                 # Código fuente del proyecto.
│   ├── components/      # Componentes de React.
│   │   ├── Banner.tsx   # Componente del banner principal.
│   │   ├── CartSummary.tsx # Resumen del carrito de compras.
│   │   ├── Footer.tsx   # Pie de página.
│   │   ├── Header.tsx   # Encabezado que incluye la barra de búsqueda.
│   │   ├── Main.tsx     # Componente principal.
│   │   ├── ProductCard.tsx # Componente para las tarjetas de productos.
│   │   ├── ShipmentForm.tsx # Formulario para el envío de productos.
│   │   ├── ShopSection.tsx  # Sección para mostrar los productos.
│   ├── context/         # Manejo del estado global de la tienda.
│   │   ├── ShopContext.tsx  # Contexto de la tienda y carrito.
│   ├── data/            # Datos estáticos como distritos.
│   │   ├── districts.ts  # Archivo que contiene la lista de distritos.
│   ├── hooks/           # Custom hooks para lógica reutilizable.
│   │   ├── useDistricts.ts  # Hook para cargar distritos.
│   │   ├── useProducts.ts  # Hook para manejar los productos.
│   ├── interfaces/      # Definición de tipos e interfaces.
│   │   ├── category.interface.ts  # Interface de categoría.
│   │   ├── product.interface.ts   # Interface de producto.
│   ├── layout/          # Componentes de layout.
│   │   ├── Sidebar.tsx  # Componente del sidebar.
│   ├── pages/           # Páginas de la aplicación.
│   │   ├── Home.tsx     # Página principal.
│   │   ├── Summary.tsx  # Página de resumen del carrito.
│   ├── services/        # Servicios que consumen la API.
│   │   ├── productsService.ts  # Servicio para obtener productos y categorías.
│   ├── App.tsx          # Componente principal de la aplicación.
│   ├── main.tsx         # Punto de entrada de la aplicación.
│   ├── vite-env.d.ts    # Definiciones de entorno para Vite.
├── .gitignore           # Archivos y carpetas ignorados por Git.
├── index.html           # Archivo HTML principal.
├── package.json         # Configuración del proyecto y scripts de npm.
├── tsconfig.json        # Configuración de TypeScript.
└── README.md            # Este archivo.
```
