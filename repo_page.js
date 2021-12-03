const request = require('request');
const cheerio = require('cheerio');
const extract_issue_links = require('./issue_page');
const homeURL = 'https://github.com';

function process_repo_links(html, topicDirectory) {
    let $ = cheerio.load(html);

    // get all repo anchors
    let repoAnchors = $('article a.text-bold');

    // use only 8 of them to fetch the issues
    for (let i = 0; i < 8; i++) {
        let repoLink = $(repoAnchors[i]).attr('href');
        let repoName = repoLink.split('/').pop();
        let fullIssueLink = `${homeURL}${repoLink}/issues`;
        request(fullIssueLink, function (err, response, html) {
            if (err) {
                console.log(err);
            } else {
                extract_issue_links(html, topicDirectory, repoName);
            }
        });
    }
}

module.exports = process_repo_links;
