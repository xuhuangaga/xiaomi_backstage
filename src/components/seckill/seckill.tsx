import { Table, Switch, Button, Popconfirm, Pagination } from 'antd'
import { useSelector, useDispatch } from 'umi'
import { SeckillObj } from '@/types'
import dayjs from 'dayjs'

interface Props {
  edit: (item: SeckillObj) => void,
  onPageChange: (page: number, pageSize: number) => void,
  current: number,
  pageSize: number,
  query: string
}
const Seckills = (props: Props) => {
  let seckillInfo = useSelector((state: any) => state.Seckill.seckillInfo)
  let total = useSelector((state: any) => state.Seckill.total)
  let dispatch = useDispatch()
  //修改秒杀状态
  const onChange = (isShow: boolean, item: SeckillObj) => {
    dispatch({
      type: 'Seckill/EditStatus',
      payload: {
        id: item._id,
        isShow: isShow
      }
    })
  }
  //编辑秒杀
  const edit = (item: SeckillObj) => {
    props.edit(item)
  }
  //删除秒杀
  const del = (item: SeckillObj) => {
    console.log(item._id);
    dispatch({
      type: 'Seckill/DelSeckill',
      payload: {
        id: item._id,
        goodsId:item._id,
        pageSize: props.pageSize,
        current: props.current,
        query: props.query
      }
    })
  }
  const onPageChange = (page: number, pageSize?: number) => {
    props.onPageChange(page, pageSize!)
  }
  const columns = [
    {
      title: '秒杀商品',
      dataIndex: 'goods',
      key: 'goods',
      align: 'center',
      render:(goods:any)=>(
      <span>{goods.name}</span>
      )
    },
    {
      title: '开始时间',
      key: 'start_time',
      dataIndex: 'start_time',
      align: 'center',
      render: (start_time: string) => (
        <span>{dayjs(start_time).format('YYYY-MM-DD HH:mm:ss')}</span>
      )
    },
    {
      title: '结束时间',
      key: 'end_time',
      dataIndex: 'end_time',
      align: 'center',
      render: (end_time: string) => (
        <span>{dayjs(end_time).format('YYYY-MM-DD HH:mm:ss')}</span>
      )
    },
    {
      title: '秒杀价格',
      dataIndex: 'price',
      key: 'price',
      align: 'center'
    },
    {
      title: '秒杀数量',
      dataIndex: 'goods_number',
      key: 'goods_number',
      align: 'center'
    },
    {
      title: '是否显示',
      key: 'isShow',
      dataIndex: 'isShow',
      align: 'center',
      render: (isShow: boolean, item: SeckillObj) => (
        <Switch defaultChecked={isShow} onChange={() => { onChange(!isShow, item) }} size="small" />
      )
    },
    {
      title: '操作',
      key: 'key',
      align: 'center',
      render: (item: SeckillObj) => (
        <>
          <Button type="primary" size="small" onClick={() => { edit(item) }}>编辑</Button>
          <Popconfirm
            title="确定删除该秒杀?"
            onConfirm={() => del(item)}
            okText="确定"
            cancelText="取消"
          >
            <Button type="default" danger className={'m-l10'} size="small">删除</Button>
          </Popconfirm>
        </>
      )
    }
  ];
  return (
    <div>
      <Table rowKey="_id" columns={columns as any} dataSource={seckillInfo} className={'m-t10'}
        pagination={false} />
      <div className={'f-j-e'}>
        <Pagination
          showSizeChanger
          current={props.current}
          total={seckillInfo && total}
          className={'m-t20'}
          onChange={onPageChange}
        />
      </div>
    </div>
  )
}

export default Seckills
