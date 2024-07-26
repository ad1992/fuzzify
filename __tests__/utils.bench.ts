// ./__tests__/utils.bench.ts
//
// Benchmarks for the L-Dist utility functions.

// Vitest essentail imports.
import { bench } from 'vitest';

// Local utility functions import.
import {
  calculateScore,
  getMatchingIndices,
  getMaxLevenshteinDistance,
  levenshteinFullMatrixSearch,
} from '../src/utils';

// Helper function to generate random pairs
function getRandomPairs(
  arr     : string[],
  numPairs: number
) : [string, string][] {

  const pairs: [string, string][] = [];
  for (let i = 0; i < numPairs; i++) {
    const firstIndex = Math.floor(Math.random() * arr.length);
    const secondIndex = Math.floor(Math.random() * arr.length);
    pairs.push([arr[firstIndex], arr[secondIndex]]);
  }
  return pairs;
}
// Copied from ./playground/countries.ts
const countries = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda",
  "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas",
  "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin",
  "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei",
  "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon",
  "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia",
  "Comoros", "Congo, Democratic Republic of the", "Congo, Republic of the",
  "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark",
  "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt",
];
const randomPairs = getRandomPairs(countries, 1000);

bench('levenshteinFullMatrixSearch', () => {
  for (const [query, target] of randomPairs) {
    levenshteinFullMatrixSearch(query, target);
  }
});

bench('getMaxLevenshteinDistance', () => {
  for (const [query, target] of randomPairs) {
    getMaxLevenshteinDistance(query, target);
  }
});

bench('getMatchingIndices', () => {
  for (const [query, target] of randomPairs) {
    const matrix = levenshteinFullMatrixSearch(query, target);
    getMatchingIndices(matrix, query, target);
  }
});

bench('calculateScore', () => {
  for (const [query, target] of randomPairs) {
    const matrix = levenshteinFullMatrixSearch(query, target);
    const matches = getMatchingIndices(matrix, query, target);
    const distance = matrix[query.length][target.length];
    calculateScore(query, target, matches, distance);
  }
});
