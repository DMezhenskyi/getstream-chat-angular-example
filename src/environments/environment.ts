// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  firebase: {
    projectId: 'get-stream-io-decoded',
    appId: '1:927914767744:web:83eed8f5f5377a9dd9fd65',
    storageBucket: 'get-stream-io-decoded.appspot.com',
    apiKey: 'AIzaSyA9mGI5hYOfgtpDTdCPz8PBdpumEWvhHBQ',
    authDomain: 'get-stream-io-decoded.firebaseapp.com',
    messagingSenderId: '927914767744',
  },
  production: false,
  apiUrl: 'https://us-central1-get-stream-io-decoded.cloudfunctions.net',
  stream: {
    key: 'wxgsgqrws5v8'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
