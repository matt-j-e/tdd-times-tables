const Problem = require("../src/problem");

const problem = new Problem();

describe("Problem Object", () => {
  it("can be instantiated", () => {
    expect(problem).toBeInstanceOf(Object);
  });

  it("has property factorA", () => {
    expect(problem.factorA).not.toBeUndefined();
  });

  it("has property factorB", () => {
    expect(problem.factorB).not.toBeUndefined();
  });
});

describe("generate factor", () => {
  it("generates a random integer between 1 and 12 inclusive", () => {
    const factor = problem.generateFactor();
    expect(factor).toBeGreaterThan(0);
    expect(factor).toBeLessThan(13);
  });
});

describe("toString()", () => {
  it("returns a correctly formatted multiplication problem using factorA & factorB", () => {
    problem.factorA = 6;
    problem.factorB = 8;
    expect(problem.toString()).toBe("6 x 8 = ");
  });
});