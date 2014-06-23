// largura do gráfico
var w = 500;
// altura do gráfico
var h = 500;
// raio do círculo interno
var innerRadius = w / 3.4;
// raio do pie
var outerRadius = w / 2;
// tamanho dos espaços entre os pedaços
var explodeWidth = 5;
// cor do espaço entre os pedaços
var explodeColor = "white";
// cor do texto normal
var labelColor = "black";
// cor do texto com o mouse sobre o pedaço
var labelColorOver = "white";
// cor do pedaço com o mouse sobre
var piePieceOver = "black";
// número de dados
var n = 10;
var dataset = [];
// geração dos dados 
for(var i=0; i<n;i++) {
  dataset.push(Math.round(Math.random()*100));
}

var pie = d3.layout.pie();
var color = d3.scale.category10();

var svg = d3.select("body")
.append("svg")
.attr({
  width: w, 
  height: h
});

var arc = d3.svg.arc()
.innerRadius(innerRadius)
.outerRadius(outerRadius);

var arcs = svg.selectAll("g.arc")
.data(pie(dataset))
.enter()
.append("g")
.attr("class", "arc")
.attr("transform", "translate("+outerRadius+","+outerRadius+")");

arcs.append("path")
.attr("fill", function(d, i) {
  return color(i);
})
.attr("d", arc)
.attr("stroke-width", explodeWidth)
.attr("stroke", explodeColor)
.on("mouseover", function(d) {
  d3.select(this)
  .attr("fill", piePieceOver);
  d3.select(this.parentNode).select("text")
  .attr("fill", labelColorOver);
})
.on("mouseout", function(d,i) {
  d3.select(this)
  .attr("fill", color(i));
  d3.select(this.parentNode).select("text")
  .attr("fill", labelColor);
});

arcs.append("text")
.attr("transform", function(d) {
  return "translate("+arc.centroid(d)+")";
})
.attr("text-anchor", "middle")
.attr("fill", labelColor)
.text(function(d) {
  return d.value;
});