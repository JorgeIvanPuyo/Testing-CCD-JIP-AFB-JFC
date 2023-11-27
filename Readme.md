### Welcome to the Testing-CCD-JIP-AFB-JFC wiki! Testing Ghost Kraken Cypress

## Conformación equipo (Grupo 22)

| Apellido | Nombres          | Email uniandes             | Usuario github |
| -------- | ---------------- | -------------------------- | -------------- |
| Delgado  | Cristhian Camilo | cc.delgado@uniandes.edu.co | cristhiandp    |
| Puyo     | Jorge Iván       | ji.puyo@uniandes.edu.co    | JorgeIvanPuyo  |
| Becerra  | Adrian Francisco | a.becerraa@uniandes.edu.co | elle184        |
| Juan     | Copete           | jf.copete@uniandes.edu.co  | jfcopete       |

[Correr pruebas en Cypress para](Cypress/Readme.md)

[Correr pruebas en Kraken](Kraken/Readme.md)

---
## Semana 7

Para esta semana, se trabajó en 60 escenarios usando kraken y otros 60 usando cypress, donde se aplicarón las tres tecnicas de generaciòn de datos: apriori, pseudo aleatorio y aleatorio. 

* Los escenarios en **Cypress** se encuentran dentro de la carpeta */cypressGenerateData* [Ver Readme](cypressGenerateData/Readme.md)
* Los escenarios en **Kraken** se encuentran dentro de la carpeta *KrakenApp\kraken-with-faker*. Dentro de la carpeta features se encuentra cada uno de los archivos de cada escenario. Se creó un paso especifico para generar datos aleatorios con faker, otro para obtener datos apriri de un archivo generado con Mockaroo y almacenado en *KrakenApp\kraken-with-faker\posts-member.data.json*, y otro paso especifico para hacer llamados a una API de Mockaroo que entrega datos de un pool pseudo aleatorio.
* URL de la API para generación de data Pseudo aleatoria alojada en Mockaroo.  
[https://my.api.mockaroo.com/ghost_mock_data.json](https://my.api.mockaroo.com/ghost_mock_data.json)  
*key = <4629f080>*
* Para la generación de datos aleatorios se hizo uso de Faker, mas información en: [@faker-js/faker](https://www.npmjs.com/package/@faker-js/faker)




 ![dataapriori](https://github.com/JorgeIvanPuyo/Testing-CCD-JIP-AFB-JFC/blob/main/public/imgJsonAprioriMokcaroo.png)  
Img1. Data Apriori generada en Mockaroo y guardada en el proyecto.

![PasosDatoPseudo](https://github.com/JorgeIvanPuyo/Testing-CCD-JIP-AFB-JFC/blob/main/public/PasosModificadosDataRandom.png)  
Img2. Pasos modificados para consultar datos Pseudo Aleatorios de la API creada en Mockaroo.




## Semana 6
### Video de ejecución de pruebas en las 2 versiones de Ghost y la generación del reporte en ResembleJS y BackstopJS

[Semana 6 Grupo 22 Youtube](https://www.youtube.com/watch?v=AaU9bdKaAjY)

### Issues reportados

[ISSUE 011.Ver listado de Post no se dirije en ghost 4.48 ](https://github.com/JorgeIvanPuyo/Testing-CCD-JIP-AFB-JFC/issues/40#issue-2001223754)

### Analisis de herramientas VRT ResembleJS BackstopJS

[Pros y contras ResembleJS BackstopJS](https://github.com/JorgeIvanPuyo/Testing-CCD-JIP-AFB-JFC/wiki/Analisis-de-herramientas-VRT-ResembleJS-BackstopJS)

## Utilidades
#### URL de instancias de Ghost desplegadas en dos versiones diferentes

Ghost V4.48.0 -> http://157.230.86.220:4470/ghost  
Ghost V5.72.0 -> http://157.230.86.220:5720/ghost


