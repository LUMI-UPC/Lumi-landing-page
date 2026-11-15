# Lumi – Landing Page

**Lumi** es una app que une el seguimiento del ciclo menstrual con la agenda diaria,
para que cada mujer planifique sus clases, reuniones y tareas según su energía real.

Este repositorio contiene el Landing Page de Lumi, desarrollado por la startup **6Bits**
para el curso IHC y Tecnologías Móviles (1ASI0385) de la Universidad Peruana de Ciencias Aplicadas (UPC).

## Enlaces

| Recurso | Enlace |
|---|---|
| Landing publicado | https://lumi-upc.github.io/Lumi-landing-page/ |
| Repositorio | https://github.com/LUMI-UPC/Lumi-landing-page |
| Diseño en Figma | https://www.figma.com/design/BCU2mabbaiTamg5pwkz2T3/LUMI-grupo1-2026 |
| Versión actual | [v1.0.0](https://github.com/LUMI-UPC/Lumi-landing-page/releases/tag/v1.0.0) |

## Secciones del landing

Header · Hero · Problema · Funcionalidades · Cómo funciona · Para quién es · **Prueba Lumi** · Planes · Validación · Nosotros · Preguntas frecuentes · Footer

Páginas: `index.html` (landing), `app.html` (demo de la app) y `privacy.html` (privacidad, términos y eliminación de datos).

## Prueba Lumi (demo de la app)

El landing tiene el botón **Abrir la demo**, que lleva a `app.html`: la app a pantalla completa, pensada para el celular
(se puede agregar a la pantalla de inicio). Tiene las 5 pestañas del diseño móvil (**Inicio, Calendario, Horarios,
Bienestar y Perfil**) y simula **35 historias de usuario del core**. Los datos viven en memoria y se reinician al recargar.

- La franja **Demo** (*−1 día / +1 día / +7 días / Hoy*) cambia la fecha para ver predicciones, alertas y retrasos.
- **Modo oscuro**: botón en la barra superior o Perfil → Apariencia (claro, oscuro o automático).
- **Modo discreto** y **bloqueo con PIN** desde la barra superior.

| Pestaña | Historias de usuario |
|---|---|
| Bienvenida | US-01, US-03, US-05, US-06 |
| Inicio | US-45, US-14, US-16, US-46, US-47, US-48 |
| Calendario | US-44, US-11, US-17, US-12, US-18, US-15, US-21, US-50, US-22, US-23, US-48 |
| Horarios | US-19, US-24, US-20, US-23 |
| Bienestar | US-35, US-36, US-37, US-38, US-30, US-31, US-32, US-33, US-34 |
| Perfil | US-25, US-26, US-13, US-49 |

## Mejoras de la auditoría de UX

| Problema encontrado | Corrección |
|---|---|
| El calendario comunicaba los estados solo con color | Íconos de gota (periodo) y batería (energía baja), contador de actividades y leyenda |
| Privacidad, Términos y redes sin destino | Página `privacy.html`; se retiraron los enlaces sin destino |
| Testimonios y videos de relleno | Sección **Validación** con el proceso real de entrevistas |
| Códigos de historias de usuario visibles en la app | Se quitaron de la app; el detalle queda en este README |
| El aviso tapaba botones y no se podía cerrar | Aviso arriba, con botón de cerrar |
| Botones de App Store / Google Play no descargaban | Etiquetas "Próximamente" y botón real **Probar Lumi ahora** |
| Controles de simulación mezclados con los de la app | Franja **Demo** aparte para cambiar la fecha |
| Datos del ciclo contradictorios entre pantallas | El historial coincide con Inicio ("Actual · día N", periodo estimado) |
| Textos de 12–13 px | Tamaño mínimo de 14 px |

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
├── index.html            # landing
├── app.html              # demo de la app a pantalla completa
├── privacy.html          # privacidad, términos y eliminación de datos
├── manifest.webmanifest  # permite agregar la demo a la pantalla de inicio
├── css/
│   ├── base.css          # colores, tipografía y componentes compartidos
│   └── sections/         # estilos de cada sección
├── js/
│   ├── menu.js           # menú en celular
│   ├── faq.js            # preguntas frecuentes
│   └── try-lumi.js       # lógica de la demo
└── assets/images/        # logo e íconos
```

## Despliegue (GitHub Pages)

1. El landing se publica desde la rama `main`, carpeta raíz (`/`).
2. En **Settings → Pages**, la fuente es *Deploy from a branch* → `main` → `/ (root)`.
3. Cada *release* que se une a `main` se publica automáticamente en https://lumi-upc.github.io/Lumi-landing-page/

## Versiones

| Versión | Contenido |
|---|---|
| `v1.0.0` | Landing completo según el Figma y demo Prueba Lumi con 35 HU del core. |
| `v1.1.0` | Demo a pantalla completa para el celular, modo oscuro, página de privacidad y mejoras de la auditoría de UX. |

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
