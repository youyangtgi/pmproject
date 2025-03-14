import React from 'react';
import { Card, Avatar } from 'antd';
import { RightOutlined } from '@ant-design/icons';

const TeamProgressCard = ({ team }) => {
  const { name, progress, description } = team;

  return (
    <Card
      className="team-progress-card"
      style={{
        border: '1px solid #f0f0f0',
        borderRadius: '4px',
        boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
        margin: '12px 0',
        cursor: 'pointer',
        background: 'white'
      }}
      bodyStyle={{ padding: '12px 16px' }}
      hoverable
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            size={32}
            style={{ 
              backgroundColor: '#e1e8f0', 
              color: '#91a7c0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {name.slice(0, 1)}
          </Avatar>
          <span style={{ 
            marginLeft: '12px', 
            fontWeight: 'bold',
            fontSize: '14px'
          }}>
            {name}
          </span>
        </div>
        <div style={{
          backgroundColor: '#e6f7ff',
          color: '#1677ff',
          fontSize: '12px',
          padding: '1px 6px',
          borderRadius: '10px',
          fontWeight: 'bold'
        }}>
          +{progress}分
        </div>
      </div>
      
      {description && (
        <div style={{ 
          marginTop: '10px', 
          fontSize: '13px', 
          color: '#666',
          lineHeight: '1.5'
        }}>
          {description}
        </div>
      )}
      
      <div style={{ 
        textAlign: 'right', 
        marginTop: '8px',
        fontSize: '12px',
        color: '#1677ff'
      }}>
        <a 
          href="#detail" 
          style={{ color: 'inherit', textDecoration: 'none' }}
          onClick={(e) => e.preventDefault()}
        >
          查看详情 <RightOutlined style={{ fontSize: '10px' }} />
        </a>
      </div>
    </Card>
  );
};

export default TeamProgressCard; 