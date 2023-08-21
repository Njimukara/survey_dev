import { useEffect, useRef } from "react";
import * as d3 from "d3";

interface DBarChartProps {
  data: { label: string; value: number }[];
}

const DBarChart: React.FC<DBarChartProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    console.log(data);

    const svg = d3.select(svgRef.current);

    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = svgRef.current.clientWidth; // Get the container's width
    const height = svgRef.current.clientHeight; // Get the container's height
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    svg.selectAll(".x-axis, .y-axis").remove();

    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.label))
      .range([0, innerWidth])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value) || 0])
      .nice()
      .range([innerHeight, 0]);

    // const bars = svg.selectAll(".bar").data(data);
    const bars = svg
      .selectAll<SVGRectElement, { label: string; value: number }>("rect")
      .data(data);

    bars
      .exit()
      .transition()
      .duration(500)
      .attr("height", 0)
      .attr("y", innerHeight)
      .remove();

    bars
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => x(d.label) || 0)
      .attr("y", innerHeight)
      .attr("width", x.bandwidth())
      .attr("height", 0)
      .attr("fill", "steelblue")
      .merge(bars)
      .transition()
      .duration(800)
      .attr("x", (d) => x(d.label) || 0)
      .attr("y", (d) => y(d.value) || 0)
      .attr("width", x.bandwidth())
      .attr("height", (d) => innerHeight - y(d.value));

    svg
      .append("g")
      .attr("class", "x-axis")
      .attr(
        "transform",
        `translate(${margin.left},${innerHeight + margin.top})`
      )
      .call(d3.axisBottom(x))
      .selectAll("text")
      .style("font-size", "14px")
      .style("font-family", "Poppins, sans-serif")
      .style("font-weight", "400");

    svg
      .append("g")
      .attr("class", "y-axis")
      .attr("transform", `translate(${margin.left},${margin.top})`)
      .call(d3.axisLeft(y))
      .selectAll("text")
      .style("font-size", "14px")
      .style("font-family", "Poppins, sans-serif")
      .style("font-weight", "400");

    // svg.select(".y-axis").call(d3.axisLeft(y));
  }, [data]);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <svg ref={svgRef} style={{ width: "100%", height: "100%" }}></svg>
    </div>
  );
};

export default DBarChart;
