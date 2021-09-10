import { useEffect, useState } from 'react'
import E from "wangeditor";
import { Form } from 'antd'

interface Props {
  setDetail: (val: string) => void,
  //被编辑的商品信息
  item: any
}
const Editor = (props: Props) => {
  let [editor, setEditor] = useState<any>()
  const initEditor = () => {
    if (!editor) {
      const editor = new E("#editor");
      editor.config.onchange = (newHtml: any) => {
        props.setDetail(newHtml)
      };
      editor.create();
      setEditor(editor)
    }
  }
  useEffect(() => {
    initEditor()
  }, [])
  return (
    <div>
      <Form.Item
        label="商品详情"
        name='detail'
        rules={[{ required: true, message: '请输入商品详情' }]}
        initialValue={props.item.detail}
      >
        <div id="editor">
          <p dangerouslySetInnerHTML={{__html:props.item && props.item.detail}}></p>
        </div>
      </Form.Item>
    </div>
  )
}

export default Editor
