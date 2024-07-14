function linearCongruentialGenerator(X0, a, c, m, count) {
    let numbers = [X0];
    let formulaSteps = [];
    for (let i = 1; i < count; i++) {
        numbers[i] = (a * numbers[i-1] + c) % m;
        formulaSteps.push(`<strong class="text-info">X<sub>next</sub></strong> = (${a} * ${numbers[i-1]} + ${c}) % ${m} =<strong class="text-danger"> ${numbers[i]} </strong>`);
    }
    return { numbers, formulaSteps };
}

function generateNumbers() {
    const X0 = parseInt(document.getElementById('seed').value);
    const a = parseInt(document.getElementById('a').value);
    const c = parseInt(document.getElementById('c').value);
    const m = parseInt(document.getElementById('m').value);
    const count = parseInt(document.getElementById('count').value);

    const { numbers, formulaSteps } = linearCongruentialGenerator(X0, a, c, m, count);
    document.getElementById('result').innerHTML = (' <strong class="text-primary">') + 'Generated numbers: ' + ('</strong>') + (' <strong class="text-warning"><em>') + numbers.join(', ') + ('</em></strong>');
    document.getElementById('formula').innerHTML = formulaSteps.join('<br>');
}