// const {injectManifest, generateSW} = require("workbox-build");

// // const logger = require('./services/logger');


// const buildSW = () => {

//   console.log('==============START TO BUILD SERVICE WORKER1================')
//   // The build is expected to fail if the 
//   // sw install rules couldn't be generated.
//   // Add a catch block to handle this scenario.

//   console.log(injectManifest);
//   return injectManifest({
//       "​swSrc": "src/sw-custom.js",
//       "swDest": "build/sw.js",
//       "​globDirectory": "build",
//       "​globPatterns": ["**/*.{js,css,html,png,svg}"],
//       "​maximumFileSizeToCacheInBytes": 5 * 1024 * 102
//   })
//   // .then(({ count, size, warnings }) => {
//   //   // warnings.forEach(console.warn);
//   //   console.info(`${count} files will be precached, 
//   //                 totaling ${size/(1024 * 1024)} MBs.`);
//   // }).catch((err) => { console.log(err)});
// };

//  console.log('START TO BUILD SERVICE WORKER2');

// buildSW()
// // "build": "react-scripts build && npm run build-sw&& npm run clean-cra-sw",
// // 

const workboxBuild = require('workbox-build');

// NOTE: This should be run *AFTER* all your assets are built
const buildSW = () => {
  // This will return a Promise
  return workboxBuild.injectManifest({
    swSrc: 'src/sw.js',
    swDest: 'build/sw.js',
    globDirectory: 'build',
    globPatterns: [
      '**\/*.{js,css,html,png}',
    ]
  }).then(({count, size, warnings}) => {
    // Optionally, log any warnings and details.
    warnings.forEach(console.warn);
    console.log(`${count} files will be precached, totaling ${size} bytes.`);
  }).catch(error => {
    console.log(error)
  });
}

buildSW();