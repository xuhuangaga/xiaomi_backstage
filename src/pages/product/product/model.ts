import { Effect, Reducer } from 'umi'
import api from '@/http/api'
import { message } from 'antd';
import { ProductObj } from '@/types';

// 定义state的数据
export interface ProductModelState {
  productInfo: ProductObj[],
  total:number
}

export interface ProductModelType {
  namespace: 'Product'
  state: ProductModelState
  // 等同于vuex里面的action 用来发请求的
  effects: {
    AddProduct: Effect,
    ProductList: Effect,
    EditStatus: Effect,
    DelProduct: Effect,
    EditProduct:Effect
  },
  // 等同于vuex里面的mutation
  reducers: {
    SetProduct: Reducer<ProductModelState>
  }
}

const ProductModel: ProductModelType = {
  namespace: 'Product',
  state: {
    productInfo: [],
    total:0
  },
  effects: {
    // *等同于async
    // payload请求传递的参数
    //添加商品
    *AddProduct({ payload }, { call, put }) {
      let res = yield call(api.addGoods, payload)
      if (res.code === 200) {
        message.success(res.msg, 1)
        yield put({
          type: 'ProductList',
          payload: {
            current: payload.current,
            pageSize: payload.pageSize,
            query: payload.query
          }
        })
      } else
        message.error(res.msg, 1)
    },
    //修改商品
    *EditProduct({ payload }, { call, put }) {
      let res = yield call(api.updateGoods, payload)
      if (res.code === 200) {
        message.success(res.msg, 1)
        yield put({
          type: 'ProductList',
          payload: {
            current: payload.current,
            pageSize: payload.pageSize,
            query: payload.query
          }
        })
      } else
        message.error(res.msg, 1)
    },
    //修改商品状态 上下架商品
    *EditStatus({ payload }, { call, put }) {
      let res = yield call(api.showGoods, payload)
      res.code === 200 ? message.success(res.msg, 1) : message.error(res.msg, 1)
    },
    //获取商品列表
    *ProductList({ payload }, { call, put }) {
      let res = yield call(api.getGoods, payload)
      if (res.code === 200) {
        res.data.length && res.data.map((item: ProductObj, index: number) => {
          item.key = index + 1
        })
        yield put({
          type: 'SetProduct',
          payload: res.data,
          total:res.total
        })
      } else message.error(res.msg, 1)
    },
    //删除商品
    *DelProduct({ payload }, { call, put }) {
      let res = yield call(api.delGoods, payload.id)
      if (res.code === 200) {
        message.success(res.msg, 1)
        yield put({
          type: 'ProductList',
          payload: {
            current: payload.current,
            pageSize: payload.pageSize,
            query: payload.query
          }
        })
      } else
        message.error(res.msg, 1)
    }
  },
  reducers: {
    SetProduct(state, action) {
      return {
        ...state,
        productInfo: action.payload,
        total:action.total
      }
    },
  }
}

export default ProductModel