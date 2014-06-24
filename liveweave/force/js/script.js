// altura
var h = 500;
// largura
var w = 500;
// raio dos nós
var raio = 10;
// tamanho das arestas
var linkDistance = 100;
// largura das arestas
var linkWidth = 3;
// força de atração
var charge = -200;
var dataset = {
  nodes: [
    { name: "Abelardo"},
    { name: "Bereu"},
    { name: "Tuiu"},
    { name: "Toin Toin"},
    { name: "Josino"},
    { name: "Rogério"}
  ],
  edges: [
    { source:0, target:1},
    { source:1, target:2},
    { source:1, target:3},
    { source:3, target:0},
    { source:4, target:5},
    { source:0, target:5},
    { source:0, target:4}
  ]
};

var colors = d3.scale.category10();

var svg = d3.select("body")
.append("svg")
.attr({
  height: h, 
  width: w
});

var force = d3.layout.force()
.nodes(dataset.nodes)
.links(dataset.edges)
.size([w, h])
.linkDistance([linkDistance])
.charge([charge])
.start();

var edges = svg.selectAll("line")
.data(dataset.edges)
.enter()
.append("line")
.style("stroke", "#ccc")
.style("stroke-width", linkWidth);

var nodes = svg.selectAll("circle")
.data(dataset.nodes)
.enter()
.append("circle")
.attr("r", raio)
.style("fill", function(d, i) {
  return colors(i);
})
.call(force.drag);

var labels = svg.selectAll("text")
.data(dataset.nodes)
.enter()
.append("text")
.attr({
  x: function(d) {
    return d.x;
  },
  y: function(d) {
    return d.y-raio;
  }
})
.text(function(d) {
  return d.name;
});


force.on("tick", function() {

  edges.attr({
    x1: function(d) {
      return d.source.x;
    },
    y1: function(d) {
      return d.source.y;
    },
    x2: function(d) {
      return d.target.x;
    },
    y2: function(d) {
      return d.target.y;
    }    
  });
  
  nodes.attr({
    cx: function(d) {
      return d.x;
    },
    cy: function(d) {
      return d.y;
    }
  });
  
  labels.attr({
    x: function(d) {
      return d.x;
    },
    y: function(d) {
      return d.y-raio;
    }
  });
});


















