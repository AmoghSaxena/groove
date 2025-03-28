let entropyValue = 0;
let clickCount = 0;
const entropyCanvas = document.getElementById('entropy-canvas');
const ctx = entropyCanvas.getContext('2d');

entropyCanvas.addEventListener('click', function(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  
  // Update entropy value based on click position and timestamp
  const timestamp = new Date().getTime();
  entropyValue = (entropyValue + x * y * timestamp) % 1000000;
  
  // Normalize entropy between 0 and 1
  const normalizedEntropy = entropyValue / 1000000;
  
  document.getElementById('entropy-value').textContent = normalizedEntropy.toFixed(6);
  
  // Visualize entropy collection
  ctx.fillStyle = `hsl(${normalizedEntropy * 360}, 100%, 50%)`;
  ctx.fillRect(x - 5, y - 5, 10, 10);

  // Update click count
  clickCount++;
  document.getElementById('click-count').textContent = clickCount;
});

function generateNumber() {
  const min = parseInt(document.getElementById('min').value);
  const max = parseInt(document.getElementById('max').value);
  
  if (clickCount < 5) {
    alert("Please click at least 5 times on the canvas to collect more entropy!");
    return;
  }

  const timestamp = new Date().getTime();
  const randomValue = (entropyValue * (max - min + 1) + timestamp) % (max - min + 1);
  const randomNumber = Math.floor(randomValue) + min;
  
  const message = document.getElementById('random-number-message');
  message.textContent = `The random number generated by the above entropy is: ${randomNumber}`;
}