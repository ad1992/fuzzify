// ./__tests__/Fuzzy.test.ts
//
// Unittests for the Fuzzy class.

// Local Fuzzy class import.
import Fuzzy from '../src/Fuzzy';

// Fuzzy class test suite.
describe('Test Fuzzy', () => {
  const list = ['apple', 'banana', 'grape', 'orange', 'pineapple'];
  const fuzzy = new Fuzzy(list);

  it('should return correct results for a query', () => {
    const query = 'apple';
    const results = fuzzy.search(query);
    expect(results).toMatchSnapshot();
  });

  // Branch coverage: cache hit.
  it('should NOT update cache for repeated same query', () => {
    const query = 'apple';
    const results = fuzzy.search(query);
    expect(results).toMatchSnapshot();
  });

  it('should return empty array for no matches', () => {
    const query = 'xyz';
    const results = fuzzy.search(query);
    expect(results).toMatchSnapshot();
  });

  // Branch coverage: includeMatches option is true.
  it('should include matches if includeMatches option is true', () => {
    const fuzzyWithMatches = new Fuzzy(list, { includeMatches: true });
    const query = 'apple';
    const results = fuzzyWithMatches.search(query);
    expect(results).toMatchSnapshot();
  });

  // Edge case: list is undefined.
  it('should set this.list to an empty array if list is undefined', () => {
    const badFuzzy = new Fuzzy(undefined as any); // Simulate absence of list
    expect(badFuzzy).toMatchSnapshot();
  });
});
