var chartDiv = document.getElementById("chart");

function redrawPlayerHabit(){
    var margin = {top: 120, right: 30, bottom: 30, left: 60};
    d3.selectAll('#funfactsPlayer').remove()
    // Extract the width and height that was computed by CSS.
    var width = chartDiv.clientWidth;
    var height = chartDiv.clientHeight;

    var PlayerHabitSVG = d3.select("#PlayerHabitSVG")
        .attr("width", width - margin.left - margin.right)
        .attr("height", height - margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

        // Use the extracted size to set the size of an SVG element.


    textFont = "55px";
    funFactX = width*2/3
    funFactY = 60

    PlayerHabitSVG.append('text')
        .attr('id','funfactsPlayer')
        .text("Fun Facts:")
        .attr("font-size", "70px")
        .attr("x", funFactX)
        .attr("y",funFactY-10);

    PlayerHabitSVG.append('text')
        .attr('id','funfactsPlayer')
        .text("Avg. tries to win: 4.8 tries")
        .attr("font-size", textFont)
        .attr("x", funFactX)
        .attr("y",funFactY*2);

    PlayerHabitSVG.append('text')
        .attr('id','funfactsPlayer')
        .text("-Simple 3.9 tries")
        .attr("font-size", textFont)
        .attr("x", funFactX+50)
        .attr("y",funFactY*3);

    PlayerHabitSVG.append('text')
        .attr('id','funfactsPlayer')
        .text("-Regular 6.3 tries")
        .attr("font-size", textFont)
        .attr("x", funFactX+50)
        .attr("y",funFactY*4);

    PlayerHabitSVG.append('text')
        .attr('id','funfactsPlayer')
        .text("Avg. tries to give up: 6.4 tries")
        .attr("font-size", textFont)
        .attr("x", funFactX)
        .attr("y",funFactY*5);

}

redrawPlayerHabit();
window.addEventListener("resize", redrawPlayerHabit);