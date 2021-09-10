import { Table, Button, Popconfirm, Pagination } from 'antd'
import { useSelector, useDispatch ,useHistory} from 'umi'
import { ProModelObj } from '@/types'

interface Props {
  edit: (item: ProModelObj) => void,
  onPageChange: (page: number, pageSize: number) => void,
  current: number,
  pageSize: number,
  query: string
}
const ProModels = (props: Props) => {
  let dispatch = useDispatch()
  let proModelInfo = useSelector((state: any) => state.ProModel.proModelInfo)
  let total = useSelector((state: any) => state.ProModel.total)
  let history = useHistory()
  //编辑商品模型
  const edit = (item: ProModelObj) => {
    props.edit(item)
  }
  //删除商品模型
  const del = (item: ProModelObj) => {
    dispatch({
      type: 'ProModel/DelProModel',
      payload: {
        id: item._id,
        pageSize: props.pageSize,
        current: props.current,
        query: props.query
      }
    })
  }
  const onPageChange = (page: number, pageSize?: number) => {
    props.onPageChange(page, pageSize!)
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
      title: '操作',
      key: 'key',
      align: 'center',
      render: (item: ProModelObj) => (
        <>
          <Button type="primary" size="small" onClick={() => { edit(item) }}>编辑</Button>
          <Button type="primary" size="small" className={'m-l10'} onClick={() => {
            history.push({
              pathname: '/spec',
              state: {
                parentId: item._id,
                model: item.name
              }
            })
            localStorage.setItem('isAddSpec','1')
          }}>添加规格</Button>
          <Popconfirm
            title="确定删除该商品模型?"
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
  return (
    <div>
      <Table rowKey="_id" columns={columns as any} dataSource={proModelInfo} className={'m-t10'}
        pagination={false} />
      <div className={'f-j-e'}>
        <Pagination
          showSizeChanger
          current={props.current}
          total={proModelInfo && total}
          className={'m-t20'}
          onChange={onPageChange}
        />
      </div>
    </div>
  )
}

export default ProModels
