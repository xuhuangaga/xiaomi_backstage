import { Table, Button, Popconfirm, Pagination,Image } from 'antd'
import { useSelector, useDispatch } from 'umi'
import { ProParamsObj } from '@/types'

interface Props {
  edit: (item: ProParamsObj) => void,
  onPageChange:(page:number,pageSize:number)=>void,
  current:number
  pageSize: number,
  parId: string
}
const  ProParameter= (props: Props) => {
  let proParamsInfo = useSelector((state: any) => state.ProParams.proParamsInfo)
  let total = useSelector((state: any) => state.ProParams.total)
  let dispatch = useDispatch()
  //编辑商品参数
  const edit = (item: ProParamsObj) => {
    props.edit(item)
  }
  //删除商品参数
  const del = (item: ProParamsObj) => {
    dispatch({
      type: 'ProParams/DelProParams',
      payload: {
        attrId: item._id,
        parentId:item.parentId,
        pageSize: props.pageSize,
        current: props.current,
        parId: props.parId
      }
    })
  }
  const onPageChange=(page:number, pageSize?:number)=>{
    props.onPageChange(page,pageSize!)
  }
  const columns = [
    {
      title: '#',
      dataIndex: 'key',
      key: 'key',
      align: 'center'
    },
    {
      title: '图片',
      dataIndex: 'url',
      key: 'url',
      align: 'center',
      render: (url: string) => (
        <Image src={url} width={50} height={50}></Image>
      )
    },
    {
      title: '参数名称',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      width: 120
    },
    {
      title: '参数描述',
      dataIndex: 'desc',
      key: 'desc',
      align: 'center'
    },
    {
      title: '操作',
      key: 'key',
      align: 'center',
      render: (item: ProParamsObj) => (
        <>
          <Button type="primary" size="small" onClick={() => { edit(item) }}>编辑</Button>
          <Popconfirm
            title="确定删除该商品参数?"
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
      <Table rowKey="_id" columns={columns as any} dataSource={proParamsInfo} className={'m-t10'}
        pagination={false} />
      <div className={'f-j-e'}>
        <Pagination
          showSizeChanger
          current={props.current}
          total={proParamsInfo && total}
          className={'m-t20'}
          onChange={onPageChange}
        />
      </div>
    </div>
  )
}

export default ProParameter
