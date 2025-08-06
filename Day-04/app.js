const passworBox = document.getElementById ('password');
const generateButton = document.getElementById ('generate');
const copyButton = document.getElementById ('copyPassword');
const lengthRange = document.getElementById ('lengthRange');
const lengthValue = document.getElementById ('lengthValue');
const length = 12;

const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowercase = 'abcdefghijklmnopqrstuvwxyz';
const numbers = '0123456789';
const symbols = '!@#$%^&*()_+[]{}|;:,.<>?`~';

const allCharacter = uppercase + lowercase + numbers + symbols;

lengthRange.addEventListener ('input', () => {
  lengthValue.textContent = lengthRange.value;
});

const createPassword = () => {
  const length = parseInt (lengthRange.value);
  let password = '';
  password += uppercase[Math.floor (Math.random () * uppercase.length)];
  password += lowercase[Math.floor (Math.random () * lowercase.length)];
  password += numbers[Math.floor (Math.random () * numbers.length)];
  password += symbols[Math.floor (Math.random () * symbols.length)];

  while (password.length < length) {
    password += allCharacter[Math.floor (Math.random () * allCharacter.length)];
  }
  password = [...password].sort (() => Math.random () - 0.5).join ('');

  passworBox.value = password;
};

generateButton.addEventListener ('click', createPassword);

copyButton.addEventListener ('click', () => {
  passworBox.select ();
  document.execCommand ('copy');
  // navigator.clipboard.writeText (passworBox.value);
  alert ('Password copied to clipboard!');
});
