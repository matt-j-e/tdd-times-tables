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
    this.workspace = document.querySelector(".workspace");
    this.resultElement = document.querySelector(".result");
    this.resultsList = document.querySelector(".results");
    this.restartButton = document.querySelector(".restart");
    this.hideElementsAtStartup();
    this.addListeners();
  }

  hideElementsAtStartup() {
    this.workspace.classList.toggle("hidden");
    this.resultElement.classList.toggle("hidden");
    this.resultsList.classList.toggle("hidden");
    this.restartButton.classList.toggle("hidden");
  }

  addListeners() {
    this.startButton.addEventListener("click", () => {
      this.play();
    });
    this.workspace.addEventListener("submit", (e) => {
      this.saveAttempt(e);
    });
    this.restartButton.addEventListener("click", () => {
      location.reload();
    });
  }

  play() {
    this.workspace.classList.toggle("hidden");
    this.clearAnswerBox();
    this.setEndTime();
    this.startButton.classList.toggle("hidden");
    this.displayNewProblem();
  }

  clearAnswerBox() {
    this.answerElement.value = "";
  }

  setEndTime() {
    this.end = Date.now() + this.session.duration * 1000;
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
    this.buildResultsList();
    this.resultsList.classList.toggle("hidden");
  }

  buildResultsList() {
    const results = this.session.attempts;
    results.map(result => {
      const li = document.createElement("li");
      li.innerHTML = `${result.factorA} x ${result.factorB} = ${result.response}`;
      // result.isCorrect ? li.classList.add("correct") : li.classList.add("incorrect");
      if (result.isCorrect) {
        li.classList.add("correct");
      } else {
        li.classList.add("incorrect");
        li.innerHTML += ` (${result.factorA * result.factorB})`;
      }
      this.resultsList.append(li);
    })
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = WebController;
} else {
  window.Port = WebController;
}