import { useState, useEffect } from 'react'
import { Input, Button, Form } from 'antd'
import Upload from '@/components/upload/upload';
import Modal from '@/components/modal/Modal';
import { useDispatch } from 'umi'
import Users from './../../components/user/user';

const User = () => {
  let dispatch = useDispatch()
  const { Search } = Input;
  let [modalTitle, setModalTitle] = useState('')
  let [query, setQuery] = useState('')
  let [current, setCurrent] = useState(1)
  let [pageSize, setPageSize] = useState(10)
  let [form] = Form.useForm()
  //被编辑的用户信息
  let [item, setItem] = useState<any>()
  let [url, setUrl] = useState('')
  //对话框是否显示
  const [isModalVisible, setIsModalVisible] = useState(false);
  const getData = (page: number, pSize: number, queryVal: string) => {
    dispatch(
      {
        type: 'User/UserList',
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
    let type = 'User/AddUser'
    values.id ? type = 'User/EditUser' : null
    values.query = query
    values.current = current
    values.pageSize = pageSize
    values.mobile = values.mobile !== undefined ? values.mobile : ''
    values.email = values.email !== undefined ? values.email : ''
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
    form.setFieldsValue({ avatar: url })
  }
  //点击搜索按钮
  const onSearch = (val: any) => {
    setQuery(val)
    setCurrent(1)
    getData(1, pageSize, val)
  }
  //编辑用户
  const edit = (data: any) => {
    setItem(data)
    setUrl(data.avatar)
    form.setFieldsValue({ avatar: data.avatar })
    setModalTitle('编辑用户')
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
          setModalTitle('添加用户')
        }}>添加用户</Button>
        <Users edit={edit} onPageChange={onPageChange} query={query} pageSize={pageSize} current={current}></Users>
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
                name='avatar'
                rules={[{ required: true, message: '请选择图片地址' }]}
              >
                <Upload uploadUrl={uploadUrl} imgW={100} imgH={100} url={url}  maxCount={1} listType={'picture'}></Upload>
              </Form.Item>
              <Form.Item
                label="用户名称"
                name='username'
                initialValue={item.username}
                rules={[{ required: true, message: '请输入用户名称' }]}
              >
                <Input allowClear={true} />
              </Form.Item>
              {
                !url ? <Form.Item
                  label="用户密码"
                  name='password'
                  initialValue={item.password}
                  rules={[{ required: true, message: '请输入用户密码' },
                  { min: 6, max: 10, message: '密码长度在6-10个字符' }]}
                >
                  <Input allowClear={true} type="password" />
                </Form.Item> : null
              }

              <Form.Item
                label="用户电话"
                name='mobile'
                initialValue={item.mobile}
              >
                <Input allowClear={true} />
              </Form.Item>
              <Form.Item
                label="用户邮箱"
                name='email'
                initialValue={item.email}
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

export default User
