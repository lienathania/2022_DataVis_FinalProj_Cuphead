var chartDiv = document.getElementById("chart");

function redrawOutline(){
    var margin = {top: 120, right: 30, bottom: 30, left: 60};
    d3.selectAll('#totalPlayTime').remove()
    // Extract the width and height that was computed by CSS.
    var width = chartDiv.clientWidth;
    var height = chartDiv.clientHeight;

    var OutlineSVG = d3.select("#OutlineSVG")
        .attr("width", width - margin.left - margin.right)
        .attr("height", height - margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

        // Use the extracted size to set the size of an SVG element.


    textFont = "55px";
    funFactX = width*2/3
    funFactY = height*3/5

    OutlineSVG.append('text')
        .attr('id','totalPlayTime')
        .text("Total Play Time: ")
        .attr("font-size", "70px")
        .attr("x", funFactX)
        .attr("y",funFactY-10);

    OutlineSVG.append('text')
        .attr('id','totalPlayTime')
        .text("6 hrs 15 minutes")
        .attr("font-size", textFont)
        .attr("x", funFactX+10)
        .attr("y",funFactY+60);

}

redrawOutline();
window.addEventListener("resize", redrawOutline);