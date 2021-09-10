import { Table, Switch, Button, Popconfirm, Pagination,Image } from 'antd'
import { useSelector, useDispatch } from 'umi'
import { CarouselObj } from '@/types'

interface Props {
  edit: (item: CarouselObj) => void,
  onPageChange:(page:number,pageSize:number)=>void,
  current:number
  pageSize: number,
  query: string
}
const Carousels = (props: Props) => {
  let carouselInfo = useSelector((state: any) => state.Carousel.carouselInfo)
  let total = useSelector((state: any) => state.Carousel.total)
  let dispatch = useDispatch()
  //修改轮播图状态
  const onChange = (isShow: boolean, item: CarouselObj) => {
    dispatch({
      type: 'Carousel/EditStatus',
      payload: {
        id: item._id,
        isShow: isShow
      }
    })
  }
  //编辑轮播图
  const edit = (item: CarouselObj) => {
    props.edit(item)
  }
  //删除轮播图
  const del = (item: CarouselObj) => {
    dispatch({
      type: 'Carousel/DelCarouse',
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
        <Image src={url} width={200} height={70}></Image>
      )
    },
    {
      title: '路径',
      dataIndex: 'url',
      key: 'url',
      align: 'center'
    },
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      align: 'center'
    },
    {
      title: '链接',
      key: 'link',
      dataIndex: 'link',
      align: 'center'
    },
    {
      title: '是否显示',
      key: 'isShow',
      dataIndex: 'isShow',
      align: 'center',
      render: (isShow: boolean, item: CarouselObj) => (
        <Switch defaultChecked={isShow} onChange={() => { onChange(!isShow, item) }} size="small" />
      )
    },
    {
      title: '操作',
      key: 'key',
      align: 'center',
      render: (item: CarouselObj) => (
        <>
          <Button type="primary" size="small" onClick={() => { edit(item) }}>编辑</Button>
          <Popconfirm
            title="确定删除该轮播图?"
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
      <Table rowKey="_id" columns={columns as any} dataSource={carouselInfo} className={'m-t10'}
        pagination={false} />
      <div className={'f-j-e'}>
        <Pagination
          showSizeChanger
          current={props.current}
          total={carouselInfo && total}
          className={'m-t20'}
          onChange={onPageChange}
        />
      </div>
    </div>
  )
}

export default Carousels
