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

  it("has a currentProblem property which is undefined", () => {
    expect(session.currentProblem).toBeUndefined();
  });

  it("has an attempts property which is an empty array", () => {
    expect(session.attempts).toBeInstanceOf(Array);
    expect(session.attempts).toHaveLength(0);
  });

  it("has a duration property with a default setting of 30", () => {
    expect(session.duration).toBe(30);
  });

});

describe("displayNewProblem", () => {
  it("displays a new problem's toString value", () => {
    const mockToString = jest.fn();
    Problem.prototype.toString = mockToString;
    mockToString.mockReturnValue("6 x 4 = ");
    session.currentProblem = new Problem();
    expect(session.displayNewProblem()).toBe("6 x 4 = ");
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
    expect(session.progressSoFar()).toBe("You scored:\n1 correct out of 2\n");
  })
});