var h = 500;
var w = 500;
var dataset = [
  [
    // azul
    {x:0, y:13},
    {x:1, y:4},
    {x:2, y:10},
    {x:3, y:20}
  ],
  [
    // laranja
    {x:0, y:10},
    {x:1, y:10},
    {x:2, y:33},
    {x:3, y:10}
  ],
  [
    // verde
    {x:0, y:10},
    {x:1, y:10},
    {x:2, y:10},
    {x:3, y:10}
  ]
];
var colors = d3.scale.category10();

var stack = d3.layout.stack();
stack(dataset);

var xScale = d3.scale
.ordinal()
.domain(d3.range(dataset[0].length))
.rangeRoundBands([0, w], 0.05);

var yScale = d3.scale
.linear()
.domain([0, d3.max(dataset, function(d) {
  return d3.max(d, function(d) {
    return d.y0 + d.y;
  });
})])
.range([0, h]);

var svg = d3.select("body").append("svg")
.attr({
  width: w,
  height: h
});

var groups = svg.selectAll("g")
.data(dataset)
.enter()
.append("g")
.style("fill", function(d, i) {
  return colors(i);
});

var bars = groups.selectAll("rect")
.data(function(d) {
  return d;
});

bars
.enter()
.append("rect")
.attr({
  x: function(d, i) {
    return xScale(i);
  },
  y: function(d) {
    return 0;
  },
  height: function(d) {
    return 0;
  },
  width: function(d) {
    return xScale.rangeBand();
  }
});


bars
.transition()
.duration(function(d) {
  return 2000 - d.y*50;
})
.ease("bounce")
.attr({
  x: function(d, i) {
    return xScale(i);
  },
  y: function(d) {
    return h-yScale(d.y0)-yScale(d.y);
  },
  height: function(d) {
    return yScale(d.y);
  },
  width: function(d) {
    return xScale.rangeBand();
  }
});















