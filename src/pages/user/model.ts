import { Effect, Reducer } from 'umi'
import api from '@/http/api'
import { message } from 'antd';

// 定义state的数据
export interface UserModelState {
  userInfo: any,
  total:number
}

export interface UserModelType {
  namespace: 'User'
  state: UserModelState
  // 等同于vuex里面的action 用来发请求的
  effects: {
    AddUser: Effect,
    UserList: Effect,
    EditStatus: Effect,
    EditUser: Effect,
    DelUser: Effect
  },
  // 等同于vuex里面的mutation
  reducers: {
    SetUser: Reducer<UserModelState>
  }
}

const UserModel: UserModelType = {
  namespace: 'User',
  state: {
    userInfo: [],
    total:0
  },
  effects: {
    // *等同于async
    // payload请求传递的参数
    //添加用户
    *AddUser({ payload }, { call, put }) {
      let res = yield call(api.addUser, payload)
      if (res.code === 200) {
        message.success(res.msg, 1)
        yield put({
          type: 'UserList',
          payload: {
            current: payload.current,
            pageSize: payload.pageSize,
            query: payload.query
          }
        })
      } else
        message.error(res.msg, 1)
    },
    //获取用户列表
    *UserList({ payload }, { call, put }) {
      let res = yield call(api.getUser, payload)
      if (res.code === 200) {
        yield put({
          type: 'SetUser',
          payload: res.data,
          total:res.total
        })
      } else message.error(res.msg, 1)
    },
    //修改用户状态
    *EditStatus({ payload }, { call, put }) {
      let res = yield call(api.showUser, payload)
      res.code === 200 ? message.success(res.msg, 1) : message.error(res.msg, 1)
    },
    //编辑用户
    *EditUser({ payload }, { call, put }) {
      let res = yield call(api.updateUser, payload)
      if (res.code === 200) {
        message.success(res.msg, 1)
        yield put({
          type: 'UserList',
          payload: {
            current: payload.current,
            pageSize: payload.pageSize,
            query: payload.query
          }
        })
      } else
        message.error(res.msg, 1)
    },
    //删除用户
    *DelUser({ payload }, { call, put }) {
      let res = yield call(api.delUser, payload.id)
      if (res.code === 200) {
        message.success(res.msg, 1)
        yield put({
          type: 'UserList',
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
    SetUser(state, action) {
      return {
        ...state,
        userInfo: action.payload,
        total:action.total
      }
    },
  }
}

export default UserModel