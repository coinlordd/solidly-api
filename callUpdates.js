require("dotenv").config();
const request = require("request-promise");

// const url = process.env.API_URL
// const url = 'https://api.solidswap.exchange'
const url = "http://localhost";

async function doWork() {
  try {
    let options = {
      uri: `${url}/api/v1/updateAssets`,
    };
    console.log("updating assets...");
    const done1 = await request(options);

    options.uri = `${url}/api/v1/updatePairs`;

    console.log("updating pairs...");
    const done2 = await request(options);

    process.exit(1);
  } catch (ex) {
    console.log(ex);
    process.exit(2);
  }
}

doWork();
