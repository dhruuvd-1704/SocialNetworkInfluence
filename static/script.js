const svg = d3.select("svg"),
  width = +svg.attr("width"),
  height = +svg.attr("height");

// Fetch network data and draw the graph
fetch("/api/network")
  .then((response) => response.json())
  .then((data) => {
    const nodes = data.nodes;
    const links = data.links;

    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3
          .forceLink(links)
          .id((d) => d.id)
          .distance((d) => d.weight * 50)
      )
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(width / 2, height / 2));

    const link = svg
      .append("g")
      .selectAll("line")
      .data(links)
      .enter()
      .append("line")
      .attr("stroke-width", (d) => d.weight);

    const node = svg
      .append("g")
      .selectAll("circle")
      .data(nodes)
      .enter()
      .append("circle")
      .attr("r", 10)
      .attr("fill", "blue");

    node.append("title").text((d) => d.id);

    simulation.on("tick", () => {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
    });
  });

// Function to find and display the shortest influence path
function findShortestPath() {
  const source = document.getElementById("source").value;
  const target = document.getElementById("target").value;

  fetch(`/api/shortest_path?source=${source}&target=${target}`)
    .then((response) => response.json())
    .then((data) => {
      const resultElement = document.getElementById("result");
      if (data.path) {
        resultElement.textContent = `Shortest Path: ${data.path.join(
          " -> "
        )} (Length: ${data.length})`;
      } else {
        resultElement.textContent = "No path found between the selected nodes.";
      }
    });
}
