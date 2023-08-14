import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import stringHash from "string-hash";

interface DataItem {
  name: string;
  count: number;
}

interface DonutChartProps {
  data: DataItem[];
  width?: number;
  height?: number;
}

const DonutChart = ({ data, width = 400, height = 400 }: DonutChartProps) => {
  const [chartData, setChartData] = useState<d3.PieArcDatum<DataItem>[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    // const color = d3.scaleOrdinal<string>().range(d3.schemeCategory10);
    const color = d3
      .scaleOrdinal<string>()
      .domain(data.map((d) => d.name))
      .range(data.map((d) => d3.schemeCategory10[stringHash(d.name) % 10]));
    const pie = d3.pie<DataItem>().value((d: any) => d.count);

    // Update the chart with the new data and add an animation
    const arc = d3
      .arc<d3.PieArcDatum<DataItem>>()
      .innerRadius(100)
      .outerRadius(Math.min(width, height) / 2);

    const svg = d3.select("svg");

    svg
      .selectAll("path")
      .data(pie(data))
      .join(
        (enter) =>
          enter.append("path").attr("fill", (d, i) => color(i.toString())),
        (update) => update.attr("fill", (d, i) => color(i.toString()))
      )
      .attr("d", arc);

    setChartData(pie(data));

    // setChartData(pie(data));
  }, [data, width, height]);

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${width / 2}, ${height / 2})`}>
        {chartData.map((arcData, index) => {
          const arc = d3
            .arc<d3.PieArcDatum<DataItem>>()
            .innerRadius(100)
            .outerRadius(Math.min(width, height) / 2);
          const path = arc(arcData);
          const color = d3.scaleOrdinal<string>().range(d3.schemeCategory10);
          const colorValue = color(index.toString());
          const isHovered = index === hoveredIndex;

          return (
            <g
              key={index}
              onMouseOver={() => setHoveredIndex(index)}
              onMouseOut={() => setHoveredIndex(null)}
            >
              <path
                d={path}
                fill={isHovered ? colorValue : color(index.toString())}
              />
              <text
                transform={`translate(${arc.centroid(arcData)})`}
                textAnchor="middle"
              >
                {arcData.data.name}
              </text>
            </g>
          );
        })}
      </g>
    </svg>
  );
};

export default DonutChart;
