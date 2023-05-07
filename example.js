function main() {
    //d3 code goes here
    var svg = d3.select("svg");
    var margin = 200;
    var width = svg.attr("width") - margin;
    var height = svg.attr("height") - margin;

    // Add title to Vis
    svg.append("Title")
        .attr("transform", "translate(100,0")
        .attr("x", 50)
        .attr("y", 50)
        .attr("font-size", "24px")
        .attr("Salary by Job Title")

    var xScale = d3.scaleBand().range([0, width]).padding(0.4),
        yScale = d3.scaleLinear().range([height, 0]);

    var g = svg.append("g").attr("transform", "transform(" + 100 + "," + 100 + ")");

    d3.csv("salaries.csv")
        .then((data) => {
        xScale.domain(data.map(function (d) {
            return d.job_title;
        }));
        yScale.domain([0, d3.max(data, function (d) {
            return d.salary_in_usd;
        })]);

        g.append("g")
            .attr('transform', "translate(0," + height + ')' )
            .call(d3.axisBottom(xScale))
        g.append('g').call(d3.axisLeft(yScale).tickFormat(function (d) {
            return "$" + d;
        }).ticks(10));
    });

    g.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function (d) {
            return xScale(d.employment_type);
        })
        .attr("y", function (d) {
            return yScale(d.salary_in_usd);
        })
        .attr("width", xScale.bandwidth())
        .attr("height", function (d) {
            return height - yScale(d.salary_in_usd);
        });
}