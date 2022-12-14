var margin = {top: 120, right: 30, bottom: 30, left: 60};
//d3.selectAll('#totalPlayTime').remove()

var width =  window.innerWidth;
var height = window.innerHeight;

d3.csv("https://github.com/lienathania/2022_DataVis_FinalProject/blob/main/ver10%20fixing%20tips/Page3_data/barchart.csv", d3.autoType)
        .then(function (data01){
            d3.csv("https://github.com/lienathania/2022_DataVis_FinalProject/blob/main/ver10%20fixing%20tips/Page3_data/Page3_data/linechart.csv", d3.autoType)
            .then(function(data02){
                width =  window.innerWidth;
                height = window.innerHeight;
                PlayerHabitSVG = d3.select("#PlayerHabitSVG")
                    .attr("width", width - margin.left - margin.right)
                    .attr("height", height - margin.top + margin.bottom)
                    .append("g")
                    .attr("transform",
                        "translate(" + margin.left + "," + margin.top + ")")
                        drawPlayerHabits(data01,data02,width,height,PlayerHabitSVG,false)
            })
        })
        .catch(function(error){
            console.error(error);
})

   
function drawPlayerHabits(data01,data02,width,height,PlayerHabitSVG,updated=false){
    try{
        var margin = {top: 120, right: 30, bottom: 30, left: 60};
        d3.selectAll('#funfactsPlayer').remove()
        // Extract the width and height that was computed by CSS.
        var 
        width =  window.innerWidth;
        height = window.innerHeight;

        var PlayerHabitSVG = d3.select("#PlayerHabitSVG")
            .attr("width", width - margin.left - margin.right)
            .attr("height", height - margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

            // Use the extracted size to set the size of an SVG element.

        var dotsG = PlayerHabitSVG.append('g');
        const barTip = d3.tip()
                .attr('class', 'd3-tip2')
                .html(function (d) { return d.Value + " minutes"})
        dotsG.call(barTip)


        textFont = height/20+"px";
        funFactX = width*3/5
        funFactY = height/15

        PlayerHabitSVG.append('text')
            .text("Play Time")
            .attr("font-size", height/25+"px")
            .attr("fill","#ffff")
            .attr("x", width/35)
            .attr("y",height/23);


        PlayerHabitSVG.append('text')
            .attr('id','funfactsPlayer')
            .text("Fun Facts:")
            .attr("font-size", height/15+"px")
            .attr("fill","white")
            .attr("x", funFactX)
            .attr("y",funFactY);

        PlayerHabitSVG.append('text')
            .attr('id','funfactsPlayer')
            .text("Avg. tries to win: 4.8 tries")
            .attr("font-size", textFont)
            .attr("fill","white")
            .attr("x", funFactX)
            .attr("y",funFactY*2);

        PlayerHabitSVG.append('text')
            .attr('id','funfactsPlayer')
            .text("-Simple 3.9 tries")
            .attr("font-size", textFont)
            .attr("fill","white")
            .attr("x", funFactX*1.05)
            .attr("y",funFactY*3);

        PlayerHabitSVG.append('text')
            .attr('id','funfactsPlayer')
            .text("-Regular 6.3 tries")
            .attr("font-size", textFont)
            .attr("fill","white")
            .attr("x", funFactX*1.05)
            .attr("y",funFactY*4);

        PlayerHabitSVG.append('text')
            .attr('id','funfactsPlayer')
            .text("Avg. tries to give up: 6.4 tries")
            .attr("font-size", textFont)
            .attr("fill","white")
            .attr("x", funFactX)
            .attr("y",funFactY*5);

//////////////////////////BARCHART//////////////////////////

        var x_01 = d3.scaleBand()
        .range([ 0, width/2 ])
        .domain(data01.map(function(d) { return d.Day; }))
        .padding(0.2);
        PlayerHabitSVG.append("g")
        .attr("transform", "translate(0," + height/3 + ")")
        .attr("class", "axisPlayer")
        .call(d3.axisBottom(x_01));
        

        
        // Add Y axis
        var y_01 = d3.scaleLinear()
        .domain([0, 60])
        .range([ height/3, 0]);
        PlayerHabitSVG.append("g")
        .attr("class", "axisPlayer")
        .call(d3.axisLeft(y_01));

        // Bars
        PlayerHabitSVG.selectAll("mybar")
        .data(data01)
        .enter()
        .append("rect")
            .on('mouseover', barTip.show)
            .on("mouseout", barTip.hide)
            .attr("x", function(d) { return x_01(d.Day); })
            .attr("y", height/3)
            .attr("opacity",0.7)
            .attr("width", x_01.bandwidth())
            .attr("height", 0)
            .transition()
            .duration(4000)
            .attr("height", function(d) { return height/3 - y_01(d.Value); })
            .attr("y", function(d) { return y_01(d.Value); })
            .attr("fill", "#63a0bf");
           
            PlayerHabitSVG.append('line')
            .style("stroke", "white")
            .style("stroke-width", 4)
            .attr("x1", 0)
            .attr("y1", height/3)
            .attr("x2", width/2)
            .attr("y2", height/3); 
//////////////////////////BARCHART//////////////////////////

//////////////////////////////
        var groups_02 = d3.map(data02, function(d){return(d.Date)}).keys()
        // Add X axis --> it is a date format
                var x_02 = d3.scaleBand()
                    .domain(groups_02)
                    .range([ 0, width*0.95 ]);
                PlayerHabitSVG.append("g")
                    .attr("transform", "translate(-35," + height*0.8 + ")")
                    .attr("class", "axisPlayer")
                    
                    .call(d3.axisBottom(x_02))
                    .selectAll("text")
                        .attr("transform", "translate(-10,0)rotate(-45)")
                        .style("text-anchor", "end");

                // Add Y axis
                var y_02 = d3.scaleLinear()
                    .domain([0, d3.max(data02, function(d) { return +d.Length; })])
                    .range([ height*0.8, height/2.5 ]);
                PlayerHabitSVG.append("g")
                    .attr("class", "axisPlayer")
                    .call(d3.axisLeft(y_02));

                    
                // Add the line
        var path = PlayerHabitSVG.append("path")
                    .datum(data02)
                    .attr("fill", "none")

          var lineChart = d3
          .line()
          .x(data02 => x_02(data02.Date))
          .y(data02 => y_02(data02.Length));
      
          const updatedPath = d3
          .select("path")
          .interrupt()
          .datum(data02)
          .attr("d", lineChart);
      
        const pathLength = updatedPath.node().getTotalLength();
        const transitionPath = d3
          .transition()
          .ease(d3.easeSin)
          .duration(6000);
        updatedPath
          .attr("stroke-dashoffset", pathLength)
          .attr("stroke-dasharray", pathLength)
          .attr("stroke","#df4212")
          .attr("stroke-width", 6)
          .attr("transform", "translate(0,"+-height/3+")")
          .transition(transitionPath)
          .attr("stroke-dashoffset", 0);              
      
      
        //////////////////////////////


                }
                catch (error) {
                    console.error(error)
                }
        }


function updatePlayer(){
            d3.csv("https://github.com/lienathania/2022_DataVis_FinalProject/blob/main/ver10%20fixing%20tips/Page3_data/Page3_data/barchart.csv", d3.autoType)
                .then(function (data01){
                    d3.csv("https://github.com/lienathania/2022_DataVis_FinalProject/blob/main/ver10%20fixing%20tips/Page3_data/Page3_data/linechart.csv", d3.autoType)
                    .then(function(data02){
                        width =  window.innerWidth;
                        height = window.innerHeight;
                        PlayerHabitSVG = d3.select("#PlayerHabitSVG")
                            .attr("width", width - margin.left - margin.right)
                            .attr("height", height - margin.top + margin.bottom)
                            .append("g")
                            .attr("transform",
                                "translate(" + margin.left + "," + margin.top + ")")
                        drawPlayerHabits(data01,data02,width,height,PlayerHabitSVG,false)
                    })
        })
        .catch(function(error){
            console.error(error);
})


}

window.addEventListener("resize", updatePlayer);
