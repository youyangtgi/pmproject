import React, { useState, useEffect } from 'react';
import { Layout, Button, Badge, Avatar, Space, Dropdown } from 'antd';
import { 
  HomeOutlined, 
  TeamOutlined, 
  FileTextOutlined, 
  BellOutlined, 
  MessageOutlined, 
  UserOutlined,
  SettingOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { getCurrentDate } from '../services/mockData';

const { Header } = Layout;

const AppHeader = () => {
  const [dateInfo, setDateInfo] = useState({ formattedDate: '', day: '' });
  const navigate = useNavigate();
  
  useEffect(() => {
    const { formattedDate, day } = getCurrentDate();
    setDateInfo({ formattedDate, day });
    
    // 更新日期的定时器，每分钟更新一次
    const timer = setInterval(() => {
      const { formattedDate, day } = getCurrentDate();
      setDateInfo({ formattedDate, day });
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);
  
  // 用户下拉菜单项
  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: '个人资料',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: '设置',
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
    },
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Header 
      style={{ 
        backgroundColor: '#0F2656', 
        padding: '0 16px', 
        height: '48px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'fixed',
        zIndex: 1000,
        width: '100%'
      }}
    >
      {/* 左侧区域 */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div className="logo" style={{ color: 'white', fontSize: '18px', fontWeight: 'bold' }}>
          项目管理平台
        </div>
        <div style={{ marginLeft: '24px', color: 'white' }}>
          {dateInfo.formattedDate} {dateInfo.day}
        </div>
      </div>
      
      {/* 右侧区域 */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {/* 导航按钮 - 使用onClick事件替代Link组件 */}
        <Space size={16}>
          <Button 
            type="text" 
            icon={<HomeOutlined />} 
            style={{ color: 'white' }}
            onClick={() => handleNavigation('/')}
          >
            首页
          </Button>
          <Button 
            type="text" 
            icon={<TeamOutlined />} 
            style={{ color: 'white' }}
            onClick={() => handleNavigation('/team')}
          >
            部门协作
          </Button>
          <Button 
            type="text" 
            icon={<FileTextOutlined />} 
            style={{ color: 'white' }}
            onClick={() => handleNavigation('/milestones')}
          >
            里程碑
          </Button>
        </Space>
        
        {/* 通知和消息 */}
        <Space size={16} style={{ marginLeft: '24px' }}>
          <Badge count={5} offset={[0, 0]}>
            <Button 
              type="text" 
              icon={<BellOutlined />} 
              style={{ color: 'white' }} 
            />
          </Badge>
          <Badge count={3} offset={[0, 0]}>
            <Button 
              type="text" 
              icon={<MessageOutlined />} 
              style={{ color: 'white' }} 
            />
          </Badge>
        </Space>
        
        {/* 用户头像 */}
        <div style={{ marginLeft: '24px' }}>
          <Dropdown
            menu={{ items: userMenuItems }}
            placement="bottomRight"
            arrow
          >
            <Avatar style={{ backgroundColor: '#87d068', cursor: 'pointer' }} icon={<UserOutlined />} />
          </Dropdown>
        </div>
      </div>
    </Header>
  );
};

export default AppHeader; 