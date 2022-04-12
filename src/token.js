const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccount.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${process.env.GCLOUD_PROJECT}.firebaseio.com`,
});



// const admin = require('firebase-admin')
// const serviceAccount = require('./serviceAccount.json')
// // console.log('serviceAccount: ', serviceAccount);

//     admin.initializeApp({
//         credencial: admin.credential.cert(serviceAccount)
//       })

// const uid = 'some-uid'
// const additionalClains = {
//     isItTrue: true
// }

// admin.auth().createCustomToken(uid, additionalClains)
//       .then(customToket => {
//         console.log("customToket", customToket);
//       })
//       .catch(err => {
//           console.log('Error creating custom token',  err);
//       })

    