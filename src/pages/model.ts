import { Effect, Reducer } from 'umi'
import api from '@/http/api'
import { message } from 'antd';
// 定义state的数据
export interface HomeModelState {
  source: any
}
export interface HomeModelType {
  namespace: 'Home'
  state: HomeModelState
  // 等同于vuex里面的action 用来发请求的
  effects: {
    GetHomeSource: Effect
  },
  // 等同于vuex里面的mutation
  reducers: {
    SetHomeSource: Reducer<HomeModelState>
  }
}

const HomeModel: HomeModelType = {
  namespace: 'Home',
  state: {
    source: null
  },
  effects: {
    // *等同于async
    // payload请求传递的参数
    //获取首页数据
    *GetHomeSource({ payload }, { call, put }) {
      let res = yield call(api.getIndex)
      if (res.code === 200) {
        yield put({
          type: 'SetHomeSource',
          payload: res.data
        })
      } else
        message.error(res.msg, 1)
    },
  },
  reducers: {
    SetHomeSource(state, action) {
      return {
        ...state,
        source: action.payload
      }
    },
  }
}

export default HomeModel