port { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.0/firebase-app.js";
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

// /js/signup.js
import { auth, db } from './firebase-init.js';
import { createUserWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.17.0/firebase-auth.js";
import { ref, set } from "https://www.gstatic.com/firebasejs/12.17.0/firebase-database.js";

const form = document.getElementById('signup-form');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = (document.getElementById('signup-email') || {}).value;
    const password = (document.getElementById('signup-password') || {}).value;
    const displayName = (document.getElementById('signup-name') || {}).value || '';

    if (!email || !password) {
      alert('Please enter email and password.');
      return;
    }

    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      const uid = cred.user.uid;

      // Save the profile to Realtime Database
      await set(ref(db, `users/${uid}`), {
        email,
        displayName,
        createdAt: Date.now(),
        role: "user"
      });

      // Wait for auth state to reflect sign-in, then redirect
      onAuthStateChanged(auth, (user) => {
        if (user) {
          window.location.href = '/dashboard.html'; // change to your dashboard path
        }
      });
    } catch (err) {
      console.error('Signup error', err);
      alert(err.message || 'Signup failed');
    }
  });
}

// /js/login.js
import { auth } from './firebase-init.js';
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.17.0/firebase-auth.js";

const form = document.getElementById('login-form');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = (document.getElementById('login-email') || {}).value;
    const password = (document.getElementById('login-password') || {}).value;

    if (!email || !password) {
      alert('Please enter email and password.');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      window.location.href = '/dashboard.html'; // change to your dashboard path
    } catch (err) {
      console.error('Login error', err);
      alert(err.message || 'Login failed');
    }
  });
}
