import React, { useState, useEffect } from 'react';
import { Layout, ConfigProvider, Spin } from 'antd';
import { Routes, Route, Navigate } from 'react-router-dom';
import zhCN from 'antd/lib/locale/zh_CN';
import AppHeader from './components/AppHeader';
import AppSidebar from './components/AppSidebar';
import Dashboard from './pages/Dashboard';
import { fetchCurrentUser } from './services/api';
import './App.css';

const { Content, Footer } = Layout;

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true); // 默认侧边栏收起状态

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const userData = await fetchCurrentUser();
        setCurrentUser(userData);
        setLoading(false);
      } catch (error) {
        console.error('获取用户信息失败:', error);
        setLoading(false);
      }
    };

    getUserInfo();
  }, []);

  // 侧边栏状态变化处理函数
  const handleSidebarCollapse = (collapsed) => {
    setSidebarCollapsed(collapsed);
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" tip="加载中..." />
      </div>
    );
  }

  return (
    <ConfigProvider locale={zhCN} theme={{ token: { colorPrimary: '#3370FF' } }}>
      <Layout style={{ minHeight: '100vh' }}>
        <AppHeader user={currentUser} />
        <Layout>
          <AppSidebar onCollapse={handleSidebarCollapse} />
          <Layout style={{ 
            marginLeft: sidebarCollapsed ? 80 : 200, 
            marginTop: 48,
            transition: 'margin-left 0.2s'
          }}>
            <Content style={{ 
              background: '#F0F2F5', 
              padding: '24px', 
              minHeight: 'calc(100vh - 48px - 64px)' // 减去顶部导航和页脚的高度
            }}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                {/* 其他路由将在后续添加 */}
                {/* 默认重定向到Dashboard */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Content>
            <Footer style={{ textAlign: 'center', background: '#fff', height: '64px', padding: '16px' }}>
              项目管理平台 ©{new Date().getFullYear()} 飞书风格UI
            </Footer>
          </Layout>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default App;
