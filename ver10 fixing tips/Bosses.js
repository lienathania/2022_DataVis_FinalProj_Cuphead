

var margin = {top: 120, right: 30, bottom: 30, left: 60};
//d3.selectAll('#totalPlayTime').remove()


// Extract the width and height that was computed by CSS.
var width =  window.innerWidth;
var height = window.innerHeight;

d3.csv("/Page2_data/page2_01_data.csv", d3.autoType)
        .then(function (data01){
            d3.csv("/Page2_data/page2_02_data.csv", d3.autoType)
            .then(function(data02){
                d3.csv("/Page2_data/page2_03_data.csv", d3.autoType)
                .then(function(data03){
                    d3.csv("/Page2_data/page2_04_data.csv", d3.autoType)
                    .then(function(data04){
                        width = window.innerWidth
                        height = window.innerHeight;
                        BossesSVG = d3.select("#BossesSVG")
                            .attr("width", width - margin.left - margin.right)
                            .attr("height", height - margin.top + margin.bottom)
                            .append("g")
                            .attr("transform",
                                "translate(" + margin.left + "," + margin.top + ")")
                
                            drawBosses(data01,data02,data03,data04,BossesNames, width, height, BossesSVG,false)
                    })
                })
            })
        })
        .catch(function(error){
            console.error(error);
})



var BossesNames = [ 'Ball','Beppi', 'Candy', 'Dragon', 'Flowie', 'Frog', 'Hilda', 'Pyramid','Vege']
var AllBossesNames = [ 'Ball','Beppi', 'Candy', 'Dragon', 'Flowie', 'Frog', 'Hilda', 'Pyramid','Vege']
var old_01 = 29
var old_02 = 2012
var old_03 = 12
var old_04 = 15

function drawBosses(data01temp,data02temp,data03temp,data04temp,BossesNames, width, height, BossesSVG,updated = false){
    try{ 

    var dotsG = BossesSVG.append('g');
    const tip = d3.tip()
        .attr('class', 'd3-tip2')
        .html(function (d) { return d})
    
    const ques_01 = d3.tip()
        .attr('class', 'd3-tip2')
        .html("red: Regular Level<br>blue: Simple Level")
    const ques_02 = d3.tip()
        .attr('class', 'd3-tip2')
        .html("red: Regular Level<br>blue: Simple Level")
    const ques_034 = d3.tip()
        .attr('class', 'd3-tip2')
        .html("Darker color = lower stage")
    const barTip = d3.tip()
        .attr('class', 'd3-tip2')
        .html(function (d) { 
            if(d.data.Simple != undefined)return d.data.Simple+d.data.Regular
            else return d.data.Stage_1+d.data.Stage_2+d.data.Stage_3+d.data.Stage_4+d.data.Stage_5 })
    
    console.log("Tip-test")
    dotsG.call(tip)
    dotsG.call(ques_01)
    dotsG.call(ques_02)
    dotsG.call(ques_034)
    dotsG.call(barTip)

    BossesSVG.append('text')
            .attr('id','Legend')
            .text("Number of Tries")
            .attr("font-size", height/30+"px")
            .attr("fill","#ffcf10")
            .attr("x", width/2.3)
            .attr("y",height/23);

    BossesSVG.append('text')
            .attr('id','Legend')
            .text("?")
            .attr("font-size", height/50+"px")
            .attr("fill","#ffcf10")
            .attr("x", width/1.75)
            .attr("y",height/23)
            .on('mouseover', ques_01.show)
            .on("mouseout", ques_01.hide);

    BossesSVG.append('text')
            .attr('id','Legend')
            .text("Total Time Spent (Sec)")
            .attr("font-size", height/30+"px")
            .attr("fill","#ffcf10")
            .attr("x", width/1.43)
            .attr("y",height/23);

    BossesSVG.append('text')
            .attr('id','Legend')
            .text("?")
            .attr("font-size", height/50+"px")
            .attr("fill","#ffcf10")
            .attr("x", width/1.13)
            .attr("y",height/23)
            .on('mouseover', ques_02.show)
            .on("mouseout", ques_02.hide);
    

    BossesSVG.append('text')
            .attr('id','Legend')
            .text("Death Stages (Simple)")
            .attr("font-size", height/30+"px")
            .attr("fill","#ffcf10")
            .attr("x", width/2.4)
            .attr("y",height/2.5);
       
    BossesSVG.append('text')
        .attr('id','Legend')
        .text("?")
        .attr("font-size", height/50+"px")
        .attr("fill","#ffcf10")
        .attr("x", width/1.68)
        .attr("y",height/2.5)
        .on('mouseover', ques_034.show)
        .on("mouseout", ques_034.hide);

    BossesSVG.append('text')
            .attr('id','Legend')
            .text("Death Stages (Regular)")
            .attr("font-size", height/30+"px")
            .attr("fill","#ffcf10")
            .attr("x", width/1.43)
            .attr("y",height/2.5);

    BossesSVG.append('text')
            .attr('id','Legend')
            .text("?")
            .attr("font-size", height/50+"px")
            .attr("fill","#ffcf10")
            .attr("x", width/1.12)
            .attr("y",height/2.5)
            .on('mouseover', ques_034.show)
            .on("mouseout", ques_034.hide);


        var data01 = structuredClone(data01temp);
        var data02 = structuredClone(data02temp);
        var data03 = structuredClone(data03temp);
        var data04 = structuredClone(data04temp);
        
            data01.splice(0,data01temp.length)
            data02.splice(0,data01temp.length)
            data03.splice(0,data01temp.length)
            data04.splice(0,data04temp.length)
        
            console.log("data01")
            console.log(data01)
            for(var i =0; i < BossesNames.length;i++){
                for(var j =0; j < data01temp.length;j++){
                    if(data01temp[j].Boss == BossesNames[i]){
                        data01.push(data01temp[j])
                        data02.push(data02temp[j])
                        data03.push(data03temp[j])
                        data04.push(data04temp[j])
                        continue;
                    }
                }
            }
        
            console.log(data01)

    /////////////////////Bar 01///////////////////// 
    var subgroups_01 = data01.columns.slice(1)
    var groups_01 = d3.map(data01, function(d){return(d.Boss)}).keys()

    
    
    // Add X axis
    var x_01 = d3.scaleBand()
        .domain(groups_01)
        .range([width/7, width/2.5])
        .padding([0.2]);
    BossesSVG.append("g")
        .attr("id","Axes")
        .attr("transform", "translate("+width*8/35+"," + height/3.2 + ")")
        .attr("class", "axis")
        
        .transition()
        .duration(500)
        .call(d3.axisBottom(x_01));

        var maxY_01 = 0
        maxY_01 =  d3.max(data01, function (d) { return d.Simple+d.Regular })
        console.log(maxY_01)

    // Add Y axis
    var y_01 = d3.scaleLinear()
        .domain([0, old_01])
        .range([ height/4, 0 ]);
    
    var yAxis_01 = d3.axisLeft()
                .scale(y_01);   

    BossesSVG.append("g")
        .attr("id","YAxes_01")
        .attr("transform", "translate("+width/2.7+"," +height/16 + ")")
        .attr("class", "axis")
        .call(yAxis_01);

    y_01
        .domain([0, maxY_01])
        
    var axisEl_01 = BossesSVG.select("#YAxes_01");
        
    axisEl_01
        .transition()
        .duration(500)
        .call(yAxis_01);
      
    old_01 = maxY_01

    // color palette = one color per subgroup
    var color = d3.scaleOrdinal()
        .domain(subgroups_01)
        .range(['#63a0bf','#df4212'])

    //stack the data? --> stack per subgroup
    var stackedData_01 = d3.stack()
        .keys(subgroups_01)
        (data01)

    // Show the bars
    var bar1 = BossesSVG.append("g")
        .selectAll("bar")
        // Enter in the stack data = loop key per key = group per group
        .data(stackedData_01)





    bar1.enter().append("g")
        .attr("fill", function(d) { return color(d.key); })
        .selectAll("rect")
        // enter a second time = loop subgroup per subgroup to add all rectangles
        .data(function(d) { return d; })
        .enter().append("rect")
        .on('mouseover', barTip.show)
        .on("mouseout", barTip.hide)
        .attr("id",function(d) { return d.data.Boss })
        .attr("x", function(d) { return x_01(d.data.Boss)+width*8/35; })
        .attr("y",height/4)
        .attr("opacity",0)
        .attr("width",x_01.bandwidth())
        .attr("height", function(d) { return y_01(d[0]) - y_01(d[1]); })
        .transition()
        .duration(1000)
        .transition()
        .duration(2000)
        .attr("y", function(d) { return y_01(d[1])+height/16-1; })
        .attr("opacity",1)

        /////////////////////Bar 01/////////////////////
        /////////////////////Bar 02///////////////////// 
    var subgroups_02 = data02.columns.slice(1)
    var groups_02 = d3.map(data02, function(d){return(d.Boss)}).keys()

    
    // Add X axis
    var x_02 = d3.scaleBand()
        .domain(groups_02)
        .range([width*3/5, width*6/7])
        .padding([0.2]);
    BossesSVG.append("g")
        .attr("id","Axes")
        .attr("transform", "translate("+width*2/35+"," + height/3.2 + ")")
        .attr("class", "axis")
        .transition()
        .duration(500)
        .call(d3.axisBottom(x_02));
        
        var maxY_02 = 0
        maxY_02 =  d3.max(data02, function (d) { return d.Simple+d.Regular })
    // Add Y axis
    var y_02 = d3.scaleLinear()
        .domain([0, old_02])
        .range([ height/4, 0 ]);

    var yAxis_02 = d3.axisLeft()
            .scale(y_02);   
    
    BossesSVG.append("g")
        .attr("id","YAxes_02")
        .attr("transform", "translate("+width*23/35+"," + height/16 + ")")
        .attr("class", "axis")
        .call(yAxis_02);
    
    y_02
        .domain([0, maxY_02])
        
    var axisEl_02 = BossesSVG.select("#YAxes_02");
        
    axisEl_02
        .transition()
        .duration(1000)
        .call(yAxis_02);
      
    old_02 = maxY_02

    // color palette = one color per subgroup
    var color = d3.scaleOrdinal()
        .domain(subgroups_02)
        .range(['#63a0bf','#df4212'])

    //stack the data? --> stack per subgroup
    var stackedData_02 = d3.stack()
        .keys(subgroups_02)
        (data02)

    // Show the bars
    BossesSVG.append("g")
        .selectAll("rect")
        // Enter in the stack data = loop key per key = group per group
        .data(stackedData_02)
        .enter().append("g")
        .attr("fill", function(d) { return color(d.key); })
        .selectAll("rect")
        // enter a second time = loop subgroup per subgroup to add all rectangles
        .data(function(d) { return d; })
        .enter().append("rect")
        .on('mouseover', barTip.show)
        .on("mouseout", barTip.hide)
        .attr("id",function(d) { return d.data.Boss })
        .attr("x", function(d) { return x_02(d.data.Boss)+width*2/35; })
        .attr("y",height/4)
        .attr("opacity",0)
        .attr("width",x_02.bandwidth())
        .attr("height", function(d) { return y_02(d[0]) - y_02(d[1]); })
        .transition()
        .duration(1000)
        .transition()
        .duration(2000)
        .attr("y", function(d) { return y_02(d[1])+height/16-1; })
        .attr("opacity",1)
        /////////////////////Bar 02/////////////////////

            /////////////////////Bar 03///////////////////// 
    var subgroups_03 = data03.columns.slice(1)
    var groups_03 = d3.map(data03, function(d){return(d.Boss)}).keys()

    // Add X axis
    var x_03 = d3.scaleBand()
        .domain(groups_03)
        .range([width/7, width/2.5])
        .padding([0.2]);
    BossesSVG.append("g")
        .attr("id","Axes")
        .attr("transform", "translate("+width*8/35+"," + height/1.5 + ")")
        .attr("class", "axis")
        .transition()
        .duration(500)
        .call(d3.axisBottom(x_03));

    var maxY_03 = 0
    maxY_03 =  d3.max(data03, function (d) { return d.Stage_1+d.Stage_2+d.Stage_3+d.Stage_4+d.Stage_5 })

    // Add Y axis
    var y_03 = d3.scaleLinear()
        .domain([0, old_03])
        .range([ height/1.5, (height/1.5)-(height/4) ]);

    var yAxis_03 = d3.axisLeft()
        .scale(y_03);   

    BossesSVG.append("g")
        .attr("id","YAxes_03")
        .attr("transform", "translate("+width/2.7+"," +0 + ")")
        .attr("class", "axis")
        .call(yAxis_03);

    y_03
        .domain([0, maxY_03])
    
    var axisEl_03 = BossesSVG.select("#YAxes_03");
    
    axisEl_03
        .transition()
        .duration(1000)
        .call(yAxis_03);
  
    old_03 = maxY_03

    // color palette = one color per subgroup
    var color = d3.scaleOrdinal()
        .domain(subgroups_03)
        .range(['#1B4F72','#2874A6 ','#3498DB ','#85C1E9'])

    //stack the data? --> stack per subgroup
    var stackedData_03 = d3.stack()
        .keys(subgroups_03)
        (data03)

    // Show the bars
    BossesSVG.append("g")
        .selectAll("rect")
        // Enter in the stack data = loop key per key = group per group
        .data(stackedData_03)
        .enter().append("g")
        .attr("fill", function(d) { return color(d.key); })
        .selectAll("rect")
        // enter a second time = loop subgroup per subgroup to add all rectangles
        .data(function(d) { return d; })
        .enter().append("rect")
        .on('mouseover', barTip.show)
        .on("mouseout", barTip.hide)
        .attr("id",function(d) { return d.data.Boss })
        .attr("x", function(d) { return x_03(d.data.Boss)+width*8/35; })
        .attr("y",height/1.5)
        .attr("opacity",0)
        .attr("width",x_03.bandwidth())
        .attr("height", function(d) { return y_03(d[0]) - y_03(d[1]); })
        .transition()
        .duration(1000)
        .transition()
        .duration(2000)
        .attr("y", function(d) { return y_03(d[1])-1; })
        .attr("opacity",1)
        /////////////////////Bar 03/////////////////////

        /////////////////////Bar 04///////////////////// 
    var subgroups_04 = data04.columns.slice(1)
    var groups_04 = d3.map(data04, function(d){return(d.Boss)}).keys()
    
    console.log(data04)

    // Add X axis
    var x_04 = d3.scaleBand()
        .domain(groups_04)
        .range([width*3/5, width*6/7])
        .padding([0.2]);
    BossesSVG.append("g")
        .attr("id","Axes")
        .attr("transform", "translate("+width*2/35+"," + height/1.5 + ")")
        .attr("class", "axis")
        .transition()
        .duration(500)
        .call(d3.axisBottom(x_04));
        var maxY_04 = 0
        maxY_04 =  d3.max(data04, function (d) { return d.Stage_1+d.Stage_2+d.Stage_3+d.Stage_4+d.Stage_5 })
    // Add Y axis
    
    var y_04 = d3.scaleLinear()
        .domain([0, old_04])
        .range([ height/1.5, (height/1.5)-(height/4) ]);

    var yAxis_04 = d3.axisLeft()
        .scale(y_04);   

    BossesSVG.append("g")
        .attr("id","YAxes_04")
        .attr("transform", "translate("+width*23/35+"," +0 + ")")
        .attr("class", "axis")
        .call(yAxis_04);
    
    y_04
        .domain([0, maxY_04])
    
    var axisEl_04 = BossesSVG.select("#YAxes_04");
    
    axisEl_04
        .transition()
        .duration(1000)
        .call(yAxis_04);
  
    old_04 = maxY_04

    // color palette = one color per subgroup
    var color = d3.scaleOrdinal()
        .domain(subgroups_04)
        .range(['#78281F ','#B03A2E','#E74C3C','#F1948A'])

    //stack the data? --> stack per subgroup
    var stackedData_04 = d3.stack()
        .keys(subgroups_04)
        (data04)

    // Show the bars
    BossesSVG.append("g")
        .selectAll("rect")
        // Enter in the stack data = loop key per key = group per group
        .data(stackedData_04)
        .enter().append("g")
        .attr("fill", function(d) { return color(d.key); })
        .selectAll("rect")
        // enter a second time = loop subgroup per subgroup to add all rectangles
        .data(function(d) { return d; })
        .enter().append("rect")
        .on('mouseover', barTip.show)
        .on("mouseout", barTip.hide)
        .attr("id",function(d) { return d.data.Boss })
        .attr("x", function(d) { return x_04(d.data.Boss)+width*2/35; })
        .attr("y",height/1.5)
        .attr("opacity",0)
        .attr("width",x_04.bandwidth())
        .attr("height", function(d) { return y_04(d[0]) - y_04(d[1]); })
        .transition()
        .duration(1000)
        .transition()
        .duration(2000)
        .attr("y", function(d) { return y_04(d[1])-1; })
        .attr("opacity",1)
        /////////////////////Bar 04/////////////////////

    var choices = BossesSVG.append('g')
        .selectAll("bossChoices")
        .data(AllBossesNames)
        .enter()
        .append('image')
            .attr("xlink:href",function (d,i) {
                const index2 = BossesNames.indexOf(d);
                if (index2 > -1) return "/BossPictures/"+d+"1.png";
                else return "/BossPictures/old/"+d+"1.png";  
                  } )
            .attr("width", height/6)
            .attr("height", height/6)
            .attr("y", function (d,i) { return height/10+i%3*height/5 } )
            .attr("x", function (d,i) { 
                if(i < 3)return width/100-width/70
                else if(i >=3 && i < 6) return width*13/100-width/70
                else return width*25/100-width/70 } )
            .on('mouseover', tip.show)
            .on("mouseout", tip.hide)
            .on("click", function(d) {
                const index = BossesNames.indexOf(d);
                if (index > -1) { // only splice array when item is found
                    console.log("delete "+d)
                    d3.selectAll('#'+d)
                    .transition()
                    .duration(1000)
                    .attr("opacity",0);
                    BossesSVG.selectAll('rect').remove()
                    BossesSVG.selectAll("#YAxes_01").remove()
                    BossesSVG.selectAll("#YAxes_02").remove()
                    BossesSVG.selectAll("#YAxes_03").remove()
                    BossesSVG.selectAll("#YAxes_04").remove()
                    BossesSVG.selectAll("#Axes").remove()
                    BossesNames.splice(index, 1); // 2nd parameter means remove one item only
                    updateBosses();
                }
                else{
                    d3.select(this).attr("xlink:href",function (d,i) {return "/BossPictures/"+d+"1.png";  } )
                    console.log("not found so push "+d)
                    d3.selectAll('#'+d)
                    .transition()
                    .duration(1000)
                    .attr("opacity",1);
                    BossesSVG.selectAll('rect').remove()
                    BossesSVG.selectAll("#YAxes_01").remove()
                    BossesSVG.selectAll("#YAxes_02").remove()
                    BossesSVG.selectAll("#YAxes_03").remove()
                    BossesSVG.selectAll("#YAxes_04").remove()
                    BossesSVG.selectAll("#Axes").remove()
                    BossesNames.push(d)
                    updateBosses();
                }
            });
    }
    catch (error) {
        console.error(error)
    }



}

function updateBosses(){
    console.log("update")
    d3.csv("/Page2_data/page2_01_data.csv", d3.autoType)
    .then(function (data01){
        d3.csv("/Page2_data/page2_02_data.csv", d3.autoType)
        .then(function(data02){
            d3.csv("/Page2_data/page2_03_data.csv", d3.autoType)
            .then(function(data03){
                d3.csv("/Page2_data/page2_04_data.csv", d3.autoType)
                .then(function(data04){
                    width = window.innerWidth
                    height = window.innerHeight;
                    BossesSVG = d3.select("#BossesSVG")
                        .attr("width", width - margin.left - margin.right)
                        .attr("height", height - margin.top + margin.bottom)
                        .append("g")
                        .attr("transform",
                            "translate(" + margin.left + "," + margin.top + ")")
                    drawBosses(data01,data02,data03,data04,BossesNames, width, height, BossesSVG, true)
                })
            })
        })
    })
    .catch(function(error){
        console.error(error);
    })
}

window.addEventListener("resize", updateBosses);
