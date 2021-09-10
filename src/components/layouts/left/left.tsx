import { Menu } from 'antd';
import { NavArray } from '@/types'
import { Link, useHistory, useIntl } from 'umi'
import { useState } from 'react';

const Left = () => {
  let [selectedKeys, setSelectedKeys] = useState(['/'])
  let history = useHistory()
  let [pro, setPro] = useState(['/add', '/class', '/parameter', '/spec', '/model', '/product', '/specparams'])
  const { SubMenu } = Menu;
  const intl = useIntl();
  return (
    <div>
      <Menu
        defaultSelectedKeys={selectedKeys}
        defaultOpenKeys={pro.includes(history.location.pathname) ? ['proSub'] : []}
        mode="inline"
        theme="dark"
        selectedKeys={[history.location.pathname]}
      >
        {
          NavArray.map((item: any) => {
            return (
              item.children ?
                <SubMenu key="proSub" title={intl.formatMessage({
                  id: item.t
                })} icon={< item.icon />}>
                  {
                    item.children.map((item1: any) => {
                      return (
                        <Menu.Item key={item1.path} icon={< item1.icon />}>
                          <Link to={item1.path} replace>
                            {intl.formatMessage({
                              id: item1.t
                            })}
                            {/* {item1.name} */}
                          </Link>
                        </Menu.Item>
                      )
                    })
                  }
                </SubMenu> :
                <Menu.Item key={item.path} icon={< item.icon />}>
                  <Link to={item.path} replace>
                    {/* {item.name} */}
                    {intl.formatMessage({
                      id: item.t
                    })}
                  </Link>
                </Menu.Item>
            )
          })
        }
      </Menu>
    </div>
  )
}
export default Left
