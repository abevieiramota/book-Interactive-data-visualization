var h = 500;
var w = 500;
var max_x = 100;
var max_y = 200;
var min_r = 10;
var max_r = 15;
var dataset = [];
var free_key = 0;

var X = function(d) {
  return d.x;
};
var y = function(d) {
  return d.y;
};
var key = function(d) {
  return d.key;
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
    y: Math.random()*max_y,
    key: free_key++
  };
  dataset.push(new_value);

  svg.selectAll("circle")
  .data(dataset, key)
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
  
  svg.selectAll("text")
  .data(dataset, key)
  .enter()
  .append("text")
  .attr({
    x: function(d) {
      return xScale(d.x);
    },
    y: function(d) {
      return yScale(d.y)-rScale(d.y);
    },
    fill: "red"
  })
  .text(function(d) {
    return ""+d.key;
  });
});

d3.select("#remover")
.on("click", function() {
  
  var key_to_remove = d3.select("#key").property("value");
  
  dataset = dataset.filter(function(d) {
    return ""+d.key != key_to_remove;
  });
  
  svg.selectAll("circle")
  .data(dataset, key)
  .exit()
  .transition()
  .duration(2000)
  .attr("cx", 0)
  .attr("cy", 0)
  .attr("r", 1)
  .attr("stroke-width", 1)
  .attr("stroke", "red")
  .remove();
  
  svg.selectAll("text")
  .data(dataset, key)
  .exit()
  .transition()
  .duration(2000)
  .attr({
    x: 0,
    y: 0
  })
  .remove();
});