"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../src/index");
const movies = [
    "3 Idiots",
    "Dangal",
    "PK",
    "Lagaan",
    "Taare Zameen Par",
    "Zindagi Na Milegi Dobara",
    "Dilwale Dulhania Le Jayenge",
    "Sholay",
    "Kuch Kuch Hota Hai",
    "Dil Chahta Hai",
    "Kabhi Khushi Kabhie Gham",
    "Swades",
    "Barfi!",
    "Queen",
    "Bajrangi Bhaijaan",
    "Gully Boy",
    "Padmaavat",
    "Sanju",
    "Andhadhun",
    "Bahubali: The Beginning",
    "Bahubali: The Conclusion",
    "Chak De! India",
    "My Name is Khan",
    "Kal Ho Naa Ho",
    "Munna Bhai M.B.B.S.",
    "Jab We Met",
    "Piku",
    "Devdas",
    "Black",
    "Drishyam",
    "Tanu Weds Manu",
    "Article 15",
    "Raazi",
    "A Wednesday",
    "Bhaag Milkha Bhaag",
    "Paan Singh Tomar",
    "Udta Punjab",
    "Dear Zindagi",
    "Golmaal",
    "Don",
    "Kabir Singh",
    "War",
    "Kesari",
    "Chhichhore",
    "Simmba",
    "Stree",
    "Pink",
    "Badhaai Ho",
    "URI: The Surgical Strike",
    "Dhoom",
    "Gunday",
    "Mardaani",
    "Hum Aapke Hain Koun",
    "Koi... Mil Gaya",
    "Krrish",
    "Krrish 3",
    "Bang Bang!",
    "Happy New Year",
    "Fan",
    "Chennai Express",
    "Raees",
    "Sultan",
    "Ek Tha Tiger",
    "Tiger Zinda Hai",
    "Dabangg",
    "Dabangg 2",
    "Dabangg 3",
    "Kick",
    "Bajrangi Bhaijaan",
    "Tubelight",
    "Race 3",
    "Bhootnath",
    "Bhootnath Returns",
    "Parmanu: The Story of Pokhran",
    "Madras Cafe",
    "Vicky Donor",
    "Shubh Mangal Saavdhan",
    "Bala",
    "Dum Laga Ke Haisha",
    "Badla",
    "Hichki",
    "Mulk",
    "Article 15",
    "Thappad",
    "Ludo",
    "The Sky Is Pink",
    "October",
    "Pati Patni Aur Woh",
    "Chhalaang",
    "Super 30",
    "Kesari",
    "Zero",
    "Bharat",
    "Satyameva Jayate",
    "Batla House",
    "Parmanu: The Story of Pokhran",
    "Sardar Udham",
];
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
        let lastIndex = 0;
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
