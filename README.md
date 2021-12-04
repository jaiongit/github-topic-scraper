### About the Project

This is a Web Scaper that stores the urls of issues of top 8 repositories on a certain GitHub topic. This is done for 3 random topics given [here](https://github.com/topics/).

### Prerequisites

This project uses `request`, `cheerio` and `pdfkit` NPM packages. Follow the installation instructions to successfully run the project.

### Installation
1. Clone the repository
    ```
    git clone https://github.com/jaiongit/github-topic-scraper.git
    ```
2. Change the directory and install packages from NPM
    ```
    cd github-topic-scraper
    npm install
    ```

##### Execute the following command within the project folder to save all the issue links to PDF file:
```
node .
```

This will save 8 repository named PDF files each containing issue links (extracted from first page of a repository's issue page) for 3 topics. These PDF files are stored within respective topic folders and these topic folders are stored inside a folder named "topics" created within project's folder.
