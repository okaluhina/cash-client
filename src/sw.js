/* eslint-disable */
if (typeof importScripts === 'function') {
  importScripts(
    'https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js'
  );

  const apiUrl = process.env.REACT_APP_API_URI;
  const isDevelopment = process.env.NODE_ENV === 'development';

  if (workbox) {
    workbox.setConfig({ debug: isDevelopment });

    self.addEventListener('install', event => {
      if (isDevelopment) {
        self.skipWaiting();
      }
    });

    workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

    const routingHandler = workbox.precaching.createHandlerBoundToURL('/index.html');
    const navigationRoute = new workbox.routing.NavigationRoute(routingHandler);
    workbox.routing.registerRoute(navigationRoute);

    // static files
    workbox.routing.registerRoute(
      /\.(?:js|css)$/,
      new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'static-resources',
        maxEntries: 100,
        maxAgeSeconds: 7 * 24 * 60 * 60,
      })
    );

    // images cache
    workbox.routing.registerRoute(
      /.*\.(?:png|jpg|jpeg|svg)/,
      new workbox.strategies.CacheFirst({
        cacheName: 'image-cache',
        plugins: [
          new workbox.expiration.ExpirationPlugin({
            maxEntries: 100,
            maxAgeSeconds: 7 * 24 * 60 * 60,
          }),
        ],
      })
    );

    // fonts cache
    workbox.routing.registerRoute(
      /.*\.(?:ttf|otf)/,
      new workbox.strategies.CacheFirst({
        cacheName: 'fonts-cache',
        plugins: [
          new workbox.expiration.ExpirationPlugin({
            maxEntries: 20,
            maxAgeSeconds: 2 * 7 * 24 * 60 * 60,
          }),
        ],
      })
    );

    const contactUsBgSyncPlugin = new workbox.backgroundSync.BackgroundSyncPlugin(
      'contactUsQueue',
      {
        maxRetentionTime: 3 * 24 * 60, // Retry for max of 24 Hours (specified in minutes)
      }
    );

    workbox.routing.registerRoute(
      new RegExp(`${apiUrl}/case`),
      new workbox.strategies.NetworkOnly({
        plugins: [contactUsBgSyncPlugin],
      }),
      'POST'
    );

    // ignore family check while login
    workbox.routing.registerRoute(({ url }) => {
      const path = url.href;

      return Boolean(path.match(new RegExp(`${apiUrl}/auth/family\\?email=.*`)));
    }, new workbox.strategies.NetworkOnly());

    // all get request to api
    workbox.routing.registerRoute(
      ({ url }) => {
        const path = url.href;

        return Boolean(path.match(new RegExp(`${apiUrl}/.*`)));
      },
      new workbox.strategies.NetworkFirst({
        cacheName: 'working-cache',
      })
    );

    // const likeQueue = new workbox.backgroundSync.Queue('likesQueue', {
    //   maxRetentionTime: 24 * 60,
    // });

    // const handleLike = async ({ event }) => {
    //   const { url } = event.request;
    //   const classId = url.split('classId=')[1];

    //   try {
    //     const response = await fetch(event.request);

    //     if (response) {
    //       return response;
    //     } else {
    //       return new Response(classId, { status: 200 });
    //     }
    //   } catch (error) {
    //     await likeQueue.pushRequest({ request: event.request.clone() }).catch(error => {
    //       console.log(error);
    //     });
    //     return new Response(classId, { status: 200 });
    //   }
    // };

    // workbox.routing.registerRoute(
    //   new RegExp(`${apiUrl}/classes/addToFavorites\\?classId=.*`),
    //   handleLike,
    //   'POST'
    // );

    // const handleUnLike = async ({ event }) => {
    //   const { url } = event.request;
    //   const classId = url.split('classId=')[1];

    //   try {
    //     const response = await fetch(event.request);

    //     return response;
    //   } catch (error) {
    //     try {
    //       await likeQueue.pushRequest({ request: event.request.clone() });
    //     } catch (error) {
    //       console.log(error);
    //     }

    //     return new Response(classId, { status: 200 });
    //   }
    // };

    // workbox.routing.registerRoute(
    //   new RegExp(`${apiUrl}/classes/removeFromFavorites\\?classId=.*`),
    //   handleUnLike,
    //   'DELETE'
    // );
  } else {
    console.log(`Workbox didn't load`);
  }
}



// workbox build


/* eslint-disable no-console */

const workboxBuild = require('workbox-build');
const webpack = require('webpack');
const path = require('path');
const Dotenv = require('dotenv-webpack');

const compiler = webpack({
  entry: './src/sw.js',
  output: {
    filename: 'sw-temp.js',
    path: path.resolve(__dirname),
  },
  optimization: {
    minimize: false,
  },
  plugins: [
    new Dotenv({
      path: path.resolve(__dirname, '../.env'),
      systemvars: true,
    }),
  ],
});

const buildSW = () => {
  return workboxBuild
    .injectManifest({
      swSrc: path.resolve(__dirname, 'sw-temp.js'),
      swDest: path.resolve(__dirname, '../build/sw.js'),
      globDirectory: 'build',
      globPatterns: ['**/*.{js,css,html,png,jpg,svg,ttf,otf,json,JPG}'],
    })
    .then(({ count, size, warnings }) => {
      warnings.forEach(console.warn);
      console.log(`${count} files will be precached, totaling ${size} bytes.`);
    })
    .catch(error => {
      console.log(error);
    });
};

compiler.run((err, stats) => {
  if (err || stats.hasErrors()) {
    console.log(err || stats.hasErrors());
  } else {
    buildSW();
  }
});



// build script 

// "lint": "eslint src -c .eslintrc --ext js,jsx",
// "lint:fix": "eslint src -c .eslintrc --fix . --ext js,jsx",
// "husky:pre-push": "npm run lint ",
// "start": " react-scripts start",
// "story": "start-storybook -p 9001 -c .storybook",
// "build": "react-scripts build && npm run build-sw && npm run clean-cra-sw",
// "test": "react-scripts test",
// "eject": "react-scripts eject",
// "build-sw": "node ./src/sw-build.js",
// "clean-cra-sw": "rimraf build/precache-manifest.*.js && rimraf build/service-worker.js && rimraf src/sw-temp.js"