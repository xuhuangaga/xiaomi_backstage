import { Effect, Reducer } from 'umi'
import api from '@/http/api'
import { message } from 'antd';
import { ProParamsObj } from '@/types';

// 定义state的数据
export interface ProParamsModelState {
  proParamsInfo: ProParamsObj[],
  total:number
}

export interface ProParamsModelType {
  namespace: 'ProParams'
  state: ProParamsModelState
  // 等同于vuex里面的action 用来发请求的
  effects: {
    AddProParams: Effect,
    ProParamsList: Effect,
    EditProParams: Effect,
    DelProParams: Effect,
  },
  // 等同于vuex里面的mutation
  reducers: {
    SetProParams: Reducer<ProParamsModelState>
  }
}

const ProParamsModel: ProParamsModelType = {
  namespace: 'ProParams',
  state: {
    proParamsInfo: [],
    total:0
  },
  effects: {
    // *等同于async
    // payload请求传递的参数
    //添加商品参数
    *AddProParams({ payload }, { call, put }) {
      let res = yield call(api.addParams, payload)
      if (res.code === 200) {
        message.success('添加成功', 1)
        yield put({
          type: 'ProParamsList',
          payload: {
            current: payload.current,
            pageSize: payload.pageSize,
            parentId: payload.parentId
          }
        })
      } else
        message.error(res.msg, 1)
    },
    //获取商品参数列表
    *ProParamsList({ payload }, { call, put }) {
      let res = yield call(api.getParams, payload)
      if (res.code === 200) {
        res.data.length && res.data.map((item: ProParamsObj, index: number) => {
          item.key = index + 1
        })
        yield put({
          type: 'SetProParams',
          payload: res.data,
          total:res.total
        })
      } else message.error(res.msg, 1)
    },
    //编辑商品参数
    *EditProParams({ payload }, { call, put }) {
      let res = yield call(api.updateParams, payload)
      if (res.code === 200) {
        message.success(res.msg, 1)
        yield put({
          type: 'ProParamsList',
          payload: {
            current: payload.current,
            pageSize: payload.pageSize,
            parentId: payload.parentId
          }
        })
      } else
        message.error(res.msg, 1)
    },
    //删除商品参数
    *DelProParams({ payload }, { call, put }) {
      let res = yield call(api.delParams, payload)
      if (res.code === 200) {
        message.success(res.msg, 1)
        yield put({
          type: 'ProParamsList',
          payload: {
            current: payload.current,
            pageSize: payload.pageSize,
            parentId: payload.parentId
          }
        })
      } else
        message.error(res.msg, 1)
    }
  },
  reducers: {
    SetProParams(state, action) {
      return {
        ...state,
        proParamsInfo: action.payload,
        total:action.total
      }
    },
  }
}

export default ProParamsModel