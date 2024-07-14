async function hashText() {
    const inputText = document.getElementById('inputText').value;
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = '';

    if (!inputText) {
        alert('Please enter some text.');
        return;
    }

    // Step 1: Convert input text to binary
    const binaryData = textToBinary(inputText);
    outputDiv.innerHTML += `<div class="step"><h3>Step 1: Convert input text to binary</h3><p>We convert the input text to its binary representation.</p><pre>${binaryData}</pre></div>`;

    // Step 2: Pad binary data to a multiple of 512 bits
    const paddedData = padBinaryData(binaryData);
    const formattedPaddedData = formatBinaryData(paddedData, 64);
    outputDiv.innerHTML += `<div class="step"><h3>Step 2: Pad binary data to a multiple of 512 bits</h3><p>We pad the binary data to ensure its length is a multiple of 512 bits.</p><pre>${formattedPaddedData}</pre></div>`;

    // Step 3: Parse data into 32-bit words
    const words = parseToWords(paddedData);
    outputDiv.innerHTML += `<div class="step"><h3>Step 3: Parse data into 32-bit words</h3><p>We parse the padded binary data into 32-bit words.</p><pre>${words.map((word, index) => `W[${index}] = ${word.toString(16).padStart(8, '0').toUpperCase()}`).join('\n')}</pre></div>`;

    // Step 4: Initialize hash values
    const initialHashValues = initializeHashValues();
    outputDiv.innerHTML += `<div class="step"><h3>Step 4: Initialize hash values</h3><p>We initialize the hash values as specified by the SHA-256 algorithm.</p><pre>${initialHashValues.map((value, index) => `H[${index}] = ${value.toString(16).padStart(8, '0').toUpperCase()}`).join('\n')}</pre></div>`;

    // Step 5: Loop through message blocks and perform operations
    const finalHashValues = await computeHash(words, initialHashValues, outputDiv);

    // Step 6: Output final 256-bit hash digest
    const finalHash = finalHashValues.map(value => value.toString(16).padStart(8, '0')).join('');
    outputDiv.innerHTML += `<div class="step"><h3>Step 6: Final hash digest</h3><p>The final 256-bit hash digest is obtained by concatenating the final hash values.</p><h6 class="text-uppercase text-primary">${finalHash}</h6></div>`;
}

function textToBinary(text) {
    return text.split('').map(char => char.charCodeAt(0).toString(2).padStart(8, '0')).join('');
}

function padBinaryData(binaryData) {
    const originalLength = binaryData.length;
    binaryData += '1';
    while ((binaryData.length + 64) % 512 !== 0) {
        binaryData += '0';
    }
    const lengthBinary = originalLength.toString(2).padStart(64, '0');
    binaryData += lengthBinary;
    return binaryData;
}

function formatBinaryData(binaryData, chunkSize) {
    const regex = new RegExp(`.{1,${chunkSize}}`, 'g');
    return binaryData.match(regex).join('\n');
}

function parseToWords(binaryData) {
    const words = [];
    for (let i = 0; i < binaryData.length; i += 32) {
        words.push(parseInt(binaryData.slice(i, i + 32), 2));
    }
    return words;
}

function initializeHashValues() {
    return [
        0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a,
        0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19
    ];
}

async function computeHash(words, hashValues, outputDiv) {
    const k = [
        0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
        0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
        0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
        0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
        0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
        0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
        0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
        0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
    ];

    let isTwoBlockMessage = false;

    for (let i = 0; i < words.length; i += 16) {
        let w = words.slice(i, i + 16);
        for (let t = 16; t < 64; t++) {
            const s0 = rightRotate(w[t - 15], 7) ^ rightRotate(w[t - 15], 18) ^ (w[t - 15] >>> 3);
            const s1 = rightRotate(w[t - 2], 17) ^ rightRotate(w[t - 2], 19) ^ (w[t - 2] >>> 10);
            w[t] = (w[t - 16] + s0 + w[t - 7] + s1) >>> 0;
        }

        let [a, b, c, d, e, f, g, h] = hashValues;

        let tValues = `<table style="text-align: center; padding: 8px; border: 1px solid black;"><tr><th style="border: 1px solid black;">t</th><th style="border: 1px solid black;">A</th><th>B</th><th style="border: 1px solid black;">C</th><th style="border: 1px solid black;">D</th><th style="border: 1px solid black;">E</th><th style="border: 1px solid black;">F</th><th style="border: 1px solid black;">G</th><th style="border: 1px solid black;">H</th></tr>`;
        for (let t = 0; t < 64; t++) {
            const S1 = rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25);
            const ch = (e & f) ^ (~e & g);
            const temp1 = (h + S1 + ch + k[t] + w[t]) >>> 0;
            const S0 = rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22);
            const maj = (a & b) ^ (a & c) ^ (b & c);
            const temp2 = (S0 + maj) >>> 0;

            h = g;
            g = f;
            f = e;
            e = (d + temp1) >>> 0;
            d = c;
            c = b;
            b = a;
            a = (temp1 + temp2) >>> 0;

            tValues += `<tr><td style="border: 1px solid black;">${t}</td><td style="border: 1px solid black;">${a.toString(16).padStart(8, '0')}</td><td style="border: 1px solid black;">${b.toString(16).padStart(8, '0')}</td><td style="border: 1px solid black;">${c.toString(16).padStart(8, '0')}</td><td style="border: 1px solid black;">${d.toString(16).padStart(8, '0')}</td><td style="border: 1px solid black;">${e.toString(16).padStart(8, '0')}</td><td style="border: 1px solid black;">${f.toString(16).padStart(8, '0')}</td><td style="border: 1px solid black;">${g.toString(16).padStart(8, '0')}</td><td style="border: 1px solid black;">${h.toString(16).padStart(8, '0')}</td></tr>`;
        }
        tValues += `</table><br><br>`;

        outputDiv.innerHTML += `<div class="step"><h3>Step 5: Loop through message blocks and perform operations</h3><p>The block contents (W[t]) are generated using the following formulas:</p>
        <ul>
            <li>For <code>0 ≤ t ≤ 15</code>: <code>W[t] = M[t]</code></li>
            <li>For <code>16 ≤ t ≤ 63</code>: <code>W[t] = σ1(W[t-2]) + W[t-7] + σ0(W[t-15]) + W[t-16]</code></li>
        </ul>
        <p>Where:</p>
        <ul>
            <li><code>σ0(x) = (x >>> 7) ^ (x >>> 18) ^ (x >>> 3)</code></li>
            <li><code>σ1(x) = (x >>> 17) ^ (x >>> 19) ^ (x >>> 10)</code></li>
        </ul>
        <pre>${w.map((value, index) => `W[${index}] = ${value.toString(16).padStart(8, '0').toUpperCase()}`).join('\n')}</pre></div>`;

        outputDiv.innerHTML += `<p>We loop through the message blocks and perform the following operations to update the hash values:</p>
        <ul>
            <li><code>S1 = (e >>> 6) ^ (e >>> 11) ^ (e >>> 25)</code></li>
            <li><code>ch = (e & f) ^ (~e & g)</code></li>
            <li><code>temp1 = h + S1 + ch + k[t] + w[t]</code></li>
            <li><code>S0 = (a >>> 2) ^ (a >>> 13) ^ (a >>> 22)</code></li>
            <li><code>maj = (a & b) ^ (a & c) ^ (b & c)</code></li>
            <li><code>temp2 = S0 + maj</code></li>
        </ul>
        ${tValues}</div>`;

        const newHashValues = [
            (hashValues[0] + a) >>> 0,
            (hashValues[1] + b) >>> 0,
            (hashValues[2] + c) >>> 0,
            (hashValues[3] + d) >>> 0,
            (hashValues[4] + e) >>> 0,
            (hashValues[5] + f) >>> 0,
            (hashValues[6] + g) >>> 0,
            (hashValues[7] + h) >>> 0
        ];

        outputDiv.innerHTML += `<div class="step"><h3>Hash Value Addition</h3><pre>${newHashValues.map((value, index) => `<span class="text-info">H[${index}]</span> = ${hashValues[index].toString(16).padStart(8, '0').toUpperCase()} + ${[a, b, c, d, e, f, g, h][index].toString(16).padStart(8, '0').toUpperCase()} = <span class="text-warning">${value.toString(16).padStart(8, '0').toUpperCase()}</span>`).join('\n')}</pre></div>`;

        hashValues = newHashValues;

        if (i + 16 < words.length) {
            isTwoBlockMessage = true;
            outputDiv.innerHTML += `<div class="step"><pre>--- End of Block ${i / 16 + 1} ---</pre></div>`;
        }
    }

    if (isTwoBlockMessage) {
        outputDiv.innerHTML += `<div class="step"><pre>This is a two-block message. Continuing with the next block...</pre></div>`;
    }

    return hashValues;
}

function rightRotate(value, amount) {
    return (value >>> amount) | (value << (32 - amount));
}