import { Effect, Reducer } from 'umi'
import api from '@/http/api'
import { message } from 'antd';

// 定义state的数据
export interface LoginModelState {
  userInfo: any,
}

export interface LoginModelType {
  namespace: 'Login'
  state: LoginModelState
  // 等同于vuex里面的action 用来发请求的
  effects: {
    login: Effect,
  },
  // 等同于vuex里面的mutation
  reducers: {
    setUserInfo: Reducer<LoginModelState>
  }
}

const LoginModel: LoginModelType = {
  namespace: 'Login',
  state: {
    userInfo: {},
  },
  effects: {
    // *等同于async
    // payload请求传递的参数
    *login({ payload }, { call, put }) {
      let res = yield call(api.login,payload)
      // console.log(res)
      if (res.code ===200) {
        message.success(res.msg,1)
        yield put({
          type: 'setUserInfo',
          payload: res.data
        })
        //存储token和用户信息
        localStorage.setItem('token',res.token)
        localStorage.setItem('userInfo',JSON.stringify(res.data))
        window.location.pathname='/'
      }else  message.error(res.msg,1)
    },
  },
  reducers: {
    setUserInfo(state, action) {
      return {
        ...state,
        userInfo: action.payload,
      }
    },
  }
}

export default LoginModel