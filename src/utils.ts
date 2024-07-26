// Weights for matching score and normalized distance

const MATCHING_SCORE_WEIGHT = 0.5;
const NORMALIZED_DISTANCE_WEIGHT = 0.5;

// Calculate Levenshtein distance between two strings
export const levenshteinFullMatrixSearch = (query: string, target: string) => {
  const dp = new Array(query.length + 1)
    .fill(0)
    .map(() => new Array(target.length + 1).fill(0));

  for (let j = 0; j <= query.length; j++) {
    dp[j][0] = j;
  }
  for (let k = 0; k <= target.length; k++) {
    dp[0][k] = k;
  }
  for (let j = 1; j <= query.length; j++) {
    for (let k = 1; k <= target.length; k++) {
      if (query[j - 1] === target[k - 1]) {
        dp[j][k] = dp[j - 1][k - 1];
      } else {
        dp[j][k] = Math.min(dp[j][k - 1], dp[j - 1][k], dp[j - 1][k - 1]) + 1;
      }
    }
  }
  return dp;
};

// Set max distance based on the length of the strings
export const getMaxLevenshteinDistance = (query: string, target: string) => {
  const length = Math.max(query.length, target.length);
  if (length <= 5) {
    return 3;
  }
  if (length <= 15) {
    return 10;
  }
  return 15;
};

// Get matching indices from the matrix
export const getMatchingIndices = (
  matrix: Array<string>[],
  query: string,
  target: string
) => {
  const matches = [];
  let i = query.length;
  let j = target.length;

  while (i > 0 && j > 0) {
    if (query[i - 1] === target[j - 1]) {
      matches.unshift([i - 1, j - 1]);
      i--;
      j--;
    } else if (matrix[i - 1][j] > matrix[i][j - 1]) {
      j--;
    } else {
      i--;
    }
  }
  return matches;
};

// Calculate score based on matching score and normalized distance
export const calculateScore = (
  query: string,
  target: string,
  matches: number[][],
  distance: number
) => {
  const maxLevenshteinDistance = getMaxLevenshteinDistance(query, target);

  if (distance > maxLevenshteinDistance) {
    return 0;
  }
  const matchingScore = matches.length / Math.min(target.length, query.length);
  const normalizedDistance = distance / Math.max(query.length, target.length);
  const score =
    NORMALIZED_DISTANCE_WEIGHT * (1 - normalizedDistance) +
    MATCHING_SCORE_WEIGHT * matchingScore;

  return score;
};
