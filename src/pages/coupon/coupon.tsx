import { useState, useEffect } from 'react'
import { Input, Button, Form, DatePicker, InputNumber, message } from 'antd'
import Modal from '@/components/modal/Modal';
import { useDispatch } from 'umi'
import Coupons from '@/components/coupon/coupon';
import moment from 'moment';
import dayjs from 'dayjs'

const Coupon = () => {
  let dispatch = useDispatch()
  const { Search } = Input;
  let [modalTitle, setModalTitle] = useState('')
  let [query, setQuery] = useState('')
  let [current, setCurrent] = useState(1)
  let [pageSize, setPageSize] = useState(10)
  let [form] = Form.useForm()
  //被编辑的优惠券信息
  let [item, setItem] = useState<any>()
  //对话框是否显示
  const [isModalVisible, setIsModalVisible] = useState(false);
  const getData = (page: number, pSize: number, queryVal: string) => {
    dispatch(
      {
        type: 'Coupon/CouponList',
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
  //对话框点击确认
  const handleOk = () => {
    form.submit()
  };
  const onFinish = () => {
    let values: any = form.getFieldsValue()
    let start_span = dayjs(values.start_time)
    let end_span = dayjs(values.end_time)
    if (end_span < start_span) {
      message.error('开始时间不能大于结束时间', 1)
    } else {
      item._id ? values.id = item._id : null
      let type = 'Coupon/AddCoupon'
      values.id ? type = 'Coupon/EditCoupon' : null
      values.query = query
      values.current = current
      values.pageSize = pageSize
      dispatch({
        type: type,
        payload: values
      })
      handleCancel()
    }
  };
  //对话框点击取消
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  //点击搜索按钮
  const onSearch = (val: any) => {
    setQuery(val)
    setCurrent(1)
    getData(1, pageSize, val)
  }
  //编辑优惠券
  const edit = (data: any) => {
    data.start_time = moment(data.start_time)
    data.end_time = moment(data.end_time)
    setItem(data)
    setModalTitle('编辑优惠券')
    setIsModalVisible(true)
  }
  //切换页码
  const onPageChange = (page: number, pageSize: number) => {
    setCurrent(page)
    setPageSize(pageSize)
    page > 0 && getData(page, pageSize, query)
  }

  return (
    <div className={'bc-w'}>
      <div className={'p-10'}>
        <Search placeholder="请输入" onSearch={(val: any) => { onSearch(val) }} style={{ width: 300 }} />
        <Button type="primary" className={'m-l10'} onClick={() => {
          setItem({})
          setIsModalVisible(true)
          setModalTitle('添加优惠券')
        }}>添加优惠券</Button>
        <Coupons edit={edit} onPageChange={onPageChange} query={query} pageSize={pageSize} current={current}></Coupons>
      </div>
      {
        isModalVisible ?
          <Modal handleCancel={handleCancel} title={modalTitle} visible={isModalVisible} handleOk={handleOk}>
            <Form
              preserve={false}
              labelCol={{ span: 5 }}
              form={form}
              onFinish={onFinish}
            >
              <Form.Item
                label="优惠券名称"
                name='name'
                initialValue={item.name}
                rules={[{ required: true, message: '请输入优惠券名称' }]}
              >
                <Input allowClear={true} />
              </Form.Item>
              <Form.Item
                label="使用门槛"
                name='threshold'
                initialValue={item.threshold}
                rules={[{ required: true, message: '请输入使用门槛' }]}
              >
                <InputNumber className={'wbfb'} keyboard={false} min={1} />
              </Form.Item>
              <Form.Item
                label="优惠金额"
                name='amount'
                initialValue={item.amount}
                rules={[{ required: true, message: '请输入优惠金额' }]}
              >
                <InputNumber className={'wbfb'} min={1} />
              </Form.Item>
              <Form.Item
                label="开始时间"
                name='start_time'
                initialValue={item.start_time}
                rules={[{ required: true, message: '请选择开始时间' }]}
              >
                <DatePicker className={'wbfb'} showTime={true} />
              </Form.Item>
              <Form.Item
                label="结束时间"
                name='end_time'
                initialValue={item.end_time}
                rules={[{ required: true, message: '请选择结束时间' }]}
              >
                <DatePicker className={'wbfb'} showTime={true} />
              </Form.Item>
              <Form.Item
                label="发放数量"
                name='number'
                initialValue={item.number}
                rules={[{ required: true, message: '请输入发放数量' }]}
              >
                <InputNumber className={'wbfb'} min={1} />
              </Form.Item>
            </Form>
          </Modal>
          : null
      }
    </div>
  )
}

export default Coupon
