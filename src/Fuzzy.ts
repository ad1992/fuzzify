import {
  calculateScore,
  getMatchingIndices,
  levenshteinFullMatrixSearch,
} from "./utils";

interface Options {
  includeMatches?: boolean;
}
export type SingleResult = {
  text: string;
  distance: number;
  matches?: number[][];
};
export type Result = Array<SingleResult>;

/**
 * Represents a Fuzzy search class.
 */
class Fuzzy {
  /**
   * The list of strings to search within.
   * @type {Array<string>}
   */
  private list: Array<string>;

  /**
   * The options for the fuzzy search.
   * @type {Options}
   */
  private options: Options;

  /**
   * In-memory cache for query results.
   * @type {Object.<string, Result>}
   */
  private cache: { [query: string]: Result };

  constructor(list: Array<string>, options?: Options) {
    this.list    = list || [];
    this.options = options || { includeMatches: false };
    this.cache   = {};
  }

  // Search for the query in the list
  public search = (query: string) => {

    // If incoming query is already cached, return the cached result
    if (this.cache[query]) {
      return this.cache[query];
    }

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
        approxMatches[index] = obj;
      }
    });

    // Cache the result and return.
    this.cache[query] = approxMatches;
    return approxMatches;
  };
}
export default Fuzzy;
