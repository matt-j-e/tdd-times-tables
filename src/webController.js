// const Session = require("./session");

class WebController {

  session;
  workspace;
  questionElement;
  answerElement;
  end;

  constructor(session) {
    this.session = session;
    this.questionElement = document.querySelector(".question");
    this.answerElement = document.querySelector("#answer");
    this.startButton = document.querySelector(".start");
    this.startButton.addEventListener("click", () => {
      this.play();
    });
    this.workspace = document.querySelector(".workspace");
    this.workspace.classList.toggle("hidden");
    this.workspace.addEventListener("submit", (e) => {
      this.saveAttempt(e);
    });
    this.resultElement = document.querySelector(".result");
    this.resultElement.classList.toggle("hidden");
    this.restartButton = document.querySelector(".restart");
    this.restartButton.classList.toggle("hidden");
    this.restartButton.addEventListener("click", () => {
      location.reload();
    })
  }

  play() {
    this.workspace.classList.toggle("hidden");
    this.clearAnswerBox();
    const now = Date.now();
    this.end = now + 30000;
    console.log("End: ", this.end);
    this.startButton.classList.toggle("hidden");
    this.displayNewProblem();
  }

  clearAnswerBox() {
    this.answerElement.value = "";
  }

  displayNewProblem() {
    this.clearAnswerBox();
    this.answerElement.focus();
    this.questionElement.innerHTML = this.session.displayNewProblem();
  }

  saveAttempt(e) {
    e.preventDefault();
    this.session.saveAttempt(
      this.session.currentProblem.factorA,
      this.session.currentProblem.factorB,
      Number(e.target[0].value));
    if (Date.now() < this.end) {
      this.displayNewProblem();
    } else {
      this.showResult();
    }
  }

  showResult() {
    this.workspace.classList.toggle("hidden");
    this.resultElement.classList.toggle("hidden");
    this.restartButton.classList.toggle("hidden");
    const result = this.session.progressSoFar();
    this.resultElement.innerHTML = result;
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = WebController;
} else {
  window.Port = WebController;
}