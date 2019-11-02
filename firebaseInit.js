import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyCFiHInin829s5bCWme-xTajkoilhgSiI8',
  authDomain: 'aston-combo-box.firebaseapp.com',
  databaseURL: 'https://aston-combo-box.firebaseio.com',
  projectId: 'aston-combo-box',
  storageBucket: 'aston-combo-box.appspot.com',
  messagingSenderId: '599763130278',
  appId: '1:599763130278:web:375da651661acc20442167',
  measurementId: 'G-7JX3D2NRV9',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
