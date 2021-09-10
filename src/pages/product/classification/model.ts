import { Effect, Reducer } from 'umi'
import api from '@/http/api'
import { message } from 'antd';
import { ClassifyObj } from '@/types';

// 定义state的数据
export interface ClassifyState {
  classifyInfo: ClassifyObj[]
}

export interface ClassifyType {
  namespace: 'Classify'
  state: ClassifyState
  // 等同于vuex里面的action 用来发请求的
  effects: {
    AddCategory: Effect,
    AddSecondCategory: Effect,
    ClassifyList: Effect,
    DelClassify: Effect,
    EditStatus: Effect
  },
  // 等同于vuex里面的mutation
  reducers: {
    SetClassify: Reducer<ClassifyState>
  }
}

const Classify: ClassifyType = {
  namespace: 'Classify',
  state: {
    classifyInfo: []
  },
  effects: {
    // *等同于async
    // payload请求传递的参数
    //添加一级商品分类
    *AddCategory({ payload }, { call, put }) {
      let res = yield call(api.addCategory, payload)
      if (res.code === 200) {
        message.success('添加成功', 1)
        yield put({
          type: 'ClassifyList',
          payload: payload
        })
      } else
        message.error(res.msg, 1)
    },
    //添加二级商品分类
    *AddSecondCategory({ payload }, { call, put }) {
      let res = yield call(api.addSecondCategory, payload)
      if (res.code === 200) {
        message.success('添加成功', 1)
        yield put({
          type: 'ClassifyList',
          payload: payload
        })
      } else
        message.error(res.msg, 1)
    },
    //修改商品分类状态
    *EditStatus({ payload }, { call, put }) {
      let res = yield call(api.showCategory, payload)
      res.code === 200 ? message.success(res.msg, 1) : message.error(res.msg, 1)
    },
    //获取商品分类列表
    *ClassifyList({ payload }, { call, put }) {
      let res = yield call(api.getCategory, payload.val?payload.val:'')
      if (res.code === 200) {
        res.data.map((item: ClassifyObj, index: number) => {
          item.title = item.name
          item.key = item._id
          item.label = item.name
          item.value = item._id
          if (!payload.isClass)
            item.disabled = !item.list.length
          item.list.map((item1: ClassifyObj, index1: number) => {
            item1.title = item1.name
            item1.key = item1._id
            item1.isLeaf = true
            item1.label = item1.name
            item1.value = item1._id
          })
          item.children = item.list
        })
        yield put({
          type: 'SetClassify',
          payload: res.data
        })
      } else message.error(res.msg, 1)
    },
    //删除商品分类
    *DelClassify({ payload }, { call, put }) {
      let res = yield call(api.delCategory, payload.id)
      if (res.code === 200) {
        message.success(res.msg, 1)
        yield put({
          type: 'ClassifyList',
          payload: { val: payload.query, isClass: true }
        })
      } else
        message.error(res.msg, 1)
    }
  },
  reducers: {
    SetClassify(state, action) {
      return {
        ...state,
        classifyInfo: action.payload
      }
    },
  }
}

export default Classify