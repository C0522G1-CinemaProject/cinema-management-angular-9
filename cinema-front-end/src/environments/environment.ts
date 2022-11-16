// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  roomUrl: 'http://localhost:8080/room',
  timeUrl: 'http://localhost:8080/showTime/time',
  movieUrl: 'http://localhost:8080/api/movie',
  showTimeUrl: 'http://localhost:8080/showTime',
  firebaseConfig: {
    apiKey: 'AIzaSyCFQLW2O-P0Er86REA7El5je0mFKS9LVf4',
    authDomain: 'cinema-project-6158f.firebaseapp.com',
    projectId: 'cinema-project-6158f',
    storageBucket: 'cinema-project-6158f.appspot.com',
    messagingSenderId: '690611635755',
    appId: '1:690611635755:web:119c0a353fd5ec7937cc6e',
    measurementId: 'G-RKCS3NE9QF'
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
