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

// const signUpButton = document.getElementById('signUp');
// const signInButton = document.getElementById('signIn');
// const container = document.getElementById('container');

// signUpButton.addEventListener('click', () => {
// 	container.classList.add("right-panel-active");
// });

// signInButton.addEventListener('click', () => {
// 	container.classList.remove("right-panel-active");
// });