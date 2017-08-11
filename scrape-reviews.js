var request = require('request');
var cheerio = require('cheerio')
var fs = require('fs'); //internal
var Nightmare = require('nightmare');





// var arg = process.argv[2];

// scrape(data[parseInt(arg)]);

scrape();

// pass in urlOb to determine which url we are scraping from
function scrape(){
  // console.log(urlOb);
  var scrape = new Nightmare({
          show: false
      })
      // .goto(urlOb.url)
      .goto("https://www.coursereport.com/schools/general-assembly#/reviews")
      .wait(10000)
      .evaluate(function() {
          return document.body.innerHTML;
      }).end().then(function(html) {
        if (html == undefined) {
          console.log('========================');
          console.log('html not there!');
          console.log(arg);
          console.log('========================');
          return;
        }

        var $ = cheerio.load(html);

        var entry = $(".review");
        var text = $(".ratings").children("span", ":before");

        // console.log("lovely", text[0].children[0])


    entry.each(function(reviewId, reviewEntry){

      var review = $(this).children("div");
    
  // ========== REVIEW DATE ========== //
      // children[2] gives us the object inside review that holds review-date information
      var reviewDate = review[0].children[2].children[0].data;
      console.log("review date", reviewDate);

      // children[4] is associated with the .ratings class that holds rating information
      // each .rating class has 3 rows and we skip over the 1st row 
      var rating = review[0].children[4].children.slice(1);

      // console.log("categories", rating.length)

      for (var i = 0; i < rating.length; i++) {


  // ========== RATING CATEGORIES ========== //
  // First row inside .ratings
  // category label for overall exp. and intructors
        var category = rating[i].children[0].children[0].data;
  // Second row inside .ratings
  // category label for cirrculum and job assistance
        var category1 = rating[i].children[2].children[0].data;

        var star = rating[i].children[1];
        var star1 = rating[i].children[3];

          // .children("span icon-full_star", ":before"));
  

          // console.log("category", category)
          // console.log("stars baby", star)
          console.log("category", category1)
          console.log("stars baby", star1.children[0]);

  //    console.log("stars", rating[i].children[1].children[0].children[0]);
  // console.log("category", rating[i].children[2].children[0].data);

      }

      // var stars = $(this).children("span .icon-full_star", ":before") 
      // console.log("stars", stars.children(".icon-full_star").);



      console.log("-------------------------------");

    });

        //skip first row
        // tableRows.slice(1).each(function(i, element) {
        //     var cleanRow = [];

        //     var tds = $(element).children('td');

        //     tds.each(function(tdIndex, td) {
        //       var val = $(this).text().trim();

        //       //if there's a comma in the value then replace it with no comma (otherwise the csv will put 5,200 into two cells instead of one cell)
        //       if (val.indexOf(',') > -1) val = val.replace(',','');
              
        //       cleanRow.push(val);
        //     });

        //     var str = `${cleanRow.join(',')},${urlOb.url},${urlOb.year},${urlOb.season_type},${urlOb.category},${urlOb.last_page}`;

        //     var fileToAppendTo = categOb[urlOb.category];

        //     fs.appendFile(fileToAppendTo, str + "\n", 'utf8', function (err) {
        //       if (err) {
        //         console.log('Some error occured - file either not saved or corrupted file saved.');
        //       } else{
        //         console.log('It\'s saved!');
        //       }
        //     });
        // });
    // });
  });

};
