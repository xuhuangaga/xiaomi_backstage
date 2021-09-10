import {Form,Input,Button} from 'antd'
import { UserOutlined, LockOutlined,EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import{useDispatch} from 'umi'

const Login = () => {
  let dispatch = useDispatch()

  //验证成功 登录
  const onFinish=(e:any)=>{
    dispatch({
      type:'Login/login',
      payload:e
    })
  }
  return (
    <div className={'h-vh f-j-c'}>
      <div style={{width:'30%'}}>
        <div className={'f-s20 f-w-b t-a-c'}>小米 Lite</div>
        <div className={'m-t-b10 f-c-9 f-s12 t-a-c'}>欢迎来到小米 lite后台管理系统</div>
        <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: '请输入用户名',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />}
         placeholder="请输入用户名"/>
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: '请输入密码',
          },
          {
            min:6,
            max:10,
            message: '密码长度为6-10个字符',
          },
        ]}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="请输入用户名"
          iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button" block>
         登录
        </Button>
      </Form.Item>
    </Form>
      </div>
    </div>
  )
}
export default Login
