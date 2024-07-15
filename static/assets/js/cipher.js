const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
let shift = 0;

function shiftAlphabet(shift) {
  const shiftedAlphabet = alphabet.slice(shift) + alphabet.slice(0, shift);
  const shiftedGear = document.getElementById('shiftedGear');
  shiftedGear.innerHTML = '';
  for (let i = 0; i < 26; i++) {
    const span = document.createElement('span');
    span.textContent = shiftedAlphabet[i];
    shiftedGear.appendChild(span);
  }
}

function incrementShift() {
  shift = (shift + 1) % 26;
  document.getElementById('shiftValue').textContent = shift;
  shiftAlphabet(shift);
}

function decrementShift() {
  shift = (shift - 1 + 26) % 26;
  document.getElementById('shiftValue').textContent = shift;
  shiftAlphabet(shift);
}

function processText(mode) {
  const inputText = document.getElementById('inputText').value.toUpperCase();
  let outputText = '';
  let formula = mode === 'encode' ? 'Encryption: En(x) = (x + n) mod 26<br>' : 'Decryption: Dn(x) = (x - n) mod 26<br>';
  
  for (let i = 0; i < inputText.length; i++) {
    const char = inputText[i];
    if (alphabet.includes(char)) {
      const x = alphabet.indexOf(char);
      const result = mode === 'encode' ? (x + shift) % 26 : (x - shift + 26) % 26;
      outputText += alphabet[result];
      formula += mode === 'encode' 
        ? `En(${char}) = (${x} + ${shift}) mod 26 = ${result} = ${alphabet[result]}<br>`
        : `Dn(${char}) = (${x} - ${shift}) mod 26 = ${result} = ${alphabet[result]}<br>`;
    } else {
      outputText += char;
    }
  }
  
  document.getElementById('outputText').textContent = outputText;
  document.getElementById('formulaDisplay').innerHTML = formula;
}
