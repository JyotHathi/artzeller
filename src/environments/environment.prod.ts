export const environment = {
  production: true,
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
  //redirectUrl: 'https://json2video.vercel.app/',
  //redirectUrl: 'https://mithya-arts.vercel.app',
  //redirectUrl: 'https://mithya.vercel.app',
  //redirectUrl: 'https://www.mithya.ai/',
  redirectUrl: 'https://artzeller.com',
  userInfoUrl:
    'https://postman-pool.auth.ap-south-1.amazoncognito.com/oauth2/userInfo',
  logoutUrl: 'https://postman-pool.auth.ap-south-1.amazoncognito.com/logout',
  // video APIs
  createVideo: 'video', //POST
  getVideos: 'video', //GET

  //PayPal
  // Production
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
