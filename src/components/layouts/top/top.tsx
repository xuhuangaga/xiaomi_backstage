import React, { useState } from 'react'
import { MenuUnfoldOutlined, MenuFoldOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Dropdown, Menu, Modal } from 'antd';
import { useHistory } from 'react-router-dom'
import { setLocale } from 'umi'

interface Props {
  collapsed: boolean,
  toggle: () => void,
  user: any
}
const Top = (props: Props) => {
  let history = useHistory()
  //选中的语言
  let [local, setLocal] = useState('中文')
  const { confirm } = Modal;
  //点击退出登录
  const goto = () => {
    confirm({
      title: '提示',
      content: '确认退出本次登录?',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        localStorage.removeItem('token')
        localStorage.removeItem('userInfo')
        history.push('/login')
      },
      onCancel() {
        // console.log('Cancel');
      },
    });
  }
  //切换语言
  const changeLan = (e: any) => {
    setLocale(e.key, false)
    if (e.key === 'zh-CN')
      setLocal('中文')
    else if (e.key === 'en-US')
      setLocal('英文')
    else setLocal('繁体')
  }
  const { Header } = Layout;
  const menu = (
    <Menu onClick={goto}>
      <Menu.Item key="goto">
        退出登录
      </Menu.Item>
    </Menu>
  );
  const menu1 = (
    <Menu onClick={changeLan}>
      <Menu.Item key="zh-CN">
        中文
      </Menu.Item>
      <Menu.Item key="en-US">
        英文
      </Menu.Item>
      <Menu.Item key="zh-TW">
        繁体
      </Menu.Item>
    </Menu>
  );
  return (
    <div className={'f-j-b bc-w p-r10'}>
      <Header className="site-layout-background" style={{ padding: '0 20px', background: '#fff' }}>
        {React.createElement(props.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
          className: 'trigger',
          onClick: props.toggle,
        })}
      </Header>
      <div className={'f-j-c'}>
        <iframe width="200" height="24" frameBorder="0" scrolling="no" src="https://i.tianqi.com/?c=code&id=11"></iframe>
        <Dropdown overlay={menu} placement="bottomCenter" arrow className={'c-p'}>
          <div className={`f-j-c m-l10`} >
            <div className={'f-c-w bc-c yd f-j-c'} style={{ width: 25, height: 25 }}>
              <div>
                <UserOutlined />
              </div>
            </div>
            <div className={'m-lr10'}>{props.user.username}</div>
          </div>
        </Dropdown>
        <Dropdown overlay={menu1} placement="bottomCenter" arrow className={'c-p'}>
          <div className={`m-l10`} >
            {local}
          </div>
        </Dropdown>
      </div>
    </div>
  )
}
export default Top
