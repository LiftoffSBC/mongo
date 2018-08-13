var request = require("request");
var cheerio = require("cheerio");

var scrape = function (callback) {

  var articlesArr = [];

  request("https://techcrunch.com/", function (error, response, html) {


    var $ = cheerio.load(html);


    $("header.post-block__header").each(function (i, element) {
      var result = {};

      result.title = $(this).find("a.post-block__title__link").text().trim();
      result.link = $(this).find("a.post-block__title__link").attr("href");
      result.content = $(this).next().text().trim();


      if (result.title !== "" && result.link !== "") {
        articlesArr.push(result);
      }
      console.log(result);
    });
    callback(articlesArr);
  });

};

module.exports = scrape;