var h = 400;
var w = 400;
var max_r = 30;
var padding = 30;
var dataset = [];

var svg = d3.select("body").append("svg");

d3.select("#botao")
.on("click", function() {
  
  var new_point = {
    cx: Math.random()*(w-padding),
    cy: Math.random()*(h-padding),
    r: Math.random()*max_r
  };
  
  dataset.push(new_point);
  
  var points = svg.selectAll("circle")
  .data(dataset);
  
  points
  .enter()
  .append("circle")
  .attr({
    cx: function(d) {
      return d.cx;
    },
    cy: function(d) {
      return d.cy;
    },
    r: function(d) {
      return 0;
    }
  })
  .on("mouseover", function(d) {
    
    d3.select(this)
    .transition()
    .duration(300)
    .ease("cubic")
    .attr("fill", function(){
      var red = Math.random()*255;
      var green = Math.random()*255;
      var blue = Math.random()*255;
      return d3.rgb(red, green, blue);
    })
    .attr("r", function(d) {
      return d.r+10;
    })
    .attr("cx", function(d){
      return d.cx + Math.random()*50;
    })
    .attr("cy", function(d){
      return d.cy + Math.random()*50;
    });
    
    svg.append("text")
    .attr({
      x: d.cx,
      y: d.cy-10      
    })
    .text("raio="+d.r);
  })
  .on("mouseout", function(d) {
    
    d3.select(this)
    .transition()
    .ease("bounce")
    .duration(1000)
    .attr("fill", "black")
    .attr("r", function(d) {
      return d.r;
    });
    
    svg.select("text").remove();
  });
  
  points
  .transition()
  .ease("bounce")
  .duration(1000)
  .attr({
    cx: function(d) {
      return d.cx;
    },
    cy: function(d) {
      return d.cy;
    },
    r: function(d) {
      return d.r;
    }
  });
});