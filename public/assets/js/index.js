document.addEventListener('DOMContentLoaded', function() {
  const graphContainer = document.getElementById("graph-container");
  const messageFont = "normal 40pt Ubuntu, sans-serif";
  const interactiveMessageFont = "bold italic 40pt Ubuntu, sans-serif";
  const tagFont = "normal 30pt Ubuntu, sans-serif";

  // Instantiate the graph.
  const gitgraph = GitgraphJS.createGitgraph(graphContainer, {
    author: "Simon BRICHE < >",
    responsive: true,
    
    template: GitgraphJS.templateExtend("metro", {
      colors: ["#215fb8", "#be451d", "#f49f38", "#f49f38"],
      branch:{
        label:{
          font: tagFont
        }
      },
      commit:{
        message:{
          displayAuthor: false,
          displayHash: false,
          font: messageFont
        }
      },
      tag:{
        font: tagFont
      }
    })
  });

  // Simulate git commands with Gitgraph API.
  const develop = gitgraph.branch("develop");
  const master = gitgraph.branch("master");
  
  develop.commit({
    subject: "Formation initiale",
    style:{
      message:{
        font: interactiveMessageFont
      }
    },
    onMessageClick: function(e){
      toggleGitTooltip(e, "Lycée Henri Martin, Saint-Quentin (02)")
    }
  });

  master.merge({
    branch: develop,
    commitOptions:{
      subject: "1999 - Baccalauréat S (Scientifique)",
      style:{
        message:{
          font: interactiveMessageFont
        }
      },
      onMessageClick: function(e){
        toggleGitTooltip(e, "Lycée Henri Martin, Saint-Quentin (02)")
      }
    }
  }).tag("v1.0.0");
  develop.merge({
    branch: master,
    commitOptions:{
      subject: " ",
    }
  });

  develop.commit({
    subject: "2000 - CPGE MPSI",
    style:{
      message:{
        font: interactiveMessageFont
      }
    },
    onMessageClick: function(e){
      toggleGitTooltip(e, "Mathématiques, Informatique et Science de l’Ingénieur, Lycée Louis Thuillier, Amiens")
    }
  });
  const feature = develop.branch("feature");
  feature.commit({
    subject: "2000 - Cours du soir à l'ESAD",
    style:{
      message:{
        font: interactiveMessageFont
      }
    },
    onMessageClick: function(e){
      toggleGitTooltip(e, `Ecole Supérieure d'Art et de Design, Amiens : 
      <br>- Modèle vivant
      <br>- Nature morte
      <br>- Peinture
      <br>- Pastels.
      <br>Années clôturées par une exposition.
      `)
    }
  });
  develop.commit({
    subject: "2001 - DEUG MIAS 1"
  });
  develop.commit({
    subject: "2002 - DEUG MIAS 2"
  });
  feature.commit({
    subject: "2002 - Fin ESAD"
  }).tag("v1.1.0");
  develop.merge({
    branch: feature,
    commitOptions:{
      subject: " "
    }
  });
  master.commit({
    subject: "2002 - Obtention DEUG MIAS"
  }).tag("v1.2.0")
  develop.merge({
    branch: master,
    commitOptions:{
      subject: " ",
    }
  });
  develop.commit({
    subject: "2003 - IUP IAISV 1",
    style:{
      message:{
        font: interactiveMessageFont
      }
    },
    onMessageClick: function(e){
      toggleGitTooltip(e, "Ingénierie des Arts de l'Image et du Spectacle Vivant, UVHC, Valenciennes")
    }
  })
  develop.commit({
    subject: "2004 - IUP IAISV 2"
  })
  develop.commit({
    subject: "2005 - IUP IAISV 3"
  })
  master.commit({
    subject: "2005 - IUP IAISV Diplôme d'ingénieur-maître"
  }).tag("v1.3.0")
  develop.merge({
    branch: master,
    commitOptions:{
      subject: " ",
    }
  });
  develop.commit({
    subject: "2006 - Master 2 (M2) Médias Interactifs",
    style:{
      message:{
        font: interactiveMessageFont
      }
    },
    onMessageClick: function(e){
      toggleGitTooltip(e, "UVHC, Valenciennes")
    }
  })
  master.commit({
    subject: "2006 - Diplôme Master 2 (M2)"
  }).tag("v2.0.0")
  develop.merge({
    branch: master,
    commitOptions:{
      subject: " ",
    }
  });
  master.commit({
    subject: "2006 - Lead Developer - Touche Etoile",
    style:{
      message:{
        font: interactiveMessageFont
      }
    },
    onMessageClick: function(e){
      toggleGitTooltip(e, `Stage, puis membre de l'équipe de développement, puis Lead Developer à Touche Etoile, Roubaix :
      Garant de la qualité technique des applications, architecte des frameworks internes, référent technique best practices pour les nouveaux développeurs, consultant technique en déplacement client, gestion technique des projets, estimation des temps à passer pour devis client`)
    }
  }).tag("v2.1.0")
  develop.merge({
    branch: master,
    commitOptions:{
      subject: " ",
    }
  });
  feature.commit({
    subject: "2009 - Formateur Flash à CEPRECO",
    style:{
      message:{
        font: interactiveMessageFont
      }
    },
    onMessageClick: function(e){toggleGitTooltip(e, 
      `Formateur Flash / AS3 pour les 3è année du cursus Chef de Projet à CEPRECO, CCI Grand Lille, Roubaix :
      <br>- Réalisation du plan de cours et de l'évolution
      <br>- Prise en main du logiciel
      <br>- Réalisation d'animations interactives
      <br>- Initiation au langage Orienté Objet avec ActionScript 3 (AS3)
      <br>- Réalisation d'un site internet interactif et animé avec AS3
      <br>- Évaluation des connaissances`
    )}
  }).tag("v2.1.1");
  feature.commit({
    subject: "05/2013 - Création Auto-entreprise",
    style:{
      message:{
        font: interactiveMessageFont
      }
    },
    onMessageClick: function(e){
      toggleGitTooltip(e, `Auto-entrepreneur dans la création d'application web.`)
    }
  }).tag("v2.1.2");
  develop.merge({
    branch: feature,
    commitOptions:{
      subject: " "
    }
  });
  develop.commit({
    subject: "06/2013 - Fin Lead Developer - Touche Etoile"
  })
  feature.commit({
    subject: "09/2013 - Formateur Javascript à CEPRECO",
    style:{
      message:{
        font: interactiveMessageFont
      }
    },
    onMessageClick: function(e){toggleGitTooltip(e, 
      `Formateur Javascript pour les 3è année du cursus Chef de Projet à CEPRECO, CCI Grand Lille, Roubaix :
      <br>- Réalisation du plan de cours et de l'évolution
      <br>- Sensibilisation à la relation client <-> serveur
      <br>- Initiation à la programmation avec javascript
      <br>- Réalisation d'un jeu interactif avec javascript
      <br>- Initiation à jQuery
      <br>- Évaluation des connaissances`
    )}
  });
  feature.commit({
    subject: "12/2013 - Intervenant - e-ArtSup",
    style:{
      message:{
        font: interactiveMessageFont
      }
    },
    onMessageClick: function(e){
      toggleGitTooltip(e, "Animation d'un workshop ‘Flash et applications mobiles’ pour e-ArtSup, École de création visuelle (groupe IONIS), Lille")
    }
  });
  master.commit({
    subject: "2014 - Responsable Développement Web - OP1C",
    style:{
      message:{
        font: interactiveMessageFont
      }
    },
    onMessageClick: function(e){
      toggleGitTooltip(e, "Responsable de la production technique et R&D à OP1C, Roubaix")
    }
  }).tag("v2.2.0");
  develop.merge({
    branch: master,
    commitOptions:{
      subject: " ",
    }
  });
  feature.commit({
    subject: "2014 - Jury de fin d'année - e-ArtSup",
    style:{
      message:{
        font: interactiveMessageFont
      }
    },
    onMessageClick: function(e){
      toggleGitTooltip(e, "Jury de la promotion de 3è année pour e-ArtSup, École de création visuelle, Lille")
    }
  }).tag("v2.2.1") 
  feature.commit({
    subject: "2018 - Fin CEPRECO"
  }).tag("v2.2.2");
  develop.merge({
    branch: feature,
    commitOptions:{
      subject: " "
    }
  });
  feature.commit({
    subject: "2018 - Data Protection Officer à OP1C",
    style:{
      message:{
        font: interactiveMessageFont
      }
    },
    onMessageClick: function(e){
      toggleGitTooltip(e, "Organisation de la mise en oeuvre du RGPD au sein de l'agence en élaborant les grandes lignes des différentes politiques (PSSI, PAS, Classification des données, ...) et des différents registres (assets, fiches de traitement de la donnée personnelle, ...). Sensibilisation des équipes aux bonnes pratiques de la protection des données personnelles.")
    }
  }).tag("v2.3.0");
  develop.merge({
    branch: feature,
    commitOptions:{
      subject: " "
    }
  });
  feature.commit({
    subject: "2021 - Jury de fin d'année - e-ArtSup",
    style:{
      message:{
        font: interactiveMessageFont
      }
    },
    onMessageClick: function(e){
      toggleGitTooltip(e, "Jury de la promotion de 5è année pour e-ArtSup, École de création visuelle, Lille")
    }
  })
  master.commit({
    subject: (new Date().getFullYear())+" - Responsable Développement Web - OP1C"
  })
  develop.merge({
    branch: master,
    commitOptions:{
      subject: " ",
    }
  });

  let currentHash;
  const tooltip = document.getElementById('graph-tooltip');
  const SVGgraph = document.querySelector('#graph-container svg');
  tooltip.onblur = function() {
    tooltip.classList.remove('show');
  }
  function toggleGitTooltip(commit, text){
    const originalHeight = SVGgraph.viewBox.baseVal.height;
    const actualHeight = document.getElementById('graph-container').getBoundingClientRect().height;
    const ratio = actualHeight/originalHeight;

    tooltip.innerHTML = text;
    tooltip.style.top = (commit.y*ratio)+'px';
    tooltip.style.left = (commit.x*ratio)+'px';

    if(currentHash === commit.hash){
      currentHash = "";
      tooltip.classList.remove('show');
    }
    else{
      currentHash = commit.hash;
      tooltip.classList.add('show');
      tooltip.focus();
    }
  }

});