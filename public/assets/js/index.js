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
    subject: "Formation initiale"
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
      toggleGitTooltip(e, `Cours Préparatoires aux Grandes Écoles (CPGE), Lycée Louis Thuillier, Amiens
      <br>Filière Mathématiques, Informatique et Science de l’Ingénieur (MPSI) 
      <br>Option Programmation`)
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
      toggleGitTooltip(e, `Ecole Supérieure d'Art et de Design (ESAD), Amiens : 
      <br>- Modèle vivant
      <br>- Nature morte
      <br>- Peinture
      <br>- Pastels.
      <br>Années clôturées par une exposition.
      `)
    }
  });
  develop.commit({
    subject: "2001 - DEUG MIAS 1",
    style:{
      message:{
        font: interactiveMessageFont
      }
    },
    onMessageClick: function(e){
      toggleGitTooltip(e, `Diplôme d'Études Universitaires Générales (DEUG), Amiens
      <br> Filière Mathématiques et Informatique Appliquées aux Sciences (MIAS)`)
    }
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
      toggleGitTooltip(e, `Institut universitaire professionnalisé (IUP), UVHC, Valenciennes
      <br> Filière Ingénierie des Arts de l'Image et du Spectacle Vivant (IAISV)
      <br>- Arts numériques : Photoshop, Illustrator, Flash, 3DS Max, programmation interactive
      <br>- Production vidéo : prise de vue, montage (Première, Final Cut), effets spéciaux (After Effects)
      <br>- Spectacle vivant : scénographie, scénario, costumes, réalisation de courts-métrages
      <br>- Arts plastiques : dessin, peinture, modèle vivant, sculpture, photographie argentique (prise de vue et développement)
      <br>- Cours théoriques : histoire de l'art, histoire de la musique, ésthétique de la photographie, droits de l'image
      `)
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
    subject: "2006 - Master 2 Médias Interactifs",
    style:{
      message:{
        font: interactiveMessageFont
      }
    },
    onMessageClick: function(e){
      toggleGitTooltip(e, `Master 2 Médias Interactifs, UVHC, Valenciennes
      <br>- Techniques de gestion de projets et d'entreprise
      <br>- Vidéo interactive
      <br>- Programmation web
      `)
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
      toggleGitTooltip(e, `Agence Touche Etoile, Roubaix
      <br>- Stage puis
      <br>- Membre de l'équipe de développement puis
      <br>- Lead Developer
      <br>- Garant de la qualité technique des applications
      <br>- Architecte des frameworks internes
      <br>- Référent technique best practices pour les nouveaux développeurs
      <br>- Consultant technique en déplacement client
      <br>- Gestion technique des projets
      <br>- Estimation des temps à passer pour devis client
      `)
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
      `Formateur Flash / AS3 pour les 3è année du cursus Chef de Projet à CEPRECO, CCI Grand Lille, Roubaix
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
      `Formateur Javascript pour les 3è année du cursus Chef de Projet à CEPRECO, CCI Grand Lille, Roubaix
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
      toggleGitTooltip(e, `Responsable de la production technique et R&D à OP1C, Roubaix
      <br>- Prise de brief, estimation, conception et réalisation des applications
      <br>- Animation des équipes
      <br>- Architecture des frameworks internes
      <br>- Applications internes pour l'amélioration de la performance des équipes, l'aide à la décision, la gestion des ressources humaines
      <br>- R&D
      `)
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
      toggleGitTooltip(e, `
      <br>- Organisation de la mise en oeuvre du RGPD au sein de l'agence
      <br>- Élaboration des grandes lignes des différentes politiques (PSSI, PAS, Classification des données, ...)
      <br>- Mise en place des différents registres (assets, fiches de traitement de la donnée personnelle, ...)
      <br>- Sensibilisation des équipes aux bonnes pratiques de la protection des données personnelles.
      `)
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