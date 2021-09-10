import { useState, useEffect } from 'react'
import { Input, Form, Select, Radio } from 'antd'
import Modal from '@/components/modal/Modal';
import { useDispatch, useSelector } from 'umi'
import Specs from '@/components/product/spec'


const Spec = () => {
  let dispatch = useDispatch()
  let proModelInfo = useSelector((state: any) => state.ProModel.proModelInfo)
  let [query, setQuery] = useState('')
  let [current, setCurrent] = useState(1)
  let [pageSize, setPageSize] = useState(10)
  //选中的模型id
  let [parentId, setParentId] = useState('')
  // 选中的模型名字
  let [model, setModel] = useState('')
  let [form] = Form.useForm()
  const { Option } = Select;
  const { TextArea } = Input
  //对话框是否显示
  const [isModalVisible, setIsModalVisible] = useState(false);
  const getData = (page: number, pSize: number, queryVal: string) => {
    dispatch(
      {
        type: 'ProSpec/ProSpecList',
        payload: {
          current: page,
          pageSize: pSize,
          query: queryVal
        }
      }
    )
  }
  useEffect(() => {
    dispatch(
      {
        type: 'ProModel/ProModelList',
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
    values.parentId = parentId
    values.model = model
    values.query = query
    values.current = current
    values.pageSize = pageSize
    dispatch({
      type: 'ProSpec/AddProSpec',
      payload: values
    })
    handleCancel()
  };
  //对话框点击取消
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const setVisible = () => {
    setIsModalVisible(true);
  };
  //选择下拉列表
  const onChange = (parentId: string, model: string) => {
    setParentId(parentId)
    setModel(model)
  }
  return (
    <div className={'bc-w'}>
      <Specs onChange={onChange} proModelInfo={proModelInfo} query={query} pageSize={pageSize} current={current} setVisible={setVisible}></Specs>
      {
        isModalVisible ?
          <Modal handleCancel={handleCancel} title={'添加规格'} visible={isModalVisible} handleOk={handleOk}>
            <Form
              preserve={false}
              labelCol={{ span: 5 }}
              form={form}
              onFinish={onFinish}
            >
              <Form.Item
                label="规格名称"
                name='name'
                rules={[{ required: true, message: '请输入规格名称' }]}
              >
                <Input placeholder='请输入规格名称' />
              </Form.Item>
              {proModelInfo ?
                <Form.Item
                  label="所属模型"
                  name='item'
                  rules={[{ required: true, message: '请选择所属模型' }]}
                  initialValue={parentId}
                >
                  <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="请选择"
                    onChange={(value:string,option:any) => {
                       setParentId(value)
                      setModel(option && option.children) }}
                    allowClear
                  >
                    {
                      proModelInfo.map((item: any, index: number) => {
                        return (
                          <Option value={item._id} key={index}>{item.name}</Option>
                        )
                      })
                    }
                  </Select>
                </Form.Item> : null}
              <Form.Item
                label="规格项"
                name='spec_item'
                rules={[{ required: true, message: '请输入规格项' }]}
              >
                <TextArea placeholder='请输入规格项,一行一个' />
              </Form.Item>
              <Form.Item
                label="展示方式"
                name='mode'
                rules={[{ required: true, message: '请选择展示方式' }]}
              >
                <Radio.Group>
                  <Radio value={'文字'}>文字</Radio>
                  <Radio value={'图片'}>图片</Radio>
                  <Radio value={'颜色'}>颜色</Radio>
                </Radio.Group>
              </Form.Item>
            </Form>
          </Modal>
          : null
      }
    </div>
  )
}

export default Spec
