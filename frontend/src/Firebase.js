import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyC4z1rppB7xHFOdjgejmyMcU-Gv1SLxNP4",
//   authDomain: "YOUR_AUTH_DOMAIN",
  databaseURL: "https://sandt-22e61.firebaseio.com",
  projectId: "sandt-22e61",
//   storageBucket: "sandt-22e61.appspot.com",
//   messagingSenderId: "224476496940"
};
firebase.initializeApp(config);

// firebase.firestore().settings(settings);

export default firebase;