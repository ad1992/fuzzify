import {
  calculateScore,
  getMatchingIndices,
  levenshteinFullMatrixSearch,
} from "./utils";

interface Options {
  /**
   * Whether to include the matching indices in the result.
   */
  includeMatches?: boolean;
  /**
   * Whether to include the score in the result.
   */
  includeScore?: boolean;
}

export type SingleResult = {
  /**
   * The text matched against the query
   */
  text: string;
  /**
   * Represents the distance between the query and the text.
   */
  distance: number;
  /**
   * Represents the indices of the matching characters.
   */
  matches?: number[][];
  /**
   * Represents the score of the match.
   */
  score?: number;
};
export type Result = Array<SingleResult>;

class Fuzzy {
  /**
   * The list of strings to search within.
   */
  private readonly list: Array<string>;

  /**
   * The options for the fuzzy search.
   */
  private options: Options;

  constructor(list: Array<string>, options?: Options) {
    this.list = list || [];
    this.options = options || {
      includeMatches: false,
      includeScore: false,
    };
  }

  /**
   * Search for the query in the list
   * @param {string} query - The query string
   * @returns {Result} - An array of results matching the query
   */
  public search = (query: string): Result => {
    const result: (SingleResult & { score: number })[] = [];
    for (let i = 0; i < this.list.length; i++) {
      const matrix = levenshteinFullMatrixSearch(
        query.toLowerCase(),
        this.list[i].toLowerCase()
      );
      const matches = getMatchingIndices(
        matrix,
        query.toLowerCase(),
        this.list[i].toLowerCase()
      );
      const target = this.list[i];
      const distance = matrix[query.length][target.length];
      const score = calculateScore(query, target, matches, distance);

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
        if (this.options.includeScore) {
          obj.score = res.score
        }
        approxMatches[index] = obj;
      }
    });

    return approxMatches;
  };
}
export default Fuzzy;
