const formElement = document.getElementById("form");
const shiftNumber = document.getElementById("shiftNumber");
const text = document.getElementById("encryptText");
const messageBox = document.getElementById("message");
const resultBox = document.getElementById("result");
const button = document.getElementById("button");
let isEncryption = true;

formElement.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append("shiftNumber", shiftNumber.value);
  formData.append("text", text.value);

  if (!shiftNumber.value || !text.value) {
    messageBox.innerHTML = "Shift number or text input cannot be emptied";
    messageBox.classList.add("nes-btn")
    messageBox.classList.add("is-error")
  } else {
    messageBox.innerHTML = "";
  }

  const response = await fetch("https://REST-API.moriishika.repl.co", {
    method: "POST",
    body: JSON.stringify(Object.fromEntries(formData)),
    headers: { "Content-Type": "application/json" }
  });

  const data = await response.json();
  resultBox.innerHTML = `This is the ${isEncryption ? 'encrypted' : 'decrypted'} text: ${data.result[0]}`
  resultBox.style.overflowWrap = "break-word"
  resultBox.style.padding = "3% 10% 3% 10%"
  console.log(data)
});

shiftNumber.addEventListener("input", (e) =>{
  if(parseInt(e.target.value) > 0){
    isEncryption = true
    button.textContent = "Encrypt!"
  }else{
    isEncryption = false
    button.textContent = "Decrypt!"
  }  
  console.log(isEncryption)
});