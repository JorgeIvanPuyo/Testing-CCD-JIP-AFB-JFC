## Pruebas de reconocimiento

Este projecto fue creado para ejecutar pruebas tipo monkey en la pagina [Ghost V5.72.0](http://157.230.86.220:5720/ghost) que estara explorando la pagina de crear post.

### Para ejecutar

1. Instalar los paquetes con `npm install`
2. Ejecutar cypress `node_modules/.bin/cypress open`
3. Selecciònar la opciòn **E2E Testing**
4. Seleccinar el navegador y las pruebas para el archivo: monkey-create-post-page.cy.js

**Nota**:

- El monkey esta programado para capturar 4 tipo de elementos y su respectivo eventos, si en la pagina no se encuentra el elemento, el monkey espera un segundo y vuelve a llamar a la funcion `randomEvent` para traer el nuevo elemento. El numero de monkeys por defecto es 20 pero se puede cambiar en cambiando el valor de la variable `monkeysLeft` dentro del archivo del monkey
- Dado el caso presente problemas de permisos si esta usando una maquina UNIX, correr los comandos con _sudo_
- Si se desea modificar alguna constante como usuario, contrasena y url, estos valores se encuentran dentro del archivo _const.js_. Por defecto corre sobre el una instancia de ghost que esta en la nube http://157.230.86.220:5720/ Pero en oportunidades (pocas) el servicio es lento, si presenta lentitud es mejor correrlo en localhost y cambiar la variable correspondiente dentro de _const.js_

<b>Ghost</b>: v5.72.0
<br>
<b>Node version</b>: v18.12.1
<br>
<b>Pnpm version</b>: 8.10.0
