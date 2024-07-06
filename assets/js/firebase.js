import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getFirestore, addDoc, collection } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

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
      if (!value) {
        errorKeys.push(applyForm[key].placeholder);
      }
      application[key] = value;
    }

    if (errorKeys.length) {
      formErrorMessage.innerHTML = "<b>These fields are required:</b><br/>" + errorKeys.join(", ");
      return;
    }

    try {
      await addDoc(collection(db, "applications"), application);
      formSuccessMessage.style.color = "#370909";
      formSuccessMessage.innerHTML = "Successfully Submitted. See You at AiML Campus!!!";
      applyForm.reset();
    } catch (error) {
      formErrorMessage.innerHTML = "Error submitting form: " + error.message;
      console.error("Error adding document: ", error);
    }
  });
});



// contact form 
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById("contactForm");
  const formErrorMessage = document.getElementById("form-error");
  const formSuccessMessage = document.getElementById("form-success");

  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const errorKeys = [];
    const contactData = {};

    for (let [key, value] of formData.entries()) {
      if (!value) {
        errorKeys.push(contactForm[key].placeholder);
      }
      contactData[key] = value;
    }

    if (errorKeys.length) {
      formErrorMessage.innerHTML = "<b>These fields are required:</b><br/>" + errorKeys.join(", ");
      return;
    }

    try {
      await addDoc(collection(db, "contactData"), contactData);
      formSuccessMessage.style.color = "#370909";
      formSuccessMessage.innerHTML = "Successfully Submitted. See You at AiML Campus!!!";
      contactForm.reset();
    } catch (error) {
      formErrorMessage.innerHTML = "Error submitting form: " + error.message;
      console.error("Error adding document: ", error);
    }
  });
});
