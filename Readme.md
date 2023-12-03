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

## Entrega Final

Para la entrega final se trabajo sobre el modulo de posts de [Ghost](https://ghost.org/) usando diferentes tipos, tecnicas y niveles de pruebas como se especifica en el documento [click aqui](https://uniandes-my.sharepoint.com/:w:/g/personal/ji_puyo_uniandes_edu_co/EdQ75kZz_wNLrVf23BFRnHQB7hzp9jQckcwvorTON7fzYA?e=4%3A8GGntf&fromShare=true&at=9&CID=75db9f0e-890a-ab5d-bd27-4a56eb74dea7) (importante: usar la cuenta de uniandes) El contenido de la entrega final esta en la carpeta _/EstrategiaFinal_ con la siguiente estructura:

- /EstrategiaFinal
  - /Cypress
    - En este folder se alojan las pruebas e2e, vrt y generación de datos [ver](EstrategiaFinal/Cypress/Readme.md)
    - /pruebasDeReconocimiento [ver](EstrategiaFinal/Cypress/pruebasDeReconocimiento/Readme.md)
    - /resemble: los archivos necesarios para ejecutar y crear el reporte VRT en html [ver](EstrategiaFinal/Cypress/resembleCypress/Readme.md)
      - /report: dentro de esta carpeta se encuentra el reporte generado, con el nombre de _report.html_
  - KrakenG4.48: Ghost version 4.48 [ver](Kraken/Readme.md)
  - KrakenG5.72 Ghost version 7.72 [ver](Kraken/Readme.md)

---

## Semana 7

Para esta semana, se trabajó en 60 escenarios usando kraken y otros 60 usando cypress, donde se aplicarón las tres tecnicas de generaciòn de datos: apriori, pseudo aleatorio y aleatorio.

- Los escenarios en **Cypress** se encuentran dentro de la carpeta _/cypressGenerateData_ [Ver Readme](cypressGenerateData/Readme.md)
- Los escenarios en **Kraken** se encuentran dentro de la carpeta _KrakenApp\kraken-with-faker_. Dentro de la carpeta features se encuentra cada uno de los archivos de cada escenario. Se creó un paso especifico para generar datos aleatorios con faker, otro para obtener datos apriri de un archivo generado con Mockaroo y almacenado en _KrakenApp\kraken-with-faker\posts-member.data.json_, y otro paso especifico para hacer llamados a una API de Mockaroo que entrega datos de un pool pseudo aleatorio.
- URL de la API para generación de data Pseudo aleatoria alojada en Mockaroo.  
  [https://my.api.mockaroo.com/ghost_mock_data.json](https://my.api.mockaroo.com/ghost_mock_data.json)  
  _key = <4629f080>_
- Para la generación de datos aleatorios se hizo uso de Faker, mas información en: [@faker-js/faker](https://www.npmjs.com/package/@faker-js/faker)

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
