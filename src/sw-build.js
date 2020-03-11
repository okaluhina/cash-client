const {injectManifest, generateSW} = require("workbox-build");

// const logger = require('./services/logger');


const buildSW = () => {

  console.log('==============START TO BUILD SERVICE WORKER1================')
  // The build is expected to fail if the 
  // sw install rules couldn't be generated.
  // Add a catch block to handle this scenario.

  console.log(injectManifest);
  return injectManifest({
      "​swSrc": "src/sw-custom.js",
      "swDest": "build/sw.js",
      "​globDirectory": "build",
      "​globPatterns": ["**/*.{js,css,html,png,svg}"],
      "​maximumFileSizeToCacheInBytes": 5 * 1024 * 102
  })
  // .then(({ count, size, warnings }) => {
  //   // warnings.forEach(console.warn);
  //   console.info(`${count} files will be precached, 
  //                 totaling ${size/(1024 * 1024)} MBs.`);
  // }).catch((err) => { console.log(err)});
};

 console.log('START TO BUILD SERVICE WORKER2');

buildSW()
// "build": "react-scripts build && npm run build-sw&& npm run clean-cra-sw",
// 