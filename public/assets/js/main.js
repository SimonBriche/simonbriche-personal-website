document.addEventListener('DOMContentLoaded', function() {
  const graphContainer = document.getElementById("graph-container");
 
  // Instantiate the graph.
  const gitgraph = GitgraphJS.createGitgraph(graphContainer, {
    author: "Simon BRICHE < >",
    responsive: true,
    
    template: GitgraphJS.templateExtend("metro", {
      colors: ["#be451d", "#215fb8", "#f49f38"],
      commit:{
        message:{
          displayAuthor: false,
          displayHash: false
        }
      }
    })
  });

  // Simulate git commands with Gitgraph API.
  const master = gitgraph.branch("master");
  master.commit({
    hash: "1999",
    subject: "1999 - Baccalauréat S (Scientifique)",
    onClick: function(e){
      toggleGitTooltip(e, "Lycée Henri Martin, Saint-Quentin (02)")
    }
    //body: "Lycée Henri Martin, Saint-Quentin (02)"
  });

  const develop = gitgraph.branch("develop");
  develop.commit({
    hash: "2000",
    subject: "2000 - CPGE MPSI",
    onClick: function(e){
      toggleGitTooltip(e, "(Mathématiques, Informatique et Science de l’Ingénieur), Lycée Louis Thuillier, Amiens")
    }
    //body: "(Mathématiques, Informatique et Science de l’Ingénieur), Lycée Louis Thuillier, Amiens"
  });
  const esadFeature = gitgraph.branch("esad-feature");
  esadFeature.commit({
    hash: "",
    subject: "2000 - Cours du soir à l'ESAD",
    onClick: function(e){
      toggleGitTooltip(e, "(Ecole Supérieure d'Art et de Design), Amiens")
    }
    //body: "(Ecole Supérieure d'Art et de Design), Amiens"
  });
  develop.commit({
    hash: "2001",
    subject: "2001 - DEUG MIAS 1",
    onClick: function(e){
      toggleGitTooltip(e, "(Mathématiques, Informatique et Applications aux Sciences), Université de Picardie Jules Verne, Amiens")
    }
    //body: "(Mathématiques, Informatique et Applications aux Sciences), Université de Picardie Jules Verne, Amiens"
  });
  develop.commit({
    //hash: "2002",
    subject: "2002 - DEUG MIAS 2",
    onClick: function(e){
      toggleGitTooltip(e, "(Mathématiques, Informatique et Applications aux Sciences), Université de Picardie Jules Verne, Amiens")
    }
    //body: "(Mathématiques, Informatique et Applications aux Sciences), Université de Picardie Jules Verne, Amiens"
  });
  develop.merge({
    branch: esadFeature,
    commitOptions:{
      subject: "2002 - Fin ESAD"
    }
  });
  master.merge({
    branch: develop,
    commitOptions:{
      subject: "2002 - Obtention DEUG MIAS",
      onClick: function(e){
        toggleGitTooltip(e, "(Mathématiques, Informatique et Applications aux Sciences), Université de Picardie Jules Verne, Amiens")
      }
    }
  }).tag("v1.0.0")

/*
  const aFeature = gitgraph.branch("a-feature");
  aFeature
    .commit("Make it work")
    .commit({ subject: "Make it right", hash: "test" })
    .commit("Make it fast");

  develop.merge(aFeature);
  develop.commit("Prepare v1");
*/
  //master.merge(develop).tag("v2.0.0");
  
  var currentHash;
  function toggleGitTooltip(commit, text){
    console.log('show', text, 'at coord', commit.x, commit.y)
    var tooltip = document.getElementById('graph-tooltip');
    var SVGgraph = document.querySelector('#graph-container svg');
    var originalHeight = SVGgraph.viewBox.baseVal.height;
    var actualHeight = SVGgraph.getBBox().height;
    var ratio = actualHeight/originalHeight;

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

  var modalFooter = new bootstrap.Modal(document.getElementById('modal-footer'), {
    keyboard: false,
    backdrop: false
  });

  document.querySelector('#btn-profile').addEventListener('click', function(){
    document.querySelector('footer').classList.toggle('open');
    modalFooter.show();
  }, false);
  document.querySelector('#btn-close-footer').addEventListener('click', function(){
    document.querySelector('footer').classList.toggle('open');
    modalFooter.hide();
  }, false);
});

