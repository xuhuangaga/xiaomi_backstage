import { useState, useEffect } from 'react'
import { Tree, Input, Card, Form, Select, Popconfirm } from 'antd'
import { useDispatch, useSelector } from 'umi'
import styles from './index.less'
import { FileOutlined, FolderOutlined, FolderOpenOutlined } from '@ant-design/icons'

const { Search } = Input;
const { DirectoryTree } = Tree;
const { Option } = Select;
const Classification = () => {
  let dispatch = useDispatch()
  let classifyInfo = useSelector((state: any) => state.Classify.classifyInfo)
  let [query, setQuery] = useState('')
  let [form] = Form.useForm()
  let [key, setKey] = useState('')
  let [active, setActive] = useState('')
  // 获取商品分类列表
  const getData = (val: string) => {
    dispatch({
      type: 'Classify/ClassifyList',
      payload: { val: val, isClass: true }
    })
  }
  useEffect(() => {
    getData(query)
  }, [])
  //点击搜索按钮
  const onSearch = (val: any) => {
    getData(val)
    setQuery(val)
  }
  const onFinish = () => {
    let values: any = form.getFieldsValue()
    values.query = query
    values.isShow = true
    values.isClass=true
    values.parentId ? dispatch({
      type: 'Classify/AddSecondCategory',
      payload: values
    }) : dispatch({
      type: 'Classify/AddCategory',
      payload: values
    })
    form.resetFields()
  }
  //点击树形的一级分类
  const onExpand = (e: any) => {
    setKey(e)
  };
  //删除分类
  const del = (e: any, data: any) => {
    e.stopPropagation()
    dispatch({
      type: 'Classify/DelClassify',
      payload: {
        id: data._id,
        query: query,
        isClass:true
      }
    })
    form.resetFields()
  }
  //点击取消删除
  const cancel = (e: any) => {
    e.stopPropagation()
  }
  //选中树形一级分类
  const onselect = (e: any) => {
    setActive(e[0])
  }
  return (
    <div className={'bc-w p-10'}>
      <Search placeholder="请输入" onSearch={(val: any) => { onSearch(val) }} style={{ width: 300 }} />
      <div className={'m-t20 f-jb'}>
        <div className={'f-2'}>
          <DirectoryTree
            multiple
            treeData={classifyInfo}
            icon={null}
            onExpand={onExpand}
            onSelect={onselect}
            titleRender={(nodeData: any) => {
              return (
                <div className={`f-j-b ${styles.item}`} >
                  <div>
                    {
                      nodeData.isLeaf ? <FileOutlined /> :
                        key.includes(nodeData._id) ? <FolderOpenOutlined /> : <FolderOutlined />
                    }
                    <span className={'m-l10'}>{nodeData.title}</span>
                  </div>
                  {
                    !nodeData.isLeaf &&
                    <div className={`${styles.active}`} style={active === nodeData._id ? { display: 'block' } : undefined}>
                      <div className={`f-a-c`}>
                        <div onClick={(e) => {
                          e.stopPropagation()
                          form.setFieldsValue({ parentId: nodeData._id })
                        }}>新增</div>
                        {
                          active === nodeData._id ?
                            <Popconfirm
                              title="确定删除该分类?"
                              onConfirm={(e) => { del(e, nodeData) }}
                              onCancel={(e) => { cancel(e) }}
                              okText="确定"
                              cancelText="取消"
                              className={`${styles.active}`}
                            >
                              <div onClick={(e) => { e.stopPropagation() }} className={'m-l10'} style={active === nodeData._id ? { display: 'block' } : undefined}>删除</div>
                            </Popconfirm>
                            : <div onClick={(e) => { e.stopPropagation() }} className={'m-l10'}>删除</div>
                        }
                      </div>
                    </div>
                  }
                </div>
              )
            }}
          />
        </div>
        <div className={'f-1 m-l10'}>
          <Card title="新增分类" extra={<span onClick={() => { form.submit() }} className={'c-p'} style={{ color: 'blue' }}>确认</span>} style={{ width: 500 }}>
            <Form
              preserve={false}
              labelCol={{ span: 5 }}
              form={form}
              onFinish={onFinish}
            >
              <Form.Item
                label="分类名称"
                name='name'
                rules={[{ required: true, message: '请输入分类名称' }]}
              >
                <Input allowClear={true} placeholder="请输入分类名称" />
              </Form.Item>
              <Form.Item
                label="分类名称"
                name='_id'
                style={{ display: 'none' }}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="上级分类"
                name='parentId'
              >
                <Select
                  showSearch
                  placeholder="请选择"
                  allowClear
                >
                  {
                    classifyInfo.map((item: any, index: number) => {
                      return (
                        <Option value={item._id} key={index}>{item.name}</Option>
                      )
                    })
                  }
                </Select>
              </Form.Item>
              <Form.Item
                label="分类别名"
                name='short_name'
              >
                <Input allowClear={true} placeholder="请输入分类别名" />
              </Form.Item>
            </Form>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Classification
