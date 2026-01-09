// Firebase setup
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAvbdfCwg1bfiPwxBam7PrIKYBrO-H7Op4",
  authDomain: "blog-website-auth-1a2fc.firebaseapp.com",
  projectId: "blog-website-auth-1a2fc",
  storageBucket: "blog-website-auth-1a2fc.appspot.com",
  messagingSenderId: "295001712522", 
  appId: "1:295001712522:web:09d9553dc96596f506ca73"
};

// Init Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// GOOGLE LOGIN
window.googleLogin = function () {
  signInWithPopup(auth, provider)
    .then(() => {
      window.location.href = "home.html";
    })
    .catch(err => alert(err.message));
};

// LOGOUT
window.logout = function () {
  signOut(auth).then(() => {
    window.location.href = "index.html";
  });
};

// PAGE PROTECTION (ALL PAGES)
onAuthStateChanged(auth, user => {
  const page = window.location.pathname;

  if (!user && !page.includes("index.html")) {
    window.location.href = "index.html";
  }

  if (user && page.includes("index.html")) {
    window.location.href = "home.html";
  }
});
