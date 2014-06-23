var w = 500;
var h = 500;
var xPadding = 20;
var yPadding = 20;
var barPadding = 2;
var n = 20;
var dataset = [];

var atualizaDados = function() {
  
  dataset = [];
  
  for(var i=0;i<n;i++) {
    dataset.push(Math.round(Math.random()*100));
  }
  console.log(dataset);
};

atualizaDados();

var yScale = d3.scale
.linear()
.domain([0, d3.max(dataset)])
.range([yPadding, h-yPadding]);

var xScale = d3.scale
.ordinal()
.domain(d3.range(dataset.length))
.rangeRoundBands([0,w], 0.05);

var svg = d3
.select("body")
.append("svg");

var red = Math.random()*255;
var blue = Math.random()*255;

var bars = svg
.selectAll("rect")
.data(dataset)
.enter()
.append("rect")
.attr({
  x: function(d, i) {
    return xScale(i);
  },
  y: function(d) {
    return h-yScale(d);
  },
  width: xScale.rangeBand(),
  height: function(d) {
    return yScale(d);
  },
  fill: function(d) {
    return d3.rgb(red, d*2.5, blue);
  }
});

var labels = svg
.selectAll("text")
.data(dataset)
.enter()
.append("text")
.attr("class", "label")
.attr({
  y: function(d) {
    return h - yScale(d);
  },
  x: function(d, i) {
    return xScale(i)+2;
  }
})
.text(function(d) {
  return ""+d;
});

d3.select("p")
.on("click", function() {
  atualizaDados();
  var red = Math.random()*255;
  var blue = Math.random()*255;
  
  svg.selectAll("text")
  .data(dataset)
  .transition()
  .duration(function(d) {
    return d*100;
  })
  .attr({
    y: function(d) {
      return h - yScale(d) + 15;
    },
    x: function(d, i) {
      return xScale(i)+2;
    }
  })
  .text(function(d) {
    return ""+d;
  });
  
  svg.selectAll("rect")
  .data(dataset)
  .transition()
  .duration(function(d) {
    return d*100;
  })
  .ease("bounce")
  .attr({
    y: function(d) {
      return h - yScale(d);
    },
    height: function(d) {
      return yScale(d);
    },
    fill: function(d) {
      return d3.rgb(red, d*2.5, blue);
  }
  });
});