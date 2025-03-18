import React, { useState, useEffect } from 'react';
import Ranking from './Ranking.js';

// 读取 JSON 文件
const readJSON = async (file) => {
  try {
    console.log("尝试加载JSON:", file);
    const response = await fetch(file);
    if (!response.ok) {
      throw new Error(`HTTP错误! 状态码: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("JSON加载错误:", error, "文件路径:", file);
    throw error;
  }
};

// 将简单CSV转换为复杂结构 - 完全重写
const convertCSVToRankingData = (csvData, allData, subtitle) => {
  // 解析CSV数据，处理不同操作系统的换行符
  const lines = csvData.trim().split(/\r?\n/).filter(line => line.trim());
  const headers = lines[0].split(',');
  
  console.log("CSV原始头部:", headers);
  if (lines.length > 1) {
    console.log("CSV原始数据示例:", lines[1]);
  }
  
  // 从第一行数据中提取配置信息
  const firstDataRow = lines[1]?.split(',') || [];
  const title = firstDataRow[0] || '排行榜';
  const month = firstDataRow[1] || '3月';
  const rankTotal = parseInt(firstDataRow[2] || '5', 10);
  const rankSubTitle = subtitle || firstDataRow[3] || `${month}数据`;
  
  // 仅使用子标题，不再添加额外信息
  const fullSubTitle = rankSubTitle;
  
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
    rank_sub_title: fullSubTitle,
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

// 读取 CSV 文件
const readCSV = async (file) => {
  try {
    console.log("尝试加载CSV文件:", file);
    const response = await fetch(file);
    if (!response.ok) {
      console.error(`CSV加载HTTP错误! 状态码: ${response.status}`);
      throw new Error(`无法加载CSV文件: ${file}, 状态码: ${response.status}`);
    }
    return await response.text();
  } catch (error) {
    console.error("CSV加载错误:", error, "文件路径:", file);
    // 在GitHub Pages环境中，尝试使用备用路径
    if (window.location.hostname.includes('github.io')) {
      try {
        console.log("尝试使用备用路径加载CSV...");
        // 尝试不同的路径组合
        const alternativePath = file.replace(process.env.PUBLIC_URL, '');
        console.log("尝试备用路径:", alternativePath);
        const response = await fetch(alternativePath);
        if (!response.ok) {
          throw new Error(`备用路径也失败了: ${alternativePath}`);
        }
        console.log("备用路径成功!");
        return await response.text();
      } catch (backupError) {
        console.error("备用CSV加载也失败:", backupError);
        throw error; // 仍然抛出原始错误
      }
    } else {
      throw error;
    }
  }
};

const RankingDataLoader = ({ 
  dataSource,
  type = 'csv', // 默认为csv
  row, // 用于指定加载特定行的数据
  subtitle // 新增参数，接收自定义子标题
}) => {
  const [rankingData, setRankingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        console.log("加载数据源:", dataSource, "类型:", type, "行号:", row, "子标题:", subtitle);
        
        // 在GitHub Pages环境下可能需要特殊处理
        const isGitHubPages = window.location.hostname.includes('github.io');
        console.log("是否在GitHub Pages环境:", isGitHubPages);
        
        let rawData;
        if (type === 'csv') {
          rawData = await readCSV(dataSource);
          console.log("CSV文件加载成功, 内容长度:", rawData.length);
          console.log("CSV前200字符:", rawData.substring(0, 200));
          
          if (!rawData || rawData.trim().length === 0) {
            console.error("警告: 加载的CSV内容为空!");
            throw new Error("CSV内容为空");
          }
          
          // 解析CSV数据
          const lines = rawData.trim().split(/\r?\n/).filter(line => line.trim());
          const headers = lines[0].split(',');
          
          // 如果指定了行号，加载整个排行榜数据
          let csvData;
          if (row !== undefined && row > 0 && row < lines.length) {
            // 获取当前行的排行榜标题和其他筛选条件
            const currentLine = lines[row];
            const values = currentLine.split(',');
            const rankingTitle = values[0];
            const cycle = values[9] || '';
            const year = values[10] || '';
            const period = values[11] || '';
            const group = values[12] || '';
            
            // 找出所有具有相同标题和筛选条件的行
            let matchingRows = [];
            for (let i = 1; i < lines.length; i++) {
              const lineValues = lines[i].split(',');
              if (lineValues[0] === rankingTitle &&
                  lineValues[9] === cycle && 
                  lineValues[10] === year && 
                  lineValues[11] === period &&
                  lineValues[12] === group) {
                matchingRows.push(i);
              }
            }
            
            // 创建只包含标题行和排行榜数据行的CSV
            let filteredCsv = lines[0] + '\n';
            matchingRows.forEach(rowIdx => {
              filteredCsv += lines[rowIdx] + '\n';
            });
            
            csvData = filteredCsv.trim();
            console.log(`加载排行榜"${rankingTitle}"的${matchingRows.length}行数据`);
          } else {
            csvData = rawData;
          }
          
          // 转换CSV数据为排行榜格式，传入自定义子标题
          const rankData = convertCSVToRankingData(csvData, rawData, subtitle);
          setRankingData(rankData);
        } else if (type === 'json') {
          rawData = await readJSON(dataSource);
          setRankingData(rawData);
        }
        
      } catch (err) {
        console.error("加载排行榜数据失败:", err);
        setError(err.message);
        
        // 如果加载失败，显示一些调试信息
        if (window.location.hostname.includes('github.io')) {
          console.log("GitHub Pages环境加载失败，尝试显示更多调试信息:");
          console.log("- URL:", window.location.href);
          console.log("- PUBLIC_URL:", process.env.PUBLIC_URL);
          console.log("- 尝试的数据源路径:", dataSource);
          console.log("- 行号:", row);
          console.log("- 子标题:", subtitle);
        }
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [dataSource, type, row, subtitle]);
  
  if (loading) return <div>加载中...</div>;
  if (error) return <div>加载失败: {error}</div>;
  if (!rankingData) return <div>无数据</div>;
  
  return <Ranking rankingData={rankingData} />;
};

export default RankingDataLoader;