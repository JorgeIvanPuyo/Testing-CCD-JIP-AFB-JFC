## Random testing - Los estudiantes

Este projecto fue creado para ejecutar pruebas tipo e2e en el aplicativo ghost que corre de forma local. [Mas sobre ghos](https://ghost.org/)

### Para ejecutar

1. Instalar los paquetes con `npm install`
2. Ejecutar cypress `node_modules/.bin/cypress open`
3. Selecciònar la opciòn **E2E Testing**
4. Seleccinar el navegador y las pruebas para los archivos `escenario_n.spec.cy.js`, donde _n_ es el numerp del escenario detallado en la [Wiki](https://github.com/JorgeIvanPuyo/Testing-CCD-JIP-AFB-JFC/wiki)

<br>
<b>Node version</b>: v18.12.1
<br>
<b>npm version</b>: 8.19.2

### Observaciones

Correr las pruebas en orden secuencial, esto con el fin de tener datos para la siguiente prueba, correr en el siguiente orden ascendente:

1. `escenario_1.spec.cy.js`
2. `escenario_2.spec.cy.js`
3. `escenario_3.spec.cy.js`
4. `escenario_4.spec.cy.js`
   <br>

- ....
  <br>

20. `escenario_20.spec.cy.js`
