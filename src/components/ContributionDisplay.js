import React, { useState } from 'react';
import { Card, Row, Col, Statistic, Button, Modal, List, Avatar, Tabs } from 'antd';
import { DollarCircleFilled, TeamOutlined, UserOutlined, TrophyOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

// 模拟排行数据
const weeklyRankings = [
  { id: 1, name: '李明', points: 125, avatar: null, color: '#1677FF' },
  { id: 2, name: '张伟', points: 118, avatar: null, color: '#722ED1' },
  { id: 3, name: '王芳', points: 110, avatar: null, color: '#13C2C2' },
  { id: 4, name: '刘洋', points: 105, avatar: null, color: '#FA8C16' },
  { id: 5, name: '赵强', points: 98, avatar: null, color: '#EB2F96' },
];

const monthlyRankings = [
  { id: 1, name: '李明', points: 458, avatar: null, color: '#1677FF' },
  { id: 2, name: '张伟', points: 432, avatar: null, color: '#722ED1' },
  { id: 3, name: '王芳', points: 411, avatar: null, color: '#13C2C2' },
  { id: 4, name: '赵强', points: 395, avatar: null, color: '#FA8C16' },
  { id: 5, name: '刘洋', points: 379, avatar: null, color: '#EB2F96' },
];

const teamWeeklyRankings = [
  { id: 1, name: '飞鹰战队', points: 560, avatar: null, color: '#1677FF' },
  { id: 2, name: '雄狮战队', points: 542, avatar: null, color: '#722ED1' },
  { id: 3, name: '猎豹战队', points: 518, avatar: null, color: '#13C2C2' },
  { id: 4, name: '钢铁战队', points: 495, avatar: null, color: '#FA8C16' },
  { id: 5, name: '星辰战队', points: 487, avatar: null, color: '#EB2F96' },
];

const teamMonthlyRankings = [
  { id: 1, name: '飞鹰战队', points: 2340, avatar: null, color: '#1677FF' },
  { id: 2, name: '雄狮战队', points: 2285, avatar: null, color: '#722ED1' },
  { id: 3, name: '猎豹战队', points: 2150, avatar: null, color: '#13C2C2' },
  { id: 4, name: '星辰战队', points: 2095, avatar: null, color: '#FA8C16' },
  { id: 5, name: '钢铁战队', points: 2010, avatar: null, color: '#EB2F96' },
];

const ContributionDisplay = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('personal');
  const [timeRange, setTimeRange] = useState('week');
  const navigate = useNavigate();
  
  const showModal = (type, range) => {
    setModalType(type);
    setTimeRange(range);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  
  // 跳转到排行榜页面
  const goToRanking = (type) => {
    navigate('/ranking', { state: { defaultTab: type } });
  };

  // 获取对应的排行数据
  const getRankingData = () => {
    if (modalType === 'personal') {
      return timeRange === 'week' ? weeklyRankings : monthlyRankings;
    } else {
      return timeRange === 'week' ? teamWeeklyRankings : teamMonthlyRankings;
    }
  };
  
  // 获取个人/团队排名
  const getRank = (type, range) => {
    if (type === 'personal') {
      return range === 'week' ? 3 : 2;
    } else {
      return range === 'week' ? 1 : 1;
    }
  };

  const buttonStyle = {
    marginBottom: '8px',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderColor: 'transparent',
    color: '#000',
    fontWeight: 'bold',
    textShadow: '0 1px 2px rgba(255,255,255,0.3)'
  };

  return (
    <Row gutter={16} style={{ marginBottom: '24px' }}>
      {/* 战队贡献分 */}
      <Col span={12}>
        <Card 
          bordered={false}
          style={{ 
            height: '120px', 
            borderRadius: '8px', 
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            background: 'linear-gradient(135deg, #0F2656 0%, #1890ff 100%)',
            padding: 0
          }}
          bodyStyle={{ 
            height: '100%', 
            padding: '12px 16px', 
            display: 'flex', 
            alignItems: 'center' 
          }}
        >
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            width: '100%', 
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ fontSize: '16px', color: 'white', fontWeight: 'bold', display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <TeamOutlined style={{ marginRight: '8px' }} />
                <span>飞鹰战队 贡献分</span>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <DollarCircleFilled style={{ fontSize: '32px', color: '#FFD700', marginRight: '12px' }} />
                <span style={{ fontSize: '28px', color: 'white', fontWeight: 'bold' }}>2,340</span>
              </div>
              
              <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: '14px' }}>
                团队排名: <TrophyOutlined style={{ color: '#FFD700' }} /> 第1名
              </div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Button 
                type="default" 
                size="small" 
                style={buttonStyle}
                onClick={() => goToRanking('team')}
              >
                本周排行
              </Button>
              <Button 
                type="default" 
                size="small"
                style={{ ...buttonStyle, marginBottom: 0 }}
                onClick={() => showModal('team', 'month')}
              >
                本月排行
              </Button>
            </div>
          </div>
        </Card>
      </Col>
      
      {/* 个人贡献分 */}
      <Col span={12}>
        <Card 
          bordered={false}
          style={{ 
            height: '120px', 
            borderRadius: '8px', 
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            background: 'linear-gradient(135deg, #722ED1 0%, #a37bfc 100%)',
            padding: 0
          }}
          bodyStyle={{ 
            height: '100%', 
            padding: '12px 16px', 
            display: 'flex', 
            alignItems: 'center' 
          }}
        >
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            width: '100%', 
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ fontSize: '16px', color: 'white', fontWeight: 'bold', display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <UserOutlined style={{ marginRight: '8px' }} />
                <span>李雷 个人贡献分</span>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <DollarCircleFilled style={{ fontSize: '32px', color: '#FFD700', marginRight: '12px' }} />
                <span style={{ fontSize: '28px', color: 'white', fontWeight: 'bold' }}>458</span>
              </div>
              
              <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: '14px' }}>
                个人排名: <TrophyOutlined style={{ color: '#C0C0C0' }} /> 第2名
              </div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Button 
                type="default" 
                size="small" 
                style={buttonStyle}
                onClick={() => showModal('personal', 'week')}
              >
                本周排行
              </Button>
              <Button 
                type="default" 
                size="small"
                style={{ ...buttonStyle, marginBottom: 0 }}
                onClick={() => showModal('personal', 'month')}
              >
                本月排行
              </Button>
            </div>
          </div>
        </Card>
      </Col>
      
      {/* 排名弹窗 */}
      <Modal
        title={
          <div>
            {modalType === 'personal' ? '个人贡献分排行榜' : '团队贡献分排行榜'}
            <span style={{ fontSize: '14px', color: '#999', marginLeft: '8px' }}>
              ({timeRange === 'week' ? '本周' : '本月'})
            </span>
          </div>
        }
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={400}
      >
        <Tabs
          defaultActiveKey={timeRange}
          onChange={setTimeRange}
          items={[
            {
              key: 'week',
              label: '本周排行',
            },
            {
              key: 'month',
              label: '本月排行',
            },
          ]}
        />
        
        <List
          dataSource={getRankingData()}
          renderItem={(item, index) => (
            <List.Item 
              style={{ 
                padding: '12px 0', 
                borderBottom: index === getRankingData().length - 1 ? 'none' : '1px solid #f0f0f0'
              }}
            >
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                width: '100%', 
                alignItems: 'center'
              }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ 
                    width: '28px', 
                    height: '28px', 
                    lineHeight: '28px', 
                    textAlign: 'center', 
                    backgroundColor: index < 3 ? '#3370FF' : '#f5f5f5',
                    color: index < 3 ? 'white' : '#666',
                    borderRadius: '50%',
                    marginRight: '12px',
                    fontWeight: 'bold'
                  }}>
                    {index + 1}
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar
                      style={{ 
                        backgroundColor: item.color,
                        marginRight: '8px'
                      }}
                    >
                      {item.name.charAt(0)}
                    </Avatar>
                    <span style={{ fontWeight: index < 3 ? 'bold' : 'normal' }}>
                      {item.name}
                    </span>
                  </div>
                </div>
                
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  color: index === 0 ? '#f5222d' : (index < 3 ? '#fa8c16' : '#666')
                }}>
                  <DollarCircleFilled 
                    style={{ 
                      color: index === 0 ? '#FFD700' : (index < 3 ? '#fa8c16' : '#666'),
                      marginRight: '4px'
                    }} 
                  />
                  <span style={{ fontWeight: 'bold' }}>{item.points}</span>
                </div>
              </div>
            </List.Item>
          )}
        />
      </Modal>
    </Row>
  );
};

export default ContributionDisplay; 