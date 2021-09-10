import { useState, useEffect } from 'react'
import { Input, Button, Form } from 'antd'
import { useDispatch, useSelector } from 'umi'
import Products from '@/components/Product/Product';
import Add from '@/components/product/add';

const Product = () => {
  let dispatch = useDispatch()
  //商品分类
  let classifyInfo = useSelector((state: any) => state.Classify.classifyInfo)
  const { Search } = Input;
  let [modalTitle, setModalTitle] = useState('')
  let [query, setQuery] = useState('')
  let [current, setCurrent] = useState(1)
  let [pageSize, setPageSize] = useState(10)
  //被编辑的商品信息
  let [item, setItem] = useState<any>()
  //对话框是否显示
  const [isModalVisible, setIsModalVisible] = useState(false);
  const getData = (page: number, pSize: number, queryVal: string) => {
    dispatch(
      {
        type: 'Product/ProductList',
        payload: {
          current: page,
          pageSize: pSize,
          query: queryVal
        }
      }
    )
  }
  useEffect(() => {
    getData(current, pageSize, query)
    dispatch({
      type: 'Classify/ClassifyList',
      payload: { val: '', isClass: false }
    })
  }, [])
  //对话框点击取消
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  //点击搜索按钮
  const onSearch = (val: any) => {
    setQuery(val)
    setCurrent(1)
    getData(1, pageSize, val)
  }
  //编辑商品
  const edit = (data: any) => {
    setItem(data)
    setModalTitle('编辑商品')
    setIsModalVisible(true)
  }
  //切换页码
  const onPageChange = (page: number, pageSize: number) => {
    setCurrent(page)
    setPageSize(pageSize)
    page > 0 && getData(page, pageSize, query)
  }
  return (
    <div className={'bc-w p-r'}>
      {
        isModalVisible ?
          <Add item={item} classifyInfo={classifyInfo} modalTitle={modalTitle} query={query} pageSize={pageSize} current={current} handleCancel={handleCancel} isModalVisible={isModalVisible}></Add>
          :
          <>
            <div className={'p-10'}>
              <Search placeholder="请输入" onSearch={(val: any) => { onSearch(val) }} style={{ width: 300 }} />
              <Button type="primary" className={'m-l10'} onClick={() => {
                setItem({})
                setIsModalVisible(true)
                setModalTitle('添加商品')
              }}>添加商品</Button>
            </div>
            <Products classifyInfo={classifyInfo} edit={edit} onPageChange={onPageChange} query={query} pageSize={pageSize} current={current}></Products></>
      }
    </div>
  )
}

export default Product
