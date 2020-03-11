// if ("function" === typeof importScripts) {

//   console.log('custom sw is running')
  
//   importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js");
  
//   // Global workbox
//   if (workbox) {
  
//     console.log("Workbox is loaded");
    
//     // Disable logging
//     workbox.setConfig({ debug: false });


//     //`generateSW` and `generateSWString` provide the option
//     // to force update an exiting service worker.
//     // Since we're using `injectManifest` to build SW,
//     // manually overriding the skipWaiting();
//     self.addEventListener("install", event => {
//       self.skipWaiting();
//       window.location.reload();
//     });


//     // Manual injection point for manifest files.
//     // All assets under build/ and 5MB sizes are precached.
//     workbox.precaching.precacheAndRoute([]);
    
//     // Font caching
//     workbox.routing.registerRoute(
//       new RegExp("https://fonts.(?:.googlepis|gstatic).com/(.*)"),
//       workbox.strategies.cacheFirst({
//         cacheName: "googleapis",
//         plugins: [
//           new workbox.expiration.Plugin({
//             maxEntries: 30
//           })
//         ]
//       })
//     );
    
//     // Image caching
//     workbox.routing.registerRoute(
//       /\.(?:png|gif|jpg|jpeg|svg)$/,
//       workbox.strategies.cacheFirst({
//         cacheName: "images",
//         plugins: [
//           new workbox.expiration.Plugin({
//             maxEntries: 60,
//             maxAgeSeconds: 30 * 24 * 60 * 60 // 30 Days
//           })
//         ]
//       })
//     );
    
//     // JS, CSS caching
//     workbox.routing.registerRoute(
//       /\.(?:js|css)$/,
//       workbox.strategies.staleWhileRevalidate({
//         cacheName: "static-resources",
//         plugins: [
//           new workbox.expiration.Plugin({
//             maxEntries: 60,
//             maxAgeSeconds: 20 * 24 * 60 * 60 // 20 Days
//           })
//         ]
//       })
//     );  
  
//   } else {
//     console.error("Workbox could not be loaded. No offline support.");
//   }
// }
console.log('try to run precash')
// 
if ("function" === typeof importScripts) {
  importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');
  
  if (workbox) {
    workbox.setConfig({ debug: true });
  console.log(`Yay! Workbox is loaded 🎉`);
  // workbox.core.skipWaiting();
  self.addEventListener("install", event => {
          self.skipWaiting();
        });
  workbox.precaching.precacheAndRoute(self.__WB_MANIFEST); // URLs to precache injected by workbox build
  // workbox.routing.registerRoute(new RegExp('.*.*'), new workbox.strategies.staleWhileRevalidate());
  // TODO cash any js file
  // workbox.routing.registerRoute(/\.js$/, new workbox.strategies.NetworkFirst())
  // TODO: add routing to handle push notifivations
  // workbox.routing.registerRoute(
  //   'https://some-other-origin.com/logo.png',
  //   handler
  // );
  // workbox.routing.registerRoute(
  //   new RegExp('\\.js$'),
  //   jsHandler
  // );
  
  // workbox.routing.registerRoute(
  //   new RegExp('\\.css$'),
  //   cssHandler
  // );

  workbox.routing.registerRoute(
    new RegExp('.*\.js'),
    new workbox.strategies.NetworkFirst()
  );

  workbox.routing.registerRoute(
    // Cache CSS files
    /.*\.css/,
    // Use cache but update in the background ASAP
    new workbox.strategies.StaleWhileRevalidate({
      // Use a custom cache name
      cacheName: 'css-cache',
    })
  );

  workbox.routing.registerRoute(
    // Cache image files
    /.*\.(?:png|jpg|jpeg|svg|gif)/,
    // Use the cache if it's available
    new workbox.strategies.CacheFirst({
      // Use a custom cache name
      cacheName: 'image-cache',
      plugins: [
        new workbox.expiration.Plugin({
          // Cache only 30 images
          maxEntries: 30,
          // Cache for a maximum of a week
          maxAgeSeconds: 7 * 24 * 60 * 60,
        })
      ],
    })
  );

  // const matchCb = ({url, event}) => {
  //   return (url.pathname === '/workbox-pwa/');
  // };

  // workbox.routing.registerRoute(matchCb, workbox.strategies.networkFirst());


  // self.addEventListener('fetch', event => {

  //   event.respondWith(
  
  //     caches.put('my-awesome-cache').then(cache => {
  
  //       return catch.match(event.request).then(cacheResponse => {
  
  //         const fetchPromise = fetch(event.request).then(networkResponse => {
  
  //           catch.put(event.request, networkResponse.clone());
  
  //           return networkResponse;
  
  //         });
  
  //         return cacheResponse || fetchPromise;
  
  //       });
  
  //     });
  
  //   );
  
  // });

  // TODO: use network first???
  workbox.routing.registerRoute(

    new RegExp('https://frozen-lowlands-43041.herokuapp.com/main'),

    new workbox.strategies.StaleWhileRevalidate({

        cacheName: 'My-awesome-cache-news-headline',

        cacheExpiration: {

            maxAgeSeconds: 60 * 30 //cache the news content for 30mn

        }

    })

);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}
}
// console.log('================================Custom service worker !!!!===================================')

// workbox.precaching.precacheAndRoute([]);

// console.log('================================Custom service worker !!!!===================================')

// if ("function" === typeof importScripts) {
//     console.log('custom sw is running')
  
//   importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js");
//   if (workbox) {
//     console.log("Workbox is loaded");
//     console.log(workbox)
//   }
// }