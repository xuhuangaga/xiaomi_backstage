import { Table, Button, Popconfirm, Pagination, Form, Select } from 'antd'
import { useSelector, useDispatch,useHistory } from 'umi'
import { ProModelObj, ProSpecObj } from '@/types'
import { useState, useEffect } from 'react'
import { SearchOutlined, RedoOutlined, PlusOutlined } from '@ant-design/icons';

interface Props {
  current: number,
  pageSize: number,
  query: string,
  setVisible: () => void,
  proModelInfo: ProModelObj[],
  onChange: (parentId: string, model: string) => void
}
const Specs = (props: Props) => {
  //是否是从添加模型页面跳转过来的
  let isAddSpec = localStorage.getItem('isAddSpec')
  let dispatch = useDispatch()
  let proSpecInfo = useSelector((state: any) => state.ProSpec.proSpecInfo)
  let total = useSelector((state: any) => state.ProSpec.total)
  let history = useHistory()
  let [current, setCurrent] = useState(1)
  let [pageSize, setPageSize] = useState(10)
  //选中的模型id
  let [parentId, setParentId] = useState(history.location.state && isAddSpec ? (history.location.state as any).parentId : '')
  // 选中的模型名字
  let [model, setModel] = useState(history.location.state && isAddSpec ? (history.location.state as any).model : '')
  let [form] = Form.useForm()
  const { Option } = Select;
  useEffect(() => {
    parentId && model && props.onChange(parentId, model)
  }, [parentId, model])
  useEffect(() => {
    // 如果是从模型页面跳转过来的 默认请求该模型的数据
    if (isAddSpec) {
      history.location.state && getData(1, 10, (history.location.state as any).parentId)
      localStorage.removeItem('isAddSpec')
    }
    dispatch({
      type:'ProSpec/ProSpecReset'
    })
  }, [])
  // 获取规格列表
  const getData = (page: number, pSize: number, parId: string) => {
    dispatch(
      {
        type: 'ProSpec/ProSpecList',
        payload: {
          current: page,
          pageSize: pSize,
          parentId: parId
        }
      }
    )
  }
  //删除商品规格
  const del = (item: ProSpecObj) => {
    console.log(item);
    dispatch({
      type: 'ProSpec/DelProSpec',
      payload: {
        attrId: item._id,
        parentId: item.parentId,
        pageSize: props.pageSize,
        current: props.current,
        query: props.query
      }
    })
  }
  // 切换页码
  const onPageChange = (page: number, pageSize?: number) => {
    setCurrent(page)
    setPageSize(pageSize!)
    page > 0 && getData(page, pageSize!, parentId)
  }
  const columns = [
    {
      title: '#',
      dataIndex: 'key',
      key: 'key',
      align: 'center'
    },
    {
      title: '模型名称',
      dataIndex: 'name',
      key: 'name',
      align: 'center'
    },
    {
      title: '所属模型',
      dataIndex: 'model',
      key: 'model',
      align: 'center'
    },
    {
      title: '展现方式',
      dataIndex: 'mode',
      key: 'mode',
      align: 'center'
    },
    {
      title: '规格项',
      dataIndex: 'spec_item',
      key: 'spec_item',
      align: 'center',
    },
    {
      title: '操作',
      key: 'key',
      align: 'center',
      render: (item: ProSpecObj) => (
        <>
          <Popconfirm
            title="确定删除该商品规格?"
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
  //点击搜索
  const onCheckFinish = () => {
    parentId && getData(1, 10, parentId)
  }
  //选择下拉列表
  const onChange = (value: any, option: any) => {
    setParentId(value)
    setModel(option && option.children)
  }
  //点击重置
  const recharge = () => {
    form.resetFields()
    setParentId('')
    setModel('')
    dispatch({
      type:'ProSpec/ProSpecReset'
    })
  }
  return (
    <div className={'p-10'}>
      <div className={'b-b'} style={{ marginTop: 15 }}>
        <Form
          onFinish={onCheckFinish}
          form={form}
          className={'f-a-c'}
        >
          {
            props.proModelInfo&&parentId ?
              <Form.Item
                label="所属模型"
                name='parentId'
                initialValue={parentId}
                rules={[{ required: true, message: '请选择所属模型' }]}

              >
                <Select
                  showSearch
                  style={{ width: 200 }}
                  placeholder="请选择"
                  onChange={onChange}
                  allowClear
                  className={'f-c-6'}
                >
                  {
                    props.proModelInfo.map((item: any, index: number) => {
                      return (
                        <Option value={item._id} key={index}>{item.name}</Option>
                      )
                    })
                  }
                </Select>
              </Form.Item> :
               <Form.Item
                label="所属模型"
                name='parentId'
                rules={[{ required: true, message: '请选择所属模型' }]}
              >
                <Select
                  showSearch
                  style={{ width: 200 }}
                  placeholder="请选择"
                  onChange={onChange}
                  allowClear
                  className={'f-c-6'}
                >
                  {
                    props.proModelInfo.map((item: any, index: number) => {
                      return (
                        <Option value={item._id} key={index}>{item.name}</Option>
                      )
                    })
                  }
                </Select>
              </Form.Item>}
          <Form.Item>
            <Button htmlType="submit" className={'m-l10'} type="primary" icon={<SearchOutlined />}>查询</Button>
          </Form.Item>
          <Form.Item>
            <Button htmlType="reset" className={'m-l10'} icon={<RedoOutlined />} onClick={() => {
              recharge()
            }}>重置</Button>
          </Form.Item>
        </Form>
      </div>
      <Button type="primary" className={'m-l10 m-t-b10'} onClick={() => {
        props.setVisible()
      }} icon={<PlusOutlined />} disabled={!parentId}>添加规格</Button>
      <Table rowKey="_id" columns={columns as any} dataSource={proSpecInfo}
        pagination={false} />
      <div className={'f-j-e'}>
        <Pagination
          showSizeChanger
          current={props.current}
          total={proSpecInfo && total}
          className={'m-t20'}
          onChange={onPageChange}
        />
      </div>
    </div>
  )
}

export default Specs
