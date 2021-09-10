import * as echarts from 'echarts';
import { useEffect } from 'react'

interface Props {
  divId: string,
  title: string,
  legend: any,
  hour:any,
  source:any
}
const Line = (props: Props) => {

  let option = {
    title: {
      text: props.title
    },
    legend: {
      data: props.legend
    },
    xAxis: {
      type: 'category',
      data: props.hour
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      name: props.legend[0],
      data: props.source,
      type: 'line'
    }]
  };
  useEffect(() => {
    var chartDom = document.getElementById(props.divId);
    var myChart = echarts.init(chartDom!);
    option && myChart.setOption(option);
  }, [props.source])
  return (
    <div>
      <div id={props.divId} style={{ width: 500, height: 300 }}></div>
    </div>
  )
}
export default Line
