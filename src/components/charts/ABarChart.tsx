import NoData from "layouts/admin/noData";
import React from "react";
// import ReactApexChart from "react-apexcharts";
import { isWindowAvailable } from "utils/navigation";
import dynamic from "next/dist/shared/lib/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface IData {
  label: string;
  value: number;
}

interface BarChartProps {
  data: IData[];
}

const ABarChart: React.FC<BarChartProps> = ({ data }) => {
  const chartData = {
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: data.map((item) => item.label),
      },
    },
    series: [
      {
        name: "Value",
        data: data.map((item) => item.value),
      },
    ],
  };

  if (!isWindowAvailable()) return <></>;

  return (
    <ReactApexChart
      options={chartData.options}
      series={chartData.series}
      type="bar"
      height={300}
    />
  );
};

export default ABarChart;
