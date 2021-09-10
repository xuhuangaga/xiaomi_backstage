import {
  HomeOutlined,
  PictureOutlined,
  BarsOutlined,
  ReconciliationOutlined,
  UserOutlined,
  TableOutlined,
  FileAddOutlined,
  FileDoneOutlined,
  ApartmentOutlined,
  FileOutlined,
  AlignCenterOutlined,
  FieldTimeOutlined,
  ScheduleOutlined,
  MenuOutlined,
  NotificationOutlined,
  MessageOutlined,
  PartitionOutlined
} from '@ant-design/icons';

// 首页左侧导航栏
export const NavArray = [
  {
    name: '首页',
    icon: HomeOutlined,
    path: '/',
    t:'home'
  },
  {
    name: '轮播图管理',
    icon: PictureOutlined,
    path: '/carousel',
    t:'banner'
  },
  {
    name: '导航管理',
    icon: BarsOutlined,
    path: '/nav',
    t:'nav'
  },
  {
    name: '推荐导航',
    icon: ReconciliationOutlined,
    path: '/recommend',
    t:'recomment'
  },
  {
    name: '用户管理',
    icon: UserOutlined,
    path: '/user',
    t:'user'
  },
  {
    name: '商品管理',
    icon: TableOutlined,
    path: '/list',
    t:'productman',
    children: [
      {
        name: '添加商品',
        icon: FileAddOutlined,
        path: '/product',
        t:'product'
      },
      {
        name: '商品分类',
        icon: FileDoneOutlined,
        path: '/class',
        t:'category'
      },
      {
        name: '商品参数',
        icon: ApartmentOutlined,
        path: '/parameter',
        t:'proparams'
      },
      {
        name: '商品规格',
        icon: FileOutlined,
        path: '/spec',
        t:'prospec'
      },
      {
        name: '商品模型',
        icon: AlignCenterOutlined,
        path: '/model',
        t:'promodel'
      },
      {
        name: '规格参数',
        icon: PartitionOutlined,
        path: '/specparams',
        t:'specparams'
      }
    ]
  },
  {
    name: '秒杀管理',
    icon: FieldTimeOutlined,
    path: '/seckill',
    t:'seckill'
  },
  {
    name: '优惠券管理',
    icon: ScheduleOutlined,
    path: '/coupon',
    t:'coupon'
  },
  {
    name: '订单管理',
    icon: MenuOutlined,
    path: '/orders',
    t:'order'
  },
  {
    name: '通知管理',
    icon: NotificationOutlined,
    path: '/notice',
    t:'notice'
  },
  {
    name: '客服消息',
    icon: MessageOutlined,
    path: '/customer',
    t:'service'
  }
]

//轮播对象
export interface CarouselObj {
  url: string,
  title: string,
  link: string,
  isShow: boolean,
  key: number,
  _id: string
}

//商品参数对象
export interface ProParamsObj {
  parentId: string,
  url: string,
  name: string,
  desc: string,
  key:number,
  _id:string
}

//导航对象
export interface NavObj {
  url: string,
  title: string,
  isShow: boolean,
  _id: string
}

//通知对象
export interface NoticeObj {
  content: string,
  key: number,
  _id: string,
  isShow: boolean
}

//优惠券对象
export interface CouponObj {
  // 优惠券名称
  name: string,
  // 优惠券金额
  amount: number,
  // 使用门槛
  threshold: number,
  // 开始时间
  start_time: string,
  // 结束时间
  end_time: string,
  // 优惠券数量
  number: number,
  // 是否显示
  isShow: boolean,
  _id: string
}

//用户对象
export interface UserObj {
  // 用户名
  username: string,
  // 用户头像
  avatar: string,
  // 用户邮箱
  email: string,
  // 用户电话
  mobile: string,
  // 是否禁用
  status: boolean,
  // 用户密码
  password: string,
  _id: string
}

//订单对象
export interface OrderObj {
  // 用户id
  user_id: string,
  // 订单总价
  price: number,
  // 用户地址
  address: string,
  // 订单商品数量
  count: number,
  // 支付时间
  pay_time: string,
  // 商品列表
  goods_list: any,
  // 用户电话
  mobile: string,
}

//秒杀对象
export interface SeckillObj {
  start_time: string,
  end_time: string,
  goods_number: number,
  goods: ProductObj[],
  isShow: boolean,
  price: number,
  _id: string
}

//规格参数对象
export interface SpecParamsObj {
  id: string,
  specParams: string
}


//推荐导航对象
export interface RecommentObj {
  name: string,
  desc: string,
  goods: ProductObj,
  _id: string
}

//商品模型对象
export interface ProModelObj {
  name: string,
  _id: string,
  key: number
}

//商品规格对象
export interface ProSpecObj {
  name: string,
  model: string,
  spec_item: string,
  mode: string,
  parentId: string,
  _id: string,
  key: number,
  checkList:string[]
}

//商品对象
export interface ProductObj {
  name: string,
  category: string,
  pic: string,
  video: string,
  cover: string,
  originalPrice: number,
  presentPrice: number,
  discount: number,
  detail: string,
  spec: string,
  introduction: string,
  company: string,
  stock: number,
  isNewGood: boolean,
  isHot: boolean,
  isRecommend: boolean,
  comment: string,
  isShow: boolean,
  sellDesc: string,
  productionDesc: string,
  _id: string,
  key: number
}

// 商品分类对象
export interface ClassifyObj {
  name: string,
  short_name: string,
  isShow: boolean,
  parentId: string,
  title:string,
  key:string,
  children:ClassifyObj[],
  _id:string,
  list:ClassifyObj[],
  isLeaf:boolean,
  label:string,
  value:string,
  disabled:boolean
}