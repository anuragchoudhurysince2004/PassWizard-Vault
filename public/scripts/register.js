import { showAlert } from "./alerts.js";
const registerButton = document.querySelector(".registration-form");
import { base_url } from "./helper.js";

const register = async (username, email, password) => {
  try {
    const res = await axios({
      method: "POST",
      url: `${base_url}/api/v1/auth/register`,
      data: {
        username,
        email,
        password,
      },
    });
    if (res.data.status === "success") {
      showAlert("success", "Registered successfully!");
      window.setTimeout(() => {
        location.assign("/profile");
      }, 1000);
    }
  } catch (err) {
    showAlert("error", err.response.data.error);
  }
};

if (registerButton)
  registerButton.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("i got clicked");
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    register(username, email, password);
  });
