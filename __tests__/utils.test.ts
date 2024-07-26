// ./__tests__/utils.test.ts
//
// Unittests for the L-Dist utility functions.

// Vitest essentail imports.
import { describe, expect, it } from 'vitest';

// Local utility functions import.
import {
  calculateScore,
  getMatchingIndices,
  getMaxLevenshteinDistance,
  levenshteinFullMatrixSearch,
} from '../src/utils';

// levenshteinFullMatrixSearch test suite.
describe('levenshteinFullMatrixSearch', () => {
  it('returns a matrix of the correct dimensions', () => {
    const query = 'hello';
    const target = 'world';
    const matrix = levenshteinFullMatrixSearch(query, target);
    expect(matrix.length).toBe(query.length + 1);
    expect(matrix[0].length).toBe(target.length + 1);
  });

  it('returns a matrix with the correct values', () => {
    const query = 'hello';
    const target = 'world';
    const matrix = levenshteinFullMatrixSearch(query, target);
    expect(matrix[0][0]).toBe(0);
    expect(matrix[0][1]).toBe(1);
    expect(matrix[1][0]).toBe(1);
    expect(matrix[1][1]).toBe(1);
    expect(matrix[1][2]).toBe(2);
    expect(matrix[5][5]).toBe(4);
  });
});

// getMaxLevenshteinDistance test suite.
describe('getMaxLevenshteinDistance', () => {
  it('returns strictly 3 for short len 0~5 strings', () => {
    expect(getMaxLevenshteinDistance('', '')).toBe(3); // Empty str edge case.
    expect(getMaxLevenshteinDistance('a', '12')).toBe(3); // Routine case.
    expect(getMaxLevenshteinDistance('12345', 'cd')).toBe(3); // Len 5 edge case.
  });

  it('returns strictly 10 for medium len 6~15 strings', () => {
    expect(getMaxLevenshteinDistance('123456', 'hey')).toBe(10); // Len 6 edge case.
    expect(getMaxLevenshteinDistance('hello world', 'world')).toBe(10); // Routine case.
    expect(getMaxLevenshteinDistance('hello world', '123456789012345')).toBe(10); // Len 15 edge case.
  });

  it('returns strictly 15 for long len >=16 strings', () => {
    expect(getMaxLevenshteinDistance('hello world, world hello', '')).toBe(15);
  });
});

// getMatchingIndices test suite.
describe('getMatchingIndices', () => {
  it('returns the correct matching indices', () => {
    const query = 'hello';
    const target = 'world';
    const matrix = levenshteinFullMatrixSearch(query, target);
    const matches = getMatchingIndices(matrix, query, target);
    expect(matches).toEqual([[3, 3]]);
  });
});

// calculateScore test suite.
describe('calculateScore', () => {
  it('returns the correct score when param dist <= max dist', () => {
    const query = 'hello';
    const target = 'world';
    const matrix = levenshteinFullMatrixSearch(query, target);
    const matches = getMatchingIndices(matrix, query, target);
    const score = calculateScore(query, target, matches, 0);
    expect(score).toBe(0.6);
  });

  it('returns strictly 0 when param dist > max dist', () => {
    const query = 'hello';
    const target = 'world';
    const matrix = levenshteinFullMatrixSearch(query, target);
    const matches = getMatchingIndices(matrix, query, target);
    const score = calculateScore(query, target, matches, 9999);
    expect(score).toBe(0);
  });
});