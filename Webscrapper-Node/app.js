const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

// URL of the page we want to scrape
const url = "https://www.jagranjosh.com/general-knowledge/list-of-indian-satellites-1624957731-1";

// Async function which scrapes the data
async function scrapeData() {
  try {
    // Fetch HTML of the page we want to scrape
    const { data } = await axios.get(url);
    // Load HTML we fetched in the previous line
    const $ = cheerio.load(data);
    // Select all the list items in plainlist class
    const statelites = []
    $("table > tbody > tr").each((index, element) => {


      if (index === 0) return true;
      const tds = $(element).find('td');
      const launch = $(tds[0]).text();
      const name = $(tds[1]).text();
      const desc = $(tds[2]).text();
      const tableRow = { launchYear: launch, name: name, description: desc }
      statelites.push(tableRow);

    });
    fs.writeFile("satelites.json", JSON.stringify(statelites, null, 2), (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("Successfully written data to file");
    });
  } catch (err) {
    console.error(err);
  }
}
// Invoke the above function
scrapeData();