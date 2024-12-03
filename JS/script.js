// Calling elements from html file
let h1 = document.querySelector("h1");
let games = document.querySelectorAll(".game");
let themeCheckbox = document.querySelector("#theme-checkbox");
let body = document.querySelector("body");
let check = document.querySelector(".check");
let botn = document.querySelector(".botn");

body.classList.add("light-mode");
check.classList.add("light-mode");
botn.classList.add("light-mode");

function toggleMode() {
  body.classList.toggle("dark-mode");
  check.classList.toggle("dark-mode");
  botn.classList.toggle("dark-mode");
}

themeCheckbox.addEventListener("click", toggleMode);