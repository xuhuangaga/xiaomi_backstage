import { useState, useEffect } from 'react'
import { Input, Button, Form } from 'antd'
import Upload from '@/components/upload/upload';
import Modal from '@/components/modal/Modal';
import { useDispatch } from 'umi'
import Navigations from './../../components/navigation/navigation';

const Carousel = () => {
  let dispatch = useDispatch()
  const { Search } = Input;
  let [modalTitle, setModalTitle] = useState('')
  let [query, setQuery] = useState('')
  let [current, setCurrent] = useState(1)
  let [pageSize, setPageSize] = useState(10)
  let [form] = Form.useForm()
  //被编辑的导航信息
  let [item, setItem] = useState<any>()
  let [url, setUrl] = useState('')
  //对话框是否显示
  const [isModalVisible, setIsModalVisible] = useState(false);
  const getData = (page: number, pSize: number, queryVal: string) => {
    dispatch(
      {
        type: 'Nav/NavList',
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
    item._id ? values.id = item._id : null
    let type = 'Nav/AddNav'
    values.id ? type = 'Nav/EditNav' : null
    values.query=query
    values.current=current
    values.pageSize=pageSize
    dispatch({
      type: type,
      payload: values
    })
    handleCancel()
  }
  //对话框点击取消
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  //子组件分发上传图片的路径
  const uploadUrl = (url: string) => {
    setUrl(url)
    form.setFieldsValue({ url: url })
  }
  //点击搜索按钮
  const onSearch = (val: any) => {
    setQuery(val)
    setCurrent(1)
    getData(1, pageSize, val)
  }
  //编辑导航
  const edit = (data: any) => {
    setItem(data)
    setUrl(data.url)
    form.setFieldsValue({ url: data.url })
    setModalTitle('编辑导航')
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
          setUrl('')
          setIsModalVisible(true)
          setModalTitle('添加导航')
        }}>添加导航</Button>
        <Navigations edit={edit} onPageChange={onPageChange} query={query} pageSize={pageSize} current={current}></Navigations>
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
                label="图片地址"
                name='url'
                rules={[{ required: true, message: '请选择图片地址' }]}
              >
                <Upload uploadUrl={uploadUrl} imgW={100} imgH={100} url={url}  maxCount={1} listType={'picture'}></Upload>
              </Form.Item>
              <Form.Item
                label="导航标题"
                name='title'
                initialValue={item.title}
                rules={[{ required: true, message: '请输入导航标题' }]}
              >
                <Input allowClear={true}/>
              </Form.Item>
            </Form>
          </Modal>
          : null
      }
    </div>
  )
}

export default Carousel
