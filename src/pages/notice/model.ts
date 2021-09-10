import { Effect, Reducer } from 'umi'
import api from '@/http/api'
import { message } from 'antd';
import { NoticeObj } from '@/types';

// 定义state的数据
export interface NoticeModelState {
  noticeInfo: NoticeObj[],
  total:number
}

export interface NoticeModelType {
  namespace: 'Notice'
  state: NoticeModelState
  // 等同于vuex里面的action 用来发请求的
  effects: {
    AddNotice: Effect,
    NoticeList: Effect,
    EditStatus: Effect,
    EditNotice: Effect,
    DelNotice: Effect
  },
  // 等同于vuex里面的mutation
  reducers: {
    SetNotice: Reducer<NoticeModelState>
  }
}

const NoticeModel: NoticeModelType = {
  namespace: 'Notice',
  state: {
    noticeInfo: [],
    total:0
  },
  effects: {
    // *等同于async
    // payload请求传递的参数
    //添加通知
    *AddNotice({ payload }, { call, put }) {
      let res = yield call(api.addNotice, payload)
      if (res.code === 200) {
        message.success(res.msg, 1)
        yield put({
          type: 'NoticeList',
          payload: {
            current: payload.current,
            pageSize: payload.pageSize,
            query: payload.query
          }
        })
      } else
        message.error(res.msg, 1)
    },
    //获取通知列表
    *NoticeList({ payload }, { call, put }) {
      let res = yield call(api.getNotice, payload)
      if (res.code === 200) {
        res.data.length && res.data.map((item: NoticeObj, index: number) => {
          item.key = index + 1
        })
        yield put({
          type: 'SetNotice',
          payload: res.data,
          total:res.total
        })
      } else message.error(res.msg, 1)
    },
    //修改通知状态
    *EditStatus({ payload }, { call, put }) {
      let res = yield call(api.showNotice, payload)
      res.code === 200 ? message.success(res.msg, 1) : message.error(res.msg, 1)
    },
    //编辑通知
    *EditNotice({ payload }, { call, put }) {
      let res = yield call(api.updateNotice, payload)
      if (res.code === 200) {
        message.success(res.msg, 1)
        yield put({
          type: 'NoticeList',
          payload: {
            current: payload.current,
            pageSize: payload.pageSize,
            query: payload.query
          }
        })
      } else
        message.error(res.msg, 1)
    },
    //删除通知
    *DelNotice({ payload }, { call, put }) {
      let res = yield call(api.delNotice, payload.id)
      if (res.code === 200) {
        message.success(res.msg, 1)
        yield put({
          type: 'NoticeList',
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
    SetNotice(state, action) {
      return {
        ...state,
        noticeInfo: action.payload,
        total:action.total
      }
    },
  }
}

export default NoticeModel