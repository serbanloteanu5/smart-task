/* 
Filename: ComplexCalculator.js
Description: A complex calculator that performs a variety of mathematical operations on complex numbers.
*/

// Complex number class
class Complex {
  constructor(real, imaginary) {
    this.real = real;
    this.imaginary = imaginary;
  }

  add(complex) {
    this.real += complex.real;
    this.imaginary += complex.imaginary;
    return this;
  }

  subtract(complex) {
    this.real -= complex.real;
    this.imaginary -= complex.imaginary;
    return this;
  }

  multiply(complex) {
    const realPart = this.real * complex.real - this.imaginary * complex.imaginary;
    const imaginaryPart = this.real * complex.imaginary + this.imaginary * complex.real;
    this.real = realPart;
    this.imaginary = imaginaryPart;
    return this;
  }

  divide(complex) {
    const denominator = complex.real * complex.real + complex.imaginary * complex.imaginary;
    const realPart = (this.real * complex.real + this.imaginary * complex.imaginary) / denominator;
    const imaginaryPart = (this.imaginary * complex.real - this.real * complex.imaginary) / denominator;
    this.real = realPart;
    this.imaginary = imaginaryPart;
    return this;
  }

  getMagnitude() {
    return Math.sqrt(this.real * this.real + this.imaginary * this.imaginary);
  }

  getPhase() {
    return Math.atan2(this.imaginary, this.real);
  }

  toString() {
    return `${this.real} + ${this.imaginary}i`;
  }
}

// Helper functions
function generateRandomComplexNumber() {
  const real = Math.random() * 10 - 5; // Random real number between -5 and 5
  const imaginary = Math.random() * 10 - 5; // Random imaginary number between -5 and 5
  return new Complex(real, imaginary);
}

function performComplexOperations() {
  const complex1 = generateRandomComplexNumber();
  const complex2 = generateRandomComplexNumber();

  console.log("Complex Number 1: ", complex1.toString());
  console.log("Complex Number 2: ", complex2.toString());

  complex1.add(complex2);
  console.log("Addition Result: ", complex1.toString());

  complex1.subtract(complex2);
  console.log("Subtraction Result: ", complex1.toString());

  complex1.multiply(complex2);
  console.log("Multiplication Result: ", complex1.toString());

  complex1.divide(complex2);
  console.log("Division Result: ", complex1.toString());

  console.log("Magnitude of Complex Number 1: ", complex1.getMagnitude());
  console.log("Phase of Complex Number 2: ", complex2.getPhase());
}

// Main program
console.log("Performing Complex Operations:");
performComplexOperations();