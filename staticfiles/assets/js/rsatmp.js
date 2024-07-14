let p, q, n, phi, e, d;
let encryptedMessage = [];

function isPrime(num) {
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b);
}

function chooseE(phi) {
    const possibleEValues = [3, 5, 17, 65537];
    for (let i = 0; i < possibleEValues.length; i++) {
        if (possibleEValues[i] < phi && gcd(possibleEValues[i], phi) === 1) {
            return possibleEValues[i];
        }
    }
    return null;
}

function modInverse(e, phi) {
    let m0 = phi, t, q;
    let x0 = 0, x1 = 1;
    if (phi == 1) return 0;
    while (e > 1) {
        q = Math.floor(e / phi);
        t = phi;
        phi = e % phi;
        e = t;
        t = x0;
        x0 = x1 - q * x0;
        x1 = t;
    }
    if (x1 < 0) x1 += m0;
    return x1;
}

function generateKeys() {
    let output = document.getElementById('keyGenOutput');
    output.innerHTML = '<h2>1. Key Generation Step</h2>';

    p = parseInt(document.getElementById('p').value);
    q = parseInt(document.getElementById('q').value);

    if (!p || !q || !isPrime(p) || !isPrime(q)) {
        output.innerHTML += '<p class="alert alert-danger">Please enter valid prime numbers for p and q.</p>';
        return;
    }

    output.innerHTML += `<p>Prime numbers chosen: p = <span class="text-primary">${p}</span>, q = <span class="text-primary">${q}</span></p>`;

    n = p * q;
    phi = (p - 1) * (q - 1);

    output.innerHTML += `<p>Calculate <strong>n</strong> = p * q = ${p} * ${q} = <strong>${n}</strong></p>`;
    output.innerHTML += `<p>Calculate φ(n) = (p-1) * (q-1) = ${p-1} * ${q-1} = ${phi}</p>`;

    e = chooseE(phi);
    if (e === null) {
        output.innerHTML += '<p class="alert alert-danger">Unable to find a suitable value for e. Please choose different p and q.</p>';
        return;
    }
    output.innerHTML += `<p>Chosen <strong>e</strong> (coprime to φ(n)): <strong>${e}</strong></p>`;

    d = modInverse(e, phi);
    output.innerHTML += `<p>Calculate d (modular multiplicative inverse of e modulo φ(n)):</p>`;
    output.innerHTML += `<p class="formula">d = e<sup>-1</sup> mod φ(n)</p>`;
    output.innerHTML += `<p class="formula"><strong>d</strong> = ${e}<sup>-1</sup> mod ${phi} = <strong>${d}</strong></p>`;

    output.innerHTML += '<p><strong>Public Key</strong>: (n, e) = <span class="text-warning">(' + n + ', ' + e + ')</span></p>';
    output.innerHTML += '<p><strong>Private Key</strong>: (n, d) = <span class="text-warning">(' + n + ', ' + d + ')</span></p>';
}

function calculateNED() {
    let output = document.getElementById('nedOutput');
    output.innerHTML = '<h2>2. Calculating n, e, and d</h2>';

    if (!n || !e || !d) {
        output.innerHTML += '<p class="alert alert-warning">Please generate keys first.</p>';
        return;
    }

    output.innerHTML += `<p>n = p * q = ${p} * ${q} = ${n}</p>`;
    output.innerHTML += `<p>φ(n) = (p-1) * (q-1) = ${p-1} * ${q-1} = ${phi}</p>`;
    output.innerHTML += `<p>e is chosen to be coprime to φ(n): ${e}</p>`;
    output.innerHTML += `<p>d = e<sup>-1</sup> mod φ(n)</p>`;
    output.innerHTML += `<p class="formula">d = ${e}<sup>-1</sup> mod ${phi} = ${d}</p>`;
    output.innerHTML += `<p class="formula">d * e ≡ 1 (mod φ(n))</p>`;
    output.innerHTML += `<p class="formula">${d} * ${e} ≡ 1 (mod ${phi})</p>`;
}

function power(x, y, m) {
    if (y === 0) return 1;
    let p = power(x, Math.floor(y / 2), m) % m;
    p = (p * p) % m;
    return (y % 2 === 0) ? p : (x * p) % m;
}

function encryptMessage() {
    let output = document.getElementById('encryptionOutput');
    output.innerHTML = '<h2>2. Encryption Step</h2>';

    let message = document.getElementById('message').value;

    if (!message) {
        output.innerHTML += '<p class="alert alert-warning">Please enter a message to encrypt.</p>';
        return;
    }

    if (!n || !e) {
        output.innerHTML += '<p class="alert alert-danger">Please generate keys first.</p>';
        return;
    }

    encryptedMessage = [];
    for (let i = 0; i < message.length; i++) {
        let m = message.charCodeAt(i);
        let c = power(m, e, n);
        encryptedMessage.push(c);
        output.innerHTML += `<p>Encrypting <span class="text-warning">'${message[i]}'</span> (ASCII: <span class="text-primary">${m}</span>):</p>`;
        output.innerHTML += `<p class="formula">c = m<sup>e</sup> mod n</p>`;
        output.innerHTML += `<p class="formula">c = ${m}<sup>${e}</sup> mod ${n} = <span class="text-success">${c}</span></p>`;
    }

    output.innerHTML += `<p class="h5"><em>Encrypted message: <strong>${encryptedMessage.join(', ')}</strong></em></p>`;
}

function decryptMessage() {
    let output = document.getElementById('decryptionOutput');
    output.innerHTML = '<h2>3. Decryption Step</h2>';

    if (encryptedMessage.length === 0) {
        output.innerHTML += '<p class="alert alert-warning">Please encrypt a message first.</p>';
        return;
    }

    if (!n || !d) {
        output.innerHTML += '<p class="alert alert-danger">Please generate keys first.</p>';
        return;
    }

    let decrypted = '';
    for (let i = 0; i < encryptedMessage.length; i++) {
        let c = encryptedMessage[i];
        let m = power(c, d, n);
        decrypted += String.fromCharCode(m);
        output.innerHTML += `<p>Decrypting <span class="text-warning">${c}</span>:</p>`;
        output.innerHTML += `<p class="formula">m = c<sup>d</sup> mod n</p>`;
        output.innerHTML += `<p class="formula">m = ${c}<sup>${d}</sup> mod ${n} = ${m} (<span class="text-success">'${String.fromCharCode(m)}'</span>)</p>`;
    }

    output.innerHTML += `<p class="h5"><em>Decrypted message: <strong>${decrypted}</strong></em></p>`;
}