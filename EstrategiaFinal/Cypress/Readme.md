## Pruebas e2e

Este projecto fue creado para ejecutar pruebas tipo e2e usando diferentes tecnicas de generación de datos y VRT en el aplicativo ghost [Mas sobre ghost](https://ghost.org/).

Las diferentes puebas validan diferentes escenarios sobre el modulo de post, se aplica tecnicas como la generación de datos, apriori, pseudo-aleatorios y aleatorios usando [mockaroo](https://www.mockaroo.com/) y [faker](https://fakerjs.dev/) asi como la toma de screenshots y su respectivo analisis usando [resemble](/EstrategiaFinal/Cypress/resembleCypress/Readme.md)

### Para ejecutar

1. Instalar los paquetes con `npm install`
2. Ejecutar cypress `node_modules/.bin/cypress open`
3. Selecciònar la opción **E2E Testing**
4. Seleccinar el navegador y las pruebas para los archivos `escenario_n.spec.cy.js`, donde _n_ es el número del escenario detallado en la [Wiki](https://github.com/JorgeIvanPuyo/Testing-CCD-JIP-AFB-JFC/wiki)

<br>
<b>Node version</b>: v18.12.1
<br>
<b>npm version</b>: 8.19.2

### Observaciones

Correr las pruebas en orden secuencial, esto con el fin de tener datos para la siguiente prueba, correr en el siguiente orden ascendente:

- `escenario_1.spec.cy.js`
- `escenario_2.spec.cy.js`
- `escenario_3.spec.cy.js`
- `escenario_4.spec.cy.js`
  <br>

- ....
  <br>

- `escenario_n.spec.cy.js`

### Notas:

Ghost: v5.72.0
Node version: v18.12.1
Pnpm version: 8.10.0
