import { Table, Switch, Button, Popconfirm, Pagination, Image } from 'antd'
import { useSelector, useDispatch } from 'umi'
import { CouponObj } from '@/types'
import dayjs from 'dayjs'

interface Props {
  edit: (item: CouponObj) => void,
  onPageChange: (page: number, pageSize: number) => void,
  current: number,
  pageSize: number,
  query: string
}
const Coupons = (props: Props) => {
  let couponInfo = useSelector((state: any) => state.Coupon.couponInfo)
  let total = useSelector((state: any) => state.Coupon.total)
  let dispatch = useDispatch()
  //修改优惠券状态
  const onChange = (isShow: boolean, item: CouponObj) => {
    dispatch({
      type: 'Coupon/EditStatus',
      payload: {
        id: item._id,
        isShow: isShow
      }
    })
  }
  //编辑优惠券
  const edit = (item: CouponObj) => {
    props.edit(item)
  }
  //删除优惠券
  const del = (item: CouponObj) => {
    dispatch({
      type: 'Coupon/DelCoupon',
      payload: {
        id: item._id,
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
      title: '优惠券内容',
      dataIndex: 'name',
      key: 'name',
      align: 'center'
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
      title: '优惠金额',
      dataIndex: 'amount',
      key: 'amount',
      align: 'center'
    },
    {
      title: '使用门槛',
      dataIndex: 'threshold',
      key: 'threshold',
      align: 'center'
    },
    {
      title: '发放数量',
      dataIndex: 'number',
      key: 'number',
      align: 'center'
    },
    {
      title: '是否禁用',
      dataIndex: 'isShow',
      key: 'isShow',
      align: 'center',
      render: (isShow: boolean, item: any) => (
        <Switch defaultChecked={isShow} onChange={() => { onChange(!isShow, item) }} size="small" />
      )
    },
    {
      title: '操作',
      key: 'key',
      align: 'center',
      width:140,
      render: (item: CouponObj) => (
        <>
          <Button type="primary" size="small" onClick={() => { edit(item) }}>编辑</Button>
          <Popconfirm
            title="确定删除该优惠券?"
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
      <Table rowKey="_id" columns={columns as any} dataSource={couponInfo} className={'m-t10'}
        pagination={false} />
      <div className={'f-j-e'}>
        <Pagination
          showSizeChanger
          current={props.current}
          total={couponInfo && total}
          className={'m-t20'}
          onChange={onPageChange}
        />
      </div>
    </div>
  )
}

export default Coupons
