var request = require('request');
var cheerio = require('cheerio')
var fs = require('fs'); //internal
var Nightmare = require('nightmare');

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
    // GA
    { 'school': 'General Assembly',
      'url': 'https://www.coursereport.com/schools/general-assembly',
      'category': 'GENERAL',
      'trilogy': 'FALSE'
    },
    {
      "school": "Bloc",
      "url": "https://www.coursereport.com/schools/bloc",
      "category": "BLOC",
      "trilogy": "FALSE"
    },
    {
      "school": "App Academy",
      "url": "https://www.coursereport.com/schools/app-academy",
      "category": "APP ACADEMY",
      "trilogy": "FALSE"
    },
    {
      "school": "Le Wagon",
      "url": "https://www.coursereport.com/schools/le-wagon",
      "category": "LE WAGON",
      "trilogy": "FALSE"
    },
    {
      "school": "Dev Mountain",
      "url": "https://www.coursereport.com/schools/devmountain",
      "category": "DEV MOUNTAIN",
      "trilogy": "FALSE"
    },
    {
      "school": "Iron Hack",
      "url": "https://www.coursereport.com/schools/ironhack",
      "category": "IRON HACK",
      "trilogy": "FALSE"
    },
    {
      'school': 'Hack Reactor',
      'url': 'https://www.coursereport.com/schools/hack-reactor',
      'category': 'HACKREACTOR',
      'trilogy': 'FALSE'
    },
    {
      'school': 'Galvanize',
      'url': 'https://www.coursereport.com/schools/galvanize',
      'category': 'GALVANIZE',
      'trilogy': 'FALSE'
    },
    {
      'school': 'Flat-Iron',
      'url': 'https://www.coursereport.com/schools/flatiron-school',
      'category': 'FLATIRON',
      'trilogy': 'FALSE'
    },
    {
      'school': 'Fullstack Academy',
      'url': 'https://www.coursereport.com/schools/fullstack-academy',
      'category': 'FULLSTACK ACADEMY',
      'trilogy': 'FALSE'
    },
    {
      'school': 'Grace Hopper Program',
      'url': 'https://www.coursereport.com/schools/the-grace-hopper-program',
      'category': 'GRACE HOPPER',
      'trilogy': 'FALSE'
    },
    {
      'school': 'Rutgers',
      'url': 'https://www.coursereport.com/schools/rutgers-bootcamps',
      'category': 'RUTGERS',
      'trilogy': 'TRUE'
    },
    {
      'school': 'UCF Orlando',
      'url': 'https://www.coursereport.com/schools/ucf-coding-boot-camp',
      'category': 'UCF',
      'trilogy': 'TRUE'
    },
    {
      'school': 'UCLA',
      'url': 'https://www.coursereport.com/schools/the-coding-boot-camp-at-ucla-extension',
      'category': 'UCLA',
      'trilogy': 'TRUE'
    },
    {
      'school': 'UNC Chapel Hill',
      'url': 'https://www.coursereport.com/schools/the-coding-boot-camp-at-unc-chapel-hill',
      'category': 'UNC Chapel Hill',
      'trilogy': 'TRUE'
    },
    {
      'school': 'UNC Charlotte',
      'url': 'https://www.coursereport.com/schools/the-coding-boot-camp-at-unc-charlotte',
      'category': 'UNC Charlotte',
      'trilogy': 'TRUE'
    },
    {
      'school': 'UT Austin',
      'url': 'https://www.coursereport.com/schools/UT-Austin-Boot-Camps',
      'category': 'UT AUSTIN',
      'trilogy': 'TRUE'
    },
    {
      'school': 'UCIrvine',
      'url': 'https://www.coursereport.com/schools/UC-Irvine-Boot-Camps',
      'category': 'UCIRVINE',
      'trilogy': 'TRUE'
    },
    {
      'school': 'UC Berkeley',
      'url': 'https://www.coursereport.com/schools/berkeley-boot-camps',
      'category': 'UC Berkeley',
      'trilogy': 'TRUE'
    },
     {
      'school': 'UT Austin',
      'url': 'https://www.coursereport.com/schools/UT-Austin-Boot-Camps',
      'category': 'UT Austin',
      'trilogy': 'TRUE'
    },
     {
      'school': 'SMU',
      'url': 'https://www.coursereport.com/schools/SMU-coding-boot-camp',
      'category': 'SMU',
      'trilogy': 'TRUE'
    },
    {
      'school': 'University of Utah',
      'url': 'https://www.coursereport.com/schools/university-of-utah-professional-education-coding-boot-camp',
      'category': 'University of Utah',
      'trilogy': 'TRUE'
    },
    {
      'school': 'University of Kansas',
      'url': 'https://www.coursereport.com/schools/university-of-kansas-coding-boot-camp',
      'category': 'University of Kansas',
      'trilogy': 'TRUE'
    },
    {
      'school': 'Northwestern',
      'url': 'https://www.coursereport.com/schools/northwestern-coding-boot-camps',
      'category': 'Northwestern',
      'trilogy': 'TRUE'
    },
    {
      'school': 'Georgia Tech',
      'url': 'https://www.coursereport.com/schools/georgia-tech-coding-boot-camp',
      'category': 'Georgia Tech',
      'trilogy': 'TRUE'
    },
    {
      'school': 'Case Western',
      'url': 'https://www.coursereport.com/schools/case-western-reserve-university-coding-boot-camp',
      'category': 'Case Western',
      'trilogy': 'TRUE'
    },
     {
      'school': 'University of Denver',
      'url': 'https://www.coursereport.com/schools/university-of-denver-coding-boot-camp',
      'category': 'Denver',
      'trilogy': 'TRUE'
    },
    {
      'school': 'GWU',
      'url': 'https://www.coursereport.com/schools/gw-boot-camps',
      'category': 'GWU',
      'trilogy': 'TRUE'
    },
    {
      'school': 'Arizona',
      'url': 'https://www.coursereport.com/schools/university-of-arizona-coding-boot-camp',
      'category': 'Arizona',
      'trilogy': 'TRUE'
    },
    {
      'school': 'Thinkful',
      'url': 'https://www.coursereport.com/schools/thinkful',
      'category': 'THINKFUL',
      'trilogy': 'FALSE'
    }
  ];

newData = [];

// Creates multiple pages
data.forEach(function(element) {

  for (var i = 1; i <26; i++){

    new_element = Object.assign({}, element);
    // console.log(new_element); 
    // console.log(new_element.school);
    new_element.url = element.url + "?page=" + i + "#/reviews"     
    // console.log(element.url + "?page=" + i + "#/reviews")

    newData.push({new_element})
  }
})


var scrapeCounter = 0;

function runScrape(){
  console.log('counter', scrapeCounter)

  console.log(newData[scrapeCounter])
  scrape(newData[scrapeCounter].new_element)
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




