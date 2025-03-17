import React from 'react';
import { Card, Breadcrumb } from 'antd';
import { HomeOutlined, TrophyOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import RankingDataLoader from '../components/Ranking/RankingDataLoader';

// 使用public根目录下的CSV文件
const RankingPage = () => {
  // 正确的数据源配置
  const teamRankings = [
    { url: '/ranking.csv', type: 'csv' }
  ];
  
  const rankingStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start'
  };
  
  return (
    <div>
      <Breadcrumb style={{ marginBottom: '16px' }}>
        <Breadcrumb.Item>
          <Link to="/">
            <HomeOutlined /> 首页
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <TrophyOutlined /> 排行榜
        </Breadcrumb.Item>
      </Breadcrumb>
      
      <Card
        bordered={false}
        style={{ borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
      >
        <h2 style={{ marginBottom: '20px' }}>团队排行榜</h2>
        <div style={rankingStyle}>
          {teamRankings.map((ranking, index) => (
            <RankingDataLoader 
              key={index}
              dataSource={ranking.url} 
              type={ranking.type}
            />
          ))}
        </div>
      </Card>
    </div>
  );
};

export default RankingPage; 