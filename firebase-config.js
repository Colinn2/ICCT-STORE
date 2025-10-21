// Firebase Configuration
// Import Firebase SDKs (using compat version for easier integration with existing code)

const firebaseConfig = {
  apiKey: "AIzaSyBiuB9a4SkFWgKELHlilwvo2PHRRFNsS7E",
  authDomain: "icct-store-29ea5.firebaseapp.com",
  databaseURL: "https://icct-store-29ea5-default-rtdb.asia-southeast1.firebasedatabase.app", // Asia Southeast database
  projectId: "icct-store-29ea5",
  storageBucket: "icct-store-29ea5.firebasestorage.app",
  messagingSenderId: "1095541958931",
  appId: "1:1095541958931:web:b1c27c99f5d8e8614592e6"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = firebase.auth();
const firestore = firebase.firestore();
const realtimeDB = firebase.database();
const storage = firebase.storage();

// Enable Firestore offline persistence
firestore.enablePersistence()
  .then(() => {
    console.log('✅ Firestore offline persistence enabled');
  })
  .catch((err) => {
    if (err.code === 'failed-precondition') {
      console.warn('⚠️ Multiple tabs open, persistence can only be enabled in one tab at a time.');
    } else if (err.code === 'unimplemented') {
      console.warn('⚠️ The current browser does not support offline persistence');
    }
  });

console.log('🔥 Firebase initialized successfully');
console.log('📦 Realtime Database URL:', firebaseConfig.databaseURL);
console.log('🗄️ Firestore Project:', firebaseConfig.projectId);
