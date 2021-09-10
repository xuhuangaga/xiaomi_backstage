import { useState, useEffect } from 'react'
import { Form, Select, Button } from 'antd'
import { useDispatch, useSelector } from 'umi'
import { ProductObj } from '@/types'
import E from "wangeditor";
const { Option } = Select

const SpecParams = () => {
  let dispatch = useDispatch()
  let specParamsInfo = useSelector((state: any) => state.Params.specParamsInfo)
  let productInfo = useSelector((state: any) => state.Product.productInfo)
  let [specParams, setSpecParams] = useState('')
  let [editor, setEditor] = useState<any>()
  //选中的规格参数id
  let [parentId, setParentId] = useState('')
  let [form] = Form.useForm()
  const getData = (pid: any) => {
    dispatch(
      {
        type: 'Params/GetSpecParams',
        payload: {
          parentId: pid
        }
      }
    )
  }
  useEffect(() => {
    getData(null)
    if (!editor) {
      const editor = new E("#editor");
      editor.config.onchange = (newHtml: any) => {
        setSpecParams(newHtml)
      };
      editor.config.zIndex = 100
      editor.create();
      setEditor(editor)
    }
    //获取产品列表
    dispatch(
      {
        type: 'Product/ProductList',
        payload: {
          current: 1,
          pageSize: 10000,
          query: ''
        }
      }
    )
  }, [])
  const onFinish = () => {
    let values: any = form.getFieldsValue()
    values.specParams = specParams
    dispatch({
      type: 'Params/AddSpecParams',
      payload: values
    })
    // editor.txt.clear()
    // form.resetFields()
    setTimeout(() => {
      window.location.pathname = "/specparams"
    }, 1000)
  };
  //选择商品下拉列表
  const onChange = (e: string) => {
    getData(e)
  }
  return (
    <div className={'bc-w p-10'}>
      <Form
        preserve={false}
        labelCol={{ span: 4 }}
        form={form}
        onFinish={onFinish}
      >
        <Form.Item
          label="所属商品"
          name='parentId'
          rules={[{ required: true, message: '请选择所属商品' }]}
          style={{ width: 400 }}
        >
          <Select placeholder='请选择' allowClear={true} className={'m-l10 z'} onChange={onChange} showSearch>
            {
              productInfo.map((item: ProductObj) => {
                return (
                  <Option value={item._id} key={item._id}>{item.name}</Option>
                )
              })
            }
          </Select>
        </Form.Item>
        <div id="editor">
          <p dangerouslySetInnerHTML={{ __html: specParamsInfo }}></p>
        </div>
        <div className={'f-j-e'}>
          <Form.Item
            className={'m-t10'}
          >
            <Button htmlType="submit" type="primary">确认</Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  )
}

export default SpecParams
