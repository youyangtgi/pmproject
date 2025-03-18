import React from 'react';
import { Row, Col, Tag } from 'antd';
import '../Ranking.css'; // 使用CSS

function isEmptyObject(obj) {
  return Object.keys(obj).length === 0;
}

const Ranking = (props) => {
  const { rankingData } = props;
  
  // 添加调试信息
  console.log("Ranking组件收到的数据:", JSON.stringify(rankingData, null, 2));
  
  // 使用CSV数据
  const useTestData = false;
  // 如果需要恢复测试数据，可以将上面的false改为true
  
  // 临时硬编码测试数据 - 恢复使用CSV数据后可注释掉
  const testData = {
    rank_title: "测试",
    rank_sub_title: "测试子标题",
    rank_total: 5,
    project: {
      project: "",
      month: {
        month: "3月"
      }
    },
    data_types: [
      { id: 1, type_name: "战队队长" },
      { id: 2, type_name: "归属" },
      { id: 3, type_name: "人数" },
      { id: 4, type_name: "得分" }
    ],
    team_name: "战队名称",
    details: {
      "rank1": [
        {
          id: 1001,
          user_name: "测试战队1",
          data_values: [
            { id: 1, data_value: "队长1" },
            { id: 2, data_value: "研发部" },
            { id: 3, data_value: "10" },
            { id: 4, data_value: "95" }
          ]
        }
      ],
      "rank2": [
        {
          id: 1002,
          user_name: "测试战队2",
          data_values: [
            { id: 1, data_value: "队长2" },
            { id: 2, data_value: "市场部" },
            { id: 3, data_value: "8" },
            { id: 4, data_value: "85" }
          ]
        }
      ]
    }
  };
  
  const finalData = useTestData ? testData : rankingData;
  const { details } = finalData;
  
  if (isEmptyObject(details)) {
    return <div>暂无排行榜数据</div>;
  }
  
  const dataTypes = finalData?.data_types || [];
  const teamNameHeader = finalData?.team_name || '战队名称';
  const currentMonth = finalData?.project?.month?.month;
  const leaderboardTitle = `${finalData?.project?.project}${finalData?.rank_title}排行榜`;

  // 打印表头信息
  console.log("排行榜表头信息:", 
    teamNameHeader, 
    dataTypes.map(dt => dt.type_name).join(', ')
  );
  
  // 打印第一行数据作为示例
  const firstRankKey = Object.keys(details)[0];
  if (firstRankKey) {
    const firstRow = details[firstRankKey][0];
    console.log("第一行数据:", 
      firstRow.user_name, 
      firstRow.data_values.map(dv => dv.data_value).join(', ')
    );
  }

  // 增加宽度以容纳所有字段
  const width = 600; 
  
  return (
    <div className="leaderboard-container" style={{ width: '600px' }}> {/* 调整容器宽度 */}
      <div className="leaderboard-title">
        <div className="leaderboard-title-text">{leaderboardTitle}</div>
      </div>
      <div className="leaderboard-body">
        <div className="leaderboard-header">
          <div className="header-label">{currentMonth}</div>
          <div className="header-flex-container">
            <h1 className="header-title">
              <div className="header-title-p1">{finalData?.rank_title}</div>
              <div>排行榜</div>
            </h1>
            <div className="top-badge">
              <span className="badge-label">
                TOP {finalData?.rank_total}
              </span>
            </div>
            <h4 className="sub-title">{finalData?.rank_sub_title}</h4>
          </div>
        </div>
        <div className="leaderboard-list-wrap">
          <ol className="leaderboard-list" style={{ width }}>
            {/* 表头行 - 5列数据 */}
            <li key="header" className={`leaderboard-item rank-0`}>
              <span style={{ width: '180px' }}>{teamNameHeader}</span> {/* 第1列表头 */}
              {dataTypes?.map((type) => (
                <span key={type.id} className="header-column">{type.type_name}</span>
              ))}
            </li>
            
            {/* 数据行 */}
            {Object.keys(details).map((key) => {
              const detail = details[key];
              const lastDigit = key.match(/\d+$/);
              const rank = lastDigit ? lastDigit[0] : 0;
              const dataValues = (Array.isArray(detail) && detail[0]?.data_values) || [];
              const userName = detail?.[0]?.user_name || '';
              
              return (
                <li key={key} className={`leaderboard-item rank-${rank}`}>
                  {/* 第1列 - 战队名称 */}
                  <div style={{ width: '180px', display: 'flex', alignItems: 'center' }}>
                    <div style={{ width: '40px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {/* 显示所有排名的数字，不仅仅是rank>3 */}
                      {rank <= 3 ? (
                        /* 前三名只显示特殊背景 */
                        <div className="rank-badge" />
                      ) : (
                        /* 4-10名显示普通背景和数字 */
                        <div className="rank-number-container">
                          <div className="rank-badge rank-normal"></div>
                          <div className="rank-number">{rank}</div>
                        </div>
                      )}
                    </div>
                    <div style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {userName}
                    </div>
                  </div>
                  
                  {/* 第2-5列数据 */}
                  {dataValues?.map((dataValue) => (
                    <span key={dataValue.id} className="user-score">
                      {dataValue.data_value}
                    </span>
                  ))}
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Ranking;