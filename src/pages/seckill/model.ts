import { Effect, Reducer } from 'umi'
import api from '@/http/api'
import { message } from 'antd';
import { SeckillObj } from '@/types';

// 定义state的数据
export interface SeckillModelState {
  seckillInfo: SeckillObj[],
  total:number
}

export interface SeckillModelType {
  namespace: 'Seckill'
  state: SeckillModelState
  // 等同于vuex里面的action 用来发请求的
  effects: {
    AddSeckill: Effect,
    SeckillList: Effect,
    EditStatus: Effect,
    EditSeckill: Effect,
    DelSeckill: Effect
  },
  // 等同于vuex里面的mutation
  reducers: {
    SetSeckill: Reducer<SeckillModelState>
  }
}

const SeckillModel: SeckillModelType = {
  namespace: 'Seckill',
  state: {
    seckillInfo: [],
    total:0
  },
  effects: {
    // *等同于async
    // payload请求传递的参数
    //添加秒杀
    *AddSeckill({ payload }, { call, put }) {
      let res = yield call(api.addSeckill, payload)
      if (res.code === 200) {
        message.success(res.msg, 1)
        yield put({
          type: 'SeckillList',
          payload: {
            current: payload.current,
            pageSize: payload.pageSize,
            query: payload.query
          }
        })
      } else
        message.error(res.msg, 1)
    },
    //获取秒杀列表
    *SeckillList({ payload }, { call, put }) {
      let res = yield call(api.getSeckill, payload)
      if (res.code === 200) {
        yield put({
          type: 'SetSeckill',
          payload: res.data,
          total:res.total
        })
      } else message.error(res.msg, 1)
    },
    //修改秒杀状态
    *EditStatus({ payload }, { call, put }) {
      let res = yield call(api.showSeckill, payload)
      res.code === 200 ? message.success(res.msg, 1) : message.error(res.msg, 1)
    },
    //编辑秒杀
    *EditSeckill({ payload }, { call, put }) {
      let res = yield call(api.updateSeckill, payload)
      if (res.code === 200) {
        message.success(res.msg, 1)
        yield put({
          type: 'SeckillList',
          payload: {
            current: payload.current,
            pageSize: payload.pageSize,
            query: payload.query
          }
        })
      } else
        message.error(res.msg, 1)
    },
    //删除秒杀
    *DelSeckill({ payload }, { call, put }) {
      console.log(payload.id)
      let res = yield call(api.delSeckill, payload)
      if (res.code === 200) {
        message.success(res.msg, 1)
        yield put({
          type: 'SeckillList',
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
    SetSeckill(state, action) {
      return {
        ...state,
        seckillInfo: action.payload,
        total:action.total
      }
    },
  }
}

export default SeckillModel