const config = require('../config');
const baseURL_fr_fr = "https://domain.com/";
const baseURL_en_en = "https://domain.com/";

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
  },
  "en_en":{
    //global meta config
    base_url: baseURL_en_en,
    html: {
      title : "Title EN",
      description : "Description EN"
    },
    og: {
      title: "Title OG EN",
      description: "Description OG EN",
      url: baseURL_en_en+"?v="+config.shareCacheVersion,
      name: "Application Name EN",
      type: "website",
      image: baseURL_en_en+"assets/images/share-fb.png?v="+config.shareCacheVersion,
      locale: "fr_FR"
    },
    twitter: {
      card: "summary_large_image",
      title: "Title Twitter EN",
      description: "Description Twitter EN",
      site: "@username",
      creator: "@username",
      image: baseURL_en_en+"assets/images/share-tw.png?v="+config.shareCacheVersion
    },
    "test":{
      html: {
        title : "Title Test EN",
        description : "Description Test EN"
      },
      og: {
        title : "Title Test OG EN",
        description : "Description Test OG EN"
      },
      twitter: {
        title : "Title Test Twitter EN",
        description : "Description Test Twitter EN"
      }
    },
    "test/localisation":{
      html: {
        title : "Title Test localisation EN",
        description : "Description Test localisation EN"
      },
      og: {
        title : "Title Test localisation OG EN",
        description : "Description localisation OG EN"
      },
      twitter: {
        title : "Title Test localisation Twitter EN",
        description : "Description Test localisation Twitter EN"
      }
    }
  }
};