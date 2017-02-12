var vis = d3.select("#scheduleVisualisation");
var WIDTH = 1000;
var HEIGHT = 500;
var MARGINS = {
        top: 20,
        right: 20,
        bottom: 20,
        left: 50
    };
var xScale = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([0,35]);
var yScale = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([0,3]);

var xAxis = d3.svg.axis().scale(xScale);
var yAxis = d3.svg.axis().scale(yScale);


vis.append("svg:g")
    .attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
    .call(xAxis);
