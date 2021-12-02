const {config} = require('../config');
const baseURL_fr_fr = "https://simonbriche.dev/";
const baseURL_en_en = "https://domain.com/";
const shareCacheVersion = config.application.shareCacheVersion;

module.exports = {
  "fr_fr":{
    //global meta config
    base_url: baseURL_fr_fr,
    html: {
      //opti 55c
      title : "Consultant digital et Développement web - Simon BRICHE",
      //opti 155c
      description : "J'apporte mon expertise du monde de la production d'applications web développées sur-mesure avec un objectif principal : augmenter la productivité."
    },
    og: {
      //between 40c and 50c
      title: "Consultant digital et Développement web - Simon BRICHE",
      //opti 60c, 200c max
      description: "J'apporte mon expertise du monde de la production d'applications web développées sur-mesure avec un objectif principal : augmenter la productivité.",
      url: baseURL_fr_fr+"?v="+shareCacheVersion,
      name: "Simon BRICHE",
      type: "website",
      image: config.cdnURL+"/assets/images/share-fb.png?v="+shareCacheVersion,
      locale: "fr_FR"
    },
    twitter: {
      card: "summary_large_image",
      //between 40c and 50c, 70c max
      title: "Consultant digital et Développement web - Simon BRICHE",
      //opti 60c, 200c max
      description: "J'apporte mon expertise du monde de la production d'applications web développées sur-mesure avec un objectif principal : augmenter la productivité.",
      site: "@amanodev69",
      creator: "@amanodev69",
      image: config.cdnURL+"/assets/images/share-tw.png?v="+shareCacheVersion
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
      url: baseURL_en_en+"?v="+shareCacheVersion,
      name: "Application Name EN",
      type: "website",
      image: baseURL_en_en+"assets/images/share-fb.png?v="+shareCacheVersion,
      locale: "fr_FR"
    },
    twitter: {
      card: "summary_large_image",
      title: "Title Twitter EN",
      description: "Description Twitter EN",
      site: "@username",
      creator: "@username",
      image: baseURL_en_en+"assets/images/share-tw.png?v="+shareCacheVersion
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