// document.querySelector(".blob").addEventListener("submit", (e) => {
//   e.preventDefault();
// });

let bloba = new MinValidate(document.querySelector("#form-1"), {
  formErrorConteiner: ".error-block",
  // cssClass: {
  //   errorList:'clop'
  // },
});

bloba
  .addField("#name", [
    {
      rule: "required",
      errorMessage: "Email is required",
    },
    {
      rule: "minLength",
      value: 3,
      errorMessage: "to short mathafucka",
    },
    {
      rule: "maxLength",
      value: 5,
    },
    {
      rule: "regexp",
      value: /0./i,
      errorMessage: "Is invalid!",
    },
  ])
  .addField("#surname", [
    {
      rule: "required",
    },
    {
      rule: "minLength",
      value: 2,
    },
    {
      rule: "maxLength",
      value: 6,
    },
  ]);
