var h = 500;
var w = 500;
var mean = 0.0;
var deviation = 10.0;
var padding = 20;
var n = 400;

// dados
var dataset = [];

var atualiza_dataset = function() {
  var normal = d3.random.normal(mean, deviation);
  dataset = [];
  for(var i=0;i<n;i++) {
    var rand_value = normal();
    
    dataset.push(rand_value);
  }
};
atualiza_dataset();
// scales
var yScale = d3.scale
.linear()
.domain([d3.min(dataset), d3.max(dataset)])
.range([h-padding, padding]);
var xScale = d3.scale
.ordinal()
.domain(d3.range(n))
.rangeRoundBands([0,w], 0.05);
var rScale = d3.scale
.linear()
.domain([d3.min(dataset), d3.max(dataset)])
.range([0, 10]);
var strokeScale = d3.scale
.linear()
.domain([d3.min(dataset), d3.max(dataset)])
.range([2, 0.2]);

var svg = d3.select("body").append("svg");

var points = svg
.selectAll("circle")
.data(dataset)
.enter()
.append("circle")
.attr("class", "point")
.attr({
  cx: function(d, i) {
    return xScale(i);
  },
  cy: function(d) {
    return yScale(d);
  },
  r: function(d) {
    return rScale(d);
  }
});


d3.select("p")
.on("click", function() {
  atualiza_dataset();
  
  // atualiza os scales
  yScale.domain([d3.min(dataset), d3.max(dataset)]);
  rScale.domain([d3.min(dataset), d3.max(dataset)]);
  strokeScale.domain([d3.min(dataset), d3.max(dataset)]);
  var red = Math.random()*255;
  var blue = Math.random()*255;
  // atualiza os points
  console.log(dataset);
  points
  .data(dataset)
  .transition()
  .duration(function(d) {
    return 1000-d*25;
  })
  .ease("cubic")
  .attr("stroke-width", function(d) {
    return strokeScale(d);
  })
  .attr("stroke", function(d) {
    return d3.rgb(255-red+d, 255-d*10, 255-blue+d);
  })
  .attr({
    cx: function(d, i) {
      return xScale(i);
    },
    cy: function(d) {
      return yScale(d);
    },
    r: function(d) {
      return rScale(d);
    },
    fill: function(d) {
      return d3.rgb(red-d, d*10, blue-d);
    }
  });
});
