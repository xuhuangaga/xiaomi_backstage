import { useState, useEffect } from 'react'
import { Input, Button, Form, Select } from 'antd'
import Modal from '@/components/modal/Modal';
import { useSelector, useDispatch } from 'umi'
import Recomments from '@/components/Recomment/Recomment';
import moment from 'moment';
import { ProductObj } from '@/types';
const { Option } = Select

const Recommend = () => {
  let dispatch = useDispatch()
  let productInfo = useSelector((state: any) => state.Product.productInfo)
  const { Search } = Input;
  let [modalTitle, setModalTitle] = useState('')
  let [query, setQuery] = useState('')
  let [current, setCurrent] = useState(1)
  let [pageSize, setPageSize] = useState(10)
  let [form] = Form.useForm()
  //被编辑的推荐导航信息
  let [item, setItem] = useState<any>()
  let [goods, setGoods] = useState<ProductObj>()
  //对话框是否显示
  const [isModalVisible, setIsModalVisible] = useState(false);
  const getData = (page: number, pSize: number, queryVal: string) => {
    dispatch(
      {
        type: 'Recomment/RecommentList',
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
    let goods:ProductObj[] = []
    values.goods.map((i:string)=>{
      productInfo.map((info:ProductObj)=>{
        if (i===info._id) {
          goods.push(info)
        }
      })
    })
    item._id ? values.id = item._id : null
    values.goods = goods
    let type = 'Recomment/AddRecomment'
    values.id ? type = 'Recomment/EditRecomment' : null
    values.query = query
    values.current = current
    values.pageSize = pageSize
    dispatch({
      type: type,
      payload: values
    })
    handleCancel()
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
  //编辑推荐导航
  const edit = (data: any) => {
    data.start_time = moment(data.start_time)
    data.end_time = moment(data.end_time)
    let arr:string[]=[]
    data.goods.map((i:ProductObj)=>{
      arr.push(i._id)
    })
    form.setFieldsValue({ goods: arr })
    setItem(data)
    setModalTitle('编辑推荐导航')
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
          setModalTitle('添加推荐导航')
        }}>添加推荐导航</Button>
        <Recomments edit={edit} onPageChange={onPageChange} query={query} pageSize={pageSize} current={current}></Recomments>
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
                label="导航名称"
                name='name'
                initialValue={item.name}
                rules={[{ required: true, message: '请输入导航名称' }]}
              >
                <Input allowClear={true} />
              </Form.Item>
              <Form.Item
                label="导航描述"
                name='desc'
                initialValue={item.desc}
                rules={[{ required: true, message: '请输入导航描述' }]}
              >
                <Input allowClear={true} />
              </Form.Item>
              <Form.Item
                label="下属商品"
                name='goods'
                initialValue={item.goods}
                rules={[{ required: true, message: '请选择下属商品' }]}
              >
                <Select placeholder='请选择' allowClear={true}  mode="multiple" showSearch>
                  {
                    productInfo.map((item: ProductObj) => {
                      return (
                        <Option value={item._id} key={item._id}>{item.name}</Option>
                      )
                    })
                  }
                </Select>
              </Form.Item>
            </Form>
          </Modal>
          : null
      }
    </div>
  )
}

export default Recommend
