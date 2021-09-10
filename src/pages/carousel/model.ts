import { Effect, Reducer } from 'umi'
import api from '@/http/api'
import { message } from 'antd';
import { CarouselObj } from '@/types';

// 定义state的数据
export interface CarouselModelState {
  carouselInfo: CarouselObj[],
  total:number
}

export interface CarouselModelType {
  namespace: 'Carousel'
  state: CarouselModelState
  // 等同于vuex里面的action 用来发请求的
  effects: {
    AddCarousel: Effect,
    CarouselList: Effect,
    EditStatus: Effect,
    EditCarouse: Effect,
    DelCarouse: Effect
  },
  // 等同于vuex里面的mutation
  reducers: {
    SetCarousel: Reducer<CarouselModelState>
  }
}

const CarouselModel: CarouselModelType = {
  namespace: 'Carousel',
  state: {
    carouselInfo: [],
    total:0
  },
  effects: {
    // *等同于async
    // payload请求传递的参数
    //添加轮播图
    *AddCarousel({ payload }, { call, put }) {
      let res = yield call(api.addBanner, payload)
      if (res.code === 200) {
        message.success(res.msg, 1)
        yield put({
          type: 'CarouselList',
          payload: {
            current: payload.current,
            pageSize: payload.pageSize,
            query: payload.query
          }
        })
      } else
        message.error(res.msg, 1)
    },
    //获取轮播图列表
    *CarouselList({ payload }, { call, put }) {
      let res = yield call(api.getBanner, payload)
      if (res.code === 200) {
        res.data.length && res.data.map((item: CarouselObj, index: number) => {
          item.key = index + 1
        })
        yield put({
          type: 'SetCarousel',
          payload: res.data,
          total:res.total
        })
      } else message.error(res.msg, 1)
    },
    //修改轮播图状态
    *EditStatus({ payload }, { call, put }) {
      let res = yield call(api.showBanner, payload)
      res.code === 200 ? message.success(res.msg, 1) : message.error(res.msg, 1)
    },
    //编辑轮播图
    *EditCarouse({ payload }, { call, put }) {
      let res = yield call(api.updateBanner, payload)
      if (res.code === 200) {
        message.success(res.msg, 1)
        yield put({
          type: 'CarouselList',
          payload: {
            current: payload.current,
            pageSize: payload.pageSize,
            query: payload.query
          }
        })
      } else
        message.error(res.msg, 1)
    },
    //删除轮播图
    *DelCarouse({ payload }, { call, put }) {
      let res = yield call(api.delBanner, payload.id)
      if (res.code === 200) {
        message.success(res.msg, 1)
        yield put({
          type: 'CarouselList',
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
    SetCarousel(state, action) {
      return {
        ...state,
        carouselInfo: action.payload,
        total:action.total
      }
    },
  }
}

export default CarouselModel