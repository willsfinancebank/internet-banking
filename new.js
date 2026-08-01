import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.17.0/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/12.17.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyB-ejXt-72-0KJd5cvptzOtdEM10F9a-Z4",
  authDomain: "data-3715b.firebaseapp.com",
  databaseURL: "https://data-3715b-default-rtdb.firebaseio.com",
  projectId: "data-3715b",
  storageBucket: "data-3715b.firebasestorage.app",
  messagingSenderId: "899957518828",
  appId: "1:899957518828:web:4922e33655b4676244d0c9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export { auth, db };
//js