const request = require('request');
const cheerio = require('cheerio');

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
        let fullLink = 'https://github.com' + topicLink;
        process_topic_link(fullLink);
    }
}

function process_topic_link(url) {
    // to do
}
