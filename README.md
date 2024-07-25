# fuzzify

A tiny lightweight library for Fuzzy Search.

## Why

I made this library as a result of learning about [Levenshtein](https://en.wikipedia.org/wiki/Levenshtein_distance) algorithm to calculate minimum number of edits required transform one word to another.

> [!NOTE]  
> Note: The library is at a very early stage, if you want to
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
import Fuzy from "fuzzify";

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

`includeMatches` - Determines whether the `indices` at which characters matche should be returned in the response.

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

Please open an [issue](https://github.com/ad1992/fuzzify/issues) so we can start discussing. Any help to improve the library is welcome :).
