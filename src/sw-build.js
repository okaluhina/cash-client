const workboxBuild = require('workbox-build');
// TODo add al statics to  globPatterns 
// TODO: add logger to catch 

const buildSW = () => {
  return workboxBuild.injectManifest({
    swSrc: 'src/sw.js',
    swDest: 'build/sw.js',
    globDirectory: 'build',
    globPatterns: [
      '**\/*.{js,css,html,png,jpg}',
    ]
  }).then(({count, size, warnings}) => {
    warnings.forEach(console.warn);
    console.log(`${count} files will be precached, totaling ${size} bytes.`);
  }).catch(error => {
    console.log(error)
  });
}

buildSW();