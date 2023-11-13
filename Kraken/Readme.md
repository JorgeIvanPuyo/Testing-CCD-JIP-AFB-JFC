## Random testing Kraken - Ghost

Este projecto fue creado para ejecutar pruebas tipo e2e en el aplicativo ghost que corre de forma local. [Mas sobre ghost](https://ghost.org/)

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
- Se debe tener corriendo Ghost de forma local.
- Se debe modificar las variables en el archivo properties.json, incluyendo la URL local donde corre Ghost, el USERNAME y el PASSWORD de un usuario registrado en la instancia de Ghost local.
- Se recomienda tener Ghost con por lo menos un post en draft y un post published.
- Se recomienda no tener ningun member agregado a la instancia de Ghost que se va a probar.
- Correr las pruebas en orden secuencial, una a una en orden ascendente:

1. `scenario_1.feature`
2. `scenario_2.feature`
3. `scenario_3.features`
4. `scenario_4.feature`
   <br>

- ....
  <br>

20. `scenario_20.feature`
