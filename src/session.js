const Attempt = require("./attempt");
const Problem = require("./problem");

class Session {

  problems;
  duration;
  attempts;

  constructor(duration=30) {
    this.problems = [];
    this.attempts = [];
    this.duration = duration * 1000;
  }

  generateProblem() {
    this.problems.push(new Problem());
  }

  displayProblem() {
    const latestProblem = this.problems[this.problems.length - 1];
    return latestProblem.toString();
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
    let result = "Score so far:\n";
    result += correctAnswers + " correct out of " + questions + "\n";
    return result;
  }

}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = Session;
} else {
  window.Port = Session;
}