import { useState } from 'react'
import { Table, Switch, Button, Popconfirm, Pagination } from 'antd'
import { useSelector, useDispatch } from 'umi'
import { ProductObj, RecommentObj } from '@/types'
import Modal from '@/components/modal/Modal';

interface Props {
  edit: (item: RecommentObj) => void,
  onPageChange: (page: number, pageSize: number) => void,
  current: number,
  pageSize: number,
  query: string
}
const Recomments = (props: Props) => {
  let dispatch = useDispatch()
  let recommentInfo = useSelector((state: any) => state.Recomment.recommentInfo)
  let total = useSelector((state: any) => state.Recomment.total)
  // 下属商品列表
  let [goods, getGoods] = useState<ProductObj[]>()
  //对话框是否显示
  const [isModalVisible, setIsModalVisible] = useState(false);
  //修改推荐导航状态
  const onChange = (isShow: boolean, item: RecommentObj) => {
    dispatch({
      type: 'Recomment/EditStatus',
      payload: {
        id: item._id,
        isShow: isShow
      }
    })
  }
  //对话框点击取消
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  //编辑推荐导航
  const edit = (item: RecommentObj) => {
    props.edit(item)
  }
  //删除推荐导航
  const del = (item: RecommentObj) => {
    dispatch({
      type: 'Recomment/DelRecomment',
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
  //查看商品
  const show = (item: any) => {
    console.log(item);
    setIsModalVisible(true)
    getGoods(item.goods)
  }
  const columns = [
    {
      title: '导航名称',
      dataIndex: 'name',
      key: 'name',
      align: 'center'
    },
    {
      title: '导航描述',
      dataIndex: 'desc',
      key: 'price',
      align: 'desc'
    },
    {
      title: '是否禁用',
      key: 'isShow',
      dataIndex: 'isShow',
      align: 'center',
      render: (isShow: boolean, item: RecommentObj) => (
        <Switch defaultChecked={isShow} onChange={() => { onChange(!isShow, item) }} size="small" />
      )
    },
    {
      title: '操作',
      key: 'key',
      align: 'center',
      render: (item: RecommentObj) => (
        <>
          <Button size="small" onClick={() => { show(item) }}>查看商品</Button>
          <Button type="primary" size="small" className={'m-l10'} onClick={() => { edit(item) }}>编辑</Button>
          <Popconfirm
            title="确定删除该推荐导航?"
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
      <Table rowKey="_id" columns={columns as any} dataSource={recommentInfo} className={'m-t10'}
        pagination={false} />
      <div className={'f-j-e'}>
        <Pagination
          showSizeChanger
          current={props.current}
          total={recommentInfo && total}
          className={'m-t20'}
          onChange={onPageChange}
        />
      </div>
      {
        isModalVisible ?
          <Modal handleCancel={handleCancel} title={'下属商品'} visible={isModalVisible} handleOk={handleCancel}>
            {
              goods?.map((item: ProductObj) => {
                return (
                  <div className={'m-t-b10 f-a-c'} key={item._id}>
                    <div>商品名称:</div>
                    <div className={'m-l10'}>{item.name}</div>
                  </div>
                )
              })
            }
          </Modal>
          : null
      }
    </div>
  )
}

export default Recomments
