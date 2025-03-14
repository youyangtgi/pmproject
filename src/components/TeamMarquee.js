import React from 'react';
import { Card, Avatar, Tag, Tooltip } from 'antd';
import { TrophyOutlined } from '@ant-design/icons';
import './TeamMarquee.css';

const TeamMarquee = ({ achievements }) => {
  // 根据贡献分获取对应奖杯颜色
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

  // 复制成果数组以实现无缝滚动
  const duplicatedAchievements = [...achievements, ...achievements, ...achievements];

  return (
    <div className="team-marquee-container">
      <div className="team-marquee-header">
        <TrophyOutlined style={{ marginRight: '8px', color: '#FFD700' }} />
        <span>各战队最新成果</span>
      </div>
      
      <div className="team-marquee-content">
        <div className="team-marquee-track">
          {duplicatedAchievements.map((achievement, index) => (
            <div key={`${achievement.id}-${index}`} className="team-marquee-item">
              <Card 
                className="team-achievement-card"
                size="small"
                style={{ 
                  width: '280px',
                  margin: '0 18px',
                  borderRadius: '6px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.09)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontWeight: 'bold', fontSize: '14px', color: '#1F1F1F' }}>
                    {achievement.teamName}
                  </span>
                  <Tooltip title={`贡献分 ${achievement.points}`}>
                    <TrophyOutlined style={{ 
                      color: getTrophyColor(achievement.points),
                      fontSize: '16px'
                    }} />
                  </Tooltip>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '6px' }}>
                  <div style={{ flex: 1, fontSize: '13px', color: '#333' }}>
                    {achievement.achievement}
                  </div>
                  <Tag color="#108ee9" style={{ fontSize: '12px', margin: 0 }}>
                    +{achievement.points}分
                  </Tag>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: '#888' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar size={20} style={{ backgroundColor: achievement.user.color, marginRight: '6px' }}>
                      {achievement.user.name.charAt(0)}
                    </Avatar>
                    <span>{achievement.user.name}</span>
                  </div>
                  <span>{achievement.date}</span>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamMarquee; 