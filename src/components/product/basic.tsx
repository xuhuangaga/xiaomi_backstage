import { Form, Input, InputNumber, Switch, Cascader } from 'antd'
import { ClassifyObj } from '@/types';
import Upload from '@/components/upload/upload';
import { useEffect, useState } from 'react'

const { TextArea } = Input

interface Props {
  classifyInfo: ClassifyObj[],
  uploadUrl: (val: string) => void,
  //被编辑的商品信息
  item: any
}
const Basic = (props: Props) => {
  let [iniCategoryArr, setIniCategoryArr] = useState<any>([])
  useEffect(() => {
    if (props.item) {
      props.classifyInfo.map((item: ClassifyObj) => {
        item.list.map((i: ClassifyObj) => {
          if (i._id === props.item.category) {
            let arr = [i.parentId, props.item.category]
            iniCategoryArr.push(i.parentId)
            iniCategoryArr.push(props.item.category)
            setIniCategoryArr(arr)
            return
          }
        })
      })
    }
  }, [props.classifyInfo])
  return (
    <div>
      <Form.Item
        label="商品名称"
        name='name'
        rules={[{ required: true, message: '请输入商品名称' }]}
        initialValue={props.item.name}
      >
        <Input allowClear={true} placeholder='商品名称' />
      </Form.Item>
      <Form.Item
        label="商品分类"
        name='category'
        rules={[{ required: true, message: '请选择商品分类' }]}
        initialValue={iniCategoryArr}
      >
        <Cascader options={props.classifyInfo} placeholder="请选择商品分类"/>
      </Form.Item>
      <Form.Item
        label="商品原价"
        name='originalPrice'
        rules={[{ required: true, message: '请输入商品原价' }]}
        initialValue={props.item.originalPrice}
      >
        <InputNumber className={'wbfb'} keyboard={false} min={1} placeholder='请输入商品原价' />
      </Form.Item>
      <Form.Item
        label="商品现价"
        name='presentPrice'
        rules={[{ required: true, message: '请输入商品现价' }]}
        initialValue={props.item.presentPrice}
      >
        <InputNumber className={'wbfb'} min={1} placeholder='请输入商品原价' />
      </Form.Item>
      <Form.Item
        label="封面图"
        name='cover'
        rules={[{ required: true, message: '请上传封面图' }]}
        initialValue={props.item.cover}
      >
        <Upload uploadUrl={props.uploadUrl} url={props.item && props.item.cover} imgH={120} imgW={120} maxCount={1} listType={'picture'}></Upload>
      </Form.Item>
      <Form.Item
        label="商品单位"
        name='company'
        rules={[{ required: true, message: '请输入商品单位' }]}
        initialValue={props.item ? props.item.stock : '件'}
      >
        <Input allowClear={true} />
      </Form.Item>
      <Form.Item
        label="商品库存"
        name='stock'
        rules={[{ required: true, message: '请输入商品库存' }]}
        initialValue={props.item ? props.item.stock : 999}
      >
        <InputNumber className={'wbfb'} min={1} />
      </Form.Item>
      <Form.Item
        label="商品简介"
        name='introduction'
        rules={[{ required: true, message: '请输入商品简介' }]}
        initialValue={props.item.introduction}
      >
        <TextArea placeholder='请输入商品简介' />
      </Form.Item>
      <Form.Item
        label="推荐介绍"
        name='sellDesc'
        rules={[{ required: true, message: '请输入推荐介绍' }]}
        initialValue={props.item.sellDesc}
      >
        <TextArea placeholder='请输入推荐介绍' rows={5} />
      </Form.Item>
      <Form.Item
        label="是否新品"
        name='isNewGood'
        valuePropName='checked'
        initialValue={props.item.isNewGood}
      >
        <Switch defaultChecked size="small" />
      </Form.Item>
      <Form.Item
        label="是否热销"
        name='isHot'
        valuePropName='checked'
        initialValue={props.item.isHot}
      >
        <Switch defaultChecked size="small" />
      </Form.Item>
      <Form.Item
        label="是否推荐"
        name='isRecommend'
        valuePropName='checked'
        initialValue={props.item.isRecommend}
      >
        <Switch defaultChecked size="small" />
      </Form.Item>
    </div>
  )
}
export default Basic
