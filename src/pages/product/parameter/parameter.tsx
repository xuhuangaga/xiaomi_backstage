import { useState, useEffect } from 'react'
import { Input, Button, Form, Select } from 'antd'
import Upload from '@/components/upload/upload';
import Modal from '@/components/modal/Modal';
import { useDispatch, useSelector } from 'umi'
import ProParameter from '@/components/ProParameter/ProParameter';
import { ProductObj } from '@/types';
const { Option } = Select

const ProParams = () => {
  let dispatch = useDispatch()
  const { Search } = Input;
  let [modalTitle, setModalTitle] = useState('')
  let productInfo = useSelector((state: any) => state.Product.productInfo)
  let [query, setQuery] = useState('')
  let [current, setCurrent] = useState(1)
  let [pageSize, setPageSize] = useState(10)
  let [form] = Form.useForm()
  //选中得商品id
  let [proId, setProId] = useState('')
  //被编辑的商品参数信息
  let [item, setItem] = useState<any>()
  let [url, setUrl] = useState('')
  //对话框是否显示
  const [isModalVisible, setIsModalVisible] = useState(false);
  const getData = (page: number, pSize: number, parentId: any) => {
    dispatch(
      {
        type: 'ProParams/ProParamsList',
        payload: {
          current: page,
          pageSize: pSize,
          parentId: parentId
        }
      }
    )
  }
  useEffect(() => {
    getData(1, 1000, null)
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
    item._id ? values.id = item._id : null
    let type = 'ProParams/AddProParams'
    values.id ? type = 'ProParams/EditCarouse' : null
    values.parentId = proId
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
  //子组件分发上传图片的路径
  const uploadUrl = (url: string) => {
    setUrl(url)
    form.setFieldsValue({ url: url })
  }
  //编辑商品参数
  const edit = (data: any) => {
    form.setFieldsValue({ url: data.url })
    setItem(data)
    setUrl(data.url)
    setModalTitle('编辑商品参数')
    setIsModalVisible(true)
  }
  //切换页码
  const onPageChange = (page: number, pageSize: number) => {
    setCurrent(page)
    setPageSize(pageSize)
    page > 0 && getData(page, pageSize, query)
  }
  //选择商品下拉列表
  const onChange = (e: string) => {
    setProId(e)
    getData(current, pageSize, e)
  }
  return (
    <div className={'bc-w'}>
      <div className={'p-10'}>
        <Select style={{ width: 300 }} placeholder='请选择' allowClear={true} className={'m-l10 z'} onChange={onChange} showSearch>
          {
            productInfo.map((item: ProductObj) => {
              return (
                <Option value={item._id} key={item._id}>{item.name}</Option>
              )
            })
          }
        </Select>
        <Button type="primary" className={'m-l10'} onClick={() => {
          setItem({})
          setUrl('')
          setIsModalVisible(true)
          setModalTitle('添加参数')
        }} disabled={!proId}>添加参数</Button>
        <ProParameter edit={edit} onPageChange={onPageChange} parId={proId} pageSize={pageSize} current={current}></ProParameter>
      </div>
      {
        isModalVisible ?
          <Modal handleCancel={handleCancel} title={modalTitle} visible={isModalVisible} handleOk={handleOk}>
            <Form
              preserve={false}
              labelCol={{ span: 5 }}
              form={form}
              onFinish={onFinish}
              initialValues={item}
            >
              <Form.Item
                label="图片地址"
                name='url'
                rules={[{ required: true, message: '请选择图片地址' }]}
              >
                <Upload uploadUrl={uploadUrl} url={url} maxCount={1} imgW={50} imgH={50} listType={'picture'}></Upload>
              </Form.Item>
              <Form.Item
                label="参数名称"
                name='name'
                initialValue={item.title}
                rules={[{ required: true, message: '请输入参数名称' }]}
              >
                <Input allowClear={true} />
              </Form.Item>
              <Form.Item
                name='desc'
                label="参数描述"
                initialValue={item.title}
                rules={[{ required: true, message: '请输入参数描述' }]}
              >
                <Input allowClear={true} />
              </Form.Item>
            </Form>
          </Modal>
          : null
      }
    </div>
  )
}

export default ProParams
