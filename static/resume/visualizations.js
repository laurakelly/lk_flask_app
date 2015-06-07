function bubbleChart() {
    var diameter = 700,
        format = d3.format(",d"),
        color = d3.scale.category20();

    var bubble = d3.layout.pack()
        .sort(null)
        .size([diameter, diameter])
        .padding(1.5);

    var svg = d3.select("#skills").append("svg")
        .attr("width", diameter)
        .attr("height", diameter)
        .attr("class", "bubble");

    d3.json("static/resume/skills.json", function(error, root) {
      var node = svg.selectAll(".node")
          .data(bubble.nodes(classes(root))
          .filter(function(d) { return !d.children; }))
        .enter().append("g")
          .attr("class", "node")
          .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

      node.append("title")
          .text(function(d) { return d.className + ": " + format(d.value); });

      node.append("circle")
          .attr("r", function(d) { return d.r; })
          .style("fill", function(d) { 
              if (typeof d.fill != 'undefined') return d.fill;
              return color(d.packageName); });

      node.append("text")
          .attr("dy", ".3em")
          .style("text-anchor", "middle")
          .text(function(d) { return d.className.substring(0, d.r / 3); });
    });
}

// Returns a flattened hierarchy containing all leaf nodes under the root.
function classes(root) {
  var classes = [];

  function recurse(name, node) {
    if (node.children) node.children.forEach(function(child) { recurse(node.name, child); });
    else classes.push({packageName: name, className: node.name, value: node.size, fill: node.fill});
  }

  recurse(null, root);
  return {children: classes};
}

function timeline () {
    var data = undefined;

    d3.json("static/resume/experience.json", function(error, json) {
        if (error) return console.warn(error);
        data = json;

        var margin = {top: 50, right: 10, bottom: 20, left: 10},
            width = 960 - margin.left - margin.right,
            height = 700 - margin.top - margin.bottom;

        var parseDate = d3.time.format("%d-%b-%y").parse;

        var svg = d3.select("#experience").append("svg")
            .attr("height", height + margin.top + margin.bottom)
            .attr("width", width + margin.left + margin.right)
          .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");;

        var y = d3.time.scale()
            .domain([new Date().getTime(), 1136094769000])
            .range([0, height]);

        var yPlot = function(d) { return y(d.date);}

        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left")
            .ticks(9)
            .tickFormat(function(d){return d3.time.format('%Y')(new Date(d));});

        var line = d3.svg.line()
            .y(function(d) { return y(d.date) });

        svg.append("g")
            .attr("class", "y axis")
            .attr("transform", "translate(480, 0)")
            .call(yAxis);

        svg.append("g")
            .attr("transform", "translate(480, 0)")
            .selectAll(".dot")
            .data(data)
          .enter().append("circle")
            .attr("class", "dot")
            .attr("r", 5)
            .attr("cy", yPlot)
            .attr("data-title", function (d) { return d.title })
            .on("click", function (d) {
                timelineEntry(d, "#experience");
            });
      
        for (var i=0; i < Object.keys(data).length; i++) {
            var d = data[Object.keys(data)[i]];
            timelineEntry(d, "#experience" );
        }
    });
}


function timelineEntry (d, id) {
    $(id).append(timelineEntryText(d));
    $(id + " .tooltip[data-title='" + d.title + "']").css(timelineEntryLoc(d, id));
}

function timelineEntryText (d) {
    var text = "<div class='tooltip " + d.orient.horizontal + "' data-title='" + d.title + "'>";
    text = text + "<h3>" + d.title + "</h3>";
    text = text + "<h4>" + d.role + "</h4><ul>"

    for (var i=0; i < d.text.length; i++) {
        text = text + "<li>" + d.text[i] + "</li>";
    };
    
    return text + "</ul>"
}

function timelineEntryLoc (d, id) {
    var $el = $(id + " circle[data-title='" + d.title + "'].dot"),
        position = $el.position();

    if (d.orient.horizontal === "left") {
        var left = position.left - 450 - 20;
    } else {
        var left = position.left + 30;
    }

    if (d.orient.vertical === "top") {
        var top = position.top - 40;
    } else {
        var top = position.top - d.orient.height;
    }

    return { "left": left, "top": top }

}

function closeup ($el) {

    // remove any existing closeup
    $(".detail").remove();

    url = $el.attr("src").replace("thumbnail", "detail"); 
    $("<img src='" + url + "' class='detail'>").insertBefore("#gallery");

    // scroll to the bottom
    $("html, body").animate({ scrollTop: $(document).height() }, 1000);

}

function verticalCenter () {

    $("#projects li > ul").each(function () {
        var $ul = $(this),
            height = $ul.height();

        $ul.css("margin-top", (135 - height) / 2 + "px")
    })
}

$(document).ready(function () {
    timeline();
    bubbleChart();

    // Vertical center project descriptions
    verticalCenter();

    // Show gallery image when clicked
    $("#gallery img").click(function () {
        closeup($(this));
    });

});
