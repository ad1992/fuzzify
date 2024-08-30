import Fuzzy from "../src/Fuzzy";

describe("Test Fuzzy", () => {
  const list = ["apple", "banana", "grape", "orange", "pineapple"];
  const fuzzy = new Fuzzy(list);

  it("should return correct results for a query", () => {
    const query = "apple";
    const results = fuzzy.search(query);
    expect(results).toMatchInlineSnapshot(`
      [
        {
          "distance": 0,
          "text": "apple",
        },
        {
          "distance": 4,
          "text": "pineapple",
        },
        {
          "distance": 5,
          "text": "orange",
        },
        {
          "distance": 5,
          "text": "banana",
        },
      ]
    `);
  });

  it('should return correct results when "caseSensitive" option is true', () => {
    const fuzzy = new Fuzzy(list, { caseSensitive: true });
    const query = 'Apple';
    const results = fuzzy.search(query);

    // The Distance is updated since the query is caseSensitive
    expect(results).toMatchInlineSnapshot(`
      [
        {
          "distance": 1,
          "text": "apple",
        },
        {
          "distance": 5,
          "text": "pineapple",
        },
        {
          "distance": 5,
          "text": "orange",
        },
      ]
    `);
  });

  it("should return empty array for no matches", () => {
    const query = "xyz";
    const results = fuzzy.search(query);
    expect(results).toMatchInlineSnapshot(`[]`);
  });

  // Branch coverage: includeMatches option is true.
  it("should include matches if includeMatches option is true", () => {
    const fuzzyWithMatches = new Fuzzy(list, { includeMatches: true });
    const query = "apple";
    const results = fuzzyWithMatches.search(query);
    expect(results).toMatchSnapshot();
  });

  // Edge case: list is undefined.
  it("should set this.list to an empty array if list is undefined", () => {
    // Simulate absence of list
    const badFuzzy = new Fuzzy(undefined as any);
    expect(badFuzzy).toMatchInlineSnapshot(`
      Fuzzy {
        "list": [],
        "options": {
          "caseSensitive": false,
          "includeMatches": false,
          "includeScore": false,
        },
        "search": [Function],
      }
    `)
  });

  it("should include score if includeScore option is true", () => {
    const fuzzy = new Fuzzy(list, { includeScore: true });
    const query = "apple";
    const results = fuzzy.search(query);
    expect(results).toMatchInlineSnapshot(`
      [
        {
          "distance": 0,
          "score": 1,
          "text": "apple",
        },
        {
          "distance": 4,
          "score": 0.7777777777777778,
          "text": "pineapple",
        },
        {
          "distance": 5,
          "score": 0.2833333333333333,
          "text": "orange",
        },
        {
          "distance": 5,
          "score": 0.18333333333333332,
          "text": "banana",
        },
      ]
    `)
  })
});
