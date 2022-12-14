

var margin = {top: 200, right: 30, bottom: 30, left: 60};
//d3.selectAll('#totalPlayTime').remove()

var width =  window.innerWidth;
var height = window.innerHeight;


d3.csv("/Page1_data/battle_count.csv", d3.autoType)
        .then(function (data){
            d3.csv("/Page1_data/scatterplot_boss.csv", d3.autoType)
            .then(function(scatterplot){
                d3.csv("/Page1_data/heatmap.csv", d3.autoType)
                .then(function(heatmap){
                width =  window.innerWidth;
                height = window.innerHeight;
                OutlineSVG = d3.select("#OutlineSVG")
                    .attr("width", width - margin.left - margin.right)
                    .attr("height", height - margin.top + margin.bottom)
                    .append("g")
                    .attr("transform",
                        "translate(" + margin.left + "," + margin.top + ")")
                draw(data,scatterplot,heatmap,width,height,OutlineSVG,false)
                })
            })
        })
        .catch(function(error){
            console.error(error);
})


function draw(data,scatterplot,heatmap, width, height, OutlineSVG,updated = false){
    try{      
    // Add X axis
    var x = d3.scaleLinear()
        .domain([39-5,89+5])
        .range([ 0, width/2.2 ]);
     
 
    var x_axis = OutlineSVG.append("g")
        .attr("transform", "translate("+width/25+"," + height/2.3 + ")")
        .attr("stroke-width",4)
        .call(d3.axisBottom(x));
 
    x_axis.selectAll(".tick text")
         .attr("font-size", height/45+"px");
    
        
      // Add Y axis
    var y = d3.scaleLinear()
        .domain([0, 16])
        .range([ height/2.5, 0]);
    var y_axis = OutlineSVG.append("g")
        .attr("transform", "translate("+width/25+","+height/30+")")
        .attr("stroke-width",4)
        .call(d3.axisLeft(y));
     
    y_axis.selectAll(".tick text")
        .attr("font-size", height/45+"px");

   var dotsG = OutlineSVG.append('g');
   const tip = d3.tip()
    .attr('class', 'd3-tip')
    .html(function (d) { 
        if(d.Boss!=undefined)return "Name: "+d.Boss+ "<br> Level: " + d.Level + "<br> Tries: " + d.Tries + "<br> Avg: " + d.Avg +" seconds"
        else if(d.Day!=undefined)return d.Length + " minutes" 
        else return d.value})
    const scatterplotQuesTip = d3.tip()
    .attr('class', 'd3-tip2')
    .html("x-axis: avg time before dying<br>y-axis: number of tries before winning<br>star indicates harder level (regular)<br>black and white indicates I haven't win the level yet"
    )
  console.log("Tip-test")
  dotsG.call(tip)
  dotsG.call(scatterplotQuesTip);


     // Add dots
    var vardot = OutlineSVG.append('g')
    .selectAll("bossImage")
    .data(scatterplot)
    .enter()
    .append('image')
        .attr("xlink:href",function (d) { 
            return "/BossPictures/"+ d.Boss + d.Level + ".png"; } )
        .attr("width", height/15)
        .attr("height", height/15)
        .on('mouseover', tip.show)
        .on("mouseout", tip.hide)
        .transition()
        .duration(2000)
        .attr("y", function (d) { return y(d.Tries); } )
        .attr("x", function (d) { return x(d.Avg)+width/43; } );

        OutlineSVG.append('text')
            .attr('id','Legend')
            .text("# of tries ")
            .attr("font-size", height/40+"px")
            .attr("x", -100)
            .attr("y",height/3.2)
            .attr("style","writing-mode: tb; glyph-orientation-vertical: 0")
            .transition()
            .duration(700)
            .transition()
            .duration(2000)
            .attr("transform", "translate("+width/10+",0)");

        OutlineSVG.append('text')
            .attr('id','Legend')
            .text("Avg time")
            .attr("font-size", height/40+"px")
            .attr("x", -width/2)
            .attr("y",height/2.4)
            .transition()
            .duration(700)
            .transition()
            .duration(2000)
            .attr("transform", "translate("+width/1.1+",0)");
        
        OutlineSVG.append('text')
            .attr('id','Legend')
            .text("?")
            .attr("font-size", height/25+"px")
            .attr("x", width/2.2)
            .attr("y",height/20)
            .on('mouseover', scatterplotQuesTip.show)
            .on("mouseout", scatterplotQuesTip.hide);
///////////////////////////////////////PIECHART///////////////////////////////////////    
        var xPie=[width*1/6-200, width*2/6-200, width*3/6-200]
    
        OutlineSVG.append('text')
        .attr('id','Legend')
        .text("Island 1")
        .attr("font-size", height/40+"px")
        .attr("x", width*2/30)
        .attr("y", height*4.3/8)

        OutlineSVG.append('text')
        .attr('id','Legend')
        .text("Island 2")
        .attr("font-size", height/40+"px")
        .attr("x", width*7/30)
        .attr("y", height*4.3/8)

        OutlineSVG.append('text')
        .attr('id','Legend')
        .text("Total Boss")
        .attr("font-size", height/40+"px")
        .attr("x", width*12/30)
        .attr("y", height*4.3/8)

        console.log(width)
        var pie = d3.pie()
            .value(function(d) {return d.value; })
        var data_ready_simple = pie(d3.entries(data[0]))
        console.log(data[0])
        var data_ready_regular = pie(d3.entries(data[1]))
        var radius = height/8
        
        var color = d3.scaleOrdinal()
            .domain([0,2,14,22])
            .range(["gray", "#63a0bf"," #df4212", "#ffcf10"])

        var arcGenerator = d3.arc()
            .innerRadius(0)
            .outerRadius(radius)
        

        OutlineSVG.selectAll('#pie_simple')
            .data(data_ready_simple)
            .attr('id','pie_simple')
            .enter()
            .append('path')
            .attr('d',arcGenerator)
            .attr("transform", "translate("+xPie[0]+"," +  height*5.6/8+ ")")
            .attr("stroke", "black")
            .style("stroke-width", "2px")
            .attr('fill',"white")
            .on('mouseover', tip.show)
            .on("mouseout", tip.hide)
            .attr('fill',function(d){ return(color(d.data.key))})
            .style("opacity", 0)
            .transition()
            .duration(3500)
            .transition()
            .duration(2500)
            .style("opacity", 0.7);

        OutlineSVG.selectAll('#pie_simple')
            .attr('id','pie_simple')
            .data(data_ready_simple)
            .enter()
            .append('text')
            .text(function(d){ if(d.data.value != 0)return d.data.key})
            .attr("transform", function(d) { 
                var x = arcGenerator.centroid(d)[0] + xPie[0]
                var y = arcGenerator.centroid(d)[1] + ( height*5.6/8)
                return "translate("+ x + "," + y + ")";  })
            .style("text-anchor", "middle")
            .style("font-size", height/50)
            .style("opacity", 0)
            .transition()
            .duration(3500)
            .transition()
            .duration(2500)
            .style("opacity", 1);
            
            OutlineSVG.selectAll('pie_regular')
            .data(data_ready_regular)
            .enter()
            .append('path')
            .attr('d',arcGenerator)
            .attr("transform", "translate("+xPie[1]+"," +  height*5.6/8 + ")")
            .attr("stroke", "black")
            .style("stroke-width", "2px")
            .attr('fill','white')
            .on('mouseover', tip.show)
            .on("mouseout", tip.hide)
            .attr('fill',function(d){ return(color(d.data.key))})
            .attr('id','pie_regular')
            .style("opacity", 0)
            .transition()
            .duration(3500)
            .transition()
            .duration(2500)
            .style("opacity", 0.7);
            
            OutlineSVG.selectAll('pie_regular')
            .data(data_ready_regular)
            .enter()
            .append('text')
            .text(function(d){ if(d.data.value != 0)return d.data.key})
            .attr("transform", function(d) { 
                var x = arcGenerator.centroid(d)[0] + xPie[1]
                var y = arcGenerator.centroid(d)[1] + ( height*5.6/8)
                return "translate("+ x + "," + y + ")";  })
            .style("text-anchor", "middle")
            .style("font-size", height/50)
            .attr('id','pie_regular')
            .style("opacity", 0)
            .transition()
            .duration(3500)
            .transition()
            .duration(2500)
            .style("opacity", 1);
    
            var cols = d3.keys(data[0]),
            totals = {};
            cols.splice(0,1);
            data.forEach(function(d) {
                cols.forEach(function(k) {
                    if (k !== "key") {
                        if (k in totals) {
                            totals[k] += parseInt(d[k]);
                        } else {
                            totals[k] = parseInt(d[k]);
                        }
                    }
                });
            });
    
            var data_total_boss = pie(d3.entries(totals))
    
            var color2 = d3.scaleOrdinal()
            .domain([3,6,9,38])
            .range(["#63a0bf", "#df4212", "#ffcf10", "gray"])
    
            OutlineSVG.selectAll('total_boss')
            .attr('id','total_boss')
            .data(data_total_boss)
            .enter()
            .append('path')
            .attr('d',arcGenerator)
            .attr("transform", "translate("+xPie[2]+"," + height*5.6/8 + ")")
            .attr("stroke", "black")
            .style("stroke-width", "2px")
            .attr('fill','white')
            .on('mouseover', tip.show)
            .on("mouseout", tip.hide)
            .attr('fill',function(d){ return(color2(d.data.key))})
            .style("opacity", 0)
            .transition()
            .duration(3500)
            .transition()
            .duration(2500)
            .style("opacity", 0.7);
            
            OutlineSVG.selectAll('total_boss')
            .attr('id','total_boss')
            .data(data_total_boss)
            .enter()
            .append('text')
            .text(function(d){ if(d.data.value != 0)return d.data.key})
            .attr("transform", function(d) { 
                var x = arcGenerator.centroid(d)[0] + xPie[2]
                var y = arcGenerator.centroid(d)[1] + ( height*5.6/8)
                return "translate("+ x + "," + y + ")";  })
            .style("text-anchor", "middle")
            .style("font-size", height/60)
            .style("opacity", 0)
            .transition()
            .duration(3500)
            .transition()
            .duration(2500)
            .style("opacity", 1);
///////////////////////////////////////PIECHART///////////////////////////////////////

///////////////////////////////////////TEXT///////////////////////////////////////

        textFont = height/17+"px";
        funFactX = width*6/10
        funFactY = height*3/5

        OutlineSVG.append('text')
            .attr('id','totalPlayTime')
            .text("Total Play Time: ")
            .attr("font-size", height/12+"px")
            .attr("x", funFactX)
            .attr("y",funFactY);

        OutlineSVG.append('text')
            .attr('id','totalPlayTime')
            .text("6 hrs 15 minutes")
            .attr("font-size", textFont)
            .attr("x", funFactX*1.03)
            .attr("y",funFactY*1.15);
///////////////////////////////////////TEXT///////////////////////////////////////

////////////////

var horizontal = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
var vertical = ["Oct","Sep"]


var heatmapX = d3.scaleBand()
  .range([ 0, width/2.6 ])
  .domain(horizontal)
  .padding(0.05);
OutlineSVG.append("g")
    .attr("stroke-width",4)
    .attr("transform", "translate("+width/1.85+"," + height/2.3 + ")")
  .call(d3.axisBottom(heatmapX))
  .attr("font-size", height/50+"px");

// Build X scales and axis:
var heatmapY = d3.scaleBand()
  .range([ height/2.5, 0 ])
  .domain(vertical)
  .padding(0.02);
OutlineSVG.append("g")
    .attr("stroke-width",4)
    .attr("transform", "translate("+width/1.85+","+height/30+")")
  .call(d3.axisLeft(heatmapY))
  .attr("font-size", height/50+"px");

// Build color scale
var myColorBlue = d3.scaleLinear()
  .range(["white", "#63a0bf"])
  .domain([0,59])
var myColorRed = d3.scaleLinear()
  .range(["white", "#e4430f"])
  .domain([0,59])

  OutlineSVG.selectAll()
      .data(heatmap, function(d) {return d.Day+':'+d.Date;})
      .enter()
      .append("rect")
      .attr("transform", "translate("+width/1.85+"," + height/30+")")
      .attr("x", function(d) {  return heatmapX(d.Day) })
      .attr("y", function(d) { return heatmapY(d.Date) })
      .attr("width", heatmapX.bandwidth() )
      .attr("height", heatmapY.bandwidth() )
      .style("fill", "white" )
      .on('mouseover', tip.show)
      .on("mouseout", tip.hide)
      .attr("opacity",1)
      .transition()
      .duration(2000)
      .transition()
      .duration(2000)
      
      .attr("opacity",function(d) {  
        if(d.Length == 0) return 0.7;
        else return 1})
      .style("fill", function(d) { 
        if (d.Date=="Sep") return myColorBlue(d.Length)
        else return myColorRed(d.Length)} )

///////////////




    }
    catch (error) {
        console.error(error)
    }



}

function updateOutline(){
    d3.csv("/Page1_data/battle_count.csv", d3.autoType)
        .then(function (data){
            d3.csv("/Page1_data/scatterplot_boss.csv", d3.autoType)
            .then(function(scatterplot){
                d3.csv("/Page1_data/heatmap.csv", d3.autoType)
                .then(function(heatmap){
                    width =  window.innerWidth;
                    height = window.innerHeight;
                    OutlineSVG = d3.select("#OutlineSVG")
                        .attr("width", width - margin.left - margin.right)
                        .attr("height", height - margin.top + margin.bottom)
                        .append("g")
                        .attr("transform",
                            "translate(" + margin.left + "," + margin.top + ")")
                    OutlineSVG.remove()
                    draw(data,scatterplot,heatmap,width,height,OutlineSVG,false)
                });
            })
        })
        .catch(function(error){
            console.error(error);
        })
}

window.addEventListener("resize", updateOutline);
