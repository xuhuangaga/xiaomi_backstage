import { Table, Switch, Button, Popconfirm, Pagination,Image } from 'antd'
import { useSelector, useDispatch } from 'umi'
import { UserObj } from '@/types'

interface Props {
  edit: (item: UserObj) => void,
  onPageChange:(page:number,pageSize:number)=>void,
  current:number
  pageSize: number,
  query: string
}
const Users = (props: Props) => {
  let userInfo = useSelector((state: any) => state.User.userInfo)
  let total = useSelector((state: any) => state.User.total)
  let dispatch = useDispatch()
  //修改用户
  const onChange = (status: boolean, item: UserObj) => {
    dispatch({
      type: 'User/EditStatus',
      payload: {
        id: item._id,
        status: status
      }
    })
  }
  //编辑用户
  const edit = (item: UserObj) => {
    props.edit(item)
  }
  //删除用户
  const del = (item: UserObj) => {
    dispatch({
      type: 'User/DelUser',
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
      title: '用户头像',
      dataIndex: 'avatar',
      key: 'avatar',
      align: 'center',
      render: (avatar: string) => (
        <Image src={avatar} width={100} height={100}></Image>
      )
    },
    {
      title: '用户名称',
      dataIndex: 'username',
      key: 'username',
      align: 'center'
    },
    {
      title: '用户电话',
      dataIndex: 'mobile',
      key: 'mobile',
      align: 'center'
    },
    {
      title: '用户邮箱',
      key: 'email',
      dataIndex: 'email',
      align: 'center'
    },
    {
      title: '是否禁用',
      key: 'status',
      dataIndex: 'status',
      align: 'center',
      render: (status: boolean, item: UserObj) => (
        <Switch defaultChecked={status} onChange={() => { onChange(!status, item) }} size="small" />
      )
    },
    {
      title: '操作',
      key: 'key',
      align: 'center',
      render: (item: UserObj) => (
        <>
          <Button type="primary" size="small" onClick={() => { edit(item) }}>编辑</Button>
          <Popconfirm
            title="确定删除该用户?"
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
      <Table rowKey="_id" columns={columns as any} dataSource={userInfo} className={'m-t10'}
        pagination={false} />
      <div className={'f-j-e'}>
        <Pagination
          showSizeChanger
          current={props.current}
          total={userInfo && total}
          className={'m-t20'}
          onChange={onPageChange}
        />
      </div>
    </div>
  )
}

export default Users
