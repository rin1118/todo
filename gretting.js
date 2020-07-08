const form = document.querySelector(".js-form"),
  input = form.querySelector("input");
greeting = document.querySelector(".js-greetings");

const user_ls = "currentUser",
  showing_cn = "showing";

function saveName(text) {
  localStorage.setItem(user_ls, text);
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = input.value;
  paintGreeting(currentValue);
  saveName(currentValue);
}

function askForName() {
  form.classList.add(showing_cn);
  form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
  form.classList.remove(showing_cn); //폼을 안보이게하고
  greeting.classList.add(showing_cn); //gretting을 보이게함
  greeting.innerText = `😀 어서오세요 ${text}님`;
}

function loadName() {
  const currentUser = localStorage.getItem(user_ls);

  if (currentUser === null) {
    askForName();
  } else {
    paintGreeting(currentUser);
  }
}

function init() {
  loadName();
}

init();
