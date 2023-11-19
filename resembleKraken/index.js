const compareImages = require("resemblejs/compareImages");
const fs = require('fs');
const { config } = require("./config.json")


const options = config;

const scenarios = [
  {
    name: "Escenario_1.",
    steps: [
      "step1",
      "step2",
      "step3",
      "step4",
    ],
  },
  {
    name: "Escenario_2.",
    steps: [
      "step1",
      "step2",
      "step3",
    ],
  },
  {
    name: "Escenario_3.",
    steps: [
      "step1",
      "step2",
      "step3",
      "step4",
    ],
  },
  // {
  //   name: "Escenario_4.",
  //   steps: [
  //     "step1",
  //     "step2",
  //     "step3",
  //     "step4",
  //     "step5",
  //   ],
  // },
  // {
  //   name: "Escenario_5.",
  //   steps: [
  //     "step1",
  //     "step2",
  //     "step3",
  //     "step4",
  //   ],
  // },
];

async function executeCompare() {
  const datetime = new Date().toISOString().replace(/:/g, "");
  const results = [];

  if (!fs.existsSync(`./results/${datetime}`)) {
    fs.mkdirSync(`./results/${datetime}`, { recursive: true });
  }

  for (const scenario of scenarios) {
    const scenarioResults = {
      name: scenario.name,
      steps: []
    };

    for (const step of scenario.steps) {
      const imagePath1 = `C:/Users/ginav/uniandes/krakenNode16/Kraken/features/web/screenshots/${scenario.name}/${step}_screenshot.png`;
      const imagePath2 = `C:/Users/ginav/uniandes/krakenNode16/Kraken-4/features/web/screenshots/${scenario.name}/${step}_screenshot.png`;

      const data = await compareImages(
        fs.readFileSync(imagePath1),
        fs.readFileSync(imagePath2),
        options
      );

      const resultInfo = {
        step,
        isSameDimensions: data.isSameDimensions,
        dimensionDifference: data.dimensionDifference,
        rawMisMatchPercentage: data.rawMisMatchPercentage,
        misMatchPercentage: data.misMatchPercentage,
        diffBounds: data.diffBounds,
        analysisTime: data.analysisTime
      };

      fs.writeFileSync(`./results/${datetime}/${scenario.name}_${step}_compare.png`, data.getBuffer());
      fs.copyFileSync(imagePath1, `./results/${datetime}/${scenario.name}_${step}_before.png`);
      fs.copyFileSync(imagePath2, `./results/${datetime}/${scenario.name}_${step}_after.png`);
      scenarioResults.steps.push(resultInfo);
    }

    results.push(scenarioResults);
  }

  fs.writeFileSync(`./results/${datetime}/report.html`, createReport(datetime, results));
  fs.copyFileSync('./index.css', `./results/${datetime}/index.css`);

  console.log('---------------------------');
  console.log("Comparación finalizada");
  return results;
}

function createReport(datetime, results) {
  let html = `
    <html>
      <head>
        <title>VRT Report</title>
        <link href="index.css" type="text/css" rel="stylesheet">
      </head>
      <body>
        <h1>Reporte ejecutado: ${datetime}</h1>
        <ul class="accordion">`;

  html += `
        </ul>`;

  for (const scenario of results) {
    html += `
      <div class="scenario" id="${scenario.name}">
        <h2>${scenario.name}</h2>
        <ul>`;
  
    for (const step of scenario.steps) {
      html += `
        <li class="step" id="${scenario.name}_${step.step}">
          <h3>${step.step}</h3>
          <div class="data-section">
          <p class="data-label">Porcentaje de Desajuste: ${step.rawMisMatchPercentage}%</p>
          <p class="data-label">Tiempo de Análisis: ${step.analysisTime} ms</p>
        </div>
          <div class="imgline">
            <div class="imgcontainer">
              <span class="imgname">Before</span>
              <img class="img2" src="${scenario.name}_${step.step}_before.png" label="Before">
            </div>
            <div class="imgcontainer">
              <span class="imgname">After</span>
              <img class="img2" src="${scenario.name}_${step.step}_after.png" label="After">
            </div>
            <div class="imgcontainer">
              <span class="imgname">Comparison</span>
              <img class="img2" src="${scenario.name}_${step.step}_compare.png" label="Comparison">
            </div>
          </div>
        </li>`;
    }
  
    html += `
        </ul>
      </div>`;
  }

  html += `
      <script>
        const scenarioElements = document.querySelectorAll('.scenario');
        const stepElements = document.querySelectorAll('.step');

        function toggleList(element) {
          element.classList.toggle('open');
        }

        scenarioElements.forEach(element => {
          element.addEventListener('click', () => toggleList(element));
        });

        stepElements.forEach(element => {
          element.addEventListener('click', () => toggleList(element));
        });
      </script>
      </body>
    </html>`;

  return html;
}

(async () => console.log(await executeCompare()))();