import { useState, useEffect } from 'react'
import { Input, Button, Form } from 'antd'
import Modal from '@/components/modal/Modal';
import { useDispatch } from 'umi'
import Notices from '@/components/notice/notice';

const Notice = () => {
  let dispatch = useDispatch()
  const { Search } = Input;
  let [modalTitle, setModalTitle] = useState('')
  let [query, setQuery] = useState('')
  let [current, setCurrent] = useState(1)
  let [pageSize, setPageSize] = useState(10)
  let [form] = Form.useForm()
  //被编辑的通知信息
  let [item, setItem] = useState<any>()
  //对话框是否显示
  const [isModalVisible, setIsModalVisible] = useState(false);
  const getData = (page: number, pSize: number, queryVal: string) => {
    dispatch(
      {
        type: 'Notice/NoticeList',
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
    let type = 'Notice/AddNotice'
    values.id ? type = 'Notice/EditNotice' : null
    values.query=query
    values.current=current
    values.pageSize=pageSize
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
  //编辑通知
  const edit = (data: any) => {
    setItem(data)
    setModalTitle('编辑通知')
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
          setModalTitle('添加通知')
        }}>添加通知</Button>
        <Notices edit={edit} onPageChange={onPageChange} query={query} pageSize={pageSize} current={current}></Notices>
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
                label="通知内容"
                name='content'
                initialValue={item.content}
                rules={[{ required: true, message: '请输入通知内容' }]}
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

export default Notice
