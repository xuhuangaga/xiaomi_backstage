import React from 'react'
import {Modal} from 'antd'

interface Props {
  title:string,
  handleOk:()=>void
  handleCancel:()=>void,
  children: React.ReactNode,
  visible:boolean,
  mask?:boolean
}
const Modals = (props:Props) => {
  //对话框点击确认
  const handleOk = () => {
    props.handleOk()
  };
  
  //对话框点击取消
  const handleCancel=()=>{
    props.handleCancel()
  }
  return (
    <div>
      <Modal mask={props.mask} destroyOnClose={true} onCancel={handleCancel} title={props.title} visible={props.visible} onOk={handleOk} okText="确认"
        cancelText="取消">
        {props.children}
      </Modal>
    </div>
  )
}
export default Modals
