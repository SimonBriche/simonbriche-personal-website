document.addEventListener('DOMContentLoaded', function() {
  const graphContainer = document.getElementById("graph-container");
 
  // Instantiate the graph.
  const gitgraph = GitgraphJS.createGitgraph(graphContainer, {
    author: "Simon BRICHE < >",
    responsive: true,
    
    template: GitgraphJS.templateExtend("metro", {
      colors: ["#215fb8", "#be451d", "#f49f38", "#f49f38"],
      commit:{
        message:{
          displayAuthor: false,
          displayHash: false
        }
      }
    })
  });

  // Simulate git commands with Gitgraph API.
  const develop = gitgraph.branch("develop");
  const master = gitgraph.branch("master");
  develop.commit({
    subject: "Formation initiale",
    onClick: function(e){
      toggleGitTooltip(e, "Lycée Henri Martin, Saint-Quentin (02)")
    }
  });

  master.merge({
    branch: develop,
    commitOptions:{
      subject: "1999 - Baccalauréat S (Scientifique)",
      onClick: function(e){
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
    onClick: function(e){
      toggleGitTooltip(e, "(Mathématiques, Informatique et Science de l’Ingénieur), Lycée Louis Thuillier, Amiens")
    }
  });
  const esadFeature = develop.branch("esad-feature");
  esadFeature.commit({
    subject: "2000 - Cours du soir à l'ESAD",
    onClick: function(e){
      toggleGitTooltip(e, "(Ecole Supérieure d'Art et de Design), Amiens")
    }
  });
  develop.commit({
    subject: "2001 - DEUG MIAS 1",
    onClick: function(e){
      toggleGitTooltip(e, "(Mathématiques, Informatique et Applications aux Sciences), Université de Picardie Jules Verne, Amiens")
    }
  });
  develop.commit({
    subject: "2002 - DEUG MIAS 2",
    onClick: function(e){
      toggleGitTooltip(e, "(Mathématiques, Informatique et Applications aux Sciences), Université de Picardie Jules Verne, Amiens")
    }
  });
  esadFeature.commit({
    subject: "2002 - Fin ESAD",
    onClick: function(e){
      toggleGitTooltip(e, "(Ecole Supérieure d'Art et de Design), Amiens")
    }
  }).tag("v1.1.0");
  develop.merge({
    branch: esadFeature,
    commitOptions:{
      subject: " "
    }
  });
  //esadFeature.delete();
  master.commit({
    subject: "2002 - Obtention DEUG MIAS",
    onClick: function(e){
      toggleGitTooltip(e, "(Mathématiques, Informatique et Applications aux Sciences), Université de Picardie Jules Verne, Amiens")
    }
  }).tag("v1.2.0")
  develop.merge({
    branch: master,
    commitOptions:{
      subject: " ",
    }
  });
  develop.commit({
    subject: "2003 - IUP IAISV 1",
    onClick: function(e){
      toggleGitTooltip(e, "(Ingénierie des Arts de l'Image et du Spectacle Vivant), UVHC, Valenciennes")
    }
  })
  develop.commit({
    subject: "2004 - IUP IAISV 2",
    onClick: function(e){
      toggleGitTooltip(e, "(Ingénierie des Arts de l'Image et du Spectacle Vivant), UVHC, Valenciennes")
    }
  })
  develop.commit({
    subject: "2005 - IUP IAISV 3",
    onClick: function(e){
      toggleGitTooltip(e, "(Ingénierie des Arts de l'Image et du Spectacle Vivant), UVHC, Valenciennes")
    }
  })
  master.commit({
    subject: "2005 - Diplôme d'ingénieur-maître",
    onClick: function(e){
      toggleGitTooltip(e, "(Ingénierie des Arts de l'Image et du Spectacle Vivant), UVHC, Valenciennes")
    }
  }).tag("v1.3.0")
  develop.merge({
    branch: master,
    commitOptions:{
      subject: " ",
    }
  });
  develop.commit({
    subject: "2006 - Master 2 (M2) Médias Interactifs",
    onClick: function(e){
      toggleGitTooltip(e, "UVHC, Valenciennes")
    }
  })
  master.commit({
    subject: "2006 - Diplôme Master 2 (M2) Médias Interactifs",
    onClick: function(e){
      toggleGitTooltip(e, "UVHC, Valenciennes")
    }
  }).tag("v2.0.0")
  develop.merge({
    branch: master,
    commitOptions:{
      subject: " ",
    }
  });
  master.commit({
    subject: "2006 - Lead Developer - Touche Etoile",
    onClick: function(e){
      toggleGitTooltip(e, "Stage, puis membre de l'équipe de développement, puis Lead Developer à Touche Etoile, Roubaix")
    }
  }).tag("v2.1.0")
  develop.merge({
    branch: master,
    commitOptions:{
      subject: " ",
    }
  });
  const ceprecoFeature = develop.branch({
    name: "cepreco-feature",
    spacing: -10,
    style: {
      mergeStyle: "bezier",
      spacing: -10,
    }
  });
  ceprecoFeature.commit({
    subject: "2009 - Formateur à CEPRECO",
    onClick: function(e){
      toggleGitTooltip(e, "Formateur Flash puis Javascript à CEPRECO, CCI Grand Lille, Roubaix")
    }
  });
  develop.commit({
    subject: "2013 - Fin Lead Developer - Touche Etoile",
    onClick: function(e){
      toggleGitTooltip(e, "Stage, puis membre de l'équipe de développement, puis Lead Developer à Touche Etoile, Roubaix")
    }
  })
  /* const eartsupFeature = gitgraph.branch("eartsup-feature");
  eartsupFeature.commit({
    subject: "2013 - Intervenant - e-ArtSup",
    onClick: function(e){
      toggleGitTooltip(e, "Animation d'un workshop autour de la création d'applications mobile avec AIR pour e-ArtSup, École de création visuelle, Lille")
    }
  }); */
  master.commit({
    subject: "2014 - Responsable Développement Web - OP1C",
    onClick: function(e){
      toggleGitTooltip(e, "Responsable de la production technique et R&D à OP1C, Roubaix")
    }
  }).tag("v2.2.0")
  /* eartsupFeature.commit({
    subject: "2014 - Jury de fin d'année - e-ArtSup",
    onClick: function(e){
      toggleGitTooltip(e, "Jury de la promotion de 3è année pour e-ArtSup, École de création visuelle, Lille")
    }
  }).tag("v2.2.5") 
  develop.merge({
    branch: eartsupFeature,
    commitOptions:{
      subject: " "
    }
  }).tag("v2.2.5")
  */
  develop.merge({
    branch: master,
    commitOptions:{
      subject: " ",
    }
  });
  ceprecoFeature.commit({
    subject: "2018 - Fin CEPRECO",
    onClick: function(e){
      toggleGitTooltip(e, "(Ecole Supérieure d'Art et de Design), Amiens")
    }
  }).tag("v2.2.5");
  develop.merge({
    branch: ceprecoFeature,
    commitOptions:{
      subject: " "
    }
  });
  //ceprecoFeature.delete();
  master.commit({
    subject: "Aujourd'hui - Responsable Développement Web - OP1C",
    onClick: function(e, mouseOver, ev){
      console.log('params', e, mouseOver, ev)
      toggleGitTooltip(e, "Responsable de la production technique et R&D à OP1C, Roubaix")
    }
  })
  develop.merge({
    branch: master,
    commitOptions:{
      subject: " ",
    }
  });

  var currentHash;
  function toggleGitTooltip(commit, text){
    console.log('show', text, 'at coord', commit.x, commit.y)
    var tooltip = document.getElementById('graph-tooltip');
    var SVGgraph = document.querySelector('#graph-container svg');
    var originalHeight = SVGgraph.viewBox.baseVal.height;
    //var actualHeight = SVGgraph.getBBox().height;
    var actualHeight = document.getElementById('graph-container').getBoundingClientRect().height;
    var ratio = actualHeight/originalHeight;
    console.log('actualHeight', actualHeight, 'originalHeight', originalHeight, 'ratio', ratio)
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
    }
    console.log('commit', commit);
  }
});