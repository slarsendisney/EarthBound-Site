const fs = require("firebase-admin");

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

if (!fs.apps.length) {
  try {
    fs.initializeApp({
      credential: fs.credential.cert(serviceAccount),
    });
  } catch (error) {
    console.log("Firebase admin initialization error", error.stack);
  }
}

export function database() {
  return fs.firestore();
}
