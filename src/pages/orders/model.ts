import { Effect, Reducer } from 'umi'
import api from '@/http/api'
import { message } from 'antd';
import { OrderObj } from '@/types';

// 定义state的数据
export interface OrderModelState {
  orderInfo: OrderObj[],
  total:number
}

export interface OrderModelType {
  namespace: 'Order'
  state: OrderModelState
  // 等同于vuex里面的action 用来发请求的
  effects: {
    OrderList: Effect
  },
  // 等同于vuex里面的mutation
  reducers: {
    SetOrder: Reducer<OrderModelState>
  }
}

const OrderModel: OrderModelType = {
  namespace: 'Order',
  state: {
    orderInfo: [],
    total:0
  },
  effects: {
    // *等同于async
    // payload请求传递的参数
    //获取订单列表
    *OrderList({ payload }, { call, put }) {
      let res = yield call(api.getOrder, payload)
      if (res.code === 200) {
        yield put({
          type: 'SetOrder',
          payload: res.data,
          total:res.total
        })
      } else message.error(res.msg, 1)
    }
  },
  reducers: {
    SetOrder(state, action) {
      return {
        ...state,
        orderInfo: action.payload,
        total:action.total
      }
    },
  }
}

export default OrderModel