import { Effect, Reducer } from 'umi'
import api from '@/http/api'
import { message } from 'antd';
import { CouponObj } from '@/types';

// 定义state的数据
export interface CouponModelState {
  couponInfo: CouponObj[],
  total:number
}

export interface CouponModelType {
  namespace: 'Coupon'
  state: CouponModelState
  // 等同于vuex里面的action 用来发请求的
  effects: {
    AddCoupon: Effect,
    CouponList: Effect,
    EditStatus: Effect,
    EditCoupon: Effect,
    DelCoupon: Effect
  },
  // 等同于vuex里面的mutation
  reducers: {
    SetCoupon: Reducer<CouponModelState>
  }
}

const CouponModel: CouponModelType = {
  namespace: 'Coupon',
  state: {
    couponInfo: [],
    total:0
  },
  effects: {
    // *等同于async
    // payload请求传递的参数
    //添加优惠券
    *AddCoupon({ payload }, { call, put }) {
      let res = yield call(api.addCoupon, payload)
      if (res.code === 200) {
        message.success(res.msg, 1)
        yield put({
          type: 'CouponList',
          payload: {
            current: payload.current,
            pageSize: payload.pageSize,
            query: payload.query
          }
        })
      } else
        message.error(res.msg, 1)
    },
    //获取优惠券列表
    *CouponList({ payload }, { call, put }) {
      let res = yield call(api.getCoupon, payload)
      if (res.code === 200) {
        yield put({
          type: 'SetCoupon',
          payload: res.data,
          total:res.total
        })
      } else message.error(res.msg, 1)
    },
    //修改优惠券状态
    *EditStatus({ payload }, { call, put }) {
      let res = yield call(api.showCoupon, payload)
      res.code === 200 ? message.success(res.msg, 1) : message.error(res.msg, 1)
    },
    //编辑优惠券
    *EditCoupon({ payload }, { call, put }) {
      let res = yield call(api.updateCoupon, payload)
      if (res.code === 200) {
        message.success(res.msg, 1)
        yield put({
          type: 'CouponList',
          payload: {
            current: payload.current,
            pageSize: payload.pageSize,
            query: payload.query
          }
        })
      } else
        message.error(res.msg, 1)
    },
    //删除优惠券
    *DelCoupon({ payload }, { call, put }) {
      let res = yield call(api.delCoupon, payload.id)
      if (res.code === 200) {
        message.success(res.msg, 1)
        yield put({
          type: 'CouponList',
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
    SetCoupon(state, action) {
      return {
        ...state,
        couponInfo: action.payload,
        total:action.total
      }
    },
  }
}

export default CouponModel