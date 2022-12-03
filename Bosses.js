var margin = {top: 120, right: 30, bottom: 30, left: 60},
width = 1920 - margin.left - margin.right,
height = 950 - margin.top - margin.bottom;


var BossesSVG = d3.select("#BossesSVG")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");

d3.csv("NBA1516.csv", function(data) {
    	 // Add X axis
	 var x = d3.scaleLinear()
     .domain([0, 12])
     .range([ 0, width ]);
  

   var x_axis = BossesSVG.append("g")
     .attr("transform", "translate(0," + height + ")")
     .call(d3.axisBottom(x));

  x_axis.selectAll(".tick text")
      .style("fill","white");
 
     
   // Add Y axis
   var y = d3.scaleLinear()
     .domain([2, 9])
     .range([ height, 0]);
   var y_axis = BossesSVG.append("g")
     .call(d3.axisLeft(y));
  
  y_axis.selectAll(".tick text")
     .style("fill","white");


   // Add dots
   BossesSVG.append('g')
     .selectAll("dot")
     .data(data.filter(function (d){return d.ptsNorm > d.rebNorm && d.ptsNorm > d.astNorm }))
     .enter()
     .append("circle")
       .attr("cx", function (d) { return x(d.umapX); } )
       .attr("cy", function (d) { return y(d.umapY); } )
       .attr("r", 2)
       .style("fill", "#fd6b6b")
     .data(data.filter(function (d){return d.rebNorm > d.ptsNorm && d.rebNorm > d.astNorm }))
     .enter()
     .append("circle")
         .attr("cx", function (d) { return x(d.umapX); } )
         .attr("cy", function (d) { return y(d.umapY); } )
         .attr("r", 2)
         .style("fill", "#039d63")
     .data(data.filter(function (d){return d.astNorm > d.ptsNorm && d.astNorm > d.rebNorm }))
     .enter()
     .append("circle")
             .attr("cx", function (d) { return x(d.umapX); } )
             .attr("cy", function (d) { return y(d.umapY); } )
             .attr("r", 2)
             .style("fill", "#1974d2")  
  
 })