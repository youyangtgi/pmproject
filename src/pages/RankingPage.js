import React, { useState, useEffect } from 'react';
import { Card, Breadcrumb, Select, Checkbox, Row, Col } from 'antd';
import { HomeOutlined, TrophyOutlined, DownOutlined, RightOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import RankingDataLoader from '../components/Ranking/RankingDataLoader';
import './RankingPage.css';

const { Option } = Select;

// 使用process.env.PUBLIC_URL确保在GitHub Pages上正确访问
const RankingPage = () => {
  // 状态定义
  const [rankingData, setRankingData] = useState([]); // 所有排行榜数据
  const [loading, setLoading] = useState(true);
  const [filterOptions, setFilterOptions] = useState({
    cycles: [], // 排行周期选项
    years: [], // 年份选项
    periods: [] // 所在周期选项
  });
  const [selectedFilters, setSelectedFilters] = useState({
    cycle: '', // 排行周期
    year: '', // 年份
    period: '' // 所在周期
  });
  const [groupedRankings, setGroupedRankings] = useState({}); // 分组后的排行榜
  const [expandedGroups, setExpandedGroups] = useState({}); // 展开/折叠状态
  const [checkedRankings, setCheckedRankings] = useState([]); // 选中的排行榜
  
  // CSV数据源
  const dataSource = `${process.env.PUBLIC_URL}/ranking.csv`;
  
  // 加载和解析CSV数据
  useEffect(() => {
    const loadRankingData = async () => {
      try {
        setLoading(true);
        const response = await fetch(dataSource);
        if (!response.ok) {
          throw new Error(`HTTP错误! 状态码: ${response.status}`);
        }
        
        const csvText = await response.text();
        console.log("CSV数据加载成功，长度:", csvText.length);
        
        // 解析CSV数据，处理不同操作系统的换行符
        const lines = csvText.trim().split(/\r?\n/).filter(line => line.trim());
        console.log("CSV行数:", lines.length);
        
        // 打印头部和一些示例行，检查CSV格式
        console.log("CSV头部:", lines[0]);
        console.log("CSV示例行1:", lines[1]);
        console.log("CSV示例行2:", lines[2]);
        
        const headers = lines[0].split(',');
        
        // 提取配置数据
        const configData = [];
        for (let i = 1; i < lines.length; i++) {
          const values = lines[i].split(',');
          
          if (values.length < 13) {
            console.log(`第${i}行列数不足，跳过:`, values);
            continue;
          }
          
          // 定义排行榜关键信息的索引
          const titleIndex = 0;     // 排行榜标题
          const monthIndex = 1;     // 月份
          const topNumberIndex = 2; // TOP数量
          const subtitleIndex = 3;  // 子标题
          const cycleIndex = 9;     // 排行周期
          const yearIndex = 10;     // 年份
          const periodIndex = 11;   // 所在周期
          const groupIndex = 12;    // 分组名称
          
          // 检查并调试分组名称
          const groupName = values[groupIndex];
          if (!groupName || groupName.trim() === '') {
            console.log(`第${i}行分组名称为空:`, values);
          }
          
          configData.push({
            title: values[titleIndex],
            month: values[monthIndex],
            topNumber: values[topNumberIndex],
            subtitle: values[subtitleIndex],
            cycle: values[cycleIndex],
            year: values[yearIndex],
            period: values[periodIndex],
            group: groupName,
            rowIndex: i // 保存行索引用于加载数据
          });
        }
        
        console.log("配置数据总行数:", configData.length);
        
        // 调试：输出所有分组名
        const allGroups = [...new Set(configData.map(item => item.group))];
        console.log("CSV中的所有分组:", allGroups);
        console.log("CSV中的所有分组数量:", allGroups.length);
        
        // 统计每个分组包含的行数
        const groupCounts = {};
        configData.forEach(item => {
          if (!groupCounts[item.group]) {
            groupCounts[item.group] = 0;
          }
          groupCounts[item.group]++;
        });
        console.log("各分组在CSV中的行数:", groupCounts);
        
        // 根据新规则定义排行榜唯一性
        // 排行榜标题、月份、TOP数量、子标题、排行周期、年份、所在周期相同视为同一排行榜
        const uniqueRankings = [];
        const seen = new Set();
        
        configData.forEach(item => {
          // 使用符合用户要求的字段组合作为唯一键
          const key = `${item.title}-${item.month}-${item.topNumber}-${item.subtitle}-${item.cycle}-${item.year}-${item.period}-${item.group}`;
          
          if (!seen.has(key)) {
            seen.add(key);
            uniqueRankings.push({
              ...item,
              uniqueKey: key // 保存唯一键以便后续使用
            });
          } else {
            console.log("忽略重复排行榜:", key);
          }
        });
        
        console.log("唯一排行榜数量:", uniqueRankings.length);
        
        setRankingData(uniqueRankings);
        
        // 提取筛选器选项
        const cycles = [...new Set(configData.map(item => item.cycle))];
        const years = [...new Set(configData.map(item => item.year))];
        const periods = [...new Set(configData.map(item => item.period))];
        
        setFilterOptions({
          cycles,
          years,
          periods
        });
        
        // 根据分组名称对排行榜进行分组
        const grouped = {};
        uniqueRankings.forEach(item => {
          if (!grouped[item.group]) {
            grouped[item.group] = [];
          }
          grouped[item.group].push(item);
        });
        
        // 调试：输出分组结果
        console.log("分组后的排行榜数量:", Object.keys(grouped).length);
        Object.keys(grouped).forEach(groupName => {
          console.log(`分组 "${groupName}" 包含的排行榜数量: ${grouped[groupName].length}`);
          console.log(`分组 "${groupName}" 包含的排行榜:`, grouped[groupName].map(r => r.title));
        });
        
        setGroupedRankings(grouped);
        
        // 设置所有分组为展开状态
        const expanded = {};
        Object.keys(grouped).forEach(group => {
          expanded[group] = true;
        });
        setExpandedGroups(expanded);
        
        // 设置默认筛选条件，为每个筛选器选择第一个值
        if (cycles.length > 0 && years.length > 0 && periods.length > 0) {
          setSelectedFilters({
            cycle: cycles[0],
            year: years[0],
            period: periods[0]
          });
        }
        
      } catch (error) {
        console.error("加载排行榜配置数据失败:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadRankingData();
  }, [dataSource]);
  
  // 处理筛选器变化
  const handleFilterChange = (value, type) => {
    // 更新筛选条件
    setSelectedFilters(prev => ({
      ...prev,
      [type]: value
    }));
    
    // 当筛选器变化时，清空已选中的排行榜
    setCheckedRankings([]);
  };
  
  // 处理分组展开/折叠
  const toggleGroup = (group) => {
    setExpandedGroups(prev => ({
      ...prev,
      [group]: !prev[group]
    }));
  };
  
  // 处理排行榜选择变化
  const handleRankingCheck = (e, ranking) => {
    const checked = e.target.checked;
    
    setCheckedRankings(prev => {
      if (checked) {
        return [...prev, ranking];
      } else {
        return prev.filter(item => item.uniqueKey !== ranking.uniqueKey);
      }
    });
  };
  
  // 根据筛选条件过滤排行榜
  const filteredRankingGroups = {};
  Object.keys(groupedRankings).forEach(group => {
    const items = groupedRankings[group].filter(item => 
      (!selectedFilters.cycle || item.cycle === selectedFilters.cycle) &&
      (!selectedFilters.year || item.year === selectedFilters.year) &&
      (!selectedFilters.period || item.period === selectedFilters.period)
    );
    
    if (items.length > 0) {
      filteredRankingGroups[group] = items;
    }
  });
  
  // 调试：输出筛选后的分组结果
  console.log("筛选条件:", selectedFilters);
  console.log("筛选前的分组数量:", Object.keys(groupedRankings).length);
  console.log("筛选前的分组:", Object.keys(groupedRankings));
  console.log("筛选后的分组数量:", Object.keys(filteredRankingGroups).length);
  console.log("筛选后的分组:", Object.keys(filteredRankingGroups));
  Object.keys(filteredRankingGroups).forEach(group => {
    console.log(`筛选后分组 "${group}" 包含的排行榜数量: ${filteredRankingGroups[group].length}`);
  });
  
  return (
    <div className="ranking-page">
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
        
        <div className="ranking-content">
          {/* 左侧区域 - 筛选器和分组列表 */}
          <div className="ranking-sidebar-container">
            {/* 筛选器区域 */}
            <div className="ranking-filters">
              <Row>
                <Col span={24}>
                  <div className="filter-item">
                    <span className="filter-label">排行周期</span>
                    <Select 
                      style={{ width: '200px', height: '30px' }} 
                      placeholder="选择排行周期"
                      value={selectedFilters.cycle || undefined}
                      onChange={(value) => handleFilterChange(value, 'cycle')}
                    >
                      {filterOptions.cycles.map(cycle => (
                        <Option key={cycle} value={cycle}>{cycle}</Option>
                      ))}
                    </Select>
                  </div>
                </Col>
                <Col span={24}>
                  <div className="filter-item">
                    <span className="filter-label">年份</span>
                    <Select 
                      style={{ width: '200px', height: '30px' }} 
                      placeholder="选择年份"
                      value={selectedFilters.year || undefined}
                      onChange={(value) => handleFilterChange(value, 'year')}
                    >
                      {filterOptions.years.map(year => (
                        <Option key={year} value={year}>{year}</Option>
                      ))}
                    </Select>
                  </div>
                </Col>
                <Col span={24}>
                  <div className="filter-item">
                    <span className="filter-label">所在周期</span>
                    <Select 
                      style={{ width: '200px', height: '30px' }} 
                      placeholder="选择所在周期"
                      value={selectedFilters.period || undefined}
                      onChange={(value) => handleFilterChange(value, 'period')}
                    >
                      {filterOptions.periods.map(period => (
                        <Option key={period} value={period}>{period}</Option>
                      ))}
                    </Select>
                  </div>
                </Col>
              </Row>
            </div>
            
            {/* 分组和排行榜列表 */}
            <div className="ranking-sidebar">
              <div className="group-count-info">
                找到 {Object.keys(filteredRankingGroups).length} 个分组
              </div>
              
              {Object.keys(filteredRankingGroups).length > 0 ? (
                Object.keys(filteredRankingGroups).map(group => (
                  <div key={group} className="ranking-group">
                    <div className="group-header" onClick={() => toggleGroup(group)}>
                      {expandedGroups[group] ? <DownOutlined /> : <RightOutlined />}
                      <span className="group-title">{group}</span>
                      <span className="group-count">({filteredRankingGroups[group].length})</span>
                    </div>
                    
                    {expandedGroups[group] && (
                      <div className="group-content">
                        {filteredRankingGroups[group].map(ranking => (
                          <div key={ranking.uniqueKey} className="ranking-item">
                            <Checkbox 
                              className="ranking-item-checkbox"
                              checked={checkedRankings.some(item => item.uniqueKey === ranking.uniqueKey)}
                              onChange={(e) => handleRankingCheck(e, ranking)}
                            />
                            <span className="ranking-item-label">
                              {ranking.title}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="no-rankings-message">没有符合条件的排行榜</div>
              )}
            </div>
          </div>
          
          {/* 右侧排行榜显示区域 */}
          <div className="ranking-display">
            {checkedRankings.length > 0 ? (
              <div className="rankings-container">
                {checkedRankings.map(ranking => (
                  <div key={ranking.uniqueKey} className="ranking-wrapper">
                    <RankingDataLoader 
                      dataSource={dataSource}
                      type="csv"
                      row={parseInt(ranking.rowIndex, 10)}
                      subtitle={ranking.subtitle} // 传递正确的子标题（第四列）
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="ranking-display-empty">
                请从左侧选择要显示的排行榜
              </div>
            )}
          </div>
        </div>
        
      </Card>
    </div>
  );
};

export default RankingPage; 