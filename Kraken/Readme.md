## Random testing Kraken - Ghost

Este projecto fue creado para ejecutar pruebas tipo e2e en el aplicativo ghost que corre de forma local. [Mas sobre ghost](https://ghost.org/)

### Para ejecutar

1. Instalar los paquetes con `npm install`
2. Ejecutar cypress `node_modules/.bin/cypress open`
3. Selecciònar la opción **E2E Testing**
4. Seleccinar el navegador y las pruebas para los archivos `escenario_n.spec.cy.js`, donde _n_ es el número del escenario detallado en la [Wiki](https://github.com/JorgeIvanPuyo/Testing-CCD-JIP-AFB-JFC/wiki)

<br>
<b>Node version</b>: v16.20.2
<br>
<b>Android Studio</b>: Configurado SDK, ADB, AAPT
<b>Appium</b>: Instalado por defecto con NodeJS 16
<b>Java</b>: JRE

### Observaciones
Se debe tener corriendo Ghost de forma local.
Se debe modificar las variables en el archivo properties.json, incluyendo la URL local donde corre Ghost, el USERNAME y el PASSWORD de un usuario registrado en la instancia de Ghost local.
Correr las pruebas en orden secuencial, una a una en orden ascendente:

1. `scenario_1.feature`
2. `scenario_2.feature`
3. `scenario_3.features`
4. `scenario_4.feature`
   <br>

- ....
  <br>

20. `scenario_20.feature`
