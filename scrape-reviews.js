var request = require('request');
var cheerio = require('cheerio')
var fs = require('fs'); //internal
var Nightmare = require('nightmare');



var data = [
    { 'school': 'General Assembly',
      'url': 'https://www.coursereport.com/schools/general-assembly#/reviews',
      'category': 'GENERAL'
    },
    {
      'school': 'Hack-Reactor',
      'url': 'https://www.coursereport.com/schools/hack-reactor#/reviews',
      'category': 'HACKREACTOR'
    },
    {
      'school': 'Galvanize',
      'url': 'https://www.coursereport.com/schools/galvanize#/reviews',
      'category': 'GALVANIZE'
    },
    {
      'school': 'Flat-Iron',
      'url': 'https://www.coursereport.com/schools/flatiron-school#/reviews',
      'category': 'FLATIRON'
    },
    {
      'school': 'Scarlet Knights',
      'url': 'https://www.coursereport.com/schools/rutgers-bootcamps#/reviews',
      'category': 'RUTGERS'
    }
  ];

  // var categOb = {
  //   GENERAL: 'bootcamp-reviews.csv',
  //   HACKREACTOR: 'bootcamp-reviews.csv',
  //   GALVANIZE: 'bootcamp-reviews.csv',
  //   FLATIRON: 'bootcamp-reviews.csv',
  //   RUTGERS: 'bootcamp-reviews.csv'
  // }

var arg = process.argv[2];

scrape(data[parseInt(arg)]);

// scrape();

// pass in urlOb to determine which url we are scraping from
function scrape(urlOb){
  var schoolName = urlOb.school.toUpperCase()
  console.log(urlOb.school.toUpperCase());

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
      var cleanRow = [];
      cleanRow.push(schoolName)

    console.log((reviewId + 1) + ")")

      var review = $(this).children("div");


  // ============================ REVIEW DATE ============================ //

      // children[2] gives us the object inside review that holds review-date information
      var reviewDate = review[0].children[2].children[0].data;
      console.log(reviewDate);
      cleanRow.push(reviewDate);

  // ======================= Review Details =========================== //
      
    var reviewDetails = review[0].children[3].children.slice(1);

    var location = "";
    var course = "";
    var verification = "";

     for (var z = 0; z < reviewDetails.length; z++) {

        var details = reviewDetails[z].children[0];
        // console.log(details);
        if(details){
          var data = details.data
          if(details.type === 'text'){
            // console.log('details', details.data);

            if(data.indexOf('Campus:') >= 0){
              location = data;
              // console.log('location2', location)
            }else if(data.indexOf('Course:') >= 0){
              course = data;
              // console.log('course', course)
            }
            else if(data.indexOf('Verified') >= 0){
              verification = data;
              // console.log('ver', verification)
            }
          }else{
            // console.log('details', details.children[0].data)
            var data2 = details.children[0].data;
            if(data2.indexOf('Verified') >= 0){
              verification = data2;
              // console.log('verif', verification)
            }
          }
        }
      }

      course = course.replace(/[•\t.+]/g, "")
      course = course.replace("Course:", "")
      location = location.replace(/[•\t.+]/g, "")
      location = location.replace("Campus:", "")
      verification = verification.replace("Verified via", "")
      cleanRow.push(course)
      cleanRow.push(location)
      cleanRow.push(verification)

  // ======================== RATING CATEGORIES/STARS =========================== //

    // children[4] is associated with the .ratings class that holds rating information
    // each .rating class has 3 rows and we skip over the 1st row 
    var rating = review[0].children[4].children.slice(1);
    for (var i = 0; i < rating.length; i++) {  

  // ======= First row inside .ratings ======== //
  // category label for overall exp. and intructors
      var category1 = rating[i].children[0].children[0].data;


      if (rating[i].children[1].children[0].children[0].type === 'tag'){

        var cat1Star1 = rating[i].children[1].children[0];
        var cat1Star2 = cat1Star1.children[0];
        var cat1Star3 = cat1Star2.children[0];
        var cat1Star4 = cat1Star3.children[0];
        var cat1Star5 = cat1Star4.children[0];

        var cat1Stars = [cat1Star1, cat1Star2, cat1Star3, cat1Star4, cat1Star5];
        var cat1StarsFull = [];

        for (var j = 0; j < cat1Stars.length; j++) {
          if(cat1Stars[j].attribs.class === 'icon-full_star'){
            cat1StarsFull.push(cat1Stars[j])
          }
        }
      }

    // ====== Second row inside .ratings ======= //
    // category label for cirrculum and job assistance
        var category2 = rating[i].children[2].children[0].data;
        var cat2Stars = [];
        var cat2StarsFull =[];

      if (rating[i].children[3].children[0].children[0].type === 'tag'){

          var star = rating[i].children[1];
          var cat2Star1 = rating[i].children[3].children[0];
          var cat2Star2 = cat2Star1.children[0];
          var cat2Star3 = cat2Star2.children[0];
          var cat2Star4 = cat2Star3.children[0];
          var cat2Star5 = cat2Star4.children[0];
          cat2Stars = [cat2Star1, cat2Star2, cat2Star3, cat2Star4, cat2Star5];

          for (var k = 0; k < cat2Stars.length; k++) {
            if(cat2Stars[k].attribs.class === 'icon-full_star'){
              cat2StarsFull.push(cat2Stars[k])
            }
          }
        }
  
        //=============== Logged Categories/Stars ===============//

          // console.log(category1, cat1StarsFull.length)
          // console.log(category2, cat2StarsFull.length)
          cleanRow.push(cat1StarsFull.length, cat2StarsFull.length)

      } // =================== End of Rating =================== //


      // ============== Review Body Text ================== //

    var reviewBody = review[0].children[5].children[0].children[0].children;
    // check to see if a review text exists
    if(reviewBody){
      var bodyText;
      var comments = "";
      // have to loop around <p> tags inside the body
      for (var q = 0; q < reviewBody.length; q++) {
        var paragraph = reviewBody[q];
        // check to see if the paragraph object contains type = 
        // console.log('body', reviewBody)
        if(paragraph.type === 'tag' && paragraph.children[0]){
          bodyText = paragraph.children[0].data;
          // console.log('p1', paragraph.children[0])
          if(bodyText){
            // console.log(bodyText)
            comments = comments + bodyText;
            // comments.replace(',', ' ')
            // cleanRow.push(comments)
          }
          // for some reviews the review text is nested inside the <p> tag
          else{
            var bodyContainer = paragraph.children[0].children[0];
              // console.log('p2', paragraph.children[0].children[0])

            if(bodyContainer){
              bodyText = paragraph.children[0].children[0].data;
              if(bodyText !== 'Flag as inappropriate.' && bodyText !== 'This Review Is Helpful'){
                  comments = comments + bodyText;

                }
              }
            }
          }
        }

      // We have to replace the commas in the comment section because the csv file will interpret a comma as a separation between cells
      // console.log('comments', comments)
        comments = comments.replace(/\,/g, "")
        comments = comments.toString().replace(/\t/g, '').split('\r\n');

        // comments = comments.split(":")[0]
        // console.log('index', comments.indexOf(':'))
        // comments.substring(comments.indexOf(':'))

        // console.log("come on baby", comments);
        cleanRow.push(comments)
      }

    // console.log('row', cleanRow)


    // var fileToAppendTo = categOb[urlOb.category];

    fs.appendFile('bootcamp-reviews.csv', cleanRow + "\n", 'utf8', function (err) {
      if (err) {
        console.log('Some error occured - file either not saved or corrupted file saved.');
      } else{
        console.log('It\'s saved!');
      }
    });

    // console.log("--------------------------------------------------------");
    });

  });

};
