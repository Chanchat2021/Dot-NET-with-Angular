// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  BaseUrl: 'https://localhost:7259/api/',
  clientId: '38d2052b-decd-4a1a-b6bd-fe321209725d',
  logInRedirectUrl: 'http://localhost:4200/',
  logOutRedirectUrl: 'http://localhost:4200',
  GraphEndpoint: 'https://graph.microsoft.com/v1.0/',
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
