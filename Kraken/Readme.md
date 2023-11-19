## Random testing Kraken - Ghost

Este proyecto fue creado para ejecutar pruebas tipo e2e en el aplicativo ghost que corre de forma local. [Mas sobre ghost](https://ghost.org/)

### Para ejecutar

Prerequisitos
<br>
<b>Node version</b>: v16.20.2
<br>
<b>Android Studio</b>: Configurado SDK, ADB, AAPT  
<b>Appium</b>: Instalado por defecto con NodeJS 16  
<b>Java</b>: JRE  
<b>Se deben tener configuradas todas las variables de entorno necesarias para Android SDK y JAVA

### Pasos para correr Kraken.
1. Crear proyecto de NodeJS con `npm init -y`
2. Instalar Kraken con `npm install kraken-node -g`
3. Verificar prerequisitos con `npx kraken-node doctor`
4. Generar esqueleto de cucumber `npx kraken-node gen`
5. Ejecutar test con npx `npx kraken-node run`


### Observaciones
- Se pueden encontrar las 2 versiones de Ghost trabajadas en las siguientes URLs:  

Ghost V4.48.0 -> http://157.230.86.220:4470/ghost  
Ghost V5.72.0 -> http://157.230.86.220:5720/ghost  

Credenciales:  
USR: example@test.com  
PWD: Test123456  

- En la carpeta [Ghost 5.72.0](../Kraken/features/temporal_features) encontrará los features desarrollados para Ghost 5.72 con toma de screenshots implementado    
- En la carpeta [Ghost 4.48.0](../Kraken-4/features/temporal_features) encontrará los features desarrollados para Ghost 4.48 con toma de screenshots implementado
- Si su sistema le permite correr los scripts ".features" de forma automatica, puede moverlos directamente a la carpeta features y ejecutar "npx kraken-node run".
- Si su sistema solo le permite correr un script .feature a la vez, se implementó en windows un archivo "runKrakenGhost5.bat" y "runKrakenGhost4.bat", que realiza de forma automatica la tarea de mover los archivos ".feature" de la carpeta temporal a la carpeta de prueba y limpiar todo al finalizar, solo debe ejecutarlo y las pruebas se realizaran en orden, de forma secuencial y las screenshots quedaran guardadas en "/features/web/screenshots".

### Para generar el reporte con ResembleJS  

- En la carpeta [ResembleJS Kraken](../resembleKraken) se encuentra el archivo "index.js" encargado de hacer la comparación de imagenes y generar el reporte html.
- Por favor configure el path donde quedaron guardados los screenshots de Ghost5 y Ghost4 en las lineas 71 y 72 de este archivo. Debe tener la forma:  
      const imagePath1 = `C:/Users/user/krakenNode16/Kraken/features/web/screenshots/${scenario.name}/${step}_screenshot.png`;  
      const imagePath2 = `C:/Users/user/krakenNode16/Kraken-4/features/web/screenshots/${scenario.name}/${step}_screenshot.png`;  
- En la terminal, ubicado en el folder de [ResembleJS Kraken](../resembleKraken) ejecute el comando "node index.js"    
- La comparación de imagenes se llevará acabo y se entregará el reporte html en la carpeta results, se genera un reporte por cada ejecución de resembler y se guarda en una carpeta que tiene como nombre el Timestamp de la  ejecución.


### Video de ejecución de pruebas en las 2 versiones de Ghost y la generación del reporte en ResembleJS
