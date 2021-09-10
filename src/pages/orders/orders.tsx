import { Table, Pagination, Input } from 'antd'
import { useSelector, useDispatch } from 'umi'
import { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import { OrderObj } from '@/types'

const Orders = () => {
  const { Search } = Input;
  let orderInfo = useSelector((state: any) => state.Order.orderInfo)
  let total = useSelector((state: any) => state.Order.total)
  let [current, setCurrent] = useState(1)
  let [pageSize, setPageSize] = useState(10)
  let [query, setQuery] = useState('')
  let dispatch = useDispatch()
  const getData = (page: number, pSize: number, queryVal: string) => {
    dispatch(
      {
        type: 'Order/OrderList',
        payload: {
          current: page,
          pageSize: pSize,
          query: queryVal
        }
      }
    )
  }
  useEffect(() => {
    getData(current, pageSize, query)
  }, [])
  //页面页码
  const onPageChange = (page: number, pageSize?: number) => {
    setCurrent(page)
    setPageSize(pageSize!)
    page > 0 && getData(page, pageSize!, query)
  }
  //点击搜索按钮
  const onSearch = (val: any) => {
    setQuery(val)
    setCurrent(1)
    getData(1, pageSize, val)
  }
  const columns = [
    {
      title: '用户名称',
      dataIndex: 'user_id',
      key: 'user_id',
      align: 'center'
    },
    {
      title: '订单日期',
      key: 'pay_time',
      dataIndex: 'pay_time',
      align: 'center',
      render: (pay_time: string) => (
        <span>{dayjs(pay_time).format('YYYY-MM-DD HH:mm:ss')}</span>
      )
    },
    {
      title: '商品数量',
      key: 'count',
      dataIndex: 'count',
      align: 'center'
    },
    {
      title: '订单价格',
      dataIndex: 'price',
      key: 'price',
      align: 'center'
    },
    {
      title: '商品名称',
      dataIndex: 'goods_list',
      key: 'goods_list',
      align: 'center',
      render: (goods_list:any) => (
        <div>{goods_list[0].goods.name}</div>
      )
    },
    {
      title: '订单地址',
      dataIndex: 'address',
      key: 'address',
      align: 'center',
    }
  ];
  return (
    <div className={'bc-w'}>
      <div className={'p-10'}>
        <Search placeholder="请输入" onSearch={(val: any) => { onSearch(val) }} style={{ width: 300 }} />
        <Table rowKey="_id" columns={columns as any} dataSource={orderInfo} className={'m-t10'}
          pagination={false} />
      </div>
      <div className={'f-j-e'}>
        <Pagination
          showSizeChanger
          current={current}
          total={orderInfo && total}
          className={'m-t20'}
          onChange={onPageChange}
        />
      </div>
    </div>
  )
}

export default Orders
