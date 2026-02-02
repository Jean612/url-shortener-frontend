# 🔗 URL Shortener Frontend

Una aplicación web moderna y profesional para acortar URLs, construida con Next.js 16, TypeScript, y GraphQL. Interfaz minimalista con estadísticas detalladas de cada enlace.

![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.1-38bdf8?style=flat-square&logo=tailwind-css)
![GraphQL](https://img.shields.io/badge/GraphQL-16.12.0-e10098?style=flat-square&logo=graphql)

## ✨ Características

- 🚀 **Acortamiento instantáneo** de URLs con GraphQL
- 📊 **Estadísticas detalladas** por enlace (clicks, países, dispositivos)
- 📱 **Diseño responsive** y moderno con Tailwind CSS
- 🎨 **UI/UX premium** con animaciones y transiciones suaves
- 📋 **Copiar al portapapeles** con un solo click
- 🔍 **Búsqueda de estadísticas** por slug o URL completa
- ⚡ **React Query** para gestión de estado y caché
- 🎯 **Validación de formularios** con Zod y React Hook Form

## 🛠️ Stack Tecnológico

### Core
- **Next.js 16.1.6** - Framework React con App Router
- **React 19** - Biblioteca de UI
- **TypeScript 5** - Tipado estático

### Estilos
- **Tailwind CSS 3.4.1** - Framework de utilidades CSS
- **tailwindcss-animate** - Animaciones predefinidas
- **Lucide React** - Iconos modernos

### GraphQL & Data Fetching
- **graphql-request** - Cliente GraphQL ligero
- **@tanstack/react-query** - Gestión de estado asíncrono
- **@tanstack/react-query-devtools** - Herramientas de desarrollo

### Formularios & Validación
- **react-hook-form** - Gestión de formularios
- **@hookform/resolvers** - Resolvers para validación
- **zod** - Validación de esquemas

### UI Components
- **Radix UI** - Componentes accesibles sin estilos
- **class-variance-authority** - Gestión de variantes de componentes
- **clsx & tailwind-merge** - Utilidades para clases CSS

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── page.tsx                    # Página principal (acortador)
│   ├── layout.tsx                  # Layout raíz con providers
│   ├── globals.css                 # Estilos globales y variables CSS
│   └── stats/
│       ├── page.tsx                # Búsqueda de estadísticas
│       └── [slug]/
│           └── page.tsx            # Estadísticas detalladas por slug
├── components/
│   ├── features/
│   │   └── link-shortener/
│   │       └── CreateLinkForm.tsx  # Formulario principal
│   ├── providers.tsx               # React Query Provider
│   └── ui/                         # Componentes reutilizables (shadcn/ui)
│       ├── button.tsx
│       ├── card.tsx
│       └── input.tsx
├── hooks/
│   └── useShortenLink.ts           # Hook personalizado para acortar URLs
├── lib/
│   ├── graphql/
│   │   ├── client.ts               # Cliente GraphQL configurado
│   │   ├── mutations/
│   │   │   └── links.ts            # Mutación CREATE_LINK
│   │   └── queries/
│   │       ├── links.ts            # Query GET_TOP_LINKS
│   │       └── getLinkStats.ts     # Query GET_LINK_STATS
│   └── utils.ts                    # Utilidades (cn, etc.)
└── .env.local                      # Variables de entorno
```

## 🚀 Instalación y Configuración

### Prerrequisitos

- Node.js 20 o superior
- npm, yarn, pnpm o bun
- Backend GraphQL corriendo (Rails API)

### 1. Clonar el repositorio

```bash
git clone <tu-repo>
cd url-shortener-frontend
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
NEXT_PUBLIC_GRAPHQL_ENDPOINT=http://localhost:3000/graphql
```

> ⚠️ Asegúrate de que el backend esté corriendo en el puerto especificado.

### 4. Ejecutar en desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📖 Uso

### Acortar un enlace

1. Ingresa la URL larga en el campo de texto
2. Haz clic en "Acortar Enlace"
3. Copia el enlace corto generado
4. Haz clic en el ícono de estadísticas para ver métricas

### Ver estadísticas

**Opción 1: Desde el enlace acortado**
- Haz clic en el botón de estadísticas (📊) junto al enlace copiado

**Opción 2: Búsqueda directa**
- Ve a `/stats`
- Ingresa el slug o la URL completa
- Visualiza clicks, países, dispositivos y fechas

## 🎨 Características de UI/UX

- **Diseño minimalista** con paleta de colores profesional
- **Animaciones suaves** en hover y transiciones
- **Feedback visual** inmediato (copiado, carga, errores)
- **Responsive design** optimizado para móviles y desktop
- **Modo oscuro** preparado (variables CSS configuradas)
- **Accesibilidad** con componentes Radix UI

## 🔧 Scripts Disponibles

```bash
npm run dev      # Inicia el servidor de desarrollo
npm run build    # Construye la aplicación para producción
npm run start    # Inicia el servidor de producción
```

## 🌐 Despliegue

### Vercel (Recomendado)

1. Conecta tu repositorio en [Vercel](https://vercel.com)
2. Configura la variable de entorno `NEXT_PUBLIC_GRAPHQL_ENDPOINT`
3. Despliega automáticamente

### Otras plataformas

```bash
npm run build
npm run start
```

Asegúrate de configurar las variables de entorno en tu plataforma de hosting.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Haz fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 👨‍💻 Autor

**Jean Chavez**

- GitHub: [@Jean612](https://github.com/Jean612)
- LinkedIn: [Jean Chavez](https://linkedin.com/in/tu-perfil)

---

⭐ Si te gusta este proyecto, ¡dale una estrella en GitHub!
