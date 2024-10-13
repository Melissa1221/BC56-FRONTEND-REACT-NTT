
# Bootcamp Project - Ecommerce Website

Este proyecto es una aplicación **Ecommerce** que consume una API de productos (`dummyjson.com`) y muestra productos categorizados, construido utilizando **React**, **TypeScript**, **Vite** y **CSS**. Incluye funcionalidades como búsqueda, filtrado por categorías y manejo de carrito de compras y lista de deseos.

## Contenido del Proyecto

- **React**: Manejo de la interfaz de usuario y gestión del estado con hooks como `useState` y `useEffect`.
- **TypeScript**: Tipado estático para mayor seguridad y robustez en el desarrollo.
- **Vite**: Entorno de desarrollo rápido para servir y compilar la aplicación.
- **CSS**: Estilos personalizados para la maquetación y diseño del ecommerce.

### Características

- **Consumo de API**: Obtiene productos y categorías desde una API externa.
- **Interfaz Responsive**: Adaptado para dispositivos móviles y escritorio.
- **Funcionalidades**:
  - Listado de productos filtrados por categorías.
  - Búsqueda en tiempo real de productos.
  - Carrito de compras y lista de deseos interactivos.
  - Sidebar con navegación móvil.
  - Visualización de precio total de los productos seleccionados.

## Cómo inicializar el proyecto

Para ver el proyecto en tu navegador, asegúrate de tener **Node.js** instalado. Luego, sigue los pasos a continuación para inicializar el entorno de desarrollo con Vite.

### Pasos

1. **Clonar el repositorio:**

   Clona el repositorio en tu máquina local utilizando `git`:

   ```bash
   git clone https://github.com/Melissa1221/BC56-FRONTEND-REACT-NTT.git
   ```

2. **Instalar las dependencias:**

   Navega hasta el directorio del proyecto y ejecuta el siguiente comando para instalar las dependencias necesarias:

   ```bash
    cd BC56-FRONTEND-REACT-NTT
    npm install
   ```

3. **Iniciar el servidor de desarrollo:**

   Una vez instaladas las dependencias, inicia el servidor de desarrollo con Vite:

   ```bash
   npm run dev
   ```

   Esto abrirá automáticamente tu navegador en `http://localhost:3000`, donde podrás ver la aplicación en acción.


## Estructura del Proyecto

```plaintext
BOOTCAMP-PROJECT/
│
├── node_modules/        # Módulos de Node.js instalados.
├── public/              # Archivos estáticos y públicos.
├── src/                 # Código fuente del proyecto.
│   ├── components/      # Componentes React.
│   │   ├── Banner.tsx   # Componente Banner para los banners principales.
│   │   ├── Footer.tsx   # Componente Footer para el pie de página.
│   │   ├── Header.tsx   # Componente Header que incluye el input de búsqueda.
│   │   ├── Main.tsx     # Componente principal que incluye la estructura de la página.
│   │   ├── ProductCard.tsx # Componente para mostrar tarjetas de productos.
│   │   ├── SearchBar.tsx  # Componente de barra de búsqueda.
│   │   ├── ShopSection.tsx # Sección principal para mostrar los productos.
│   ├── hooks/           # Custom hooks para lógica reutilizable.
│   │   └── useProducts.ts  # Hook para gestionar productos y categorías.
│   ├── interfaces/      # Definición de tipos e interfaces (Product, Category).
│   │   ├── category.interface.ts  # Interface de categoría.
│   │   ├── product.interface.ts   # Interface de producto.
│   ├── layout/          # Componentes de layout.
│   │   └── Sidebar.tsx  # Lógica del sidebar móvil.
│   ├── services/        # Servicios para consumir la API.
│   │   └── productsService.ts  # Lógica para obtener productos y categorías desde la API.
│   ├── App.tsx          # Componente principal de React que envuelve toda la aplicación.
│   ├── main.tsx         # Punto de entrada de la aplicación.
│   ├── vite-env.d.ts    # Definiciones de entorno para Vite.
├── .gitignore           # Archivos y carpetas ignorados por Git.
├── index.html           # Archivo HTML principal.
├── package.json         # Configuración del proyecto y scripts de npm.
├── package-lock.json    # Versión bloqueada de las dependencias.
├── README.md            # Este archivo.
└── tsconfig.json        # Configuración de TypeScript.
```
