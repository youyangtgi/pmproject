import React from 'react';
import { Modal, Button } from 'antd';
import { TrophyOutlined } from '@ant-design/icons';

const AchievementNotification = ({ 
  visible, 
  achievement, 
  onClose, 
  onNext 
}) => {
  // 根据贡献分决定奖杯颜色
  const getTrophyColor = (points) => {
    switch(points) {
      case 1: 
        return '#CD7F32'; // 青铜色
      case 2: 
        return '#C0C0C0'; // 白银色
      case 3: 
        return '#FFD700'; // 金色
      default: 
        return '#CD7F32';
    }
  };

  return (
    <Modal
      open={visible}
      footer={null}
      closable={false}
      centered
      width={400}
      bodyStyle={{
        backgroundColor: '#FFEBEE', // 浅红色背景
        borderRadius: '8px',
        padding: '24px',
        textAlign: 'center'
      }}
      style={{ borderRadius: '8px' }}
      maskStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.65)' }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* 奖杯图标 */}
        <TrophyOutlined style={{ 
          fontSize: '64px', 
          color: getTrophyColor(achievement.points),
          marginBottom: '16px'
        }} />
        
        {/* 成就标题 */}
        <h2 style={{ marginBottom: '16px', fontSize: '20px' }}>
          恭喜你取得了新成就！
        </h2>
        
        {/* 成就描述 */}
        <p style={{ 
          fontSize: '16px', 
          marginBottom: '24px',
          padding: '0 16px'
        }}>
          {achievement.description}
        </p>
        
        {/* 贡献分 */}
        <div style={{ 
          marginBottom: '24px',
          backgroundColor: 'rgba(255, 255, 255, 0.6)',
          padding: '8px 16px',
          borderRadius: '16px'
        }}>
          <span style={{ fontWeight: 'bold' }}>奖励贡献分: </span>
          <span style={{ 
            color: '#f5222d', 
            fontSize: '18px', 
            fontWeight: 'bold'
          }}>
            +{achievement.points}
          </span>
        </div>
        
        {/* 按钮 */}
        <Button 
          type="primary" 
          size="large"
          onClick={onNext}
          style={{ 
            backgroundColor: '#f5222d', 
            borderColor: '#f5222d',
            borderRadius: '20px',
            paddingLeft: '32px',
            paddingRight: '32px',
            height: '40px'
          }}
        >
          领取贡献分
        </Button>
      </div>
    </Modal>
  );
};

export default AchievementNotification; 