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

class Fuzzy {
  private list: Array<string>;
  private options: Options;

  constructor(list: Array<string>, options?: Options) {
    this.list = list || [];
    this.options = options || {
      includeMatches: false,
    };
  }

  // Search for the query in the list
  public search = (query: string) => {
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
    return approxMatches;
  };
}
export default Fuzzy;
