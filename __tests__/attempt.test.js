const Attempt = require("../src/attempt");

let attempt;

describe("Attempt Object", () => {

  beforeEach(() => {
    const mockFactorA = 1;
    const mockFactorB = 1;
    const mockResponse = 1;
    attempt = new Attempt(mockFactorA, mockFactorB, mockResponse);
  });

  it("can be instantiated", () => {
    expect(attempt).toBeInstanceOf(Object);
  });

  it("has property factorA", () => {
    expect(attempt.factorA).not.toBeUndefined();
  });

  it("has property factorB", () => {
    expect(attempt.factorB).not.toBeUndefined();
  });

  it("has property response", () => {
    expect(attempt.response).not.toBeUndefined();
  });

});

describe("isCorrect", () => {

  it("returns true when response is correct", () => {
    attempt = new Attempt(4,5,20);
    expect(attempt.isCorrect).toBeTruthy();
  });

  it("returns falsr when response is incorrect", () => {
    attempt = new Attempt(4,5,25);
    expect(attempt.isCorrect).toBeFalsy();
  });

});