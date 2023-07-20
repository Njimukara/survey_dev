// import dynamic from "next/dist/shared/lib/dynamic";
// import React from "react";
// import { isWindowAvailable } from "utils/navigation";
// import { ChartProps, ChartState } from "./LineAreaChart";
// const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

// class PieChart extends React.Component<ChartProps, ChartState> {
//   state: ChartState = {
//     chartData: [],
//     chartOptions: {},
//   };

//   constructor(props: ChartProps) {
//     super(props);
//   }

//   componentDidMount() {
//     this.setState({
//       chartData: this.props.chartData,
//       chartOptions: this.props.chartOptions,
//     });
//   }

//   render() {
//     if (!isWindowAvailable()) return <></>;
//     return (
//       <Chart
//         options={this.state.chartOptions}
//         series={this.state.chartData}
//         type="donut"
//         width="100%"
//         height="100%"
//       />
//     );
//   }
// }

// export default PieChart;

import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { isWindowAvailable } from "utils/navigation";
import { ChartProps, ChartState } from "./LineAreaChart";
import NoData from "layouts/admin/noData";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const PieChart: React.FC<ChartProps> = (props) => {
  const [chartData, setChartData] = useState<ChartState["chartData"]>([]);
  const [chartOptions, setChartOptions] = useState<ChartState["chartOptions"]>(
    {}
  );

  useEffect(() => {
    setChartData(props.chartData);
    setChartOptions(props.chartOptions);
  }, [props.chartData, props.chartOptions]);

  if (!isWindowAvailable()) return null;

  if (chartData.length <= 0) {
    return <NoData title="No company survey data yet" />;
  }

  return (
    <Chart
      options={chartOptions}
      series={chartData}
      type="donut"
      width="100%"
      height="100%"
    />
  );
};

export default PieChart;
