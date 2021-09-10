import { Effect, Reducer } from 'umi'
import api from '@/http/api'
import { message } from 'antd';

// 定义state的数据
export interface NavModelState {
  navInfo: any,
  total:number
}

export interface NavModelType {
  namespace: 'Nav'
  state: NavModelState
  // 等同于vuex里面的action 用来发请求的
  effects: {
    AddNav: Effect,
    NavList: Effect,
    EditStatus: Effect,
    EditNav: Effect,
    DelNav: Effect
  },
  // 等同于vuex里面的mutation
  reducers: {
    SetNav: Reducer<NavModelState>
  }
}

const NavModel: NavModelType = {
  namespace: 'Nav',
  state: {
    navInfo: [],
    total:0
  },
  effects: {
    // *等同于async
    // payload请求传递的参数
    //添加导航
    *AddNav({ payload }, { call, put }) {
      let res = yield call(api.addNav, payload)
      if (res.code === 200) {
        message.success(res.msg, 1)
        yield put({
          type: 'NavList',
          payload: {
            current: payload.current,
            pageSize: payload.pageSize,
            query: payload.query
          }
        })
      } else
        message.error(res.msg, 1)
    },
    //获取导航列表
    *NavList({ payload }, { call, put }) {
      let res = yield call(api.getNav, payload)
      if (res.code === 200) {
        yield put({
          type: 'SetNav',
          payload: res.data,
          total:res.total
        })
      } else message.error(res.msg, 1)
    },
    //修改导航状态
    *EditStatus({ payload }, { call, put }) {
      let res = yield call(api.showNav, payload)
      res.code === 200 ? message.success(res.msg, 1) : message.error(res.msg, 1)
    },
    //编辑导航
    *EditNav({ payload }, { call, put }) {
      let res = yield call(api.updateNav, payload)
      if (res.code === 200) {
        message.success(res.msg, 1)
        yield put({
          type: 'NavList',
          payload: {
            current: payload.current,
            pageSize: payload.pageSize,
            query: payload.query
          }
        })
      } else
        message.error(res.msg, 1)
    },
    //删除导航
    *DelNav({ payload }, { call, put }) {
      let res = yield call(api.delNav, payload.id)
      if (res.code === 200) {
        message.success(res.msg, 1)
        yield put({
          type: 'NavList',
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
    SetNav(state, action) {
      return {
        ...state,
        navInfo: action.payload,
        total:action.total
      }
    },
  }
}

export default NavModel