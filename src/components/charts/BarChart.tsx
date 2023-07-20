import dynamic from "next/dist/shared/lib/dynamic";
import React from "react";
import { isWindowAvailable } from "utils/navigation";
import { ChartProps, ChartState } from "./LineAreaChart";
import NoData from "layouts/admin/noData";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

class ColumnChart extends React.Component<ChartProps, ChartState> {
  constructor(props: ChartState) {
    super(props);
    this.state = {
      chartData: [],
      chartOptions: {},
    };
  }

  componentDidMount() {
    this.updateChartDataAndOptions(this.props);
  }

  componentDidUpdate(prevProps: ChartProps) {
    if (
      prevProps.chartData !== this.props.chartData ||
      prevProps.chartOptions !== this.props.chartOptions
    ) {
      this.updateChartDataAndOptions(this.props);
    }
  }

  updateChartDataAndOptions(props: ChartProps) {
    this.setState({
      chartData: props.chartData,
      chartOptions: props.chartOptions,
    });
  }

  render() {
    if (!isWindowAvailable()) return <></>;

    if (this.state.chartData.length <= 0) {
      return <NoData title="No survey data yet" />;
    }

    return (
      <Chart
        options={this.state.chartOptions}
        series={this.state.chartData}
        type="bar"
        width="100%"
        height="100%"
      />
    );
  }
}

export default ColumnChart;
