function displayGanttChart(scheduledDataSet) {
  var vis = d3.select("#scheduleVisualisation");
  console.log(vis[0])
  var WIDTH = 1000;
  var HEIGHT = 500;
  var MARGINS = {
          top: 20,
          right: 20,
          bottom: 20,
          left: 50
      };
  var xScale = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([0,100]);
  var yScale = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([0,3]);

  var xAxis = d3.svg.axis()
                    .scale(xScale);

  var yAxis = d3.svg.axis()
                    .scale(yScale)
                    .orient("left")
                    .ticks(3);

  vis.append("svg:g").attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")").call(xAxis);
  vis.append("svg:g").attr("transform", "translate(" + (MARGINS.left) + ",0)").call(yAxis);

//  vis.append("rect").attr("x", 25).attr("y", 25).attr("width", 25).attr("height", 25).style("fill", "purple");
  var bodySelection = d3.select("body");
  var m1Bars = vis.selectAll(".m1Bar")
                .data(scheduledDataSet)
                .enter()
                .append("rect");
  m1Bars.attr("x", function (d,i) { return xScale(d.M1Start); })
      .attr("y", function (d) { return yScale(1); })
      .attr("width", function (d) { return xScale(d.M1Stop) - xScale(d.M1Start) })
      .attr("height", 100);

  var m2Bars = vis.selectAll(".m2Bar")
                .data(scheduledDataSet)
                .enter()
                .append("rect");
  m2Bars.attr("x", function (d,i) { return xScale(d.M2Start); })
      .attr("y", function (d) { return yScale(2); })
      .attr("width", function (d) { return xScale(d.M2Stop) - xScale(d.M2Start) })
      .attr("height", 100);

  var m3Bars = vis.selectAll(".m3Bar")
                .data(scheduledDataSet)
                .enter()
                .append("rect");
  m3Bars.attr("x", function (d,i) { return xScale(d.M3Start); })
      .attr("y", function (d) { return yScale(3); })
      .attr("width", function (d) { return xScale(d.M3Stop) - xScale(d.M3Start) })
      .attr("height", 100);

};
