import { showAlert } from "./alerts.js";
import { base_url } from "./helper.js";

let CHAR = Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
let char = Array.from("abcdefghijklmnopqrstuvwxyz");
let num = Array.from("1234567890");
let splchar = Array.from("~!@#$%^&*()_-=/*/?;:{}|");

class passgenerator {
  strongpass() {
    let strpass = "";
    let strongchar = char.concat(num, splchar);
    for (let i = 0; i < Math.floor(Math.random() * 16) + 8; i++) {
      let tempsp = strongchar[Math.floor(Math.random() * strongchar.length)];
      strpass += tempsp;
    }
    return strpass;
  }

  weakpass() {
    let weakpass = "";
    let weakchar = char.concat(num);
    for (let i = 0; i < Math.floor(Math.random() * 16) + 8; i++) {
      let tempwp = weakchar[Math.floor(Math.random() * weakchar.length)];
      weakpass += tempwp;
    }
    return weakpass;
  }

  supstrongpass() {
    let supstrongpass = "";
    let supstrongchar = CHAR.concat(char, num, splchar);
    for (let i = 0; i < Math.floor(Math.random() * 16) + 8; i++) {
      let tempssp =
        supstrongchar[Math.floor(Math.random() * supstrongchar.length)];
      supstrongpass += tempssp;
    }
    return supstrongpass;
  }
}
let c = new passgenerator();

const outputHTML = `<p class="gen-pass">Generated Password is :</p><div class="output-ele"><span class="gen" id="space"> variable
</span> <button class="copy-button"  ><svg class='copy-button' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="add"><path d="M12 13h-1v-1c0-.6-.4-1-1-1s-1 .4-1 1v1H8c-.6 0-1 .4-1 1s.4 1 1 1h1v1c0 .6.4 1 1 1s1-.4 1-1v-1h1c.6 0 1-.4 1-1s-.4-1-1-1z"></path><path d="M17 3h-6C8.8 3 7 4.8 7 7c-2.2 0-4 1.8-4 4v6c0 2.2 1.8 4 4 4h6c2.2 0 4-1.8 4-4 2.2 0 4-1.8 4-4V7c0-2.2-1.8-4-4-4zm-2 13v1c0 1.1-.9 2-2 2H7c-1.1 0-2-.9-2-2v-6c0-1.1.9-2 2-2h6c1.1 0 2 .9 2 2v5zm4-3c0 1.1-.9 2-2 2v-4c0-2.2-1.8-4-4-4H9c0-1.1.9-2 2-2h6c1.1 0 2 .9 2 2v6z"></path></svg></button><buttton class="savePass" >Save Password</button></div>`;

function display() {
  if (document.getElementById("1").checked) {
    document.getElementsByClassName("output")[0].innerHTML = outputHTML.replace(
      "variable",
      c.supstrongpass
    );
  } else if (document.getElementById("2").checked) {
    document.getElementsByClassName("output")[0].innerHTML = outputHTML.replace(
      "variable",
      c.strongpass
    );
  } else if (document.getElementById("3").checked) {
    document.getElementsByClassName("output")[0].innerHTML = outputHTML.replace(
      "variable",
      c.weakpass
    );
  }
}

//addding event listener to display and copytoclipboard fucntions
const submitButtonForGenPass = document.getElementById("optionsubmit");
if (submitButtonForGenPass) {
  submitButtonForGenPass.addEventListener("click", display);
}

//HTML for form for gettin username and website

const formHTML = `<form >
<label for="username">Username:</label>
<input type="text" id="username" name="username" placeholder="Enter your username for the generated pass (optional)" ><br><br>

<label for="website">Website:</label>
<input type="text" id="website" name="website" placeholder="Enter the website name or alias for the password(optional) " ><br><br>

<button class="confirmSavePass">Push password </button>
</form>`;

const checkLogin = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: `${base_url}/api/v1/auth/isloggedin`,
    });
    const email = await res.data.currentUser.email;
    const result = { email, status: "success" };
    // console.log(result);
    return result;
  } catch (err) {
    // location.assign("/login");
    // showAlert("error", err.response.data.error);
    console.log("i think user is not logged in");
    console.log(err);
  }
};

const generatorContainer = document.querySelector(".generator-container");
let loginCheckResult;

generatorContainer.addEventListener("click", (event) => {
  if (event.target.matches(".copy-button")) {
    function copytoclipboard() {
      const copy_text = document.getElementById("space").textContent;
      navigator.clipboard.writeText(copy_text);
    }
    copytoclipboard();
  }
  if (event.target.matches(".savePass")) {
    const savePass = document.querySelector(".savePass");
    (async () => {
      loginCheckResult = await checkLogin();
      if (loginCheckResult.status === "success") {
        //add adjacent html for the form of username and website
        document
          .querySelector(".output")
          .insertAdjacentHTML("beforeend", formHTML);
      } else {
        console.log(loginCheckResult.email);
      }
    })();
  }
  if (event.target.matches(".confirmSavePass")) {
    const email = loginCheckResult.email;
    const password = document.getElementById("space").textContent;
    const username = document.getElementById("username").value;
    const website = document.getElementById("website").value;
    pushPassToDb(email, password, username, website);
  }
});

// const genPass = document.getElementById("space").textContent.trim();
// pushPasstoDb(genPass);

const pushPassToDb = async (email, password, username, website) => {
  try {
    const dbres = await axios({
      method: "POST",
      url: `${base_url}/feature/save-pass`,
      data: {
        email,
        storePassword: password,
        storeUsername: username,
        storeWebsite: website,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

const savedPassContainer = document.querySelector(".saved-password-container");
if (savedPassContainer) {
  console.log(savedPassContainer);
  savedPassContainer.addEventListener("click", (e) => {
    if (e.target.matches(".copy-button")) {
      const copyButton = e.target;
      const copyButtonParent = copyButton.closest(".saved-pass-box");
      const pass =
        copyButtonParent.querySelector(".saved-password").textContent;
      navigator.clipboard.writeText(pass);
    }
  });
}
