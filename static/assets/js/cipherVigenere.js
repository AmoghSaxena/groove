// Function to generate the Vigenère table
function generateVigenereTable() {
    const table = document.getElementById('vigenereTable');
    table.innerHTML = '';
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const headerRow = document.createElement('tr');
    const emptyCell = document.createElement('th');
    headerRow.appendChild(emptyCell);

    // Create header row
    for (let i = 0; i < 26; i++) {
        const th = document.createElement('th');
        th.textContent = alphabet[i];
        headerRow.appendChild(th);
    }
    table.appendChild(headerRow);

    // Create table rows
    for (let i = 0; i < 26; i++) {
        const row = document.createElement('tr');
        const th = document.createElement('th');
        th.textContent = alphabet[i];
        row.appendChild(th);
        for (let j = 0; j < 26; j++) {
            const td = document.createElement('td');
            td.textContent = alphabet[(i + j) % 26];
            row.appendChild(td);
        }
        table.appendChild(row);
    }
}

// Function to encrypt the plaintext using the Vigenère cipher
async function encrypt() {
    const plaintext = document.getElementById('plaintext').value;
    const key = document.getElementById('key').value.toUpperCase().replace(/[^A-Z]/g, '');
    if (plaintext === '' || key === '') {
        alert('Please enter both plaintext and key.');
        return;
    }

    const table = document.getElementById('vigenereTable');
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let extendedKey = key.repeat(Math.ceil(plaintext.length / key.length)).substring(0, plaintext.length);
    let ciphertext = '';
    let keyIndex = 0;

    // Display plaintext, keyword, and extended key before encryption
    document.getElementById('details').innerHTML = `

        <em>Watch the intersection of the highlighted row and column to see the encrypted character.</em><br>
        <strong class="text-info">Key Word</strong>: <span class="text-warning">${key}</span><br>
        <strong class="text-info">Plain Text</strong>: <span class="text-uppercase text-warning">${plaintext}</span><br>
        <strong class="text-info">Key</strong>: <span class="text-warning">${extendedKey}</span>
        
    `;

    // Clear previous highlights
    const cells = table.getElementsByTagName('td');
    for (let cell of cells) {
        cell.classList.remove('highlight');
    }
    const rows = table.getElementsByTagName('tr');
    for (let row of rows) {
        row.classList.remove('highlight-row');
        for (let cell of row.getElementsByTagName('td')) {
            cell.classList.remove('highlight-col');
        }
    }

    // Encrypt each character with animation
    for (let i = 0; i < plaintext.length; i++) {
        const char = plaintext[i];
        if (alphabet.includes(char.toUpperCase())) {
            const row = alphabet.indexOf(extendedKey[keyIndex]);
            const col = alphabet.indexOf(char.toUpperCase());
            const cell = table.rows[row + 1].cells[col + 1];
            table.rows[row + 1].classList.add('highlight-row');
            for (let j = 1; j <= 26; j++) {
                table.rows[j].cells[col + 1].classList.add('highlight-col');
            }
            cell.classList.add('highlight');
            await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for 2 seconds
            table.rows[row + 1].classList.remove('highlight-row');
            for (let j = 1; j <= 26; j++) {
                table.rows[j].cells[col + 1].classList.remove('highlight-col');
            }
            cell.classList.remove('highlight');
            ciphertext += cell.textContent;
            keyIndex++;
        } else {
            ciphertext += char;
        }
        document.getElementById('result').textContent = `Ciphertext: ${ciphertext}`;
    }
}

// Generate the Vigenère table on page load
window.onload = generateVigenereTable;