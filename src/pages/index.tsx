import Cake from '@/components/home/chart/cake';
import Line from '@/components/home/chart/line';
import Top from '@/components/home/top/top';
import { useSelector, useDispatch } from 'umi'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useReactive } from 'ahooks'
const Index = () => {

  let dispatch = useDispatch()
  let [hour, setHour] = useState<number[]>([])
  let orderInfo = useSelector((state: any) => state.Order.orderInfo)

  let data: any = useReactive({
    source: [],
    source1:[]
  })
  useEffect(() => {
    for (let i = 1; i <= 24; i++) {
      hour.push(i)
    }
    dispatch(
      {
        type: 'Order/OrderList',
        payload: {
          current: 1,
          pageSize: 1000000
        }
      }
    )
  }, [])
  useEffect(() => {
    if (orderInfo.length) {
      hour.map((item: number, index: number) => {
        let timeStart = dayjs().format('YYYY-MM-DD ') + (item < 10 ? ('0' + item) : item) + ':00:00'
        let timeEnd = dayjs().format('YYYY-MM-DD ') + (item < 10 ? ('0' + item) : item) + ':59:59'
        let arr = orderInfo.filter((item: any) => {
          return dayjs(item.pay_time).valueOf() >= dayjs(timeStart).valueOf()
            && dayjs(item.pay_time).valueOf() <= dayjs(timeEnd).valueOf()
        })
        //获取当日每个小时的订单数量
        data.source.push(arr.length)
        //获取当日每个小时的订单总额
        let total=0
        arr.map((item1: any) => {
           total+= Number(item1.price)
        })
        data.source1.push(total)
      })
      
    }
  }, [orderInfo])
  return (
    <div className={'bc-w p-10'}>
      <Top></Top>
      <div className={'f-j-b'} style={{ marginTop: 50 }}>
        { 
          data.source.length? <Line divId={'main'} title={'今日订单'} legend={['订单量合计']} hour={hour} source={data.source}></Line>:null
        }
        {
          data.source1.length? <Line divId={'main1'} title={'今日销售额'} legend={['销售额合计']} hour={hour} source={data.source1}></Line>:null
        }
        
      </div>
      <Cake></Cake>
    </div>
  );
}
export default Index
