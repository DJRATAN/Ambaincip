// firebase.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
import { addDoc, collection } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4JdeqE3GapZOiAfERpEu75PZcIhzkwv8",
  authDomain: "aimlcampus-e8bed.firebaseapp.com",
  projectId: "aimlcampus-e8bed",
  storageBucket: "aimlcampus-e8bed.appspot.com",
  messagingSenderId: "471896735604",
  appId: "1:471896735604:web:653148f0bd31ed95a03621",
  measurementId: "G-V1MF0XEG47"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


document.addEventListener('DOMContentLoaded', () => {
  const applyForm = document.getElementById("apply-form");
  const formErrorMessage = document.getElementById("form-error");
  const formSuccessMessage = document.getElementById("form-success");

  applyForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(applyForm);
    const errorKeys = [];
    const application = {};

    for (let [key, value] of formData.entries()) {
      if (!value && key !== "Linkedin" && key !== "Referred") {
        errorKeys.push(applyForm[key].placeholder);
      }
      application[key] = value;
    }

    if (errorKeys.length) {
      formErrorMessage.innerHTML = "<b>These fields are required:</b><br/>" + errorKeys.join(", ");
      return;
    }

    try {
      await addDoc(collection(db, "ambaincipData"), application);
      formSuccessMessage.style.color = "#370909";
      formSuccessMessage.innerHTML = "Successfully Submitted. See You at AiML Campus!!!";
      applyForm.reset();
    } catch (error) {
      formErrorMessage.innerHTML = "Error submitting form: " + error.message;
      console.error("Error adding document: ", error);
    }
  });
});


// Second form submission handling
const subscribeForm = document.getElementById("wf-form-second-form");
const subscribeSuccessMessage = document.getElementById("subscribe-success");
const subscribeErrorMessage = document.getElementById("subscribe-error");

subscribeForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(subscribeForm);
  const subscription = {};

  for (let [key, value] of formData.entries()) {
    subscription[key] = value;
  }

  try {
    await addDoc(collection(db, "subscriptions"), subscription);
    subscribeSuccessMessage.style.display = 'block';
    subscribeErrorMessage.style.display = 'none';
    subscribeForm.reset();
  } catch (error) {
    subscribeErrorMessage.innerHTML = "Error submitting form: " + error.message;
    subscribeSuccessMessage.style.display = 'none';
    subscribeErrorMessage.style.display = 'block';
    console.error("Error adding document: ", error);
  }
});


