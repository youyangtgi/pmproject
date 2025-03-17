import React, { useState, useEffect } from 'react';
import Ranking from './Ranking.js';

// 读取 JSON 文件
const readJSON = async (file) => {
  try {
    console.log("尝试加载JSON:", file);
    const response = await fetch(file);
    return await response.json();
  } catch (error) {
    console.error("JSON加载错误:", error, "文件路径:", file);
    throw error;
  }
};

// 将简单CSV转换为复杂结构 - 完全重写
const convertCSVToRankingData = (csvData) => {
  // 解析CSV数据
  const lines = csvData.trim().split('\n');
  const headers = lines[0].split(',');
  
  console.log("CSV原始头部:", headers);
  console.log("CSV原始数据示例:", lines[1]);
  
  // 从第一行数据中提取配置信息
  const firstDataRow = lines[1]?.split(',') || [];
  const title = firstDataRow[0] || '排行榜';
  const month = firstDataRow[1] || '3月';
  const rankTotal = parseInt(firstDataRow[2] || '5', 10);
  const rankSubTitle = firstDataRow[3] || `${month}数据`;
  
  // 提取用于展示的5列数据 (索引4-8对应CSV的第5-9列)
  const col1Header = headers[4] || '战队名称';  // CSV第5列作为排行榜第1列
  const col2Header = headers[5] || '战队队长';  // CSV第6列作为排行榜第2列
  const col3Header = headers[6] || '归属';     // CSV第7列作为排行榜第3列
  const col4Header = headers[7] || '人数';     // CSV第8列作为排行榜第4列
  const col5Header = headers[8] || '得分';     // CSV第9列作为排行榜第5列
  
  console.log("排行榜5列表头:", col1Header, col2Header, col3Header, col4Header, col5Header);
  
  // 创建B-E列的表头数据
  const dataTypes = [
    { id: 1, type_name: col2Header }, // 第2列
    { id: 2, type_name: col3Header }, // 第3列
    { id: 3, type_name: col4Header }, // 第4列
    { id: 4, type_name: col5Header }  // 第5列
  ];
  
  // 创建排行榜数据
  const details = {};
  lines.slice(1).forEach((line, index) => {
    const values = line.split(',');
    
    // 确保行数据至少有9列
    if (values.length < 9) {
      console.log("跳过不完整行:", values);
      return;
    }
    
    const rank = index + 1;
    
    // 提取每行的5列数据
    const col1Value = values[4] || '';  // CSV第5列值作为排行榜第1列值
    const col2Value = values[5] || '';  // CSV第6列值作为排行榜第2列值
    const col3Value = values[6] || '';  // CSV第7列值作为排行榜第3列值
    const col4Value = values[7] || '';  // CSV第8列值作为排行榜第4列值
    const col5Value = values[8] || '';  // CSV第9列值作为排行榜第5列值
    
    console.log(`第${rank}行排行榜数据:`, col1Value, col2Value, col3Value, col4Value, col5Value);
    
    // 创建B-E列的值数组
    const dataValues = [
      { id: 1, data_value: col2Value }, // 第2列值
      { id: 2, data_value: col3Value }, // 第3列值
      { id: 3, data_value: col4Value }, // 第4列值
      { id: 4, data_value: col5Value }  // 第5列值
    ];
    
    // 创建排行榜条目
    details[`rank${rank}`] = [
      {
        id: 1000 + rank,
        user_name: col1Value, // 第1列值(战队名称)
        data_values: dataValues
      }
    ];
  });
  
  // 检查生成的details对象是否为空
  if (Object.keys(details).length === 0) {
    console.error("警告: 生成的排行榜数据为空!");
    console.log("CSV数据行数:", lines.length);
    console.log("CSV第一行:", lines[0]);
    console.log("CSV第二行:", lines[1]);
  }
  
  // 构建最终数据结构
  const result = {
    rank_title: title,
    rank_sub_title: rankSubTitle,
    rank_total: rankTotal,
    project: {
      project: "",
      month: {
        month: month
      }
    },
    data_types: dataTypes,  // 第2-5列的表头
    team_name: col1Header,  // 第1列表头(战队名称)
    details: details
  };
  
  console.log("生成的排行榜数据结构:", result);
  return result;
};

// 从CSV读取数据并转换
const readCSV = async (file) => {
  try {
    console.log("尝试加载CSV文件:", file);
    const response = await fetch(file);
    
    if (!response.ok) {
      console.error("CSV文件加载失败:", response.status, response.statusText);
      throw new Error(`CSV加载失败: ${response.status} ${response.statusText}`);
    }
    
    const text = await response.text();
    console.log("CSV文件加载成功, 内容长度:", text.length);
    console.log("CSV前200字符:", text.substring(0, 200));
    
    if (!text || text.trim().length === 0) {
      console.error("警告: 加载的CSV内容为空!");
      throw new Error("CSV内容为空");
    }
    
    return convertCSVToRankingData(text);
  } catch (error) {
    console.error("CSV读取或解析错误:", error);
    throw error;
  }
};

const RankingDataLoader = ({ 
  dataSource,
  type = 'csv' // 默认为csv
}) => {
  const [rankingData, setRankingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        let data;
        
        console.log("加载数据源:", dataSource, "类型:", type);
        
        if (type === 'csv') {
          data = await readCSV(dataSource);
        } else {
          data = await readJSON(dataSource);
        }
        
        console.log("最终排行榜数据结构:", JSON.stringify(data, null, 2));
        setRankingData(data);
      } catch (err) {
        console.error("加载排行榜数据失败:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [dataSource, type]);
  
  if (loading) return <div>加载中...</div>;
  if (error) return <div>加载失败: {error}</div>;
  if (!rankingData) return <div>无数据</div>;
  
  return <Ranking rankingData={rankingData} />;
};

export default RankingDataLoader;