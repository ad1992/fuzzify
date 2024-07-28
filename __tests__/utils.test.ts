// ./__tests__/utils.test.ts
//
// Unittests for the L-Dist utility functions.

// Local utility functions import.
import {
  calculateScore,
  getMatchingIndices,
  getMaxLevenshteinDistance,
  levenshteinFullMatrixSearch,
} from '../src/utils';

// levenshteinFullMatrixSearch test suite.
describe('levenshteinFullMatrixSearch', () => {
  it('should return a matrix of the correct dimensions', () => {
    const query = 'hello';
    const target = 'world';
    const matrix = levenshteinFullMatrixSearch(query, target);
    expect(matrix).toMatchSnapshot();
  });

  it('should return a matrix with the correct values', () => {
    const query = 'hello';
    const target = 'world';
    const matrix = levenshteinFullMatrixSearch(query, target);
    expect(matrix).toMatchSnapshot();
  });
});

// getMaxLevenshteinDistance test suite.
describe('getMaxLevenshteinDistance', () => {
  it('should return strictly 3 for short len 0~5 strings', () => {
    expect(getMaxLevenshteinDistance('', '')).toBe(3); // Empty str edge case.
    expect(getMaxLevenshteinDistance('a', '12')).toBe(3); // Routine case.
    expect(getMaxLevenshteinDistance('12345', 'cd')).toBe(3); // Len 5 edge case.
  });

  it('should return strictly 10 for medium len 6~15 strings', () => {
    expect(getMaxLevenshteinDistance('123456', 'hey')).toBe(10); // Len 6 edge case.
    expect(getMaxLevenshteinDistance('hello world', 'world')).toBe(10); // Routine case.
    expect(getMaxLevenshteinDistance('hello world', '123456789012345')).toBe(10); // Len 15 edge case.
  });

  it('should return strictly 15 for long len >=16 strings', () => {
    expect(getMaxLevenshteinDistance('hello world, world hello', '')).toBe(15);
  });
});

// getMatchingIndices test suite.
describe('getMatchingIndices', () => {
  it('should return the correct matching indices', () => {
    const query = 'hello';
    const target = 'world';
    const matrix = levenshteinFullMatrixSearch(query, target);
    const matches = getMatchingIndices(matrix, query, target);
    expect(matches).toMatchSnapshot();
  });
});

// calculateScore test suite.
describe('calculateScore', () => {
  it('should return the correct score when param dist <= max dist', () => {
    const query = 'hello';
    const target = 'world';
    const matrix = levenshteinFullMatrixSearch(query, target);
    const matches = getMatchingIndices(matrix, query, target);
    const score = calculateScore(query, target, matches, 0);
    expect(score).toBe(0.6);
  });

  it('should return strictly 0 when param dist > max dist', () => {
    const query = 'hello';
    const target = 'world';
    const matrix = levenshteinFullMatrixSearch(query, target);
    const matches = getMatchingIndices(matrix, query, target);
    const score = calculateScore(query, target, matches, 9999);
    expect(score).toBe(0);
  });
});