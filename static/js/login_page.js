function switchForm(ele, newFormIndex) {
  const divs = document.querySelectorAll(".form");
  for (let i = 0; i < 2; i++) {
    if (i === newFormIndex) {
      divs[i].classList.remove("hidden");
    } else {
      divs[i].classList.add("hidden");
    }
  }
}

function signUpButtonPressed() {
  const inputs = document
    .querySelector("div.form:not(.hidden)")
    .querySelectorAll("input");
  const username = inputs[0].value;
  const password = inputs[1].value;
  const email = inputs[2].value;
  UserApi.signUp(username, password, email);
}

function signInButtonPressed() {
    const inputs = document
        .querySelector("div.form:not(.hidden)")
        .querySelectorAll("input");
    const username = inputs[0].value;
    const password = inputs[1].value;
    UserApi.signIn(username, password);
}
