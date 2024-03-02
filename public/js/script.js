const email = document.getElementById("email");
const errorEmail = document.getElementById("errorEmail");

const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const errorPassword = document.getElementById("errorPassword");

const btn = document.getElementById("btn");

btn.setAttribute("disabled", "disabled");

email.addEventListener("change", async () => {
  console.log(email.value);
  const response = await fetch("/check-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email.value }),
  });
  const data = await response.json();
  if (data.avaliable) {
    errorEmail.style.display = "block";
    errorEmail.style.color = "green";
    errorEmail.innerHTML = "Email Available";
    email.style.border = "2px solid green";
  } else {
    errorEmail.style.display = "block";
    errorEmail.style.color = "red";
    errorEmail.innerHTML = "Email Already Exists";
  }
});

confirmPassword.addEventListener("change", () => {
  if (password.value !== confirmPassword.value) {
    errorPassword.style.display = "block";
    errorPassword.style.color = "red";
    errorPassword.innerHTML = "Password doesn't match";
    confirmPassword.style.border = "2px solid red";
    btn.setAttribute("disabled", "disabled");
  } else {
    errorPassword.style.display = "block";
    errorPassword.style.color = "green";
    errorPassword.innerHTML = "Password matches";
    confirmPassword.style.border = "2px solid green";
    btn.removeAttribute("disabled");
  }
});
