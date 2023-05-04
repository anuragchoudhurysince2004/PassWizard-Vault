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

  // while (i < (Math.floor(Math.random() * 16) + 8)) {
  //     let tempsp=strongchar[Math.floor(Math.random() * strongchar.length)]
  //     strpass+=tempsp
  //     i++
  // }
  // return(strpass)

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
// console.log(c.strongpass())
// console.log(c.supstrongpass())
// c.weakpass()

//linking webpage and js
// optionsubmit.addEventListener("click",()=>{
//     console.log(document.getElementsByClassName("options")[0].checke)
// })

// console.log(document.getElementsByClassName("options")[0].value)

function display() {
  if (document.getElementById("1").checked) {
    document.getElementsByClassName("output")[0].innerHTML =
      `<p class="gen-pass">Generated Password is :</p><br><span class="gen" id="space"> ${c.supstrongpass()}` +
      `</span> <button class="btn copy-button"  onclick="copytoclipboard()" >Copy text</button>`;
  } else if (document.getElementById("2").checked) {
    document.getElementsByClassName("output")[0].innerHTML =
      `<p class="gen-pass">Generated Password is :</p><br><span class="gen" id="space"> ${c.strongpass()}` +
      `</span> <button class="btn copy-button"  onclick="copytoclipboard()" >Copy text</button>`;
  } else if (document.getElementById("3").checked) {
    document.getElementsByClassName("output")[0].innerHTML =
      `<p class="gen-pass">Generated Password is :</p><br><span class="gen" id="space"> ${c.weakpass()}` +
      `</span> <button class="btn copy-button" onclick="copytoclipboard()" >Copy text</button>`;
  }
}

function copytoclipboard() {
  copy_text = document.getElementById("space").textContent;
  navigator.clipboard.writeText(copy_text);
}

// function copytoclipboard() {
//     // Get the text field
//     var copyText = document.getElementsByClassName("gen")[0].select();

//     // Select the text field
//     // copyText.select
//     // copyText.setSelectionRange(0, 99999); // For mobile devices

//      // Copy the text inside the text field
//     navigator.clipboard.writeText(copyText.value);

//     // Alert the copied text
//     alert("Copied the text: " + copyText.value);
//   }
