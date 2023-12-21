# Objetivo del Proyecto

El objetivo del reto es desarrollar una aplicación web que muestre países utilizando el API
GraphQL proporcionado.
[API GraphQL](https://countries.trevorblades.com/)

## Instalación

Asegúrate de tener Node.js y npm instalados antes de continuar.

1. Clona el repositorio: `git clone https://github.com/jhoelsv25/prueba-tecnica.git`
2. Accede al directorio del proyecto: `cd prueba-tecnica`
3. Instala las dependencias: `npm install`

## Desarrollo Local

Ejecuta `ng serve` para iniciar un servidor de desarrollo. Navega a `http://localhost:4200/`. La aplicación se recargará automáticamente si realizas cambios en los archivos.

## Estructura del Proyecto

- `/src`
  - `/app`
    - `/components`: Contiene los componentes reutilizables de la aplicación.
    - `/constanst`: Contiene las querys para hacer la peticion a GraphQl.
    - `/services`: Contiene los servicios utilizados para la lógica de negocio.
    - `/interfaces`: Contiene las interfaces de datos.
    - `/mocks`: Contiene datos estaticos como por ejemplo los continentes.
    - `/pages`: Contiene las paginas para enrutamiento de la aplicación.
    - `/app.component.html`: Componente principal de la aplicación.
    - `app.config`: Contiene los modulos utilizados en la aplicación.
    - `app.routing`: Contiene las rutas de la aplicación.
  - `/assets`: Contiene archivos estáticos como imágenes, svg, etc.

## Tecnologías Utilizadas

las tecnologias utlizadas en este proyecto

- Angular
- Apollo
- GraphQL
- Tailwindcss

## Autor

- **Jhoel Silvestre** - _Desarrollador FrontEnd_ - [jhoelsv25](https://jhoel-silvestre.web.app/)
