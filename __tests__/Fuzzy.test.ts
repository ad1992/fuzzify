// ./__tests__/Fuzzy.test.ts
//
// Unittests for the Fuzzy class.

// Vitest essential imports.
import { describe, expect, it } from 'vitest';

// Local Fuzzy class import.
import Fuzzy from '../src/Fuzzy';

// Fuzzy class test suite.
describe('Fuzzy', () => {
  const list = ['apple', 'banana', 'grape', 'orange', 'pineapple'];
  const fuzzy = new Fuzzy(list);

  it('returns correct results for a query', () => {
    const query = 'apple';
    const results = fuzzy.search(query);

    expect(results).toBeInstanceOf(Array);
    expect(results.length).toBeGreaterThan(0);

    const firstResult = results[0];
    expect(firstResult.text).toBe('apple');
    expect(firstResult.distance).toBe(0);
  });

  it('includes matches if includeMatches option is true', () => {
    const fuzzyWithMatches = new Fuzzy(list, { includeMatches: true });
    const query = 'apple';
    const results = fuzzyWithMatches.search(query);

    expect(results).toBeInstanceOf(Array);
    expect(results.length).toBeGreaterThan(0);

    const firstResult = results[0];
    expect(firstResult.text).toBe('apple');
    expect(firstResult.distance).toBe(0);

    expect(firstResult.matches).toBeDefined();
  });

  it('returns empty array for no matches', () => {
    const query = 'xyz';
    const results = fuzzy.search(query);

    expect(results).toBeInstanceOf(Array);
    expect(results.length).toBe(0);
  });
});
