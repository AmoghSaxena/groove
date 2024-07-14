function calculateHash() {
    const message = document.getElementById('message').value;
    const m = 10000; // Modulus for the hash function
    const a = 31; // Multiplier for the hash function
    let result = '<h3>Step-by-step Process:</h3>';

    // Step 1: Convert message to integer
    let x = 0;
    result += `<h5>1. Convert message to integer using a rolling hash:</h5>`;
    result += `<p><span class="text-danger">Formula</span>: <span class="text-info">x = (x * a + charCode) % m </span>(a = 31, m = 10000 and x<sub>0</sub> = 0)<br>`;
    for (let i = 0; i < message.length; i++) {
        const charCode = message.charCodeAt(i);
        result += `   x = (${i === 0 ? 0 : x} * ${a} + ${charCode}) % ${m} = ${(x * a + charCode) % m}<br>`;
        x = (x * a + charCode) % m;
    }
    result += `   <span class="text-warning">Final value of x</span>: <span class="text-info">${x}</span></p>`;

    // Step 2: Apply additional mixing
    let y = x;
    result += `<h5>2. Apply additional mixing:</h5>`;
    result += `<p><span class="text-danger">Formula</span>: <span class="text-info">y = (y * y + i) % m </span>(repeated 5 times and y<sub>0</sub> = x)<br>`;
    for (let i = 0; i < 5; i++) {
        result += `   y = (${y} * ${y} + ${i}) % ${m} = ${(y * y + i) % m}<br>`;
        y = (y * y + i) % m;
    }
    result += `   <span class="text-warning">Final value of y</span>: <span class="text-info">${y}</span></p>`;

    // Step 3: Format the hash as a fixed-length string
    // const hash = y.toString().padStart(4, '0');
    // result += `<p>3. Format the hash as a fixed-length string:<br>`;
    // result += `   Formula: hash.toString().padStart(4, '0')<br>`;
    // result += `   Padded hash: ${hash}</p>`;

    // Step 4: Convert the hash to 16-digit binary
    const binary = parseInt(y).toString(2).padStart(16, '0');
    result += `<h5>3. Convert the hash to 16-digit binary:</h5>`;
    result += `<p>   <span class="text-danger">Formula</span>: <span class="text-info">parseInt(y).toString(2).padStart(16, '0')</span><br>`;
    result += `   Binary hash: ${binary}</p>`;

    // Final result
    //result += `<h3>Final Hash Value: ${hash}</h3>`;
    result += `<h4>Hash Value: <span class="text-primary">${binary}</span></h4>`;

    document.getElementById('result').innerHTML = result;
}
