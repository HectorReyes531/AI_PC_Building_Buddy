const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

//darkmode toggle
document.getElementById('darkMode').addEventListener('click', function() {
  var container = document.querySelector('.container');
  if (container.classList.contains('light')) {
    container.classList.remove('light');
    container.classList.add('dark');
  } else {
    container.classList.remove('dark');
    container.classList.add('light');
  }
});


// // Firebase configuration
// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyANdcsuyJx9lcQ2sQrFoPLLfNVmztCgNys",
//   authDomain: "aipcbuddy.firebaseapp.com",
//   projectId: "aipcbuddy",
//   storageBucket: "aipcbuddy.appspot.com",
//   messagingSenderId: "322988785378",
//   appId: "1:322988785378:web:838bcb9948db3273efe8bb",
//   measurementId: "G-59MGYJGZ5C"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);



// const signUpButton = document.getElementById('signUp');
// const signInButton = document.getElementById('signIn');
// const container = document.getElementById('container');

// signUpButton.addEventListener('click', () => {
// 	container.classList.add("right-panel-active");
// });

// signInButton.addEventListener('click', () => {
// 	container.classList.remove("right-panel-active");
// });