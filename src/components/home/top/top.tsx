import React from 'react'
import { useSelector, useDispatch } from 'umi'
import { useEffect } from 'react';

const Top = () => {
  
  let dispatch = useDispatch()
  let source = useSelector((state: any) => state.Home.source)
  useEffect(()=>{
    dispatch({
      type: 'Home/GetHomeSource'
    })
  },[])
  return (
    <div className={'f-j-a f-c-w wbfb'} >
      <div style={{ background: '#e64241' }} className={'f-1 p-10'}>
        <div>{source&&source.orderCount}</div>
        <div>订单总数</div>
      </div>
      <div style={{ background: '#30b95c'}}  className={'f-1 m-lr10 p-10'}>
        <div>{source&&source.goodsCount}</div>
        <div>商品总数</div>
      </div>
      <div style={{ background: '#1f2d3d' }}  className={'f-1 p-10'}>
        <div>{source&&source.userCount}</div>
        <div>用户总数</div>
      </div>
    </div>
  )
}
export default Top
