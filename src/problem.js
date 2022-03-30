class Problem {

  factorA;
  factorB;

  constructor() {
    this.factorA = this.generateFactor();
    this.factorB = this.generateFactor();
  }

  generateFactor() {
    return Math.ceil(Math.random() * 12);
  }

  toString() {
    return `${this.factorA} x ${this.factorB} = `;
  }

}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = Problem;
} else {
  window.Port = Problem;
}