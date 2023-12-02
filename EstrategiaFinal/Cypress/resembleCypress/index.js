const compareImages = require("resemblejs/compareImages");
const config = require("./config.json");
const fs = require("fs");
const path = require("path");

const { viewportHeight, viewportWidth, browsers, options } = config;

async function executeCompare() {
  const folderName = "report";
  if (!fs.existsSync(`./${folderName}`)) {
    fs.mkdirSync(`./${folderName}`, { recursive: true });
  }

  let rootPath = __dirname.split("/");
  rootPath.pop();
  rootPath = rootPath.join("/");

  const screenshotFolder = path.join(rootPath, "cypress", "screenshots");
  const screenshots = fs.readdirSync(screenshotFolder);

  const imagesToCompate = getCoupleFiles(screenshots, screenshotFolder);

  const scenarioResults = [];

  for (const { image1, image2, prefix } of imagesToCompate) {
    const data = await compareImages(
      fs.readFileSync(image1),
      fs.readFileSync(image2),
      options
    );

    const resultInfo = {
      prefix,
      isSameDimensions: data.isSameDimensions,
      dimensionDifference: data.dimensionDifference,
      rawMisMatchPercentage: data.rawMisMatchPercentage,
      misMatchPercentage: data.misMatchPercentage,
      diffBounds: data.diffBounds,
      analysisTime: data.analysisTime,
    };

    fs.writeFileSync(`./${folderName}/${prefix}_compare.png`, data.getBuffer());
    fs.copyFileSync(image1, `./${folderName}/${prefix}_before.png`);
    fs.copyFileSync(image2, `./${folderName}/${prefix}_after.png`);
    scenarioResults.push(resultInfo);
  }

  fs.writeFileSync(
    `./${folderName}/report.html`,
    createReport(new Date().toLocaleString(), imagesToCompate)
  );
  // Copy styles
  fs.copyFileSync("./index.css", `./${folderName}/index.css`);
}

/**
 * Generates a list of image pairs for comparison based on the given screenshots and path.
 *
 * @param {Array} screenshots - An array of screenshot filenames.
 * @param {string} path - The path where the screenshots are located.
 * @return {Array} - An array of image pairs to compare.
 */
const getCoupleFiles = (screenshots, path) => {
  const prefix = screenshots.map((fileName) => fileName.split("-")[0]);
  const prefixSet = new Set(prefix);

  const imagesToCompate = [];

  prefixSet.forEach((prefix) => {
    const doExistV5 = fs.existsSync(`${path}/${prefix}-V5.png`);
    const doExistV4 = fs.existsSync(`${path}/${prefix}-V4.png`);
    if (doExistV5 && doExistV4) {
      imagesToCompate.push({
        image1: `${path}/${prefix}-V4.png`,
        image2: `${path}/${prefix}-V5.png`,
        prefix,
      });
    }
  });

  return imagesToCompate;
};

executeCompare();

// (async ()=>console.log(await executeTest()))();

function createReport(datetime, imagesToCompate) {
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

  html += `
      <div class="scenario" id="selector">`;

  for (const step of imagesToCompate) {
    html += `
        <li class="step" id="${step.prefix}">
          <h3>${step.prefix}</h3>
          <div class="data-section">
          <p class="data-label">Porcentaje de Desajuste: ${step.rawMisMatchPercentage}%</p>
          <p class="data-label">Tiempo de Análisis: ${step.analysisTime} ms</p>
        </div>
          <div class="imgline">
            <div class="imgcontainer">
              <span class="imgname">Ghost 5.72.2</span>
              <img class="img2" src="${step.prefix}_before.png" label="Before">
            </div>
            <div class="imgcontainer">
              <span class="imgname">Ghost 4.48.9</span>
              <img class="img2" src="${step.prefix}_after.png" label="After">
            </div>
            <div class="imgcontainer">
              <span class="imgname">Comparison</span>
              <img class="img2" src="${step.prefix}_compare.png" label="Comparison">
            </div>
          </div>
        </li>`;
  }

  html += `
        </ul>
      </div>`;

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
