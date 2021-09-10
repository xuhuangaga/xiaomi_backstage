import { Effect, Reducer } from 'umi'
import api from '@/http/api'
import { message } from 'antd';
import { RecommentObj } from '@/types';

// 定义state的数据
export interface RecommentModelState {
  recommentInfo: RecommentObj[],
  total:number
}

export interface RecommentModelType {
  namespace: 'Recomment'
  state: RecommentModelState
  // 等同于vuex里面的action 用来发请求的
  effects: {
    AddRecomment: Effect,
    RecommentList: Effect,
    EditStatus: Effect,
    EditRecomment: Effect,
    DelRecomment: Effect
  },
  // 等同于vuex里面的mutation
  reducers: {
    SetRecomment: Reducer<RecommentModelState>
  }
}

const RecommentModel: RecommentModelType = {
  namespace: 'Recomment',
  state: {
    recommentInfo: [],
    total:0
  },
  effects: {
    // *等同于async
    // payload请求传递的参数
    //添加推荐导航
    *AddRecomment({ payload }, { call, put }) {
      let res = yield call(api.addRecommendNav, payload)
      if (res.code === 200) {
        message.success(res.msg, 1)
        yield put({
          type: 'RecommentList',
          payload: {
            current: payload.current,
            pageSize: payload.pageSize,
            query: payload.query
          }
        })
      } else
        message.error(res.msg, 1)
    },
    //获取推荐导航列表
    *RecommentList({ payload }, { call, put }) {
      let res = yield call(api.getRecommendNav, payload)
      if (res.code === 200) {
        yield put({
          type: 'SetRecomment',
          payload: res.data,
          total:res.total
        })
      } else message.error(res.msg, 1)
    },
    //修改推荐导航状态
    *EditStatus({ payload }, { call, put }) {
      let res = yield call(api.showRecommendNav, payload)
      res.code === 200 ? message.success(res.msg, 1) : message.error(res.msg, 1)
    },
    //编辑推荐导航
    *EditRecomment({ payload }, { call, put }) {
      let res = yield call(api.updateRecommendNav, payload)
      if (res.code === 200) {
        message.success(res.msg, 1)
        yield put({
          type: 'RecommentList',
          payload: {
            current: payload.current,
            pageSize: payload.pageSize,
            query: payload.query
          }
        })
      } else
        message.error(res.msg, 1)
    },
    //删除推荐导航
    *DelRecomment({ payload }, { call, put }) {
      let res = yield call(api.delRecommendNav, payload.id)
      if (res.code === 200) {
        message.success(res.msg, 1)
        yield put({
          type: 'RecommentList',
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
    SetRecomment(state, action) {
      return {
        ...state,
        recommentInfo: action.payload,
        total:action.total
      }
    },
  }
}

export default RecommentModel