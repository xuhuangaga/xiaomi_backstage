import { useSelector, useDispatch } from 'umi'
import { useState, useEffect } from 'react'
import { Form, Checkbox, Select, Input } from 'antd'
import { ProSpecObj } from '@/types';

const { Option } = Select
interface Props {
  setModelId: (val: string) => void,
  setSpec: (val: any[]) => void,
  //被编辑的商品信息
  item: any
}
const Addspec = (props: Props) => {
  let dispatch = useDispatch()
  let proModelInfo = useSelector((state: any) => state.ProModel.proModelInfo)
  let proSpecInfo = useSelector((state: any) => state.ProSpec.proSpecInfo)
  let [isEdit, setIsEdit] = useState(props.item && Object.keys(props.item).length)
  //选中的小规格
  let [checkSpec, setCheckSpec] = useState<string[]>([])
  //是否页面加载
  let [isInit, setIsInit] = useState(true)
  let [attr, setAttr] = useState<any>({
    label: "商品模型",
    name: 'model',
    rules: [{ required: true, message: '请选择商品模型' }]
  })

  //获取模型
  useEffect(() => {
    //先清空规格
    
    dispatch(
      {
        type: 'ProSpec/ProSpecReset'
      }
    )
    dispatch(
      {
        type: 'ProModel/ProModelList',
        payload: {
          current: 1,
          pageSize: 10000,
          query: ''
        }
      }
    )
    //编辑时页面一加载获取相应模型的规格
    if (props.item && Object.keys(props.item).length) {
      getSpec(props.item.spec[0].model)
    }
  }, [])
  useEffect(() => {
    isEdit && proSpecInfo && isInit && props.setSpec(proSpecInfo)
  }, [proSpecInfo])
  //获取规格
  const getSpec = (parentId: string) => {
    dispatch(
      {
        type: 'ProSpec/ProSpecList',
        payload: {
          current: 1,
          pageSize: 10000,
          parentId: parentId,
          spec: props.item && Object.keys(props.item).length && props.item.spec
        }
      }
    )
  }
  //选择模型
  const onChange = (e: any) => {
    setIsInit(false)
    getSpec(e)
  }
  //点击单选
  const onCheckChange = (e: any, i: string, item: ProSpecObj) => {
    let arr: string[] = []
    //如果单选选中  item.checkList拼接
    if (e.target.checked) {
      item.checkList && item.checkList.push(i)
      arr.push(i)
    } else {
      //如果取消单选 item.checkList过滤
      item.checkList = item.checkList.filter((i1: string) => { return i1 !== i })
      arr = checkSpec.filter((i1: string) => { return i1 !== i })
    }
    //重新设置选中的小规格 拼接之前选中的
    setCheckSpec([...checkSpec, ...arr])
    props.setSpec(proSpecInfo)
  };
  //点击全选
  const onCheckAllChange = (e: any, item: ProSpecObj) => {
    let arr = item.spec_item.split(',')
    //如果全选选中
    if (e.target.checked) {
      item.checkList = arr
      //设置选中的小规格 需要拼接上之前选中的小规格
      setCheckSpec([...checkSpec, ...arr])
      props.setSpec(proSpecInfo)
    } else {
      //没有选中的清空
      item.checkList = []
      //删除之前选中的该规格下的小规格
      let temp: string[] = []
      checkSpec.map(i => {
        //记录是否存在被删除的小规格
        let flag = false
        arr.map(i1 => {
          if (i1 === i) {
            flag = true
          }
        })
        if (!flag) {
          temp.push(i)
        }
      })
      setCheckSpec(temp)
      props.setSpec(proSpecInfo)
    }
  };
  return (
    <div>
      {
        isEdit ?
          <Form.Item
            initialValue={props.item.spec[0].model}
            {...attr}
          >
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="请选择"
              allowClear
              className={'f-c-6'}
              onChange={onChange}
            >
              {
                proModelInfo.map((item: any, index: number) => {
                  return (
                    <Option value={item._id} key={index}>{item.name}</Option>
                  )
                })
              }
            </Select>

          </Form.Item> :
          <Form.Item
            {...attr}
          >
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="请选择"
              allowClear
              className={'f-c-6'}
              onChange={onChange}
            >
              {
                proModelInfo.map((item: any, index: number) => {
                  return (
                    <Option value={item._id} key={index}>{item.name}</Option>
                  )
                })
              }
            </Select>

          </Form.Item>
      }
      <Form.Item
        label="商品规格"
      >
        {
          proSpecInfo.map((item: ProSpecObj) => {
            return (
              <div className={'b-b p-10'} key={item._id}>
                <Checkbox onChange={(e) => onCheckAllChange(e, item)}
                  checked={item.checkList && item.checkList.length === item.spec_item.split(',').length}>
                  {item.name}
                </Checkbox>
                <div>
                  {
                    item.spec_item.split(',').map((i: string) => {
                      return (
                        <Checkbox style={{ marginTop: 5 }} key={i}
                          onChange={(e) => { onCheckChange(e, i, item) }}
                          checked={(item.checkList && item.checkList.includes(i))}>
                          <span className={'ckb'}>{i}</span>
                        </Checkbox>
                      )
                    })
                  }
                </div>
              </div>
            )
          })
        }
      </Form.Item>
    </div>
  )
}

export default Addspec
