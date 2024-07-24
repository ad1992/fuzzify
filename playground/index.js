"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../src/index");

function performSearch() {
    const query = document.getElementById("searchInput").textContent;
    const results = (0, index_1.fuzzySearch)(query, movies);
    displayResults(query, results);
}
function displayResults(query, results) {
    const resultsList = document.getElementById("resultsList");
    resultsList.innerHTML = "";
    results.forEach((result) => {
        const item = document.createElement("li");
        const { text } = result;
        let highlightedTitle = "";
        const charCount = new Array(26).fill(0);
        for (let i = 0; i < text.length; i++) {
            const charCode = query.charAt(i).charCodeAt(0) - 97;
            if (charCount[charCode] === 0) {
                charCount[charCode]++;
            }
        }
        for (let i = 0; i < query.length; i++) {
            const charCode = query.charAt(i).charCodeAt(0) - 97;
            if (charCount[charCode] === 1) {
                charCount[charCode]++;
            }
        }
        for (let i = 0; i < charCount.length; i++) {
            if (charCount[i] === 2) {
                highlightedTitle += `<span class="highlight">${String.fromCharCode(i + 97)}</span>`;
            }
            else {
                highlightedTitle += highlightedTitle.substring(i, i + 1);
            }
        }
        item.innerHTML = highlightedTitle;
        resultsList.appendChild(item);
    });
}
