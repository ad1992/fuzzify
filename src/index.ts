interface Options {
  includeMatches?: boolean;
}

export type SingleResult = {
  text: string;
  distance: number;
  matches?: number[][];
};
export type Result = Array<SingleResult>;

// Weights for matching score and normalized distance
const MATCHING_SCORE_WEIGHT = 0.5;
const NORMALIZED_DISTANCE_WEIGHT = 0.5;
class Fuzzy {
  private list: Array<string>;
  private options: Options;

  constructor(list: Array<string>, options?: Options) {
    this.list = list || [];
    this.options = options || {
      includeMatches: false,
    };
  }

  // Calculate Levenshtein distance between two strings
  private levenshteinFullMatrixSearch = (query: string, target: string) => {
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

  // Get matching indices from the matrix
  private getMatchingIndices = (
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
  private calculateScore = (
    query: string,
    target: string,
    matches: number[][],
    distance: number
  ) => {
    const matchingScore =
      matches.length / Math.min(target.length, query.length);
    const normalizedDistance = distance / Math.max(query.length, target.length);
    const score =
      NORMALIZED_DISTANCE_WEIGHT * (1 - normalizedDistance) +
      MATCHING_SCORE_WEIGHT * matchingScore;

    return score;
  };

  // Search for the query in the list
  public search = (query: string) => {
    const result: (SingleResult & { score: number })[] = [];
    for (let i = 0; i < this.list.length; i++) {
      const matrix = this.levenshteinFullMatrixSearch(
        query.toLowerCase(),
        this.list[i].toLowerCase()
      );
      const matches = this.getMatchingIndices(
        matrix,
        query.toLowerCase(),
        this.list[i].toLowerCase()
      );
      const target = this.list[i];
      const distance = matrix[query.length][target.length];
      const score = this.calculateScore(query, target, matches, distance);

      result[i] = {
        text: target,
        distance,
        matches,
        score,
      };
    }
    // Sort by score in descending order
    result.sort((x, y) => {
      return y.score - x.score;
    });

    const approxMatches: Result = [];
    result.forEach((res, index) => {
      const obj: SingleResult = { text: res.text, distance: res.distance };
      if (res.score > 0) {
        if (this.options.includeMatches) {
          obj.matches = res.matches;
        }
        approxMatches[index] = obj;
      }
    });
    return approxMatches;
  };
}
export default Fuzzy;
