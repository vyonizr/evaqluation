var admin = require("firebase-admin");

var serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_SDK)

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://evaqlueation.firebaseio.com"
})

module.exports = admin