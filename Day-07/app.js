const container = document.querySelector('.container');
const userInput = document.getElementById('userInput');
const submitBtn = document.getElementById('submit'); 
const downloadBtn = document.getElementById('download');
const sizeOptions = document.querySelector('.sizeOptions');
const FGColor = document.getElementById('FGColor');
const BGColor = document.getElementById('BGColor');

let QRCodeInstance;
let sizeChoice = sizeOptions.value;
let FGColorChoice = FGColor.value;
let BGColorChoice = BGColor.value;

// ! set size
sizeOptions.addEventListener('change', () => {
  sizeChoice = sizeOptions.value;
});

// ! foreground set
FGColor.addEventListener('input', () => {
  FGColorChoice = FGColor.value;
});

// ! background set
BGColor.addEventListener('input', () => {
  BGColorChoice = BGColor.value;
});

// ! format input
const inputFormatter = val => {
  return val.replace(/[^a-zA-Z0-9 ]/g, '');
};

// ! Generate QR
submitBtn.addEventListener('click', () => {
  container.innerHTML = '';

  QRCodeInstance = new QRCode(container, {
    text: inputFormatter(userInput.value),
    width: parseInt(sizeChoice),
    height: parseInt(sizeChoice),
    colorDark: FGColorChoice,
    colorLight: BGColorChoice,
  });

  setTimeout(() => {
    const canvas = container.querySelector('canvas');
    if (canvas) {
      const src = canvas.toDataURL('image/png');
      downloadBtn.href = src;

      let userValue = userInput.value;
      try {
        userValue = new URL(userValue).hostname;
      } catch (_) {}

      userValue = inputFormatter(userValue);
      downloadBtn.download = `${userValue}QR.png`;
      downloadBtn.classList.remove('hide');
    }
  }, 300);
});

userInput.addEventListener("input", () => {
  if (userInput.value.trim().length < 1) {
    submitBtn.disabled = true;
    downloadBtn.href = "";
    downloadBtn.classList.add("hide");
  } else {
    submitBtn.disabled = false;
  }
});

window.onload = () => {
  container.innerHTML = "";
  sizeChoice = 100;
  sizeOptions.value = 100;
  userInput.value = "";
  BGColor.value = BGColorChoice = "#ffffff";
  FGColor.value = FGColorChoice = "#377dff";
  downloadBtn.classList.add("hide")
  submitBtn.disabled = true
};
