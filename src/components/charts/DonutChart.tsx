// components/DonutChart.js
import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

interface DataItem {
  name: string;
  count: number;
}

interface DonutChartProps {
  data: DataItem[];
  width?: number;
  height?: number;
}

const DonutChart = ({ data, width, height }: DonutChartProps) => {
  const chartRef = useRef();

  useEffect(() => {
    drawChart();
  }, [data]);

  const drawChart = () => {
    if (!chartRef.current) return;
    const svg = d3
      .select(chartRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const color = d3.scaleOrdinal<string>().range(d3.schemeCategory10);

    const pie = d3.pie<DataItem>().value((d: any) => d.count);

    const arc = d3
      .arc<d3.PieArcDatum<DataItem>>()
      .innerRadius(100)
      .outerRadius(Math.min(width, height) / 2);

    const arcs = svg.selectAll("arc").data(pie(data)).enter().append("g");

    arcs
      .append("path")
      .attr("d", arc)
      .attr("fill", (d: any, i: any) => color(i));

    arcs
      .append("text")
      .attr("transform", (d: any) => `translate(${arc.centroid(d)})`)
      .attr("text-anchor", "middle")
      .text((d: any) => d.data.name);
  };

  return <div ref={chartRef} />;
};

export default DonutChart;
