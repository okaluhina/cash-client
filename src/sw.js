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
// if ("function" === typeof importScripts)
// workbox.precaching.getCacheKeyForURL("index.html")
if (true) {
  importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js');
  
  console.log('workbox')
  console.log(workbox)

  if (workbox) {
    workbox.setConfig({ debug: true });
  console.log(`Yay! Workbox is loaded 🎉`);
  // workbox.core.skipWaiting();
  self.addEventListener("install", event => {
          self.skipWaiting();
        });
  workbox.precaching.precacheAndRoute(self.__WB_MANIFEST); // URLs to precache injected by workbox build
  

  // console.log('===================1================')

  console.log('workbox.routing')
  console.log(workbox.routing)
  console.log('workbox.precaching')
  console.log(workbox.precaching)



  workbox.routing.registerNavigationRoute(workbox.precaching.getCacheKeyForURL("index.html"));



  // console.log('workbox.precaching.PrecacheController')
  // console.log(new workbox.precaching.PrecacheController.createHandlerBoundToURL)




  // const navHandler  = createHandlerBoundToURL('/index.html')
  // const navigationRoute = new workbox.routing.NavigationRoute(navHandler);
  // workbox.routing.registerRoute(navigationRoute)
  
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

  // // TODO: cash all routes in bad desision
  // workbox.routing.registerRoute(
  //   new RegExp('second'),
  //   new workbox.strategies.NetworkFirst()
  // );

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

    new workbox.strategies.NetworkFirst({

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



// TODO: real 


// /* eslint-disable */
// if (typeof importScripts === 'function') {
//   importScripts(
//     'https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js'
//   );

//   if (workbox) {
//     workbox.setConfig({ debug: true });

//     self.addEventListener('install', event => {
//       self.skipWaiting();
//     });

//     workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

//     workbox.routing.registerRoute(
//       new RegExp('.*.js'),
//       new workbox.strategies.NetworkFirst()
//     );

//     workbox.routing.registerRoute(
//       /.*\.css/,
//       new workbox.strategies.StaleWhileRevalidate({
//         cacheName: 'css-cache',
//       })
//     );

//     workbox.routing.registerRoute(
//       /.*\.(?:png|jpg|jpeg|svg|gif)/,
//       new workbox.strategies.CacheFirst({
//         cacheName: 'image-cache',
//         plugins: [
//           new workbox.expiration.Plugin({
//             maxEntries: 100,
//             // Cache for a maximum of a week
//             maxAgeSeconds: 7 * 24 * 60 * 60,
//           }),
//         ],
//       })
//     );

//     workbox.routing.registerRoute(
//       /.*\.(?:ttf|otf)/,
//       new workbox.strategies.CacheFirst({
//         cacheName: 'fonts-cache',
//         plugins: [
//           new workbox.expiration.Plugin({
//             maxEntries: 20,
//             // Cache for a maximum of a week
//             maxAgeSeconds: 7 * 24 * 60 * 60,
//           }),
//         ],
//       })
//     );

//     workbox.routing.registerRoute(
//       // TODO: check if post request
//       new RegExp(`${process.env.REACT_APP_API_URI}/auth`),

//       new workbox.strategies.NetworkOnly()
//     );

//     // TODO: exclude login path /auth
//     workbox.routing.registerRoute(
//       new RegExp(`${process.env.REACT_APP_API_URI}.*`),

//       new workbox.strategies.NetworkFirst({
//         cacheName: 'api-get-static-info-requests-cache',

//         cacheExpiration: {
//           maxAgeSeconds: 60 * 30, // cache the content for 30mn
//         },
//         // TODO: add to customise befavour
//         // plugins: []
//       })
//     );

//     // TODO: add like
//     const match = ({ url, event }) => {
//       return {
//         name: 'Workbox',
//         type: 'guide',
//       };
//     };

//     const handler = async ({ url, event, params }) => {
//       // Response will be "A guide to Workbox"
//       return new Response(`A ${params.type} to ${params.name}`);
//     };

//     // TODO add purgeOnQuotaError: true,

//     // TODO estimate storage
//     // if ('storage' in navigator && 'estimate' in navigator.storage) {
//     //   navigator.storage.estimate().then(({usage, quota}) => {
//     //     console.log(`Using ${usage} out of ${quota} bytes.`);
//     //   });
//     // }

//     workbox.routing.registerRoute(match, handler);
//   } else {
//     console.log(`Workbox didn't load`);
//   }
// }
