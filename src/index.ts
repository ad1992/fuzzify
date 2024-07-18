export const fuzzySearch = (str: string, list: Array<string>) => {
  const result: Array<{ [text: string]: any }> = [];
  for (let i = 0; i < list.length; i++) {
    const key = list[i];
    result[i] = {
      text: key,
      count: levenshteinFullMatrixSearch(str, list[i]),
    };
    console.debug(
      `${str} ----> ${key} needs minimum ${result[i].count} operations`
    );
  }

  result.sort((x, y) => {
    return Number(x.count) - Number(y.count);
  });
  return result.filter((res) => {
    return res.count !== res.text.length;
  });
};

const levenshteinFullMatrixSearch = (str1: string, str2: string) => {
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
  return dp[str1.length][str2.length];
};
fuzzySearch("kitten", ["kitten", "lit", "sitting", "Hello"]);
