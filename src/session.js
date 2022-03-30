// const Attempt = require("./attempt");
// const Problem = require("./problem");

class Session {

  currentProblem;
  duration;
  attempts;

  constructor(duration=30) {
    this.attempts = [];
    this.duration = duration;
  }

  displayNewProblem() {
    this.currentProblem = new Problem();
    return this.currentProblem.toString();
  }

  saveAttempt(factorA, factorB, attempt) {
    this.attempts.push(new Attempt(factorA, factorB, attempt));
  }

  progressSoFar() {
    const questions = this.attempts.length;
    const correctAnswers = this.attempts.reduce((tot, a) => {
      if (a.isCorrect) tot++;
      return tot;
    }, 0);
    let result = "You scored:\n";
    result += correctAnswers + " correct out of " + questions + "\n";
    return result;
  }

}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = Session;
} else {
  window.Port = Session;
}