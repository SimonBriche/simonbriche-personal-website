const config = require('../config');
const baseURL_fr_fr = "https://domain.com/";

module.exports = {
  "fr_fr":{
    //global meta config
    base_url: baseURL_fr_fr,
    html: {
      title : "Title",
      description : "Description"
    },
    og: {
      title: "Title OG",
      description: "Description OG",
      url: baseURL_fr_fr+"?v="+config.shareCacheVersion,
      name: "Application Name",
      type: "website",
      image: baseURL_fr_fr+"assets/images/share-fb.png?v="+config.shareCacheVersion,
      locale: "fr_FR"
    },
    twitter: {
      card: "summary_large_image",
      title: "Title Twitter",
      description: "Description Twitter",
      site: "@username",
      creator: "@username",
      image: baseURL_fr_fr+"assets/images/share-tw.png?v="+config.shareCacheVersion
    },
    "test":{
      html: {
        title : "Title Test",
        description : "Description Test"
      },
      og: {
        title : "Title Test OG",
        description : "Description Test OG"
      },
      twitter: {
        title : "Title Test Twitter",
        description : "Description Test Twitter"
      }
    },
    "test/localisation":{
      html: {
        title : "Title Test localisation",
        description : "Description Test localisation"
      },
      og: {
        title : "Title Test localisation OG",
        description : "Description localisation OG"
      },
      twitter: {
        title : "Title Test localisation Twitter",
        description : "Description Test localisation Twitter"
      }
    }
  }
};