import React from 'react';
import RankingDataLoader from './RankingDataLoader';

const RankingGroup = ({ dataSources }) => {
  return (
    <div style={{ 
      display: 'flex', 
      flexWrap: 'wrap', 
      justifyContent: 'center',
      gap: '20px',
      margin: '20px 0'
    }}>
      {dataSources.map((source, index) => (
        <RankingDataLoader
          key={index}
          dataSource={source.url}
          type={source.type || 'json'}
        />
      ))}
    </div>
  );
};

export default RankingGroup;