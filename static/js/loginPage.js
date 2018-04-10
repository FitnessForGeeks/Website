function switchForm(newFormIndex) {
  const divs = document.querySelectorAll(".form");
  for (let i = 0; i < 2; i++) {
    if (i === newFormIndex) {
      divs[i].classList.remove("hidden");
    } else {
      divs[i].classList.add("hidden");
    }
  }
  const buttons = document.querySelectorAll(".navigation button");
  const activeButton = buttons[newFormIndex];
  if(!activeButton.classList.contains("active"))
    activeButton.classList.add("active");
  buttons[1 - newFormIndex].classList.remove("active");
}

function signUpButtonPressed() {
  let error = false;
  const inputs = document
    .querySelector("div.form:not(.hidden) main")
    .querySelectorAll("input");
  const username = inputs[0].value;
  const password = inputs[1].value;
  const confirm_password = inputs[2].value;
  const email = inputs[3].value;
  Alert.clear();
  if(username === "")
  {
    new Alert("The Uusername is empty", "info");
    error = true;
  }
  if(password === "")
  {
    new Alert("The password is empty", "info");
    error = true;
  }
  if(password !== confirm_password)
  {
    new Alert("The passwords do not match", "warning");
    error = true;
  }
  if(!isValidEmail(email))
  {
    new Alert("The email is not valid", "warning");
    error = true;
  }
  if(!error)
    UserApi.signUp(username, password, email);
}

function isValidEmail(email){
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

function signInButtonPressed() {
    const inputs = document
        .querySelector("div.form:not(.hidden) main")
        .querySelectorAll("input");
    const username = inputs[0].value;
    const password = inputs[1].value;
    UserApi.signIn(username, password);
}
