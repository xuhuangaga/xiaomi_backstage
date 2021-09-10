import { Table, Switch, Button, Popconfirm, Pagination, Image } from 'antd'
import { useSelector, useDispatch } from 'umi'
import { NoticeObj } from '@/types'

interface Props {
  edit: (item: NoticeObj) => void,
  onPageChange: (page: number, pageSize: number) => void,
  current: number,
  pageSize: number,
  query: string
}
const Notices = (props: Props) => {
  let noticeInfo = useSelector((state: any) => state.Notice.noticeInfo)
  let total = useSelector((state: any) => state.Notice.total)
  let dispatch = useDispatch()
  //修改通知状态
  const onChange = (isShow: boolean, item: NoticeObj) => {
    dispatch({
      type: 'Notice/EditStatus',
      payload: {
        id: item._id,
        isShow: isShow
      }
    })
  }
  //编辑通知
  const edit = (item: NoticeObj) => {
    props.edit(item)
  }
  //删除通知
  const del = (item: NoticeObj) => {
    dispatch({
      type: 'Notice/DelNotice',
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
      title: '通知内容',
      dataIndex: 'content',
      key: 'content',
      align: 'center'
    },
    {
      title: '是否显示',
      key: 'isShow',
      dataIndex: 'isShow',
      align: 'center',
      render: (isShow: boolean, item: NoticeObj) => (
        <Switch defaultChecked={isShow} onChange={() => { onChange(!isShow, item) }} size="small" />
      )
    },
    {
      title: '操作',
      key: 'key',
      align: 'center',
      render: (item: NoticeObj) => (
        <>
          <Button type="primary" size="small" onClick={() => { edit(item) }}>编辑</Button>
          <Popconfirm
            title="确定删除该通知?"
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
      <Table rowKey="_id" columns={columns as any} dataSource={noticeInfo} className={'m-t10'}
        pagination={false} />
      <div className={'f-j-e'}>
        <Pagination
          showSizeChanger
          current={props.current}
          total={noticeInfo && total}
          className={'m-t20'}
          onChange={onPageChange}
        />
      </div>
    </div>
  )
}

export default Notices
