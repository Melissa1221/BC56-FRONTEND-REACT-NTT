# Bootcamp Project - Ecommerce Website

Este proyecto es un ecommerce que consume una API de productos (`dummyjson.com`) y muestra productos categorizados. Está construido utilizando **TypeScript**, **Vite** y **HTML/CSS**.

## Contenido del Proyecto

- **TypeScript**: Lógica del frontend para manejar productos, categorías y la interacción del usuario.
- **Vite**: Entorno de desarrollo rápido y moderno para gestionar y servir los archivos del proyecto.
- **HTML/CSS**: Estructura y estilos personalizados para la maquetación y diseño del ecommerce.

### Características

- Consumo de API para obtener productos y categorías.
- Maquetado responsive, adaptado para dispositivos móviles y pantallas de escritorio.
- Funcionalidades como:
  - Listado de productos por categorías.
  - Búsqueda de productos en tiempo real.
  - Carrito de compras y favoritos interactivos.

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
   cd cd BC56-FRONTEND-REACT-NTT
   npm install
   ```

3. **Iniciar el servidor de desarrollo:**

   Una vez instaladas las dependencias, inicia el servidor de desarrollo con Vite:

   ```bash
   npm run dev
   ```

   Esto abrirá automáticamente tu navegador en `http://localhost:3000`, donde podrás ver el ecommerce en acción.

4. **Compilar el proyecto para producción (opcional):**

   Si deseas compilar el proyecto para producción, ejecuta:

   ```bash
   npm run build
   ```

   Esto generará los archivos optimizados en la carpeta `dist`.

## Estructura del Proyecto

```
BOOTCAMP-PROJECT/
│
├── node_modules/        # Módulos de Node.js instalados.
├── public/              # Archivos estáticos y públicos.
├── src/                 # Código fuente del proyecto.
│   ├── css/             # Archivos de estilos CSS.
│   │   └── style.css    # Estilos principales.
│   ├── interfaces/      # Definición de tipos e interfaces (Product, Category).
│   │   ├── category.ts  # Interface de categoría.
│   │   └── product.ts   # Interface de producto.
│   ├── main.ts          # Archivo principal de TypeScript (punto de entrada).
│   ├── sidebar.ts       # Lógica para el comportamiento del sidebar.
│   └── vite-env.d.ts    # Definiciones de entorno para Vite.
├── .gitignore           # Archivos y carpetas ignorados por Git.
├── index.html           # Archivo HTML principal.
├── package.json         # Configuración del proyecto y scripts de npm.
├── package-lock.json    # Versión bloqueada de las dependencias.
├── README.md            # Este archivo.
└── tsconfig.json        # Configuración de TypeScript.
```
