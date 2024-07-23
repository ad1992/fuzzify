interface Options {
  includeIndicies?: boolean;
}
export type Result = Array<{
  text: string;
  count: number;
  matches?: number[][];
}>;

class Fuzy {
  list: Array<string>;
  options: Options;

  constructor(list: Array<string>, options?: Options) {
    this.list = list || [];
    this.options = options || {};
  }

  levenshteinFullMatrixSearch = (str1: string, str2: string) => {
    const dp = new Array(str1.length + 1)
      .fill(0)
      .map(() => new Array(str2.length + 1).fill(0));

    for (let j = 0; j <= str1.length; j++) {
      dp[j][0] = j;
    }
    for (let k = 0; k <= str2.length; k++) {
      dp[0][k] = k;
    }
    for (let j = 1; j <= str1.length; j++) {
      for (let k = 1; k <= str2.length; k++) {
        if (str1[j - 1] === str2[k - 1]) {
          dp[j][k] = dp[j - 1][k - 1];
        } else {
          dp[j][k] = Math.min(dp[j][k - 1], dp[j - 1][k], dp[j - 1][k - 1]) + 1;
        }
      }
    }
    return dp;
  };

  getMatchingIndices = (
    matrix: Array<string>[],
    str1: string,
    str2: string
  ) => {
    const matches = [];
    let i = str1.length;
    let j = str2.length;

    while (i > 0 && j > 0) {
      console.log(str1[i - 1], str2[j - 1]);
      console.log(matrix[i - 1][j], matrix[i][j - 1]);
      if (str1[i - 1] === str2[j - 1]) {
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

  search = (str: string) => {
    const result: Result = [];
    for (let i = 0; i < this.list.length; i++) {
      const matrix = this.levenshteinFullMatrixSearch(
        str.toLowerCase(),
        this.list[i].toLowerCase()
      );
      const matches = this.getMatchingIndices(
        matrix,
        str.toLowerCase(),
        this.list[i].toLowerCase()
      );
      const key = this.list[i];
      result[i] = {
        text: key,
        count: matrix[str.length][this.list[i].length],
        matches,
      };
      console.debug(
        `${str} ----> ${key} needs minimum ${result[i].count} operations and has matches at ${matches}`
      );
    }
    result.sort((x, y) => {
      return y.matches!.length - x.matches!.length;
    });

    return result.filter((res) => {
      return res.count !== res.text.length;
    });
  };
}
export default Fuzy;
