import firebase from 'firebase';

const config = {
	apiKey: "AIzaSyC-OANP2S81XBAhtIJcxHEVzjWImpBClok",
	authDomain: "chat-e6f9a.firebaseapp.com",
	databaseURL: "https://chat-e6f9a.firebaseio.com",
	projectId: "chat-e6f9a",
	storageBucket: "chat-e6f9a.appspot.com",
	messagingSenderId: "177370351018"
};


firebase.initializeApp(config);

// export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const ref = firebase.database();
export const firebaseAuth = firebase.auth();
export const firebaseApp = firebase;
