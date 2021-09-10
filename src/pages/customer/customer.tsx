import styles from './index.less'
import { useReactive } from 'ahooks'
import { emoji } from '../../lib/emoji'
import { Button, Input } from 'antd'
import io from 'socket.io-client'
import { useEffect, useState } from 'react';
import { SmileOutlined } from '@ant-design/icons';

const Customer = () => {
  const socket = io('http://localhost:3000')
  let data: any = useReactive({
    list: [],
    show: false,
    value: ''
  })
  useEffect(() => {
    socket.on('broadcast', (e) => {
      data.list.push(e)
    })
  }, [])
  useEffect(() => {
    let length = data.list.length
    if (length > 0) {
      let dom = document.getElementById(`chatItem-${length - 1}`)
      dom!.scrollIntoView()
    }
  }, [data.list])
  // 点击表情
  const change = (val: any) => {
    data.value += val
  }
  //发送消息
  const send = () => {
    let user = JSON.parse(localStorage.getItem('userInfo')!)
    socket.emit('event', {
      userName: user ? user!.username : '管理员',
      msg: data.value,
      //1:自己发的消息  0:别人发的消息
      from: 1
    })
    data.value=''
  }
  return (
    <div>
      <div >
        {/* 消息盒子 */}
        <div className={`${styles.content} p-10 bc-w`}>
          {
            data.list.map((item: any, index: number) => {
              return (
                <div key={index}   id={`chatItem-${index}`}>
                  {
                    !item.from ? <div className="f-a-c m-b10">
                      <div>
                        {item.userName}
                      </div>
                      <div className={`${styles.kf} bc br-10 p-10 bc-w m-l10`}>
                        {item.msg}
                      </div>
                    </div>
                      : <div className="f-j-e m-b10">
                        <div className={`${styles.my} bc br-10 p-10 f-c-w`}>
                          {item.msg}
                        </div>
                        <div className="m-l10">
                          {item.userName}
                        </div>
                      </div>
                  }
                </div>
              )
            })
          }
        </div>
        {/* 底部输入盒子 */}
        <div className="m-t20">
          <div className={`${styles.kfbottom} bc-e p-f`}>
            <div className="f-j-b">
              <div style={{ "border": "1px solid #eee" }} className="f-2">
                <Input placeholder="请输入需要咨询的问题" value={data.value}
                  onInput={(e: any) => {
                    data.value = e.target.value

                  }} />
              </div>
              <div className="m-l10">
                <Button type="primary" className={'m-l10'} onClick={() => {
                  send()
                }}>发送</Button>
              </div>
              <SmileOutlined onClick={() => { data.show = !data.show }} className="m-l10" />
            </div>
            {
              data.show ?
                <div className={`${styles.emojidv} m-t10 f-w f-j-b m-t20`}>
                  {
                    emoji.map((item: any, index: number) => {

                      return (
                        <div className={`${styles.emojiitem} m-b10`} onClick={() => { change(item) }}
                          key={index}>
                          {item}
                        </div>
                      )
                    })
                  }
                </div>
                : null
            }
          </div>
        </div >
      </div >
    </div >
  )
}

export default Customer
