import { Table, Switch, Button, Popconfirm, Pagination, Image } from 'antd'
import { useSelector, useDispatch } from 'umi'
import { ClassifyObj, ProductObj, ProSpecObj } from '@/types'
import { useState } from 'react';
import Modal from '@/components/modal/Modal';

interface Props {
  edit: (item: ProductObj) => void,
  onPageChange: (page: number, pageSize: number) => void,
  current: number,
  pageSize: number,
  query: string,
  classifyInfo: any
}
const Products = (props: Props) => {
  let productInfo = useSelector((state: any) => state.Product.productInfo)
  let total = useSelector((state: any) => state.Product.total)
  let dispatch = useDispatch()
  //被查看的商品信息
  let [proInfo, setProInfo] = useState<ProductObj>()
  //是否显示商品详情弹框
  let [isShowVisible, setIsShowVisible] = useState(false)
  let [className, setClassName] = useState('')

  // 获取商品分类列表
  const getData = (val: string) => {
    dispatch({
      type: 'Classify/ClassifyList',
      payload: val
    })
  }
  //修改产品状态
  const onChange = (isShow: boolean, item: ProductObj) => {
    dispatch({
      type: 'Product/EditStatus',
      payload: {
        id: item._id,
        isShow: isShow
      }
    })
  }
  //编辑产品
  const edit = (item: ProductObj) => {
    props.edit(item)
  }
  //删除产品
  const del = (item: ProductObj) => {
    dispatch({
      type: 'Product/DelProduct',
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
  //查看详情
  const show = (item: ProductObj) => {
    console.log(item)
    setProInfo(item)
    setIsShowVisible(true)
    props.classifyInfo.map((i: ClassifyObj) => {
      i.list.map((s: ClassifyObj, index: number) => {
        if (s._id === item.category) {
          return (
            setClassName(`${i.name}/${s.name}`)
          )
        }
      })
    })
  }
  //对话框点击取消
  const handleCancel = () => {
    setIsShowVisible(false);
  };
  const columns = [
    {
      title: '#',
      dataIndex: 'key',
      key: 'key',
      align: 'center'
    },
    {
      title: '商品名称',
      dataIndex: 'name',
      key: 'name',
      align: 'center'
    },
    {
      title: '商品原价',
      dataIndex: 'originalPrice',
      key: 'originalPrice',
      align: 'center'
    },
    {
      title: '商品现价',
      dataIndex: 'presentPrice',
      key: 'presentPrice',
      align: 'center'
    },
    {
      title: '商品库存',
      dataIndex: 'stock',
      key: 'stock',
      align: 'center'
    },
    {
      title: '是否新品',
      dataIndex: 'isNewGood',
      key: 'isNewGood',
      align: 'center',
      render: (isNewGood: boolean) => (
        <span>{isNewGood ? '是' : '否'}</span>
      )
    },
    {
      title: '是否热卖',
      dataIndex: 'isHot',
      key: 'isHot',
      align: 'center',
      render: (isHot: boolean) => (
        <span>{isHot ? '是' : '否'}</span>
      )
    },
    {
      title: '是否推荐',
      dataIndex: 'isRecommend',
      key: 'isRecommend',
      align: 'center',
      render: (isRecommend: boolean) => (
        <span>{isRecommend ? '是' : '否'}</span>
      )
    },
    {
      title: '上下架',
      key: 'isShow',
      dataIndex: 'isShow',
      align: 'center',
      render: (isShow: boolean, item: ProductObj) => (
        <Switch defaultChecked={isShow} onChange={() => { onChange(!isShow, item) }} size="small" />
      )
    },
    {
      title: '操作',
      key: 'key',
      align: 'center',
      render: (item: ProductObj) => (
        <>
          <Button type="primary" size="small" onClick={() => { edit(item) }} className={'m-b10'}>编辑</Button>
          <Button size="small" className={'m-l10 m-b10'} onClick={() => { show(item) }}>详情</Button>
          <Popconfirm
            title="确定删除该产品?"
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
    <div className={'p-10'}>
      <Table rowKey="_id" columns={columns as any} dataSource={productInfo} className={'m-t10'}
        pagination={false} />
      <div className={'f-j-e'}>
        <Pagination
          showSizeChanger
          current={props.current}
          total={productInfo && total}
          className={'m-t20'}
          onChange={onPageChange}
        />
      </div>
      {
        isShowVisible ?
          <Modal handleCancel={handleCancel} title={'商品详情'} visible={isShowVisible} handleOk={handleCancel}>
            <div className={'m-t-b10 f-a-c'}>
              <div>商品名称:</div>
              <div className={'m-l10'}>{proInfo!.name}</div>
            </div>
            <div className={'m-t-b10 f-a-c'}>
              <div>所属分类:</div>
              <div className={'m-l10'}>
                {className}
              </div>
            </div>
            <div className={'m-t-b10 f-a-c'}>
              <div>商品原价:</div>
              <div className={'m-l10'}>{proInfo!.presentPrice}</div>
            </div>
            <div className={'m-t-b10 f-a-c'}>
              <div>商品现价:</div>
              <div className={'m-l10'}>{proInfo!.originalPrice}</div>
            </div>
            <div className={'m-t-b10 f-a-c'}>
              <div>商品单位:</div>
              <div className={'m-l10'}>{proInfo!.company}</div>
            </div>
            <div className={'m-t-b10 f-a-c'}>
              <div>商品库存:</div>
              <div className={'m-l10'}>{proInfo!.stock}</div>
            </div>
            <div className={'m-t-b10 f-a-c'}>
              <div>商品简介:</div>
              <div className={'m-l10'}>{proInfo!.introduction}</div>
            </div>
            <div className={'m-t-b10 f-a-c'}>
              <div>推荐介绍:</div>
              <div className={'m-l10'}>{proInfo!.comment}</div>
            </div>
            <div className={'m-t-b10 f-a-c'}>
              <div>是否新品:</div>
              <div className={'m-l10'}>{proInfo!.isNewGood ? '是' : '否'}</div>
            </div>
            <div className={'m-t-b10 f-a-c'}>
              <div>是否热销:</div>
              <div className={'m-l10'}>{proInfo!.isHot ? '是' : '否'}</div>
            </div>
            <div className={'m-t-b10 f-a-c'}>
              <div>是否推荐:</div>
              <div className={'m-l10'}>{proInfo!.isRecommend ? '是' : '否'}</div>
            </div>
            <div className={'m-t-b10 f-a-c'}>
              <div>商品规格:</div>
              <div className={'m-l10'}>{(proInfo!.spec as any).map((item: ProSpecObj, index: number) => {
                if (item.checkList.length) {
                  return (
                    <div key={index} className={'m-t-b10'}>
                      <div>{item.name}</div>
                      <div>{item.checkList.join()}</div>
                    </div>
                  )
                }
              })}</div>
            </div>
            <div className={'m-t-b10 f-a-c'}>
              <div>商品详情:</div>
              <div className={'m-l10'} dangerouslySetInnerHTML={{ __html: proInfo!.detail }}></div>
            </div>
            <div className={'m-t-b10 f-a-c'}>
              <div>封面图:</div>
              <div className={'m-l10'}>
                <Image src={proInfo!.cover} width={100} height={100}></Image>
              </div>
            </div>
            <div className={'m-t-b10 f-a-c'}>
              <div>产品图:</div>
              <div className={'m-l10'}>
                {
                  (proInfo!.pic as any).map((i: string, index: number) => {
                    return (
                      <Image src={i} width={100} height={100} key={index}></Image>
                    )
                  })
                }
              </div>
            </div>
          </Modal>
          : null
      }
    </div>
  )
}

export default Products
