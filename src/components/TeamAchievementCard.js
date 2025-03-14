import React from 'react';
import { Card, Avatar, Space } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const TeamAchievementCard = ({ achievement }) => {
  const { title, days, description, user, time } = achievement;

  return (
    <Card 
      className="team-achievement-card"
      bodyStyle={{ padding: 0 }}
      style={{ 
        border: 'none',
        borderRadius: '4px',
        overflow: 'hidden',
        boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
        marginBottom: '16px'
      }}
    >
      {/* 标题栏 */}
      <div 
        style={{ 
          backgroundColor: '#0F2656', 
          color: 'white', 
          padding: '10px 16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <span style={{ fontWeight: 'bold' }}>{title}</span>
        <span style={{ 
          fontSize: '12px', 
          backgroundColor: 'rgba(255,255,255,0.15)',
          padding: '2px 8px',
          borderRadius: '10px'
        }}>里程碑</span>
      </div>
      
      {/* 卡片内容 */}
      <div style={{ padding: '16px' }}>
        {/* 突出显示的天数 */}
        <div style={{ 
          fontSize: '42px', 
          fontWeight: 'bold', 
          color: '#2FC25B', 
          marginBottom: '8px',
          lineHeight: 1.1
        }}>
          {days}<span style={{ fontSize: '28px' }}>天</span>
        </div>
        
        {/* 描述文本 */}
        <div style={{ 
          color: '#333', 
          fontSize: '14px', 
          marginBottom: '16px', 
          lineHeight: '1.5',
          textAlign: 'left' 
        }}>
          {description}
        </div>
        
        {/* 底部区域 */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginTop: '8px' 
        }}>
          {/* 用户信息 */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Avatar 
              size={28} 
              style={{ backgroundColor: user.color || '#9254DE' }}
            >
              {user.name.slice(0, 1)}
            </Avatar>
            <span style={{ marginLeft: '8px', fontSize: '13px', color: '#666' }}>
              {user.name}
            </span>
          </div>
          
          {/* 时间和详情链接 */}
          <Space>
            <span style={{ fontSize: '12px', color: '#999' }}>{time}</span>
            <Link to="/details" style={{ fontSize: '12px', color: '#3370FF' }}>
              查看详情 <RightOutlined style={{ fontSize: '10px' }} />
            </Link>
          </Space>
        </div>
      </div>
    </Card>
  );
};

export default TeamAchievementCard; 