const logotext = "Pandora";
const meta = {
    title: "Pandora",
    description: "I’m John Doe data scientist _ Full stack devloper,currently working in Berlin",
};

const introdata = {
    title: "We are Pandora",
    animated: {
        first: "Music meets intelligence",
        second: "Enhance your creativity",
        third: "Whole new door for music world",
    },
    description: "Music gives a soul to the universe, wings to the mind, flight to the imagination, and life to everything. ~ Plato",
    description_two: "We are a leading royalty management company committed to transforming the way artists handle their earnings. Our dedicated team specializes in organizing and streamlining the royalty process, ensuring that artists receive the recognition and compensation they rightfully deserve.",
    description_three: "At the heart of our mission is a passion for empowering creativity. We provide efficient, transparent, and reliable royalty solutions that allow artists to focus on what they do best—creating. By taking the complexity out of royalty management, we help artists navigate the financial aspects of their careers with ease and confidence.",
    description_four: "Join us in our journey to support and uplift the artistic community, one royalty at a time.",
    description_five: "One good thing about music, when it hits you, you feel no pain. - Bob Marley",
    your_img_url_one: "https://i.pinimg.com/originals/49/69/cd/4969cdbc42a2d8e6171a8f8d616f27b4.jpg",
    your_img_url_two: "https://assets.teenvogue.com/photos/5925bc573a35ee7d9fccc81f/16:9/w_1920,c_limit/GettyImages-633754846.jpg",
    your_img_url_three:"https://wallpapers.com/images/high/kanye-west-on-concert-stage-epgwo9jpxzrgcuyh.webp",
    your_img_url_four:"https://www.enwallpaper.com/wp-content/uploads/2022/01/4c858284d0768d738cf8e9ab23b37820.jpg",
    your_img_url_five:  "https://www.dreamville.com/wp-content/uploads/2016/12/d73f78cd0e9c18039a90238a232e1a60.1000x664x1.jpg",
    your_img_url_six: "https://images-prod.dazeddigital.com/1572/azure/dazed-prod/1240/5/1245858.jpg",
    your_img_url_seven: "https://images6.alphacoders.com/981/thumb-1920-981194.jpg",
    name : "saish",
};

const CardDetails = [
  {
    title: "Username",
    text: "Jcole",

  },
  {
    title: "Password",
    text: "**************",

  },

  {
    title: "Genre",
    text: "Hip Hop",

  },
  {
    title: "Email",
    text: "jcole@gmail.com",
  },

  {
    title: "Country",
    text: "jcole@gmail.com",

  },



  // add more card objects as needed
];

const dataabout = {
    title: "Abit about ourselves",
    aboutme: "  ",
};


const ArtistDetails = [
  {
    ArtistNumber: "A004",
    ArtistName: "Sarah Miller",
    Manager: "David Wilson",
    Stream: 950000,
    Revenue: 150000,
    Genre: "Pop",
    Country: "USA"
  },
  {
    ArtistNumber: "A005",
    ArtistName: "Emma Garcia",
    Manager: "James Taylor",
    Stream: 1100000,
    Revenue: 175000,
    Genre: "Rock",
    Country: "UK"
  },
  {
    ArtistNumber: "A006",
    ArtistName: "William Martinez",
    Manager: "Olivia Clark",
    Stream: 850000,
    Revenue: 130000,
    Genre: "Hip-Hop",
    Country: "Canada"
  },
  {
    ArtistNumber: "A006",
    ArtistName: "William Martinez",
    Manager: "Olivia Clark",
    Stream: 850000,
    Revenue: 130000,
    Genre: "Hip-Hop",
    Country: "Canada"
  },
  {
  ArtistNumber: "A006",
  ArtistName: "William Martinez",
  Manager: "Olivia Clark",
  Stream: 850000,
  Revenue: 130000,
  Genre: "Hip-Hop",
  Country: "Canada"
},

];

  

  
const tabletitle = [{
    ArtistNumber : "Artist id",
    ArtistName: "Artist Name",
    Manager: "Manager Name",
    Stream: "Streams",
    Revenue: "Revenue",
    Genre: "Genre",
    Country: "Country",   
},
];

const tabletitleartist = [{
  Songid : "Song id",
  SongName: "Song Name",
  Collabarator: "Collabarator Name",
  Stream: "Streams",
  Revenue: "Revenue",
  Genre: "Genre",
    
},
];

const tabletitlemanager = [{
  Artistid : "Artist id",
  ArtistName: "Artist Name",
  Totalstream: "Total streams",
  Revenue: "Revenue",
  Genre: "Genre",
    
},
];

//---------------------------------------------------------------------------------------------------------------------------------------

const tabletitlemanagerData = [
  {
    "ArtistId": 1,
    "ArtistName": "Artist Ad,y.fyucdkckslklckhzi z",
    "TotalStream": 1000000,
    "Revenue": 5000,
    "Genre": "Pop"
  },
  {
    "ArtistId": 2,
    "ArtistName": "Artist B",
    "TotalStream": 500000,
    "Revenue": 2500,
    "Genre": "Rock"
  },
  {
    "ArtistId": 3,
    "ArtistName": "Artist C",
    "TotalStream": 2000000,
    "Revenue": 10000,
    "Genre": "Hip Hop"
  },
  {
    "ArtistId": 4,
    "ArtistName": "Artist Ad,y.fyucdkckslklckhzi z",
    "TotalStream": 1000000,
    "Revenue": 5000,
    "Genre": "Pop"
  },
  {
    "ArtistId": 2,
    "ArtistName": "Artist B",
    "TotalStream": 500000,
    "Revenue": 2500,
    "Genre": "Rock"
  },
  {
    "ArtistId": 3,
    "ArtistName": "Artist C",
    "TotalStream": 2000000,
    "Revenue": 10000,
    "Genre": "Hip Hop"
  },
]


//-------------------------------------------------------------------------------------------------------------------------------------------

// const tabletitlemanagerData = async () => {
//   try {
//     console.log(await axios.get(`http://localhost:8082/dashboard/manager/top5-artists/1`))
//     await axios.get(`http://localhost:8082/dashboard/manager/top5-artists/1`);
//     console.log(await axios.get(`http://localhost:8082/dashboard/manager/top5-artists/1`))
//   } catch (error) {
//     console.error(error);
//   }
// };
//--------------------------------------------------------------------------------------------------------------------------------------------------

const tabletitleartistData = [
  {
    Songid: "001",
    SongName: "Song A",
    Collabarator: "Collaborator X",
    Stream: 150000,
    Revenue: "$2000",
    Genre: "Pop"
  },
  {
    Songid: "002",
    SongName: "Song B",
    Collabarator: "Collaborator Y",
    Stream: 120000,
    Revenue: "$1800",
    Genre: "Rock"
  },
  {
    Songid: "003",
    SongName: "Song C",
    Collabarator: "Collaborator Z",
    Stream: 200000,
    Revenue: "$2500",
    Genre: "Hip Hop"
  },
  {
    Songid: "004",
    SongName: "Song D",
    Collabarator: "Collaborator W",
    Stream: 180000,
    Revenue: "$2200",
    Genre: "Electronic"
  },
  {
    Songid: "005",
    SongName: "Song A",
    Collabarator: "Collaborator X",
    Stream: 150000,
    Revenue: "$2000",
    Genre: "Pop"
  },
  {
    Songid: "006",
    SongName: "Song B",
    Collabarator: "Collaborator Y",
    Stream: 120000,
    Revenue: "$1800",
    Genre: "Rock"
  },
  {
    Songid: "003",
    SongName: "Song C",
    Collabarator: "Collaborator Z",
    Stream: 200000,
    Revenue: "$2500",
    Genre: "Hip Hop"
  },
  {
    Songid: "004",
    SongName: "Song D",
    Collabarator: "Collaborator W",
    Stream: 180000,
    Revenue: "$2200",
    Genre: "Electronic"
  },
  // Add more songs as needed
];


const skills = [{
        name: "Javascript",
        value: 100,
    },
    {
        name: "React ",
        value: 85,
    },
    {
        name: "OpenAI",
        value: 40,
    },
    {
        name: "CSS",
        value: 60,
    },
    {
        name: "Figma",
        value: 30,
    },
];

const services = [{
        title: "",
        description: "Thank you for choosing Strawhats. Let the AI adventure begin! Cheers,  The Strawhats Team",
    },

];

const dataportfolio = [{
        img: "https://mir-s3-cdn-cf.behance.net/project_modules/hd/d9893d82186949.5d1584ddb8100.png",
        description: "Focus on simplicity and functionality, emphasizing the layout and user interactions",
        link: "#",
    },
    {
        img: "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/a0be7382186949.5d1584ddb8484.png",
        description: "Architectural blueprint of digital creativity",
        link: "#",
    },
    {
        img: "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/dbeddf83395121.5d3ac542e8786.png",
        description: "Orchestrating a symphony of user experience.",
        link: "#",
    },
    {
        img: "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/9b6fde83395121.5d3ac542e8ff0.png",
        description: "With each stroke, it breathes life into the pixels.",
        link: "#",
    },
    {
        img: "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/335a9b83395121.5d3ac542e798f.png",
        description: "whispering promises of functionality and elegance",
        link: "#",
    },
    {
        img: "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/f98ef383395121.5d3ac542e7ec6.png",
        description: "A canvas where imagination meets interaction.",
        link: "#",
    },

    {
        img: "https://enwpgo.files.wordpress.com/2023/02/image-15.jpeg",
        description: "A canvas where imagination meets interaction.",
        link: "#",
    },
    {
        img: "https://enwpgo.files.wordpress.com/2023/02/image-16.jpeg",
        description: "whispering promises of functionality and elegance",
        link: "#",
    },
    {
        img: "https://enwpgo.files.wordpress.com/2023/02/image-17.jpeg",
        description: "With each stroke, it breathes life into the pixels.",
        link: "#",
    },
    {
        img: "https://assets.justinmind.com/wp-content/webp-express/webp-images/uploads/2019/04/what-are-wireframes-for-websites.png.webp",
        description: "Orchestrating a symphony of user experience.",
        link: "#",
    },
    {
        img: "https://assets.justinmind.com/wp-content/webp-express/webp-images/uploads/2019/04/low-fidelity-website-wireframe-example.png.webp",
        description: "Architectural blueprint of digital creativity",
        link: "#",
    },
    {
        img: "https://www.edrawsoft.com/template/website-design-wireframe.png",
        description: "Focus on simplicity and functionality, emphasizing the layout and user interactions",
        link: "#",
    },
];

const artistfolio = [
    {
      name: "Drake",
      img: "https://wallpapers.com/images/high/drake-pictures-yktyeiash74fyfdb.webp",
      description: "Drake redefines hip-hop's emotional depth.",
      link: "#",
    },
    {
      name: "Wiz Khalifa",
      img: "https://wallpapers.com/images/high/wiz-khalifa-lounge-6qt0c2z7o9x2konw.webp",
      description: "Wiz Khalifa raps with unmatched charisma.",
      link: "#",
    },
    {
      name: "Snoop Dogg",
      img: "https://wallpapers.com/images/high/snoop-dogg-cool-hand-gestures-kd1v90o1e6pghtzx.webp",
      description: "Snoop Dogg delivers timeless West Coast.",
      link: "#",
    },
    {
      name: "Billie Eilish",
      img: "https://wallpapers.com/images/high/billie-eilish-purple-05sh0yoe8dd7yy2c.webp",
      description: "Billie Eilish captivates with haunting melodies.",
      link: "#",
    },
    {
      name: "Camila Cabello",
      img: "https://wallpapers.com/images/high/camila-cabello-billboard-cover-fqg76k7w08kbpvdh.webp",
      description: "Camila Cabello enchants with soulful pop.",
      link: "#",
    },
    {
      name: "Rihanna",
      img: "https://wallpapers.com/images/hd/aesthetic-black-and-white-rihanna-ilv902hnwowtoxus.webp",
      description: "Rihanna dominates with genre-defying hits.",
      link: "#",
    },
    {
      name: "Justin Bieber",
      img: "https://wallpapers.com/images/high/justin-bieber-side-profile-nnc6dmgbx4hgo5a6.webp",
      description: "Justin Bieber evolves as global superstar.",
      link: "#",
    },
    {
      name: "Seedhe Maut",
      img: "https://img.redbull.com/images/c_fill,g_auto,w_450,h_600/q_auto:low,f_auto/redbullcom/2022/3/8/vycpwzww6qw9lfgqhszi/seedhe-maut",
      description: "Seedhe Maut energizes India's rap scene.",
      link: "#",
    },
    {
      name: "One Direction",
      img: "https://wallpapers.com/images/high/aesthetic-boy-band-one-direction-cvrn2hp4gfg67dty.webp",
      description: "One Direction harmonizes pop perfection.",
      link: "#",
    },
    {
      name: "Juice WRLD",
      img: "https://wallpapers.com/images/high/juice-wrld-999-supreme-fox-racing-k1iri598p1fyup17.webp",
      description: "Juice WRLD explores vulnerable emotional landscapes.",
      link: "#",
    },
    {
      name: "The Chainsmokers",
      img: "https://wallpapers.com/images/high/jaja-tequilla-with-the-chainsmokers-lnywzlggcwecddlf.webp",
      description: "The Chainsmokers blend electronic pop seamlessly.",
      link: "#",
    },
    {
      name: "DIVINE",
      img: "https://siachenstudios.com/wp-content/uploads/2020/02/Divine.jpg.webp",
      description: "DIVINE narrates Mumbai's street stories.",
      link: "#",
    },
  ];
  

const contactConfig = {
    YOUR_EMAIL: "name@domain.com",
    YOUR_FONE: "(555)123-4567",
    description: " ",
    // creat an emailjs.com account 
    // check out this tutorial https://www.emailjs.com/docs/examples/reactjs/
    YOUR_SERVICE_ID: "service_id",
    YOUR_TEMPLATE_ID: "template_id",
    YOUR_USER_ID: "user_id",
};

const socialprofils = {
    github: "https://github.com",
    facebook: "https://facebook.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
};
export {
    meta,
    dataabout,
    dataportfolio,
    skills,
    services,
    introdata,
    contactConfig,
    socialprofils,
    logotext,
    artistfolio,
    tabletitle,
    ArtistDetails,
    CardDetails,
    tabletitleartist,
    tabletitleartistData,
    tabletitlemanager,
    tabletitlemanagerData,
};