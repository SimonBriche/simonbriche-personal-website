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
      <ul>
      <li>Filière Mathématiques, Informatique et Science de l’Ingénieur (MPSI)</li>
      <li>Option Programmation</li>
      </ul>`)
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
      <ul>
      <li>Modèle vivant</li>
      <li>Nature morte</li>
      <li>Peinture</li>
      <li>Pastels</li>
      <li>Années clôturées par une exposition</li>
      </ul>`)
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
      <br>Filière Ingénierie des Arts de l'Image et du Spectacle Vivant (IAISV)
      <ul>
      <li>Arts numériques : Photoshop, Illustrator, Flash, 3DS Max, programmation interactive</li>
      <li>Production vidéo : prise de vue, montage (Première, Final Cut), effets spéciaux (After Effects)</li>
      <li>Spectacle vivant : scénographie, scénario, costumes, réalisation de courts-métrages</li>
      <li>Arts plastiques : dessin, peinture, modèle vivant, sculpture, photographie argentique (prise de vue et développement)</li>
      <li>Cours théoriques : histoire de l'art, histoire de la musique, ésthétique de la photographie, droits de l'image</li>
      </ul>`)
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
      <ul>
      <li>Techniques de gestion de projets et d'entreprise</li>
      <li>Vidéo interactive</li>
      <li>Programmation web</li>
      </ul>`)
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
      <ul>
      <li>Stage puis</li>
      <li>Membre de l'équipe de développement puis</li>
      <li>Lead Developer</li>
      <li>Garant de la qualité technique des applications</li>
      <li>Architecte des frameworks internes</li>
      <li>Référent technique best practices pour les nouveaux développeurs</li>
      <li>Consultant technique en déplacement client</li>
      <li>Gestion technique des projets</li>
      <li>Estimation des temps à passer pour devis client</li>
      </ul>`
    )}
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
      <ul>
      <li>Réalisation du plan de cours et de l'évolution</li>
      <li>Prise en main du logiciel</li>
      <li>Réalisation d'animations interactives</li>
      <li>Initiation au langage Orienté Objet avec ActionScript 3 (AS3)</li>
      <li>Réalisation d'un site internet interactif et animé avec AS3</li>
      <li>Évaluation des connaissances</li>
      </ul>`
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
      <ul>
      <li>Réalisation du plan de cours et de l'évolution</li>
      <li>Sensibilisation à la relation client <-> serveur</li>
      <li>Initiation à la programmation avec javascript</li>
      <li>Réalisation d'un jeu interactif avec javascript</li>
      <li>Initiation à jQuery</li>
      <li>Évaluation des connaissances</li>
      </ul>`
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
      <ul>
      <li>Prise de brief, estimation, conception et réalisation des applications</li>
      <li>Animation des équipes</li>
      <li>Architecture des frameworks internes</li>
      <li>Applications internes pour l'amélioration de la performance des équipes, l'aide à la décision, la gestion des ressources humaines</li>
      <li>R&D</li>
      </ul>`)
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
      <ul>
      <li>Organisation de la mise en oeuvre du RGPD au sein de l'agence</li>
      <li>Élaboration des grandes lignes des différentes politiques (PSSI, PAS, Classification des données, ...)</li>
      <li>Mise en place des différents registres (assets, fiches de traitement de la donnée personnelle, ...)</li>
      <li>Sensibilisation des équipes aux bonnes pratiques de la protection des données personnelles.</li>
      </ul>`)
    }
  }).tag("v2.2.3");
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
  develop.merge({
    branch: feature,
    commitOptions:{
      subject: " "
    }
  });
  develop.commit({
    subject: "01/2023 - Fin Responsable Développement Web - OP1C"
  })
  master.commit({
    subject: "2023 - Consultant Senior - Davidson",
    style:{
      message:{
        font: interactiveMessageFont
      }
    },
    onMessageClick: function(e){
      toggleGitTooltip(e, `Consultant Senior Architecte Solution à Davidson, Lille
      <ul>
      <li>Spécialisé dans l'architecture des solutions cloud</li>
      <li>Entretiens pour le recrutement de profils techniques, orientés JS et NodeJS</li>
      </ul>`)
    }
  }).tag("v3.0.0");
  develop.merge({
    branch: master,
    commitOptions:{
      subject: " ",
    }
  });
  feature.commit({
    subject: `${(new Date().getFullYear())} - Cloud Platform Engineer - Decathlon`,
    style:{
      message:{
        font: interactiveMessageFont
      }
    },
    onMessageClick: function(e){
      toggleGitTooltip(e, `Senior Architect Cloud DevOps Platform Engineer à Decathlon, Btwin Village, Lille
      <ul>
      <li>Développement d'une solution déployant une infrastructure cloud via un fichier YAML</li>
      <li>L'approche GitOPS déploie des composants cloud (environnement GCP) avec un simple commit</li>
      <li>Les resources elles-mêmes sont déployées avec Terraform</li>
      <li>La solution permet un déploiement similaire peu importe l'utilisateur</li>
      </ul>`)
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