import { Table, Switch, Button, Popconfirm, Pagination,Image } from 'antd'
import { useSelector, useDispatch } from 'umi'
import { NavObj } from '@/types'

interface Props {
  edit: (item: NavObj) => void,
  onPageChange:(page:number,pageSize:number)=>void,
  current:number
  pageSize: number,
  query: string
}
const Navigations = (props: Props) => {
  let navInfo = useSelector((state: any) => state.Nav.navInfo)
  let total = useSelector((state: any) => state.Nav.total)
  let dispatch = useDispatch()
  //修改导航
  const onChange = (isShow: boolean, item: NavObj) => {
    dispatch({
      type: 'Nav/EditStatus',
      payload: {
        id: item._id,
        isShow: isShow
      }
    })
  }
  //编辑导航
  const edit = (item: NavObj) => {
    props.edit(item)
  }
  //删除导航
  const del = (item: NavObj) => {
    dispatch({
      type: 'Nav/DelNav',
      payload: {
        id: item._id,
        pageSize: props.pageSize,
        current: props.current,
        query: props.query
      }
    })
  }
  const onPageChange=(page:number, pageSize?:number)=>{
    props.onPageChange(page,pageSize!)
  }
  const columns = [
    {
      title: '图片',
      dataIndex: 'url',
      key: 'url',
      align: 'center',
      render: (url: string) => (
        <Image src={url} width={100} height={100}></Image>
      )
    },
    {
      title: '路径',
      dataIndex: 'url',
      key: 'url',
      align: 'center',
      width: 120
    },
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      align: 'center'
    },
    {
      title: '是否显示',
      key: 'isShow',
      dataIndex: 'isShow',
      align: 'center',
      render: (isShow: boolean, item: NavObj) => (
        <Switch defaultChecked={isShow} onChange={() => { onChange(!isShow, item) }} size="small" />
      )
    },
    {
      title: '操作',
      key: 'key',
      align: 'center',
      render: (item: NavObj) => (
        <>
          <Button type="primary" size="small" onClick={() => { edit(item) }}>编辑</Button>
          <Popconfirm
            title="确定删除该导航?"
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
      <Table rowKey="_id" columns={columns as any} dataSource={navInfo} className={'m-t10'}
        pagination={false} />
      <div className={'f-j-e'}>
        <Pagination
          showSizeChanger
          current={props.current}
          total={navInfo && total}
          className={'m-t20'}
          onChange={onPageChange}
        />
      </div>
    </div>
  )
}

export default Navigations
