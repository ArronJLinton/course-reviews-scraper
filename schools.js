const schools = [
      {
        'school': 'Rutgers',
        'url': 'https://www.coursereport.com/schools/rutgers-bootcamps',
        'category': 'RUTGERS',
        'trilogy': 'TRILOGY'
      },
      {
        'school': 'UCF Orlando',
        'url': 'https://www.coursereport.com/schools/ucf-coding-boot-camp',
        'category': 'UCF',
        'trilogy': 'TRILOGY'
      },
      {
        'school': 'UCLA',
        'url': 'https://www.coursereport.com/schools/the-coding-boot-camp-at-ucla-extension',
        'category': 'UCLA',
        'trilogy': 'TRILOGY'
      },
      {
        'school': 'UNC Chapel Hill',
        'url': 'https://www.coursereport.com/schools/the-coding-boot-camp-at-unc-chapel-hill',
        'category': 'UNC Chapel Hill',
        'trilogy': 'TRILOGY'
      },
      {
        'school': 'UNC Charlotte',
        'url': 'https://www.coursereport.com/schools/the-coding-boot-camp-at-unc-charlotte',
        'category': 'UNC Charlotte',
        'trilogy': 'TRILOGY'
      },
      {
        'school': 'UC San Diego',
        'url': 'https://www.coursereport.com/schools/the-coding-boot-camp-at-uc-san-diego-extension',
        'category': 'UCSD',
        'trilogy': 'TRILOGY'
      },
      {
        'school': 'UT Austin',
        'url': 'https://www.coursereport.com/schools/UT-Austin-Boot-Camps',
        'category': 'UT AUSTIN',
        'trilogy': 'TRILOGY'
      },
      {
        'school': 'UCIrvine',
        'url': 'https://www.coursereport.com/schools/UC-Irvine-Boot-Camps',
        'category': 'UCIRVINE',
        'trilogy': 'TRILOGY'
      },
      {
        'school': 'UC Berkeley',
        'url': 'https://www.coursereport.com/schools/berkeley-boot-camps',
        'category': 'UC Berkeley',
        'trilogy': 'TRILOGY'
      },
      {
        'school': 'SMU',
        'url': 'https://www.coursereport.com/schools/SMU-coding-boot-camp',
        'category': 'SMU',
        'trilogy': 'TRILOGY'
      },
      {
        'school': 'University of Utah',
        'url': 'https://www.coursereport.com/schools/university-of-utah-professional-education-coding-boot-camp',
        'category': 'University of Utah',
        'trilogy': 'TRILOGY'
      },
      {
        'school': 'University of Kansas',
        'url': 'https://www.coursereport.com/schools/university-of-kansas-coding-boot-camp',
        'category': 'University of Kansas',
        'trilogy': 'TRILOGY'
      },
      {
        'school': 'Northwestern',
        'url': 'https://www.coursereport.com/schools/northwestern-coding-boot-camps',
        'category': 'Northwestern',
        'trilogy': 'TRILOGY'
      },
      {
        'school': 'Georgia Tech',
        'url': 'https://www.coursereport.com/schools/georgia-tech-coding-boot-camp',
        'category': 'Georgia Tech',
        'trilogy': 'TRILOGY'
      },
      {
        'school': 'Case Western',
        'url': 'https://www.coursereport.com/schools/case-western-reserve-university-coding-boot-camp',
        'category': 'Case Western',
        'trilogy': 'TRILOGY'
      },
       {
        'school': 'University of Denver',
        'url': 'https://www.coursereport.com/schools/university-of-denver-coding-boot-camp',
        'category': 'Denver',
        'trilogy': 'TRILOGY'
      },
      {
        'school': 'GWU',
        'url': 'https://www.coursereport.com/schools/gw-boot-camps',
        'category': 'GWU',
        'trilogy': 'TRILOGY'
      },
      {
        'school': 'Columbia',
        'url': 'https://www.coursereport.com/schools/columbia-engineering-coding-boot-camp',
        'category': 'Columbia',
        'trilogy': 'TRILOGY'
      },
      {
        'school': 'Miami',
        'url': 'https://www.coursereport.com/schools/university-of-miami-coding-boot-camp',
        'category': 'Miami',
        'trilogy': 'TRILOGY'
      },
      {
        'school': 'Minnesota',
        'url': 'https://www.coursereport.com/schools/university-of-minnesota-boot-camps',
        'category': 'Minnesota',
        'trilogy': 'TRILOGY'
      },
      {
        'school': 'Toronto',
        'url': 'https://www.coursereport.com/schools/university-of-toronto-school-of-continuing-studies-coding-boot-camp',
        'category': 'Toronto',
        'trilogy': 'TRILOGY'
      },
      {
        'school': 'UC Davis',
        'url': 'https://www.coursereport.com/schools/uc-davis-extension-coding-boot-camp',
        'category': 'UC Davis',
        'trilogy': 'TRILOGY'
      },
      {
        'school': 'UNH',
        'url': 'https://www.coursereport.com/schools/unh-coding-boot-camp',
        'category': 'UNH',
        'trilogy': 'TRILOGY'
      },
      {
        'school': 'Penn',
        'url': 'https://www.coursereport.com/schools/penn-lps-coding-boot-camp',
        'category': 'Penn',
        'trilogy': 'TRILOGY'
      },
      {
        'school': 'USC',
        'url': 'https://www.coursereport.com/schools/usc-viterbi-data-analytics-boot-camp',
        'category': 'USC',
        'trilogy': 'TRILOGY'
      },
      {
        'school': 'University of Richmond',
        'url': 'https://www.coursereport.com/schools/university-of-richmond-coding-boot-camp',
        'category': 'University of Richmond',
        'trilogy': 'TRILOGY'
      },
      {
        'school': 'Arizona',
        'url': 'https://www.coursereport.com/schools/university-of-arizona-coding-boot-camp',
        'category': 'Arizona',
        'trilogy': 'TRILOGY'
      },
      // { 'school': 'General Assembly',
      //   'url': 'https://www.coursereport.com/schools/general-assembly',
      //   'category': 'GENERAL',
      //   'trilogy': 'NON-TRILOGY'
      // },
      // {
      //   "school": "Bloc",
      //   "url": "https://www.coursereport.com/schools/bloc",
      //   "category": "BLOC",
      //   "trilogy": "NON-TRILOGY"
      // },
      // {
      //   "school": "App Academy",
      //   "url": "https://www.coursereport.com/schools/app-academy",
      //   "category": "APP ACADEMY",
      //   "trilogy": "NON-TRILOGY"
      // },
      // {
      //   "school": "Le Wagon",
      //   "url": "https://www.coursereport.com/schools/le-wagon",
      //   "category": "LE WAGON",
      //   "trilogy": "NON-TRILOGY"
      // },
      // {
      //   "school": "Dev Mountain",
      //   "url": "https://www.coursereport.com/schools/devmountain",
      //   "category": "DEV MOUNTAIN",
      //   "trilogy": "NON-TRILOGY"
      // },
      // {
      //   "school": "Iron Hack",
      //   "url": "https://www.coursereport.com/schools/ironhack",
      //   "category": "IRON HACK",
      //   "trilogy": "NON-TRILOGY"
      // },
      // {
      //   "school": "Iron Yard",
      //   "url": "https://www.coursereport.com/schools/the-iron-yard",
      //   "category": "IRON YARD",
      //   "trilogy": "NON-TRILOGY"
      // },
      // {
      //   "school": "Dev Bootcamp",
      //   "url": "https://www.coursereport.com/schools/dev-bootcamp",
      //   "category": "DEV BOOTCAMP",
      //   "trilogy": "NON-TRILOGY"
      // },
      // {
      //   'school': 'Hack Reactor',
      //   'url': 'https://www.coursereport.com/schools/hack-reactor',
      //   'category': 'HACKREACTOR',
      //   'trilogy': 'NON-TRILOGY'
      // },
      // {
      //   'school': 'Galvanize',
      //   'url': 'https://www.coursereport.com/schools/galvanize',
      //   'category': 'GALVANIZE',
      //   'trilogy': 'NON-TRILOGY'
      // },
      // {
      //   'school': 'Flat-Iron',
      //   'url': 'https://www.coursereport.com/schools/flatiron-school',
      //   'category': 'FLATIRON',
      //   'trilogy': 'NON-TRILOGY'
      // },
      // {
      //   'school': 'Fullstack Academy',
      //   'url': 'https://www.coursereport.com/schools/fullstack-academy',
      //   'category': 'FULLSTACK ACADEMY',
      //   'trilogy': 'NON-TRILOGY'
      // },
      // {
      //   'school': 'New York Code + Design Academy',
      //   'url': 'https://www.coursereport.com/schools/new-york-code-design-academy',
      //   'category': 'NYCDA',
      //   'trilogy': 'NON-TRILOGY'
      // },
      // {
      //   'school': 'Grace Hopper Program',
      //   'url': 'https://www.coursereport.com/schools/the-grace-hopper-program',
      //   'category': 'GRACE HOPPER',
      //   'trilogy': 'NON-TRILOGY'
      // },
      // {
      //   'school': 'Thinkful',
      //   'url': 'https://www.coursereport.com/schools/thinkful',
      //   'category': 'THINKFUL',
      //   'trilogy': 'NON-TRILOGY'
      // }
];

module.exports = schools;