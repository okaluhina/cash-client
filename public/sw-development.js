importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js');

console.log('workbox.routing');
console.log(workbox.routing);

console.log('-===================updated2==================')

self.addEventListener("install", event => {
  self.skipWaiting();
});

// const handler = async ({url, event, params}) => {
//   return new Response(`Custom handler response.`);
// };

// registerRoute('/second', handler);

function storageEstimateWrapper() {
  if ('storage' in navigator && 'estimate' in navigator.storage) {
    // We've got the real thing! Return its response.
    return navigator.storage.estimate();
  }
}

  storageEstimateWrapper().then(est => console.log(est))


// workbox.routing.registerRoute(
//   new RegExp('.*\.js'),
//   new workbox.strategies.NetworkFirst()
// );

// Cache the underlying font files with a cache-first strategy for 1 year.
// registerRoute(
//   /^https:\/\/fonts\.gstatic\.com/,
//   new CacheFirst({
//     cacheName: 'google-fonts-webfonts',
//     plugins: [
//       new CacheableResponsePlugin({
//         statuses: [0, 200],
//       }),
//       new ExpirationPlugin({
//         maxAgeSeconds: 60 * 60 * 24 * 365,
//         maxEntries: 30,
//       }),
//     ],
//   })
// );


// registerRoute(
//   /\.(?:js|css)$/,
//   new StaleWhileRevalidate({
//     cacheName: 'static-resources',
//   })
// );