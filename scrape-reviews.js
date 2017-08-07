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
        console.log(entry.length);
        // console.log("oh yes", review[0].childrsen)


        // for (var i = 0; i < review.length; i++) { 
        //     $(review[i])
        //     console.log("oh damn ", i, review[i])
        // }

        // var text = $(".ratings span");

        // console.log("lovely", text[0])



    entry.each(function(reviewId, reviewEntry){

      var review = $(this).children("div");
      // console.log("review", review[2].children[0].data)
  // ======== REVIEW DATE ======== //

      // children[2] gives us the object inside review that holds review-date information
      var reviewDate = review[0].children[2].children[0].data;
      console.log("review date", reviewDate);

      // children[4] is associated with the .ratings class that holds rating information
      var ratingCategories = review[0].children[4].children.slice(1);
      // console.log("test", ratingCategories)

      // console.log("categories", ratingCategories.length)

      for (var i = 0; i < ratingCategories.length; i++) {
          console.log("category", ratingCategories[i].children[0].children[0].data);
          console.log("category", ratingCategories[i].children[2].children[0].data);


      }

        // ratingCategories.each(function(i, category){
        //   // var category = $(category).children[i].children[0].data;
        //   console.log("category", category)

        // })
      // console.log("review", ratingCategories.children[0].children[0].data);
      console.log("-------------------------------");

      	// var stars = $(".ratings text-right");
      	// console.log("stars", stars)

        // var tableRows = $(".ratings")[0]
        // console.log("ratingInfo", tableRows)
        // console.log("1st row", tableRows);
        // tableRows.each(function(i, element) {
 
        	// var tds = $(element).children();
        	// console.log("id", i)
        	// tableRows.each(function(tdIndex, td){
        		// var val = $(this);
        		// console.log("this", val); 

  // ======== RATING CATEGORIES ======== //
        		// var rating = $(this).text().trim();
        		// var stars = $(".ratings row")[0]
        		// console.log("rating", rating)
        		// console.log("stars", stars)
        	// });
        // });
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
