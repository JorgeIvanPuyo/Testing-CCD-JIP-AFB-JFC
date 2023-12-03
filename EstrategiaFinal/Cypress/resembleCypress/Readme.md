## Comparación de imagenes

Dentro de este miniprojecto se ejecuta la comparacion de imagenes usando [Resemble.JS](https://github.com/rsmbl/Resemble.js?files=1).
El reporta ya ha sido generado y se encuentra en _/report/report.html_ pero puede ser generado nuevamente siguiendo los siguientes pasos:

1. Instalar las dependencias `npm install`
2. Correr el el script `node index.js`

### Notas:

- Es importante que antes de ejecutar la comparación de imagenes, estas existan dentro del projecto de pruebas e2e, es decir primero correr el escenario 6 que es el mas completo y luego ejecutar este script
- Para solucionar errores en Mac, se debe instalar las dependencias mencionadas en el siguiente post [click aqui](https://flaviocopes.com/fix-node-canvas-error-pre-gyp-macos/)

Node version: v18.12.1
Pnpm version: 8.10.0
