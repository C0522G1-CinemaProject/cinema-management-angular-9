// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  api_url: 'http://localhost:8080/employee/',
  api_url_type: 'http://localhost:8080/employee/user',
  firebaseConfig: {
    apiKey: 'AIzaSyD72vNjLIojz69hvCF0suOuvPX-KRpYq1U',
    authDomain: 'huyjr-5f531.firebaseapp.com',
    projectId: 'huyjr-5f531',
    storageBucket: 'huyjr-5f531.appspot.com',
    messagingSenderId: '9183740604',
    appId: '1:9183740604:web:c7bbdeaf46541573dc86b9',
    measurementId: 'G-8YRVXBQW1Y'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
