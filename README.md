# Lumi – Landing Page

**Lumi** es una app que une el seguimiento del ciclo menstrual con la agenda diaria,
para que cada mujer planifique sus clases, reuniones y tareas según su energía real.

Este repositorio contiene el Landing Page de Lumi, desarrollado por la startup **6Bits**
para el curso IHC y Tecnologías Móviles (1ASI0385) de la Universidad Peruana de Ciencias Aplicadas (UPC).

## Enlaces

| Recurso | Enlace |
|---|---|
| 🌐 Landing publicado | https://lumi-upc.github.io/Lumi-landing-page/ |
| 💻 Repositorio | https://github.com/LUMI-UPC/Lumi-landing-page |
| 🎨 Diseño en Figma | https://www.figma.com/design/BCU2mabbaiTamg5pwkz2T3/LUMI-grupo1-2026 |
| 🏷️ Versión actual | [v1.0.0](https://github.com/LUMI-UPC/Lumi-landing-page/releases/tag/v1.0.0) |

## Secciones del landing

Header · Hero · Problema · Funcionalidades · Cómo funciona · Para quién es · **Prueba Lumi** · Planes · Testimonios · Nosotros · Preguntas frecuentes · Footer

## Prueba Lumi (demo interactiva)

Demo con las 5 pestañas del diseño móvil (**Inicio, Calendario, Horarios, Bienestar y Perfil**) que simula
**35 historias de usuario del core**. Los datos viven en memoria y se reinician al recargar la página.
Los botones *−1 día / +1 día / +7 días* simulan el paso del tiempo para ver predicciones, alertas y retrasos.

| Pestaña | Historias de usuario |
|---|---|
| Bienvenida | US-01, US-03, US-05, US-06 |
| Inicio | US-45, US-14, US-16, US-46, US-47, US-48 |
| Calendario | US-44, US-11, US-17, US-12, US-18, US-15, US-21, US-50, US-22, US-23 |
| Horarios | US-19, US-24, US-20 |
| Bienestar | US-35, US-36, US-37, US-38, US-30, US-31, US-32, US-33, US-34 |
| Perfil | US-25, US-26, US-13, US-49 |

## Tecnologías

- HTML5
- CSS3
- JavaScript (interacciones simples)

## Cómo ver el landing

1. Clona el repositorio:
   ```bash
   git clone https://github.com/LUMI-UPC/Lumi-landing-page.git
   ```
2. Abre el archivo `index.html` en tu navegador.

## Estructura

```
├── index.html
├── css/
│   ├── base.css        # colores, tipografía y componentes compartidos
│   └── sections/       # estilos de cada sección
├── js/
│   ├── menu.js         # menú en celular
│   ├── faq.js          # preguntas frecuentes
│   └── try-lumi.js     # demo interactiva Prueba Lumi
└── assets/images/      # logo e imágenes
```

## Despliegue (GitHub Pages)

1. El landing se publica desde la rama `main`, carpeta raíz (`/`).
2. En **Settings → Pages**, la fuente es *Deploy from a branch* → `main` → `/ (root)`.
3. Cada *release* que se une a `main` se publica automáticamente en https://lumi-upc.github.io/Lumi-landing-page/

## Versiones

| Versión | Contenido |
|---|---|
| `v1.0.0` | Landing completo según el Figma y demo Prueba Lumi con 35 HU del core. |

## Flujo de trabajo (GitFlow)

| Rama | Uso |
|---|---|
| `main` | Versión publicada del landing. Solo recibe *releases*. |
| `develop` | Integración de las secciones terminadas. |
| `feature/<nombre>` | Una rama por sección o cambio. Sale de `develop` y vuelve a `develop` con un Pull Request. |
| `release/<versión>` | Preparación de una versión antes de pasar a `main` (ej. `release/1.0.0`). |
| `hotfix/<nombre>` | Arreglos urgentes sobre `main`. |

Pasos para agregar una sección:

1. `git checkout develop` y `git pull`
2. `git checkout -b feature/<nombre>` (ej. `feature/pricing`)
3. Hacer los cambios y los commits.
4. Subir la rama y abrir un Pull Request hacia `develop`.
5. Unir con **Squash and merge** y borrar la rama.

## Commits (Conventional Commits)

Formato: `tipo(alcance): descripción` en inglés y en imperativo.

| Tipo | Cuándo usarlo | Ejemplo |
|---|---|---|
| `feat` | Nueva funcionalidad o sección | `feat(pricing): add pricing section` |
| `fix` | Corrección de un error | `fix(header): close menu on link click` |
| `style` | Cambios de formato sin cambiar la lógica | `style(faq): adjust spacing` |
| `refactor` | Mejora del código sin cambiar el resultado | `refactor(css): reuse card styles` |
| `docs` | Documentación | `docs: update README` |
| `chore` | Configuración o tareas del repositorio | `chore: add gitignore` |

## Convenciones de código

- Nombres de archivos, carpetas, clases, ids y variables **en inglés**. Los textos que ve la usuaria van en español.
- Clases con la metodología **BEM**: `bloque__elemento--modificador` (ej. `header__menu-button`, `button--primary`).
- Cada sección tiene su propio archivo en `css/sections/` y reutiliza los estilos de `css/base.css`.
- HTML5 semántico (`header`, `nav`, `main`, `section`, `footer`), `alt` en las imágenes y `aria-labelledby` en cada sección.
- Diseño *responsive*: se revisa en celular (375 px) y en escritorio (1440 px).
- Versionado semántico para las *releases*: `vMAYOR.MENOR.PARCHE` (ej. `v1.0.0`).
