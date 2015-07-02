var HEIGHT = parseInt($('.graph-area').css('height')); //get height of the graph-area div
var WIDTH = parseInt($('.graph-area').css('width'));
var MARGINS = {
  left: 100, 
  right: 100, 
  top: 100, 
  bottom: 100
}

var dataBP = [
  {x: 0, y: 52},
  {x: 1, y: 53},
  {x: 2, y: 53},
  {x: 3, y: 50},
  {x: 4, y: 55},
  {x: 5, y: 62},
  {x: 6, y: 70},
  {x: 7, y: 143},
  {x: 8, y: 78},
  {x: 9, y: 75},
  {x: 10, y: 75},
  {x: 11, y: 70},
  {x: 12, y: 70},
  {x: 13, y: 66},
  {x: 14, y: 90},
  {x: 15, y: 77},
  {x: 16, y: 70},
  {x: 17, y: 64},
  {x: 18, y: 73},
  {x: 19, y: 101},
  {x: 20, y: 70},
  {x: 21, y: 63},
  {x: 22, y: 60},
  {x: 23, y: 58},
  {x: 24, y: 54},
] 


var xScale = d3.scale.linear()
 .range([MARGINS.left, WIDTH - MARGINS.right])
 .domain([0, 24]); //make the x scale and tick points
var yScale = d3.scale.linear()
 .range([HEIGHT - MARGINS.top, MARGINS.bottom])
 .domain([40, 180]); //make y scale and tick points

var xAxis = d3.svg.axis().scale(xScale).orient("bottom"); //orient x axis
var yAxis = d3.svg.axis().scale(yScale).orient("left"); //orient y axis

d3.select('.graph-area svg').append('g')
 .attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
 .attr("class","axis")
 .call(xAxis);

d3.select('.graph-area svg').append('g') 
 .attr("transform", "translate(" + MARGINS.left + ",0)")
 .attr("class","axis")
 .call(yAxis);

var line = d3.svg.line()
 .x(function(d){return xScale(d.x);})
 .y(function(d){return yScale(d.y);})


// Graph BP
d3.select('.graph-area svg').append('path')
 .transition() 
 .duration(2000)
 .ease("bounce")
 .attr('d', line(dataBP))
 .attr('stroke', 'red')
 .attr('stroke-width', 2)
 .attr('fill', 'none');



  var bisectY = d3.bisector(function(d) {return d.x;}).left; //maybe data.x instead of d?
  
  var svg = d3.select('svg');
  
  var focus = svg.append("g")
   .attr("class", "focus")
   .style("display", "none");


  focus.append("circle")
      .attr("r", 4.5);

  focus.append("text")
      .attr("x", 9)
      .attr("dy", ".35em");

  svg.on("mouseover", function() { focus.style("display", null); })
     .on("mouseout", function() { focus.style("display", "none"); })
     .on("mousemove", mousemove);

  function mousemove() {
   var data; 
   var xValue = xScale.invert(d3.mouse(this)[0]);
   var i = bisectY(dataBP, xValue, 1);
   var data0 = dataBP[i-1];
   var data1 = dataBP[i];
   if (xValue - data0.x > data1.x - xValue){
     data = data1;
   } else {
     data = data0;
   }
    focus.attr("transform", "translate(" + xScale(data.x) + "," + yScale(data.y) + ")");
    focus.select("text").text(data.y);
   }




// var HEIGHT = parseInt($('.graph-area').css("height")); //get the height of the graph div
// var WIDTH = parseInt($('.graph-area').css("width")); //get the width of the graph div
// var MARGINS = {
// 	left: 45,
// 	right: 30,
// 	top: 30,
// 	bottom: 30
// };// margins between the graph-area div and the graph itself 

// var dataRisk = [
//  {x: 0, y: 90},
//  {x: 1, y: 87},
//  {x: 2, y: 80},
//  {x: 3, y: 76},
//  {x: 4, y: 71},
//  {x: 5, y: 68},
//  {x: 6, y: 90},
//  {x: 7, y: 10},
//  {x: 8, y: 2},
//  {x: 9, y: 43},
//  {x: 10, y: 84},
//  {x: 11, y: 33},
//  {x: 12, y: 30}
// ]

// var dataChol = [
//  {x: 0, y: 10},
//  {x: 1, y: 27},
//  {x: 2, y: 83},
//  {x: 3, y: 2},
//  {x: 4, y: 50},
//  {x: 5, y: 34},
//  {x: 6, y: 90},
//  {x: 7, y: 10},
//  {x: 8, y: 2},
//  {x: 9, y: 43},
//  {x: 10, y: 84},
//  {x: 11, y: 13},
//  {x: 12, y: 30}
// ]

// var dataSug = [
//  {x: 0, y: 90},
//  {x: 1, y: 92},
//  {x: 2, y: 88},
//  {x: 3, y: 82},
//  {x: 4, y: 83},
//  {x: 5, y: 79},
//  {x: 6, y: 72},
//  {x: 7, y: 75},
//  {x: 8, y: 70},
//  {x: 9, y: 66},
//  {x: 10, y: 68},
//  {x: 11, y: 67},
//  {x: 12, y: 60}
// ]

// var xScale = d3.scale.linear()
// 	.range([MARGINS.left, WIDTH - MARGINS.right])
// 	.domain([0, 12]); //make the x scale and tick points
// var yScale = d3.scale.linear()
// 	.range([HEIGHT - MARGINS.top, MARGINS.bottom])
// 	.domain([0, 100]); //make y scale and tick points

// var xAxis = d3.svg.axis().scale(xScale).orient("bottom"); //orient x axis
// var yAxis = d3.svg.axis().scale(yScale).orient("left"); //orient y axis

// d3.select('.graph-area svg').append('g')
// 	.attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
// 	.call(xAxis);
// d3.select('.graph-area svg').append('g')
// 	.attr("transform", "translate(" + MARGINS.left + ",0)")
// 	.call(yAxis);

// var line = d3.svg.line()
// 	.x(function(d){return xScale(d.x);})
// 	.y(function(d){return yScale(d.y);})

// // Graph Total Risk (Avg)
// d3.select('.graph-area svg').append('path')
// 	.attr('d', line(dataRisk))
// 	.attr('stroke', 'red')
// 	.attr('stroke-width', 2)
// 	.attr('fill', 'none');

// // Graph Cholestorol 
// d3.select('.graph-area svg').append('path')
// 	.attr('d', line(dataChol))
// 	.attr('stroke', 'blue')
// 	.attr('stroke-width', 2)
// 	.attr('fill', 'none');

// // Graph Sugar Intake
// d3.select('.graph-area svg').append('path')
// 	.attr('d', line(dataSug))
// 	.attr('stroke', 'yellow')
// 	.attr('stroke-width', 2)
// 	.attr('fill', 'none');
// 	// .append("svg:title")
// 	// .text(function(d){
// 	// 	return d.x;
// 	// });	

// // Make path for slider? 

//   var bisectY = d3.bisector(function(d) {return d.x;}).left; //maybe data.x instead of d?
  
//   var svg = d3.select('svg');
  
//   var focus = svg.append("g")
//   	.attr("class", "focus")
//   	.style("display", "none");


//   focus.append("circle")
//       .attr("r", 4.5);

//   focus.append("text")
//       .attr("x", 9)
//       .attr("dy", ".35em");

//   svg.on("mouseover", function() { focus.style("display", null); })
//      .on("mouseout", function() { focus.style("display", "none"); })
//      .on("mousemove", mousemove);

//   function mousemove() {
//   	var data; 
//   	var xValue = xScale.invert(d3.mouse(this)[0]);
//   	var i = bisectY(dataRisk, xValue, 1);
//   	var data0 = dataRisk[i-1];
//   	var data1 = dataRisk[i];
//   	if (xValue - data0.x > data1.x - xValue){
//   		data = data1;
//   	} else {
//   		data = data0;
//   	}
//     focus.attr("transform", "translate(" + xScale(data.x) + "," + yScale(data.y) + ")");
//     focus.select("text").text(data.y);
//   	}



// the code above this works 

 // var x0 = x.invert(d3.mouse(this)[0]),
    //     i = bisectDate(dataRisk, x0, 1),
    //     d0 = dataRisk[i - 1],
    //     d1 = dataRisk[i],
    //     d = x0 - d0.x > d1.x - x0 ? d1 : d0;

// //




// // // ****    Slider Counter Try     **** //  //












// var x = $('g[transform="translate(0,370)"].tick'); //
// // var t = parseInt($(x[0]).attr("transform")); 

// $(x[0]).attr("transform"); 

// for var(i=0; i<x.length; i++){
// 	var t = $(x.[i]).attr("transform");
// 	var u = t.slice(10,13); 
// 	var v = parseInt(u);
// 	$('div[data-index=\"' + i + '\"]').css('left',v);
// }

// $("graph-area div").mouseenter(function(){
// 	var dataX = $(".graph-area div").data();
// 	$("graph-area #status").text("Value: "+ dataX);
// }); 


//// .mouseleave(function(){
//// });



// var xPos; 
// var yPos;
// // var xTickPos;

// document.querySelectorAll('[data-index]').onmouseover = function(event){
// 	// xTickPos = d3.select('svg')....
// 	xPos = dataRisk[event.pageX];
// 	yPos = dataRisk[event.pageY];

// 	document.getElementById('#status').text("yValue: "+ yPos);
// };

//

// document.querySelectorAll('[data-index]').addEventListener("mouseover", myScript)

// var linesGroupText = -1;
// var lines = -1; 
// var hoverContainer, hoverLine, hoverLineXOffset, hoverLineYOffset, hoverLineGroup; 

// var handleMouseOutGraph = function(event) {	
// 	// hide the hover-line
// 	hoverLine.classed("hide", true);
		
// 	setValueLabelsToLatest();
		
// 	//debug("MouseOut graph [" + containerId + "] => " + mouseX + ", " + mouseY)
		
// 	// user is no longer interacting
// 	userCurrentlyInteracting = false;
// 	currentUserPositionX = -1;
// 	}
	
// // Append a group to contain all lines
// lines = graph.append("svg:g")
// 				.attr("class", "lines")
// 			.selectAll("path")
// 				.data(data.values); // bind the array of arrays

// // Continue this reference so the selector doesn't show up every mouse event
// hoverContainer = container.querySelector('g .lines');

// // When mouse moves 
// $(container).mouseleave(function(event) {
// 			handleMouseOutGraph(event);
// 		})
		
// $(container).mousemove(function(event) {
// 			handleMouseOverGraph(event);
// 		})		
