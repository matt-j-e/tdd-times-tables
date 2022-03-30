class Attempt {

  factorA;
  factorB;
  response;
  isCorrect;

  constructor(factorA, factorB, response) {
    this.factorA = factorA;
    this.factorB = factorB;
    this.response = response;
    this.isCorrect = (factorA * factorB) === response;
  }

}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = Attempt;
} else {
  window.Port = Attempt;
}