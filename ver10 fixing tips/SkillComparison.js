var margin = {top: 120, right: 30, bottom: 30, left: 60};
//d3.selectAll('#totalPlayTime').remove()

var width =  window.innerWidth;
var height = window.innerHeight;

d3.csv("https://github.com/lienathania/2022_DataVis_FinalProject/blob/main/ver10%20fixing%20tips/Page4_data/data.csv", d3.autoType)
        .then(function (data01){
                width =  window.innerWidth;
                height = window.innerHeight;
                SkillComparisonSVG = d3.select("#SkillComparisonSVG")
                    .attr("width", width - margin.left - margin.right)
                    .attr("height", height - margin.top + margin.bottom)
                    .append("g")
                    .attr("transform",
                        "translate(" + margin.left + "," + margin.top + ")")
                        drawSkill(data01,width,height,SkillComparisonSVG,false)
          })
        .catch(function(error){
            console.error(error);
})

   
function drawSkill(data01,width,height,SkillComparisonSVG,updated=false){
    try{

        d3.selectAll('#funfactsPlayer').remove()
        var SkillComparisonSVG = d3.select("#SkillComparisonSVG")
            .attr("width", width - margin.left - margin.right)
            .attr("height", height - margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

            // Use the extracted size to set the size of an SVG element.


//////////////////////////////
        var groups_02 = d3.map(data01, function(d){return(d.Attempts)}).keys()
        var sumstat = d3.nest() 
            .key(d => d.Separate)
            .entries(data01);

        console.log(sumstat)
        
        // Add X axis --> it is a date format
                var x_02 = d3.scaleBand()
                    .domain(groups_02)
                    .range([ 0, width*0.95 ]);
                var x_axis= SkillComparisonSVG.append("g")
                    .attr("transform", "translate(0," + height*0.75 + ")")
                    .call(d3.axisBottom(x_02));

                x_axis.selectAll(".tick text")
                    .attr("font-size", height/50+"px");

                // Add Y axis
                var y_02 = d3.scaleLinear()
                    .domain([0, d3.max(data01, function(d) { return +d.Duration; })])
                    .range([ height*0.75, height/9.5 ]);
                var y_axis= SkillComparisonSVG.append("g")
                    .call(d3.axisLeft(y_02));

                y_axis.selectAll(".tick text")
                    .attr("font-size", height/50+"px");

                    var res = sumstat.map(function(d){ return d.key }) // list of group names
                    var color = d3.scaleOrdinal()
                        .domain(res)
                        .range(['#e41a1c','#377eb8'])
                    
                // Add the line
                SkillComparisonSVG.selectAll(".line")
                    .data(sumstat)
                    .enter()
                    .append("path")
                        .attr("fill", "none")
                        .attr("stroke", function(d){ return color(d.key) })
                        .attr("stroke-width", 3.5)
                        .attr("d", function(d){
                            return d3.line()
                            .x(function(d) { return x_02(d.Attempts) })
                            .y(function(d) { return y_02(d.Duration) })
                            (d.values)
        //////////////////////////////
                    }
                )}
                catch (error) {
                    console.error(error)
                }
        }


        function update(){
            d3.csv("https://github.com/lienathania/2022_DataVis_FinalProject/blob/main/ver10%20fixing%20tips/Page4_data/data.csv", d3.autoType)
                .then(function (data01){
                        width =  window.innerWidth;
                        height = window.innerHeight;
                        SkillComparisonSVG = d3.select("#SkillComparisonSVG")
                            .attr("width", width - margin.left - margin.right)
                            .attr("height", height - margin.top + margin.bottom)
                            .append("g")
                            .attr("transform",
                                "translate(" + margin.left + "," + margin.top + ")")
                        drawSkill(data01,width,height,SkillComparisonSVG,false)
        })
        .catch(function(error){
            console.error(error);
})

}

window.addEventListener("resize", update);
