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

function encode() {
    const inputText = document.getElementById('inputText').value.toUpperCase();
    let outputText = '';
    for (let i = 0; i < inputText.length; i++) {
    const char = inputText[i];
    if (alphabet.includes(char)) {
        const index = (alphabet.indexOf(char) + shift) % 26;
        outputText += alphabet[index];
    } else {
        outputText += char;
    }
    }
    document.getElementById('outputText').textContent = outputText;
}

function decode() {
    const inputText = document.getElementById('outputText').textContent.toUpperCase();
    let outputText = '';
    for (let i = 0; i < inputText.length; i++) {
    const char = inputText[i];
    if (alphabet.includes(char)) {
        const index = (alphabet.indexOf(char) - shift + 26) % 26;
        outputText += alphabet[index];
    } else {
        outputText += char;
    }
    }
    document.getElementById('inputText').value = outputText;
}