// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl: 'https://pkus5dciz1.execute-api.ap-south-1.amazonaws.com/default/',

  // oauth - aws cognito
  //clientId: '33u3n5gs5ggce6lq161khl8lnu', /// mithya ai - deprecated
  //clientId: '2ii3b4fie8q79qgba1p6mhj9hg', /// mithya ai
  clientId: '22o960ghdik2mn02dbhf4ids9p', /// mithya arts
  // update
  //clientSecret: '1v9t199ob87h64civ1nfnkdi7jfuhkkqilpqf00e9a0gdprrtogm', /// mithya ai - deprecated
  //clientSecret: 'as0orc366chq60iaddrenocisd72iaag3mlpe0ulp54thie72pj', /// mithya ai
  clientSecret: '9ctka8bluk50jud8bq6gf4thl9une2bdg4h6cuo956e4iichel3', /// mithya arts

  authUrl:
    'https://postman-pool.auth.ap-south-1.amazoncognito.com/oauth2/authorize',
  tokenUrl:
    'https://postman-pool.auth.ap-south-1.amazoncognito.com/oauth2/token',
  redirectUrl: 'http://localhost:4200/',
  userInfoUrl:
    'https://postman-pool.auth.ap-south-1.amazoncognito.com/oauth2/userInfo',
  logoutUrl: 'https://postman-pool.auth.ap-south-1.amazoncognito.com/logout',

  // authUrl:
  //   'https://artzeller.auth.ap-south-1.amazoncognito.com/oauth2/authorize',
  // tokenUrl:
  //   'https://artzeller.auth.ap-south-1.amazoncognito.com/oauth2/token',
  // redirectUrl: 'http://localhost:4200/',
  // userInfoUrl:
  //   'https://artzeller.auth.ap-south-1.amazoncognito.com/oauth2/userInfo',
  // logoutUrl: 'https://artzeller.auth.ap-south-1.amazoncognito.com/logout',
  // video APIs

  createVideo: 'video', //POST
  getVideos: 'video', //GET

  // PayPal
  // SandBox
  paypalClientId:
    'AaW5E-AlxvZiMJdVwy_sBw10owF5VF9qayXxM3xs6I9iosiEPk6y2VfzoOtB-jYNNYyjlszb0IQkJYip',
  paypalSecretKey:
    'EEMaEpmTeSnXv0b8vvQDmvDN9bpA-3uIvQdN_I3OeERqRR3aFBJ9zPGZf5AyjfY6bY9f4QMrDfFxN_IfM',
  paypalApiUrl: 'https://api-m.sandbox.paypal.com',

  // RazorPay
  // sandbox
  razorpayAPIKey: 'rzp_test_oIO0hEt1o0a9PI',
  razorpayKeySecret: 'SXQkifnLEiNAPkhdkPnS6FOd',
  razorpayAppName: 'Artzeller - Mithya',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
