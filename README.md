# Lumi – Landing Page

**Lumi** es una app que une el seguimiento del ciclo menstrual con la agenda diaria,
para que cada mujer planifique sus clases, reuniones y tareas según su energía real.

Este repositorio contiene el Landing Page de Lumi, desarrollado por la startup **6Bits**
para el curso IHC y Tecnologías Móviles (1ASI0385) de la Universidad Peruana de Ciencias Aplicadas (UPC).

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
├── js/                 # interacciones simples
└── assets/images/      # logo e imágenes
```

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
