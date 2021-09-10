import { useEffect, useState } from 'react'
import * as echarts from 'echarts';
import { useDispatch, useSelector } from 'umi'

const Cake = () => {
  let dispatch = useDispatch()
  let classifyInfo = useSelector((state: any) => state.Classify.classifyInfo)
  useEffect(() => {
    if (classifyInfo && classifyInfo.length) {
      let arr:any=[]
      classifyInfo.map((item:any) => {
        arr.push({
          value: item.list.length, name: item.name 
        })
      })
    var chartDom = document.getElementById('cake');
    var myChart = echarts.init(chartDom!);
    arr && myChart.setOption({
      title: {
        text: '商品分类',
        left: 'left'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        top: 50
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: '50%',
          data: arr,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    });
    }
  }, [classifyInfo])
  useEffect(() => {
    dispatch({
      type: 'Classify/ClassifyList',
      payload: { val: '', isClass: false }
    })
  }, [])
  return (
    <div>
      <div id='cake' style={{ width: 1000, height: 500 }}></div>
    </div>
  )
}
export default Cake
