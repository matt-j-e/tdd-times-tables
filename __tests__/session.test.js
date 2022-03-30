const Session = require("../src/session");
const Problem = require("../src/problem");
jest.mock("../src/problem");
const Attempt = require("../src/attempt");
jest.mock("../src/attempt");

let session;

beforeEach(() => {
  session = new Session();
  Problem.mockClear();
})

describe("Session Object", () => {
  it("can be instantiated", () => {
    expect(session).toBeInstanceOf(Object);
  });

  it("has a problems property which is an empty array", () => {
    expect(session.problems).toBeInstanceOf(Array);
    expect(session.problems).toHaveLength(0);
  });

  it("has an attempts property which is an empty array", () => {
    expect(session.attempts).toBeInstanceOf(Array);
    expect(session.attempts).toHaveLength(0);
  });

  it("has a duration property with a default setting of 30", () => {
    expect(session.duration).toBe(30000);
  });

});

describe("generateProblem", () => {
  it("instantiates a new Problem object", () => {
    session.generateProblem();
    expect(Problem).toHaveBeenCalledTimes(1);
  });

  it("adds the new Problem to the problems array", () => {
    session.generateProblem();
    expect(session.problems).toHaveLength(1);
  });
});

describe("displayProblem", () => {
  it("displays the latest problem's toString", () => {
    const mockToString = jest.fn();
    Problem.prototype.toString = mockToString;
    mockToString.mockReturnValue("6 x 4 = ");
    session.problems = [new Problem()];
    expect(session.displayProblem()).toBe("6 x 4 = ");
  });
});

describe("saveAttempt", () => {
  it("instantiates a new Attempt object", () => {
    session.saveAttempt(4,5,20);
    expect(Attempt).toHaveBeenCalledTimes(1);
  });
});

describe("progressSoFar", () => {
  it("returns 1 correct out of 2 for [3,4,12] & [5,6,40]", () => {
    session.attempts.push({isCorrect: true});
    session.attempts.push({isCorrect: false});
    expect(session.progressSoFar()).toBe("Score so far:\n1 correct out of 2\n");
  })
});