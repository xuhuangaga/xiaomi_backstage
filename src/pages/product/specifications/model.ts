import { Effect, Reducer } from 'umi'
import api from '@/http/api'
import { message } from 'antd';
import { ProSpecObj } from '@/types';

// 定义state的数据
export interface ProSpecState {
  proSpecInfo: ProSpecObj[],
  total: number
}

export interface ProSpecType {
  namespace: 'ProSpec'
  state: ProSpecState
  // 等同于vuex里面的action 用来发请求的
  effects: {
    AddProSpec: Effect,
    ProSpecList: Effect,
    DelProSpec: Effect,
    ProSpecReset: Effect,
  },
  // 等同于vuex里面的mutation
  reducers: {
    SetProSpec: Reducer<ProSpecState>
  }
}

const ProSpec: ProSpecType = {
  namespace: 'ProSpec',
  state: {
    proSpecInfo: [],
    total: 0
  },
  effects: {
    // *等同于async
    // payload请求传递的参数
    //添加商品规格
    *AddProSpec({ payload }, { call, put }) {
      let res = yield call(api.addSpec, payload)
      if (res.code === 200) {
        message.success('添加成功', 1)
        yield put({
          type: 'ProSpecList',
          payload: {
            current: payload.current,
            pageSize: payload.pageSize,
            parentId: payload.parentId
          }
        })
      } else
        message.error(res.msg, 1)
    },
    //获取商品规格列表
    *ProSpecList({ payload }, { call, put }) {
      let res = yield call(api.getSpec, payload)
      if (res.code === 200) {
        res.data.length && res.data.map((item: ProSpecObj, index: number) => {
          item.key = index + 1
          item.spec_item = item.spec_item.split('\n').join()
          //编辑商品 选中添加时的规格
          if (payload.spec && Object.keys(payload.spec).length > 0) {
            payload.spec.map((s: ProSpecObj) => {
              if (item._id === s._id) {
                item.checkList = s.checkList
              }
            })
          } else
            item.checkList = []
        })

        yield put({
          type: 'SetProSpec',
          payload: res.data,
          total: res.total
        })
      } else message.error(res.msg, 1)
    },
    //清空列表
    *ProSpecReset({ payload }, { call, put }) {
      yield put({
        type: 'SetProSpec',
        payload: [],
        total: 0
      })
    },
    //删除商品规格
    *DelProSpec({ payload }, { call, put }) {
      let res = yield call(api.delSpec, payload)
      if (res.code === 200) {
        message.success(res.msg, 1)
        yield put({
          type: 'ProSpecList',
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
    SetProSpec(state, action) {
      return {
        ...state,
        proSpecInfo: action.payload,
        total: action.total
      }
    },
  }
}

export default ProSpec