function switchForm(ele, newFormIndex) {
  const divs = document.querySelectorAll(".form");
  for (let i = 0; i < 2; i++) {
    if (i === newFormIndex) {
      divs[i].classList.remove("hidden");
    } else {
      divs[i].classList.add("hidden");
    }
  }
  console.log(ele.classList);
}
