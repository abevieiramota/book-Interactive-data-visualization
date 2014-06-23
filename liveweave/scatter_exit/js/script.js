var h = 500;
var w = 500;
var max_x = 100;
var max_y = 200;
var min_r = 10;
var max_r = 15;
var dataset = [];
var X = function(d) {
  return d.x;
};
var y = function(d) {
  return d.y;
};

var svg = d3.select("body").append("svg");

var xScale = d3.scale
.linear()
.domain([0, max_x])
.range([0, w]);

var yScale = d3.scale
.linear()
.domain([0, max_y])
.range([0, h]);

var rScale = d3.scale
.linear()
.domain([0, max_y])
.range([min_r, max_r]);

d3.select("#adicionar")
.on("click", function() {
  
  var new_value = {
    x: Math.random()*max_x,
    y: Math.random()*max_y
  };
  dataset.push(new_value);

  svg.selectAll("circle")
  .data(dataset)
  .enter()
  .append("circle")
  .attr({
    cx: function(d) {
      return xScale(d.x);
    },
    cy: function(d) {
      return yScale(d.y);
    },
    r: function(d) {
      return rScale(d.y);
    },
    fill: "black"
  });
});

d3.select("#remover")
.on("click", function() {
  
  dataset.pop();
  console.log(dataset);
  
  svg.selectAll("circle")
  .data(dataset)
  .exit()
  .transition()
  .duration(2000)
  .attr("cx", 0)
  .attr("cy", 0)
  .attr("r", 1)
  .remove();
});