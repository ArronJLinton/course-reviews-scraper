var request = require('request');
var cheerio = require('cheerio')
var fs = require('fs'); //internal
var Nightmare = require('nightmare');



var data = [
  { 'school': 'General Assembly',
    'url': 'https://www.coursereport.com/schools/general-assembly#/reviews'
  },
  {
    'school': 'Hack-Reactor',
    'url': 'https://www.coursereport.com/schools/hack-reactor#/reviews'
  },
  {
    'school': 'Galvanize',
    'url': 'https://www.coursereport.com/schools/galvanize#/reviews'
  },
  {
    'school': 'Flat-Iron',
    'url': 'https://www.coursereport.com/schools/flatiron-school#/reviews'
  }
  ]



var arg = process.argv[2];

scrape(data[parseInt(arg)]);

// scrape();

// pass in urlOb to determine which url we are scraping from
function scrape(urlOb){
  // console.log(urlOb);
  var scrape = new Nightmare({
          show: false
      })
      .goto(urlOb.url)
      // .goto("https://www.coursereport.com/schools/general-assembly#/reviews")
      // .wait(10000)
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

    entry.each(function(reviewId, reviewEntry){

      var review = $(this).children("div");


  // ============================ REVIEW DATE ============================ //

      // children[2] gives us the object inside review that holds review-date information
      var reviewDate = review[0].children[2].children[0].data;
      console.log(reviewDate);

  // ======================= Review Details =========================== //
      
    var reviewDetails = review[0].children[3].children.slice(1);

     for (var z = 0; z < reviewDetails.length; z++) {

        var details = reviewDetails[z].children[0];
        // console.log(details);
        if(details){
          if(details.type == "text"){
            console.log(details.data)
          }else{
            console.log(details.children[0].data)
          }
        }
      }

  // ======================== RATING CATEGORIES/STARS =========================== //

    // children[4] is associated with the .ratings class that holds rating information
    // each .rating class has 3 rows and we skip over the 1st row 
    var rating = review[0].children[4].children.slice(1);
    for (var i = 0; i < rating.length; i++) {  

  // ======= First row inside .ratings ======== //
  // category label for overall exp. and intructors
      var category1 = rating[i].children[0].children[0].data;


      if (rating[i].children[1].children[0].children[0].type == 'tag'){

        var cat1Star1 = rating[i].children[1].children[0];
        var cat1Star2 = cat1Star1.children[0];
        var cat1Star3 = cat1Star2.children[0];
        var cat1Star4 = cat1Star3.children[0];
        var cat1Star5 = cat1Star4.children[0];

        var cat1Stars = [cat1Star1, cat1Star2, cat1Star3, cat1Star4, cat1Star5];
        var cat1StarsFull = [];

        for (var j = 0; j < cat1Stars.length; j++) {
          if(cat1Stars[j].attribs.class == 'icon-full_star'){
            cat1StarsFull.push(cat1Stars[j])
          }
        }
      }

    // ====== Second row inside .ratings ======= //
    // category label for cirrculum and job assistance
        var category2 = rating[i].children[2].children[0].data;
        var cat2Stars = [];
        var cat2StarsFull =[];

      if (rating[i].children[3].children[0].children[0].type == 'tag'){

          var star = rating[i].children[1];
          var cat2Star1 = rating[i].children[3].children[0];
          var cat2Star2 = cat2Star1.children[0];
          var cat2Star3 = cat2Star2.children[0];
          var cat2Star4 = cat2Star3.children[0];
          var cat2Star5 = cat2Star4.children[0];
          cat2Stars = [cat2Star1, cat2Star2, cat2Star3, cat2Star4, cat2Star5];

          for (var k = 0; k < cat2Stars.length; k++) {
            if(cat2Stars[k].attribs.class == 'icon-full_star'){
              cat2StarsFull.push(cat2Stars[k])
            }
          }
        }
  
        //=============== Logged Categories/Stars ===============//

          console.log(category1, cat1StarsFull.length)
          console.log(category2, cat2StarsFull.length)

      } // =================== End of Rating =================== //


      // ============== Review Body Text ================== //
     // console.log(review[0].children[5].children[0].children[0].children[0])

      var reviewBody = review[0].children[5].children[0].children[0].children;
      // console.log(reviewBody);      
      for (var q = 0; q < reviewBody.length; q++) {
        if(reviewBody[q].type == 'tag'){
          if(reviewBody[q].children[0].data){
            console.log(reviewBody[q].children[0].data)
          }else{
            console.log(reviewBody[q]);
            
          }
          // for (var i = 0; i < Things.length; i++) {
          //   Things[i]
          // }

        }
      }

      console.log("------------------------------------------------------------------");

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
