import { Effect, Reducer } from 'umi'
import api from '@/http/api'
import { message } from 'antd';
import { ProModelObj } from '@/types';

// 定义state的数据
export interface ProModelState {
  proModelInfo: ProModelObj[],
  total:number
}

export interface ProModelType {
  namespace: 'ProModel'
  state: ProModelState
  // 等同于vuex里面的action 用来发请求的
  effects: {
    AddProModel: Effect,
    ProModelList: Effect,
    EditProModel: Effect,
    DelProModel: Effect
  },
  // 等同于vuex里面的mutation
  reducers: {
    SetProModel: Reducer<ProModelState>
  }
}

const ProModel: ProModelType = {
  namespace: 'ProModel',
  state: {
    proModelInfo: [],
    total:0
  },
  effects: {
    // *等同于async
    // payload请求传递的参数
    //添加商品模型
    *AddProModel({ payload }, { call, put }) {
      let res = yield call(api.addModel, payload)
      if (res.code === 200) {
        message.success(res.msg, 1)
        yield put({
          type: 'ProModelList',
          payload: {
            current: payload.current,
            pageSize: payload.pageSize,
            query: payload.query
          }
        })
      } else
        message.error(res.msg, 1)
    },
    //获取商品模型列表
    *ProModelList({ payload }, { call, put }) {
      let res = yield call(api.getModel, payload)
      if (res.code === 200) {
        res.data.length && res.data.map((item: ProModelObj, index: number) => {
          item.key = index + 1
        })
        yield put({
          type: 'SetProModel',
          payload: res.data,
          total:res.total
        })
      } else message.error(res.msg, 1)
    },
    //编辑商品模型
    *EditProModel({ payload }, { call, put }) {
      let res = yield call(api.updateModel, payload)
      if (res.code === 200) {
        message.success(res.msg, 1)
        yield put({
          type: 'ProModelList',
          payload: {
            current: payload.current,
            pageSize: payload.pageSize,
            query: payload.query
          }
        })
      } else
        message.error(res.msg, 1)
    },
    //删除商品模型
    *DelProModel({ payload }, { call, put }) {
      let res = yield call(api.delModel, payload.id)
      if (res.code === 200) {
        message.success(res.msg, 1)
        yield put({
          type: 'ProModelList',
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
    SetProModel(state, action) {
      return {
        ...state,
        proModelInfo: action.payload,
        total:action.total
      }
    },
  }
}

export default ProModel