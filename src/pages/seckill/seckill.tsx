import { useState, useEffect } from 'react'
import { Input, Button, Form, DatePicker, InputNumber, Select,message } from 'antd'
import Modal from '@/components/modal/Modal';
import { useSelector, useDispatch } from 'umi'
import Seckills from '@/components/seckill/seckill';
import moment from 'moment';
import { ProductObj } from '@/types';
import dayjs from 'dayjs'
const { Option } = Select

const Seckill = () => {
  let dispatch = useDispatch()
  let productInfo = useSelector((state: any) => state.Product.productInfo)
  const { Search } = Input;
  let [modalTitle, setModalTitle] = useState('')
  let [query, setQuery] = useState('')
  let [current, setCurrent] = useState(1)
  let [pageSize, setPageSize] = useState(10)
  let [form] = Form.useForm()
  //被编辑的秒杀信息
  let [item, setItem] = useState<any>()
  let [goods, setGoods] = useState<ProductObj>()
  //对话框是否显示
  const [isModalVisible, setIsModalVisible] = useState(false);
  const getData = (page: number, pSize: number, queryVal: string) => {
    dispatch(
      {
        type: 'Seckill/SeckillList',
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
    //获取产品列表
    dispatch(
      {
        type: 'Product/ProductList',
        payload: {
          current: 1,
          pageSize: 10000,
          query: ''
        }
      }
    )
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
      values.goods = productInfo.filter((i: ProductObj) => {
        return i._id === values.goods
      })[0]
      let type = 'Seckill/AddSeckill'
      values.id ? type = 'Seckill/EditSeckill' : null
      values.query = query
      values.current = current
      values.pageSize = pageSize
      values.isShow = item.isShow
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
  //编辑秒杀
  const edit = (data: any) => {
    data.start_time = moment(data.start_time)
    data.end_time = moment(data.end_time)
    form.setFieldsValue({ goods: data.goods._id })
    setItem(data)
    setModalTitle('编辑秒杀')
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
          setModalTitle('添加秒杀')
        }}>添加秒杀</Button>
        <Seckills edit={edit} onPageChange={onPageChange} query={query} pageSize={pageSize} current={current}></Seckills>
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
                label="秒杀商品"
                name='goods'
                initialValue={item.goods}
                rules={[{ required: true, message: '请选择秒杀商品' }]}
              >
                <Select placeholder='请选择' allowClear={true}>
                  {
                    productInfo.map((item: ProductObj) => {
                      return (
                        <Option value={item._id} key={item._id}>{item.name}</Option>
                      )
                    })
                  }
                </Select>
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
                label="秒杀价格"
                name='price'
                initialValue={item.price}
                rules={[{ required: true, message: '请输入秒杀价格' }]}
              >
                <InputNumber className={'wbfb'} keyboard={false} min={1} />
              </Form.Item>
              <Form.Item
                label="秒杀数量"
                name='goods_number'
                initialValue={item.goods_number}
                rules={[{ required: true, message: '请输入秒杀数量' }]}
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

export default Seckill
