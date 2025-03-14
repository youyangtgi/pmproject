import React, { useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  HomeOutlined, 
  CalendarOutlined, 
  ProjectOutlined, 
  TeamOutlined, 
  BarChartOutlined, 
  MessageOutlined, 
  UserOutlined, 
  SettingOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from '@ant-design/icons';
import { menuItems } from '../services/mockData';

const { Sider } = Layout;

const AppSidebar = ({ onCollapse }) => {
  const [collapsed, setCollapsed] = useState(true); // 默认收起状态
  const navigate = useNavigate();
  const location = useLocation();

  // 根据当前路径选择激活的菜单项
  const selectedKeys = [location.pathname.split('/')[1] || 'home'];

  // 将折叠状态传递给父组件
  useEffect(() => {
    if (onCollapse) {
      onCollapse(collapsed);
    }
  }, [collapsed, onCollapse]);

  // 将字符串图标名称转换为图标组件
  const getIcon = (iconName) => {
    const icons = {
      HomeOutlined: <HomeOutlined />,
      CalendarOutlined: <CalendarOutlined />,
      ProjectOutlined: <ProjectOutlined />,
      TeamOutlined: <TeamOutlined />,
      BarChartOutlined: <BarChartOutlined />,
      MessageOutlined: <MessageOutlined />,
      UserOutlined: <UserOutlined />,
      SettingOutlined: <SettingOutlined />
    };
    return icons[iconName] || <HomeOutlined />;
  };

  // 处理菜单点击
  const handleMenuClick = (e) => {
    const path = e.key === 'home' ? '/' : `/${e.key}`;
    navigate(path);
  };

  // 切换侧边栏展开/收起状态
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  // 构建菜单项
  const items = menuItems.map(item => ({
    key: item.key,
    icon: getIcon(item.icon),
    label: item.label,
  }));

  return (
    <Sider
      width={200}
      collapsible
      collapsed={collapsed}
      onCollapse={setCollapsed}
      theme="light"
      style={{
        borderRight: '1px solid #f0f0f0',
        height: '100%',
        overflow: 'auto',
        position: 'fixed',
        left: 0,
        top: 48, // 顶部导航栏高度
        bottom: 0,
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        zIndex: 999
      }}
      trigger={null}
    >
      {/* 折叠按钮 */}
      <div 
        onClick={toggleCollapsed} 
        style={{ 
          height: '48px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          cursor: 'pointer',
          borderBottom: '1px solid #f0f0f0'
        }}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </div>
      
      <Menu
        mode="inline"
        selectedKeys={selectedKeys}
        onClick={handleMenuClick}
        style={{
          height: 'calc(100% - 48px)',
          borderRight: 0
        }}
        items={items}
      />
    </Sider>
  );
};

export default AppSidebar; 