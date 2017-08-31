var request = require('request');
var cheerio = require('cheerio')
var fs = require('fs'); //internal
var Nightmare = require('nightmare');
var forever = require('forever-monitor');

  // var child = new (forever.Monitor)('scrape-reviews.js', {
  //   max: 3,
  //   silent: true,
  //   args: [],
  //   'spinSleepTime': 10000,
  // });

  // child.on('exit', function () {
  //   console.log('your-filename.js has exited after 3 restarts');
  // });

  // child.start();


var data = [
    { 'school': 'General Assembly',
      'url': 'https://www.coursereport.com/schools/general-assembly#/reviews',
      'category': 'GENERAL',
      'trilogy': 'FALSE',
      'page': 1
    },
    { 'school': 'General Assembly',
      'url': 'https://www.coursereport.com/schools/general-assembly?page=2#/reviews',
      'category': 'GENERAL',
      'trilogy': 'FALSE',
      'page': 2
    },
    { 'school': 'General Assembly',
      'url': 'https://www.coursereport.com/schools/general-assembly?page=3#/reviews',
      'category': 'GENERAL',
      'trilogy': 'FALSE',
      'page': 3
    },
    { 'school': 'General Assembly',
      'url': 'https://www.coursereport.com/schools/general-assembly?page=4#/reviews',
      'category': 'GENERAL',
      'trilogy': 'FALSE',
      'page': 4
    },
    { 'school': 'General Assembly',
      'url': 'https://www.coursereport.com/schools/general-assembly?page=5#/reviews',
      'category': 'GENERAL',
      'trilogy': 'FALSE',
      'page': 5
    },
    { 'school': 'General Assembly',
      'url': 'https://www.coursereport.com/schools/general-assembly?page=6#/reviews',
      'category': 'GENERAL',
      'trilogy': 'FALSE',
      'page': 6
    },
    { 'school': 'General Assembly',
      'url': 'https://www.coursereport.com/schools/general-assembly?page=7#/reviews',
      'category': 'GENERAL',
      'trilogy': 'FALSE',
      'page': 7
    },
    { 'school': 'General Assembly',
      'url': 'https://www.coursereport.com/schools/general-assembly?page=8#/reviews',
      'category': 'GENERAL',
      'trilogy': 'FALSE',
      'page': 8
    },
    { 'school': 'General Assembly',
      'url': 'https://www.coursereport.com/schools/general-assembly?page=9#/reviews',
      'category': 'GENERAL',
      'trilogy': 'FALSE',
      'page': 9
    },
    { 'school': 'General Assembly',
      'url': 'https://www.coursereport.com/schools/general-assembly?page=10#/reviews',
      'category': 'GENERAL',
      'trilogy': 'FALSE',
      'page': 10
    },    
    {
      'school': 'Rutgers',
      'url': 'https://www.coursereport.com/schools/rutgers-bootcamps#/reviews',
      'category': 'RUTGERS',
      'trilogy': 'TRUE',
      'page': 1
    },
    {
      'school': 'Rutgers',
      'url': 'https://www.coursereport.com/schools/rutgers-bootcamps?page=2#/reviews',
      'category': 'RUTGERS',
      'trilogy': 'TRUE',
      'page': 2
    },
    {
      'school': 'Rutgers',
      'url': 'https://www.coursereport.com/schools/rutgers-bootcamps?page=3#/reviews',
      'category': 'RUTGERS',
      'trilogy': 'TRUE',
      'page': 3
    },
    {
      'school': 'Hack Reactor',
      'url': 'https://www.coursereport.com/schools/hack-reactor#reviews',
      'category': 'HACKREACTOR',
      'trilogy': 'FALSE',
      'page': 1
    },
    {
      'school': 'Hack Reactor',
      'url': 'https://www.coursereport.com/schools/hack-reactor?page=2#/reviews',
      'category': 'HACKREACTOR',
      'trilogy': 'FALSE',
      'page': 2
    },
    {
      'school': 'Hack Reactor',
      'url': 'https://www.coursereport.com/schools/hack-reactor?page=3#/reviews',
      'category': 'HACKREACTOR',
      'trilogy': 'FALSE',
      'page': 3
    },
    {
      'school': 'Hack Reactor',
      'url': 'https://www.coursereport.com/schools/hack-reactor?page=4#/reviews',
      'category': 'HACKREACTOR',
      'trilogy': 'FALSE',
      'page': 4
    },
    {
      'school': 'Hack Reactor',
      'url': 'https://www.coursereport.com/schools/hack-reactor?page=5#/reviews',
      'category': 'HACKREACTOR',
      'trilogy': 'FALSE',
      'page': 5
    },
    {
      'school': 'Hack Reactor',
      'url': 'https://www.coursereport.com/schools/hack-reactor?page=6#/reviews',
      'category': 'HACKREACTOR',
      'trilogy': 'FALSE',
      'page': 6
    },
    {
      'school': 'Hack Reactor',
      'url': 'https://www.coursereport.com/schools/hack-reactor?page=7#/reviews',
      'category': 'HACKREACTOR',
      'trilogy': 'FALSE',
      'page': 7
    },
    {
      'school': 'Galvanize',
      'url': 'https://www.coursereport.com/schools/galvanize#/reviews',
      'category': 'GALVANIZE',
      'trilogy': 'FALSE',
      'page': 1
    },
    {
      'school': 'Galvanize',
      'url': 'https://www.coursereport.com/schools/galvanize?page=2#/reviews',
      'category': 'GALVANIZE',
      'trilogy': 'FALSE',
      'page': 2
    },
    {
      'school': 'Galvanize',
      'url': 'https://www.coursereport.com/schools/galvanize?page=2#/reviews',
      'category': 'GALVANIZE',
      'trilogy': 'FALSE',
      'page': 3
    },
    {
      'school': 'Galvanize',
      'url': 'https://www.coursereport.com/schools/galvanize?page=4#/reviews',
      'category': 'GALVANIZE',
      'trilogy': 'FALSE',
      'page': 4
    },
    {
      'school': 'Flat-Iron',
      'url': 'https://www.coursereport.com/schools/flatiron-school#/reviews',
      'category': 'FLATIRON',
      'trilogy': 'FALSE',
      'page': 1
    },
    {
      'school': 'Flat-Iron',
      'url': 'https://www.coursereport.com/schools/flatiron-school?page=2#/reviews',
      'category': 'FLATIRON',
      'trilogy': 'FALSE',
      'page': 2
    },
    {
      'school': 'Flat-Iron',
      'url': 'https://www.coursereport.com/schools/flatiron-school?page=3#/reviews',
      'category': 'FLATIRON',
      'trilogy': 'FALSE',
      'page': 3
    },
    {
      'school': 'Flat-Iron',
      'url': 'https://www.coursereport.com/schools/flatiron-school?page=4#/reviews',
      'category': 'FLATIRON',
      'trilogy': 'FALSE',
      'page': 4
    },
    {
      'school': 'Flat-Iron',
      'url': 'https://www.coursereport.com/schools/flatiron-school?page=5#/reviews',
      'category': 'FLATIRON',
      'trilogy': 'FALSE',
      'page': 5
    },
    {
      'school': 'Flat-Iron',
      'url': 'https://www.coursereport.com/schools/flatiron-school?page=6#/reviews',
      'category': 'FLATIRON',
      'trilogy': 'FALSE',
      'page': 6
    },
    {
      'school': 'Flat-Iron',
      'url': 'https://www.coursereport.com/schools/flatiron-school?page=7#/reviews',
      'category': 'FLATIRON',
      'trilogy': 'FALSE',
      'page': 7
    },
    {
      'school': 'UCF Orlando',
      'url': 'https://www.coursereport.com/schools/ucf-coding-boot-camp#/reviews',
      'category': 'UCF',
      'trilogy': 'TRUE',
      'page': 1
    },
    {
      'school': 'UCLA',
      'url': 'https://www.coursereport.com/schools/the-coding-boot-camp-at-ucla-extension#/reviews',
      'category': 'UCLA',
      'trilogy': 'TRUE',
      'page': 1
    },
    {
      'school': 'UC San Diego',
      'url': 'https://www.coursereport.com/schools/the-coding-boot-camp-at-uc-san-diego-extension',
      'category': 'UCSD',
      'trilogy': 'TRUE',
      'page': 1
    },
    {
      'school': 'UNC Chapel Hill',
      'url': 'https://www.coursereport.com/schools/the-coding-boot-camp-at-unc-chapel-hill#/reviews',
      'category': 'UNC Chapel Hill',
      'trilogy': 'TRUE',
      'page': 1
    },
    {
      'school': 'UNC Charlotte',
      'url': 'https://www.coursereport.com/schools/the-coding-boot-camp-at-unc-charlotte#/reviews',
      'category': 'UNC Charlotte',
      'trilogy': 'TRUE',
      'page': 1
    },
    {
      'school': 'UT Austin',
      'url': 'https://www.coursereport.com/schools/UT-Austin-Boot-Camps#/reviews',
      'category': 'UT AUSTIN',
      'trilogy': 'TRUE',
      'page': 1
    },
    {
      'school': 'UC Irvine',
      'url': 'https://www.coursereport.com/schools/UC-Irvine-Boot-Camps#/reviews',
      'category': 'UCIRVINE',
      'trilogy': 'TRUE',
      'page': 1
    },
    {
      'school': 'Thinkful',
      'url': 'https://www.coursereport.com/schools/thinkful#/reviews',
      'category': 'THINKFUL',
      'trilogy': 'FALSE',
      'page': 1
    },
    {
      'school': 'Thinkful',
      'url': 'https://www.coursereport.com/schools/thinkful?page=2#/reviews',
      'category': 'THINKFUL',
      'trilogy': 'FALSE',
      'page': 2
    },
    {
      'school': 'Thinkful',
      'url': 'https://www.coursereport.com/schools/thinkful?page=3#/reviews',
      'category': 'THINKFUL',
      'trilogy': 'FALSE',
      'page': 3
    },
    {
      'school': 'Thinkful',
      'url': 'https://www.coursereport.com/schools/thinkful?page=4#/reviews',
      'category': 'THINKFUL',
      'trilogy': 'FALSE',
      'page': 4
    },
    {
      'school': 'Thinkful',
      'url': 'https://www.coursereport.com/schools/thinkful?page=5#/reviews',
      'category': 'THINKFUL',
      'trilogy': 'FALSE',
      'page': 5
    },
    {
      'school': 'Thinkful',
      'url': 'https://www.coursereport.com/schools/thinkful?page=6#/reviews',
      'category': 'THINKFUL',
      'trilogy': 'FALSE',
      'page': 6
    },
      {
      'school': 'Thinkful',
      'url': 'https://www.coursereport.com/schools/thinkful?page=7#/reviews',
      'category': 'THINKFUL',
      'trilogy': 'FALSE',
      'page': 7
    },
    {
      'school': 'Thinkful',
      'url': 'https://www.coursereport.com/schools/thinkful?page=8#/reviews',
      'category': 'THINKFUL',
      'trilogy': 'FALSE',
      'page': 8
    },
    {
      'school': 'Thinkful',
      'url': 'https://www.coursereport.com/schools/thinkful?page=9#/reviews',
      'category': 'THINKFUL',
      'trilogy': 'FALSE',
      'page': 9
    },
    {
      'school': 'Thinkful',
      'url': 'https://www.coursereport.com/schools/thinkful?page=10#/reviews',
      'category': 'THINKFUL',
      'trilogy': 'FALSE',
      'page': 10
    },
    {
      'school': 'Thinkful',
      'url': 'https://www.coursereport.com/schools/thinkful?page=11#/reviews',
      'category': 'THINKFUL',
      'trilogy': 'FALSE',
      'page': 11
    },
    {
      'school': 'Thinkful',
      'url': 'https://www.coursereport.com/schools/thinkful?page=12#/reviews',
      'category': 'THINKFUL',
      'trilogy': 'FALSE',
      'page': 12
    }
  ];


var scrapeCounter = 0;

function runScrape(){
  console.log('counter', scrapeCounter)
  scrape(data[scrapeCounter])
};


var cleanRowHeadings = ['School', 'Trilogy' , 'Date', 'Course', 'Location', 'Verified', 'Overall Exp.', 'Curriculum', 'Instructors', 'Job Assistance', 'Comments'];

fs.writeFile('bootcamp-reviews.csv', cleanRowHeadings + "\n" , 'utf8', function (err) {
    if (err) {
      console.log('Some error occured - file either not saved or corrupted file saved.');
    } else{
      console.log('File Created!');
      runScrape()
    }
  });

// pass in urlOb to determine which school object we are scraping from
function scrape(urlOb){

  var schoolName = urlOb.school.toUpperCase()
  // console.log(urlOb.url())
  console.log(schoolName);

  var scrape = new Nightmare({
          show: false
      })
      .goto(urlOb.url)
      .wait(3000)
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
      cleanRow.push(urlOb.trilogy)

    // console.log((reviewId + 1) + ")")

      var review = $(this).children("div");
  // ============================ REVIEW DATE ============================ //

      // children[2] gives us the object inside review that holds review-date information
      var reviewDate = review[0].children[2].children[0].data;
      // console.log(reviewDate);
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
        // comments = comments.toString().replace(/\t/g, '').split('\r\n');

        // comments = comments.split(":")[0]
        // console.log('index', comments.indexOf(':'))
        // comments.substring(comments.indexOf(':'))

        // console.log("come on baby", comments);
        // cleanRow.push(comments)
      }

    // console.log('row', cleanRow)


    // var fileToAppendTo = categOb[urlOb.category];

      fs.appendFile('bootcamp-reviews.csv', cleanRow + "\n" , 'utf8', function (err) {
        if (err) {
          console.log('Some error occured - file either not saved or corrupted file saved.');
        } else{
          console.log('It\'s saved!');
        }
      });

    // console.log("--------------------------------------------------------");
    });
      scrapeCounter++;
      runScrape();
  });

}; // End of Scrape




