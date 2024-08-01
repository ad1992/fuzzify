# fuzzify

A tiny lightweight library for Fuzzy Search.

## Why

I made this library as a result of learning about [Levenshtein Distance](https://en.wikipedia.org/wiki/Levenshtein_distance) algorithm to calculate minimum number of single-character edits (insertions, deletions or substitutions) required to transform one word to another by [Vladimir Levenshtein](https://en.wikipedia.org/wiki/Vladimir_Levenshtein).

> [!NOTE]  
> Note: The library is at a very early stage so if you want to
> help improve it, please open an [issue](https://github.com/ad1992/fuzzify/issues).

## Installation

with `yarn`

```bash
yarn add fuzzify
```

with `npm`

```bash
npm install fuzzify
```

## Usage

```js
import Fuzzy from "fuzzify";

const countries = [
  "Australia",
  "France",
  "Germany",
  "Hungary",
  "Iceland",
  "India",
  "Israel",
  "Italy",
  "Japan",
  "Malawi",
  "Malaysia",
  "Maldives",
];
const fuzzy = new Fuzzy(countries);

const query = "ala";
const results = fuzzy.search(query);

console.log("RESULTS", results);
```

The `search` API gives approximate matched strings with the passed query in the below format.

| Attributes | Description                                                                                                        |
| ---------- | ------------------------------------------------------------------------------------------------------------------ |
| text       | The target string against which the query is matched                                                                   |
| distance   | The minimum number of edits (Insertion / Deletion / Substitutions) required to transform the query to target text. |

```js
[
  {
    text: "Malawi",
    distance: 3,
  },
  {
    text: "Malaysia",
    distance: 5,
  },
  {
    text: "Australia",
    distance: 6,
  },
  {
    text: "Italy",
    distance: 3,
  },
  {
    text: "Japan",
    distance: 3,
  },
  {
    text: "Iceland",
    distance: 5,
  },
  {
    text: "Maldives",
    distance: 6,
  },
  {
    text: "Israel",
    distance: 5,
  },
  {
    text: "India",
    distance: 4,
  },
  {
    text: "France",
    distance: 5,
  },
  {
    text: "Germany",
    distance: 6,
  },
  {
    text: "Hungary",
    distance: 6,
  },
];
```

## Options

### `includeMatches`

`includeMatches` - Determines whether the `indices` at which characters matche should be returned in the response. Each `match` element consists of two indices -

1. The index of query string where match is found.
2. The index of target string where a match is found.

Example :point_down:

```js
query = "ala", target string = "Australia"
matches: [
  [0, 5],
  [1, 6],
  [2, 8],
],
```

In the above example :point_down: matches are found

1. character `a` at `0th` index in `ala` matches with characater `a` at `5th` index in `Australia`
2. character `l` at `1st` index in `ala` matches with characater `a` at `6th` index in `Australia`
3. character `a` at `2nd` index in `ala` matches with characater `a` at `8th` index in `Australia`

The complete response would be :point_down:

```js
[
  {
    text: "Malawi",
    distance: 3,
    matches: [
      [0, 1],
      [1, 2],
      [2, 3],
    ],
  },
  {
    text: "Malaysia",
    distance: 5,
    matches: [
      [0, 1],
      [1, 2],
      [2, 7],
    ],
  },
  {
    text: "Australia",
    distance: 6,
    matches: [
      [0, 5],
      [1, 6],
      [2, 8],
    ],
  },
  {
    text: "Italy",
    distance: 3,
    matches: [
      [0, 2],
      [1, 3],
    ],
  },
  {
    text: "Japan",
    distance: 3,
    matches: [
      [0, 1],
      [2, 3],
    ],
  },
  {
    text: "Iceland",
    distance: 5,
    matches: [
      [1, 3],
      [2, 4],
    ],
  },
  {
    text: "Maldives",
    distance: 6,
    matches: [
      [0, 1],
      [1, 2],
    ],
  },
  {
    text: "Israel",
    distance: 5,
    matches: [
      [0, 3],
      [1, 5],
    ],
  },
  {
    text: "India",
    distance: 4,
    matches: [[2, 4]],
  },
  {
    text: "France",
    distance: 5,
    matches: [[2, 2]],
  },
  {
    text: "Germany",
    distance: 6,
    matches: [[2, 4]],
  },
  {
    text: "Hungary",
    distance: 6,
    matches: [[2, 4]],
  },
];
```

### `includeScore`

Determines whether a score should be added in the result. A score of `1` means an exact match, however a score of `0` means
no match and those options are removed from the result.
If you want to get all the options in the result, please open an [issue](https://github.com/ad1992/fuzzy/issues) and let's discuss.


## Live Demo

You can check the demo [here](https://fuzzify.vercel.app/).

## Set up

Install packages:

```
yarn
```

Start development playground:

```
yarn start
```

Build command:

```
yarn build
```

## Contributing

Please open an [issue](https://github.com/ad1992/fuzzify/issues) so we can start discussing. Any help to improve the library is most welcome :).
