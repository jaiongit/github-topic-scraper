const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const homeURL = 'https://github.com';

function extract_issue_links(html, topicDirectory) {
    let $ = cheerio.load(html);

    // get all the relative URLs for issues
    let issueAnchors = $('div[aria-label="Issues"] a.Link--primary');

    // save all issues to an array
    let issueLinksArr = [];
    for (let i = 0; i < issueAnchors.length; i++) {
        let issueLink = $(issueAnchors[i]).attr('href');
        issueLinksArr.push(homeURL + issueLink);
    }

    // write to a repo named json file
    let repoName = $('strong > a').text();
    let fileLoc = path.join(topicDirectory, repoName + '.json');
    fs.writeFileSync(fileLoc, JSON.stringify(issueLinksArr));
}

module.exports = extract_issue_links;
