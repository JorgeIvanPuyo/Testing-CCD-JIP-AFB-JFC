const compareImages = require("resemblejs/compareImages");
const config = require("./config.json");
const fs = require("fs");
const path = require("path");

const { viewportHeight, viewportWidth, browsers, options } = config;

async function executeCompare() {
  const folderName = "report";
  if (!fs.existsSync(`./results/${folderName}`)) {
    fs.mkdirSync(`./results/${folderName}`, { recursive: true });
  }

  const rootPath = path(__dirname, "..");
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
      step,
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
    scenarioResults.steps.push(resultInfo);
  }
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

function browser(b, info) {
  return `<div class=" browser" id="test0">
    <div class=" btitle">
        <h2>Browser: ${b}</h2>
        <p>Data: ${JSON.stringify(info)}</p>
    </div>
    <div class="imgline">
      <div class="imgcontainer">
        <span class="imgname">Reference</span>
        <img class="img2" src="before-${b}.png" id="refImage" label="Reference">
      </div>
      <div class="imgcontainer">
        <span class="imgname">Test</span>
        <img class="img2" src="after-${b}.png" id="testImage" label="Test">
      </div>
    </div>
    <div class="imgline">
      <div class="imgcontainer">
        <span class="imgname">Diff</span>
        <img class="imgfull" src="./compare-${b}.png" id="diffImage" label="Diff">
      </div>
    </div>
  </div>`;
}

function createReport(datetime, resInfo) {
  return `
    <html>
        <head>
            <title> VRT Report </title>
            <link href="index.css" type="text/css" rel="stylesheet">
        </head>
        <body>
            <h1>Report for 
                 <a href="${config.url}"> ${config.url}</a>
            </h1>
            <p>Executed: ${datetime}</p>
            <div id="visualizer">
                ${config.browsers.map((b) => browser(b, resInfo[b]))}
            </div>
        </body>
    </html>`;
}
