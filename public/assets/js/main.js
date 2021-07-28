document.addEventListener('DOMContentLoaded', function() {
  const graphContainer = document.getElementById("graph-container");
 
  // Instantiate the graph.
  const gitgraph = GitgraphJS.createGitgraph(graphContainer, {responsive: true});

  // Simulate git commands with Gitgraph API.
  const master = gitgraph.branch("master");
  master.commit("Initial commit");

  const develop = gitgraph.branch("develop");
  develop.commit("Add TypeScript");

  const aFeature = gitgraph.branch("a-feature");
  aFeature
    .commit("Make it work")
    .commit({ subject: "Make it right", hash: "test" })
    .commit("Make it fast");

  develop.merge(aFeature);
  develop.commit("Prepare v1");

  master.merge(develop).tag("v1.0.0");
});

