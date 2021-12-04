const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const process_repo_links = require('./repo_page');

const url = 'https://github.com/topics';
const homeURL = 'https://github.com';

request(url, function (err, response, html) {
    if (err) {
        console.log(err);
    } else if (response.statusCode == 404) {
        console.log(`Page (${url}) not found`);
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

        let topicName = topicLink.split('/').pop();
        let topicDirectory = path.join(__dirname, 'topics', topicName);
        if (fs.existsSync(topicDirectory) == false) {
            fs.mkdirSync(topicDirectory, { recursive: true });
        }

        let fullLink = homeURL + topicLink;
        request(fullLink, function (err, response, html) {
            if (err) {
                console.log(err);
            } else if (response.statusCode == 404) {
                console.log(`Topic page (${fullLink}) not found`);
            } else {
                process_repo_links(html, topicDirectory);
            }
        });
    }
}
