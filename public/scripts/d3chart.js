function displayGanttChart(scheduledDataSet) {
  var totalTimeDiv = d3.select("#totalTime");
  var totalEndTime = d3.max(scheduledDataSet, function(d) { return d.M3Stop });
  totalTimeDiv.select("p")
              .text("Total project time: " + totalEndTime);
  var vis = d3.select("#scheduleVisualisation");
  vis.selectAll("*").remove();
  var WIDTH = 800;
  var HEIGHT = 400;
  var MARGINS = {
          top: 30,
          right: 20,
          bottom: 20,
          left: 150
      };
  var roleLabels = ["Product Manager", "Software Developer", "Quality Assurance"];

  var xScale = d3.scale.linear()
                      .range([MARGINS.left, WIDTH - MARGINS.right])
                      .domain([0, totalEndTime]);
  var yScale = d3.scale.ordinal()
                      .rangeRoundBands([ 0, HEIGHT - MARGINS.bottom ], .1)
                      .domain(roleLabels);

  var xAxis = d3.svg.axis()
                    .scale(xScale);
  var yAxis = d3.svg.axis()
                    .scale(yScale)
                    .orient("left")
                    .ticks(3);
//background color for the svg:
  vis.append("rect")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("fill", "#f1f1d1");
  //draw axis
  vis.append("svg:g").attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")").call(xAxis);
  vis.append("svg:g").attr("transform", "translate(" + (MARGINS.left) + ",0)").call(yAxis);
//colorful tasks:
  var color = d3.scale.category20();

  var bodySelection = d3.select("body");

  var m1Bars = vis.selectAll(".m1Bar")
                  .data(scheduledDataSet)
                  .enter()
                  .append("rect");
  m1Bars.attr("x", function (d,i) { return xScale(d.M1Start); })
      .attr('class', 'bar m1Bar')
      .attr("y", function (d) { return yScale("Product Manager") + MARGINS.top; })
      .attr("width", function (d) { return xScale(d.M1Stop) - xScale(d.M1Start) })
      .attr("height", 50)
      .attr("fill",function(d,i){return color(i);});

  var m2Bars = vis.selectAll(".m2Bar")
                  .data(scheduledDataSet)
                  .enter()
                  .append("rect");
  m2Bars.attr("x", function (d,i) { return xScale(d.M2Start); })
      .attr('class', 'bar m2Bar')
      .attr("y", function (d) { return yScale("Software Developer") + MARGINS.top; })
      .attr("width", function (d) { return xScale(d.M2Stop) - xScale(d.M2Start) })
      .attr("height", 50)
      .attr("fill",function(d,i){return color(i);});

  var m3Bars = vis.selectAll(".m3Bar")
                  .data(scheduledDataSet)
                  .enter()
                  .append("rect");
  m3Bars.attr("x", function (d,i) { return xScale(d.M3Start); })
      .attr('class', 'bar m3Bar')
      .attr("y", function (d) { return yScale("Quality Assurance") + MARGINS.top; })
      .attr("width", function (d) { return xScale(d.M3Stop) - xScale(d.M3Start) })
      .attr("height", 50)
      .attr("fill",function(d,i){return color(i);});

  var tooltip = d3.select("body")
              		.append('div')
              		.attr('class', 'tooltip');

  tooltip.append('div')
  		  .attr('class', 'taskInfo');
  tooltip.append('div')
  		  .attr('class', 'timeInfo');

//not proud of it but now I really do not have the time nor the idea to refactor it
  vis.selectAll(".m1Bar")
		.on('mouseover', function(d) {
			tooltip.select('.taskInfo').html("<b>Task: " + d.Task + "</b>");
      tooltip.select('.timeInfo').html("Starts: " + d.M1Start + "</br> Stops: " + d.M1Stop);
			tooltip.style('display', 'block');
			tooltip.style('opacity',2);
		})
		.on('mousemove', function(d) {
			tooltip.style('top', (d3.event.layerY + 10) + 'px')
			.style('left', (d3.event.layerX - 25) + 'px');
		})
		.on('mouseout', function() {
			tooltip.style('display', 'none');
			tooltip.style('opacity',0);
		});
  vis.selectAll(".m2Bar")
    .on('mouseover', function(d) {
      tooltip.select('.taskInfo').html("<b>Task: " + d.Task + "</b>");
      tooltip.select('.timeInfo').html("Starts: " + d.M2Start + "</br> Stops: " + d.M2Stop);
      tooltip.style('display', 'block');
      tooltip.style('opacity',2);
    })
    .on('mousemove', function(d) {
      tooltip.style('top', (d3.event.layerY + 10) + 'px')
      .style('left', (d3.event.layerX - 25) + 'px');
    })
    .on('mouseout', function() {
      tooltip.style('display', 'none');
      tooltip.style('opacity',0);
    });
  vis.selectAll(".m3Bar")
    .on('mouseover', function(d) {
      tooltip.select('.taskInfo').html("<b>Task: " + d.Task + "</b>");
      tooltip.select('.timeInfo').html("Starts: " + d.M3Start + "</br> Stops: " + d.M3Stop);
      tooltip.style('display', 'block');
      tooltip.style('opacity',2);
    })
    .on('mousemove', function(d) {
      tooltip.style('top', (d3.event.layerY + 10) + 'px')
      .style('left', (d3.event.layerX - 25) + 'px');
    })
    .on('mouseout', function() {
      tooltip.style('display', 'none');
      tooltip.style('opacity',0);
    });

};
