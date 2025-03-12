const app = require('./app');
const http = require('http');
const port = process.env.PORT;

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBpoAIo21RBg9ow0PbtytiuI9kQknjypiY",
  authDomain: "basic-9ee4e.firebaseapp.com",
  projectId: "basic-9ee4e",
  storageBucket: "basic-9ee4e.firebasestorage.app",
  messagingSenderId: "875440407149",
  appId: "1:875440407149:web:7d233a92ec5973dd623564",
  measurementId: "G-HBTSDQNHVR"
};
// Initialize Firebase
const app2 = initializeApp(firebaseConfig);
const analytics = getAnalytics(app2);

const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Server is running on ${port}`);
});