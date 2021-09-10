import { Effect, Reducer } from 'umi'
import api from '@/http/api'
import { message } from 'antd';

// 定义state的数据
export interface SpecParamsState {
  specParamsInfo: any
}

export interface SpecParamsType {
  namespace: 'Params'
  state: SpecParamsState
  // 等同于vuex里面的action 用来发请求的
  effects: {
    AddSpecParams: Effect,
    EditSpecParams: Effect,
    GetSpecParams: Effect,
  },
  // 等同于vuex里面的mutation
  reducers: {
    SetSpecParams: Reducer<SpecParamsState>
  }
}

const Params: SpecParamsType = {
  namespace: 'Params',
  state: {
    specParamsInfo: null
  },
  effects: {
    // *等同于async
    // payload请求传递的参数
    //添加规格参数
    *AddSpecParams({ payload }, { call, put }) {
      let res = yield call(api.addSpecParams, payload)
      if (res.code === 200) {
        message.success(res.msg, 1)
      } else
        message.error(res.msg, 1)
    },
    //修改规格参数
    *EditSpecParams({ payload }, { call, put }) {
      let res = yield call(api.updateSpecParams, payload)
      if (res.code === 200) {
        message.success('修改成功', 1)
      } else
        message.error(res.msg, 1)
    },
    //获取规格参数
    *GetSpecParams({ payload }, { call, put }) {
      let res = yield call(api.getSpecParams, payload)
      if (res.code === 200) {
        yield put({
          type: 'SetSpecParams',
          payload: res.data
        })
      } else message.error(res.msg, 1)
    }
  },
  reducers: {
    SetSpecParams(state, action) {
      return {
        ...state,
        specParamsInfo: action.payload
      }
    },
  }
}

export default Params