const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

const url = 'https://github.com/topics';

request(url, function (err, response, html) {
    if (err) {
        console.log(err);
    } else {
        process_topic_page(html);
    }
});

function process_topic_page(html) {
    let $ = cheerio.load(html);

    // get all topic anchor elements
    let topicAnchors = $('.topic-box > a');

    // process all three topics
    for (let i = 0; i < topicAnchors.length; i++) {
        let topicLink = $(topicAnchors[i]).attr('href');

        let topicName = topicLink.split('/').slice(-1)[0];
        let topicDirectory = path.join(__dirname, 'topics', topicName);
        if (fs.existsSync(topicDirectory) == false) {
            fs.mkdirSync(topicDirectory, { recursive: true });
        }

        let fullLink = 'https://github.com' + topicLink;
        request(fullLink, function (err, response, html) {
            if (err) {
                console.log(err);
            } else {
                process_repo_links(html, topicDirectory);
            }
        });
    }
}

function process_repo_links(html, topicDirectory) {
    let $ = cheerio.load(html);

    // get all repo anchors
    let repoAnchors = $('article a.text-bold');

    // use only 8 of them to fetch the issues
    for (let i = 0; i < 8; i++) {
        let repoLink = $(repoAnchors[i]).attr('href');
        let fullRepoLink = 'https://github.com' + repoLink;
        request(fullRepoLink, function (err, response, html) {
            if (err) {
                console.log(err);
            } else {
                // to do
            }
        });
    }
}
