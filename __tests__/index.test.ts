// ./__tests__/index.test.ts
//
// Integration test for the package entrypoint.

import Fuzzy from "../src/Fuzzy";
import * as IndexExport from "../src/index";

describe("Package entrypoint", () => {
  it("should correctly export the Fuzzy class", () => {
    expect(IndexExport.default).toBe(Fuzzy);
  });
});
