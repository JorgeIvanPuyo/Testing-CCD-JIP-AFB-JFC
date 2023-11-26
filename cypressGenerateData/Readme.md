## Pruebas automatizadas usando cypress

Este projecto fue creado para ejecutar pruebas tipo e2e en el aplicativo ghost que corre de forma local. [Mas sobre ghost](https://ghost.org/).

Para esta semana se generaron escenarios de pruebas usandop 3 tecnicas:
* pruebas apriori con la mockaroo (ver archivo *ghost-mock-data.json*)
* Datos seudo aleatorios usando el api de [mockaroo](https://mockaroo.com/)
* Datos aleatorios usando [faker](https://fakerjs.dev/guide/)

### Para ejecutar

1. Instalar los paquetes con `npm install`
2. Dentro del archivo *cypress/const.js* se encuentran las configuraciones como usuario, password, mockaroo credenciales. Si se necesita correr en local bajo otras credenciales, cambiarlas en este archivo.
3. Ejecutar cypress `node_modules/.bin/cypress open`
4. Selecciònar la opción **E2E Testing**
5. Seleccinar el navegador y las pruebas para los archivos `escenario_n.spec.cy.js`, donde _n_ es el número del escenario detallado en la [Wiki](https://github.com/JorgeIvanPuyo/Testing-CCD-JIP-AFB-JFC/wiki)

### Escenarios y versiones
 Cada archivo tiene tiene 3 diferentes methodos de generación de datos, por lo tanto se puede decir que cada archivo tiene 3 escenarios.

<b>Ghost versión</b>: V5.72.0
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
