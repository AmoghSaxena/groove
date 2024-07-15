<h1>Documentation</h1>
    <h2>Table of Contents</h2>
    <ul>
      <li><a href="#introduction">Introduction</a></li>
      <li><a href="#installation">Installation</a></li>
      <li><a href="#usage">Usage</a></li>
      <li>
        <a href="#primitives">Cryptographic Primitives</a>
        <ul>
          <li><a href="#keyless">Keyless Primitives</a></li>
          <li><a href="#symmetric">Symmetric Key Primitives</a></li>
          <li><a href="#asymmetric">Asymmetric Primitives</a></li>
        </ul>
      </li>
      <li><a href="#contributing">Contributing</a></li>
      <li><a href="#license">License</a></li>
    </ul>
    <h2 id="introduction">Introduction</h2>
    <p>
      This documentation provides an overview of the Interactive Cryptography
      Visualization application, including installation instructions, usage
      guidelines, and detailed explanations of the cryptographic primitives
      covered.
    </p>
    <h2 id="installation">Installation</h2>
    <ol>Standalone 
      <li>
        Clone the repository:
        <code>git clone https://github.com/AmoghSaxena/groove.git</code
        >
      </li>
      <li>
        Navigate to the project directory: <code>cd groove</code>
      </li>
      <li>
        Install the required dependencies:
        <code>pip install -r requirements.txt</code>
      </li>
      <li>
        Run the Django development server:
        <code>python manage.py runserver</code>
      </li>
      <li>
        Access the application in your web browser at:
        <code>http://localhost:8000</code>
      </li>
    </ol>
    <ol>Docker Container
    <li>
        Clone the repository:
        <code>git clone https://github.com/AmoghSaxena/groove.git</code
        >
      </li>
      <li>
        Navigate to the project directory: <code>cd groove</code>
      </li>
    <li>
    Edit `docker-compose.yml` if you want to change some settings
    </li>
    <li>
    Start the docker container:
    <code>docker compose up -d</code> [if using v1 then <code>docker-compose up -d</code>]
    </li>
    <li>
        Access the application in your web browser at:
        <code>http://localhost:8000</code>
      </li>
    </ol>
    <h2 id="usage">Usage</h2>
    <p>To use the Interactive Cryptography Visualization application:</p>
    <ol>
      <li>
        Select a cryptographic primitive or protocol from the menu on the home
        page.
      </li>
      <li>
        Follow the step-by-step visualizations to understand the encryption and
        decryption processes.
      </li>
      <li>
        Interact with the visualizations by providing inputs, adjusting
        parameters, or clicking on elements to explore the concepts further.
      </li>
      <li>
        Read the accompanying explanations and mathematical formulas to gain a
        deeper understanding of the underlying principles.
      </li>
    </ol>
    <h2 id="primitives">Cryptographic Primitives</h2>
    <h3 id="keyless">Keyless Primitives</h3>
    <ul>
      <li>
        <strong>Simple Hash Function</strong>: A basic hash function that
        demonstrates the concept of hashing.
      </li>
      <li>
        <strong>SHA-256 Hash</strong>: A widely used cryptographic hash function
        that produces a 256-bit hash value.
      </li>
      <li>
        <strong>True Random Number Generator</strong>: A visualization of
        generating truly random numbers using physical processes.
      </li>
    </ul>
    <h3 id="symmetric">Symmetric Key Primitives</h3>
    <ul>
      <li>
        <strong>Caesar Cipher</strong>: A simple substitution cipher that shifts
        each letter by a fixed number of positions.
      </li>
      <li>
        <strong>Vigenère Cipher</strong>: A polyalphabetic substitution cipher
        that uses a keyword to encrypt the plaintext.
      </li>
      <li>
        <strong>Linear Congruential Generator</strong>: A pseudorandom number
        generator based on a linear recurrence relation.
      </li>
    </ul>
    <h3 id="asymmetric">Asymmetric Primitives</h3>
    <ul>
      <li>
        <strong>RSA</strong>: A widely used asymmetric encryption algorithm
        based on the difficulty of factoring large numbers.
      </li>
    </ul>
    <h2 id="contributing">Contributing</h2>
    <p>
      Contributions to the Interactive Cryptography Visualization application
      are welcome! If you find any issues or have suggestions for improvements,
      please submit an issue or pull request on the
      <a href="https://github.com/AmoghSaxena/groove"
        >GitHub repository</a
      >.
    </p>
    <h2 id="license">License</h2>
    <p>
      This project is licensed under the
      <a href="https://opensource.org/licenses/MIT">MIT License</a>.
    </p>
