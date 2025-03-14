import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Typography, List, Avatar, Spin } from 'antd';
import { 
  StarOutlined, 
  TrophyOutlined, 
  FireOutlined, 
  RightOutlined 
} from '@ant-design/icons';
import TeamProgressCard from '../components/TeamProgressCard';
import AchievementNotification from '../components/AchievementNotification';
import CelebrationEffect from '../components/CelebrationEffect';
import TeamMarquee from '../components/TeamMarquee';
import ContributionDisplay from '../components/ContributionDisplay';
import { 
  fetchTeamProgress, 
  fetchPersonalStats, 
  fetchTeamRanking, 
  fetchMonthlyHonors,
  teamAchievementsData 
} from '../services/api';

const { Text, Title } = Typography;

// 模拟用户获得的成就数据
const userAchievements = [
  {
    id: 1,
    description: 'CPI降低$0.5',
    points: 2
  },
  {
    id: 2,
    description: '1m rev/install 提升20%',
    points: 3
  },
  {
    id: 3,
    description: '大R体验 QS分差提升0.5',
    points: 1
  }
];

const Dashboard = () => {
  const [teamProgress, setTeamProgress] = useState([]);
  const [personalStats, setPersonalStats] = useState({
    growthPoints: '',
    completedTasks: 0,
    ranking: 0,
    daysStreak: 0
  });
  const [teamRanking, setTeamRanking] = useState([]);
  const [monthlyHonors, setMonthlyHonors] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // 通知相关状态
  const [showNotification, setShowNotification] = useState(false);
  const [currentAchievementIndex, setCurrentAchievementIndex] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationLevel, setCelebrationLevel] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          progressData,
          statsData,
          rankingData,
          honorsData
        ] = await Promise.all([
          fetchTeamProgress(),
          fetchPersonalStats(),
          fetchTeamRanking(),
          fetchMonthlyHonors()
        ]);

        setTeamProgress(progressData);
        setPersonalStats(statsData);
        setTeamRanking(rankingData);
        setMonthlyHonors(honorsData);
        setLoading(false);
        
        // 数据加载完成后，显示第一个通知
        setTimeout(() => {
          if (userAchievements.length > 0) {
            setShowNotification(true);
          }
        }, 1000);
      } catch (error) {
        console.error('获取数据失败:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  
  // 处理"领取贡献分"按钮点击事件
  const handleNextAchievement = () => {
    // 当前成就的庆祝效果
    const currentAchievement = userAchievements[currentAchievementIndex];
    setCelebrationLevel(currentAchievement.points);
    setShowCelebration(true);
    
    // 隐藏当前通知
    setShowNotification(false);
    
    // 延迟后显示下一个通知或结束通知流程
    setTimeout(() => {
      setShowCelebration(false);
      
      if (currentAchievementIndex < userAchievements.length - 1) {
        setCurrentAchievementIndex(currentAchievementIndex + 1);
        setShowNotification(true);
      }
    }, 3000); // 庆祝效果持续3秒
  };

  // 生成不同背景色的头像
  const getAvatarColor = (index) => {
    const colors = ['#722ED1', '#13C2C2', '#1677FF', '#FA8C16', '#EB2F96'];
    return colors[index % colors.length];
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 112px)' }}>
        <Spin size="large" tip="加载中..." />
      </div>
    );
  }

  return (
    <div className="dashboard-container" style={{ padding: '16px 24px', backgroundColor: '#F0F2F5' }}>
      {/* 成就通知 */}
      {showNotification && (
        <AchievementNotification
          visible={showNotification}
          achievement={userAchievements[currentAchievementIndex]}
          onNext={handleNextAchievement}
        />
      )}
      
      {/* 庆祝效果 */}
      {showCelebration && (
        <CelebrationEffect level={celebrationLevel} />
      )}
      
      {/* 贡献分显示 */}
      <ContributionDisplay />
      
      {/* 战队成果走马灯 */}
      <TeamMarquee achievements={teamAchievementsData} />
      
      {/* 个人成就部分 */}
      <div style={{ marginBottom: '24px' }}>
        <Title level={4} style={{ marginBottom: '16px' }}>我的成就</Title>
        <Row gutter={16}>
          <Col span={6}>
            <Card
              bordered={false}
              className="stat-card"
              style={{ 
                height: '160px', 
                padding: '0', 
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div style={{ 
                fontSize: '15px', 
                color: '#666', 
                padding: '12px 16px',
                borderBottom: '1px solid #f0f0f0',
                backgroundColor: '#fafafa'
              }}>
                您的DSP今日提升了
              </div>
              <div style={{ 
                flex: 1, 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center',
                alignItems: 'center',
                padding: '12px 16px'
              }}>
                <Text style={{ fontSize: '28px', fontWeight: 'bold', color: '#52C41A', marginBottom: '8px' }}>
                  {personalStats.growthPoints}
                  <span style={{ marginLeft: '4px', fontSize: '18px' }}>↑</span>
                </Text>
                <div style={{ fontSize: '13px', color: '#999', textAlign: 'center', lineHeight: '1.4' }}>
                  较昨日上涨10%，持续进步中
                </div>
              </div>
            </Card>
          </Col>
          
          <Col span={6}>
            <Card
              bordered={false}
              className="stat-card"
              style={{ 
                height: '160px', 
                padding: '0', 
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div style={{ 
                fontSize: '15px', 
                color: '#666', 
                padding: '12px 16px',
                borderBottom: '1px solid #f0f0f0',
                backgroundColor: '#fafafa'
              }}>
                您本周完成任务
              </div>
              <div style={{ 
                flex: 1, 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center',
                alignItems: 'center',
                padding: '12px 16px'
              }}>
                <Text style={{ fontSize: '28px', fontWeight: 'bold', color: '#1677FF', marginBottom: '8px' }}>
                  {personalStats.completedTasks}
                  <StarOutlined style={{ fontSize: '18px', marginLeft: '4px' }} />
                </Text>
                <div style={{ fontSize: '13px', color: '#999', textAlign: 'center', lineHeight: '1.4' }}>
                  完成率达91%，超过团队平均水平
                </div>
              </div>
            </Card>
          </Col>
          
          <Col span={6}>
            <Card
              bordered={false}
              className="stat-card"
              style={{ 
                height: '160px', 
                padding: '0', 
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div style={{ 
                fontSize: '15px', 
                color: '#666', 
                padding: '12px 16px',
                borderBottom: '1px solid #f0f0f0',
                backgroundColor: '#fafafa'
              }}>
                您在团队中排名第
              </div>
              <div style={{ 
                flex: 1, 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center',
                alignItems: 'center',
                padding: '12px 16px'
              }}>
                <Text style={{ fontSize: '28px', fontWeight: 'bold', color: '#722ED1', marginBottom: '8px' }}>
                  {personalStats.ranking}
                  <TrophyOutlined style={{ fontSize: '18px', marginLeft: '4px' }} />
                </Text>
                <div style={{ fontSize: '13px', color: '#999', textAlign: 'center', lineHeight: '1.4' }}>
                  超过68%的团队成员，继续加油！
                </div>
              </div>
            </Card>
          </Col>
          
          <Col span={6}>
            <Card
              bordered={false}
              className="stat-card"
              style={{ 
                height: '160px', 
                padding: '0', 
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div style={{ 
                fontSize: '15px', 
                color: '#666', 
                padding: '12px 16px',
                borderBottom: '1px solid #f0f0f0',
                backgroundColor: '#fafafa'
              }}>
                您已连续提交日报
              </div>
              <div style={{ 
                flex: 1, 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center',
                alignItems: 'center',
                padding: '12px 16px'
              }}>
                <Text style={{ fontSize: '28px', fontWeight: 'bold', color: '#FA8C16', marginBottom: '8px' }}>
                  {personalStats.daysStreak}
                  <span style={{ marginLeft: '4px', fontSize: '18px' }}>天</span>
                  <FireOutlined style={{ fontSize: '18px', marginLeft: '4px' }} />
                </Text>
                <div style={{ fontSize: '13px', color: '#999', textAlign: 'center', lineHeight: '1.4' }}>
                  继续保持，即将获得额外积分奖励
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
      
      {/* 团队动态与排行榜 */}
      <Row gutter={16} style={{ marginBottom: '24px' }}>
        <Col span={16}>
          <Card
            title="团队进度"
            style={{ height: '100%' }}
            extra={<a href="#more" style={{ color: '#1677FF', fontSize: '13px' }}>查看更多</a>}
          >
            {teamProgress.map(team => (
              <TeamProgressCard key={team.id} team={team} />
            ))}
          </Card>
        </Col>
        
        <Col span={8}>
          <Card
            title="团队排行榜"
            style={{ height: '100%' }}
            extra={<a href="#more" style={{ color: '#1677FF', fontSize: '13px' }}>查看更多</a>}
          >
            <List
              dataSource={teamRanking}
              renderItem={(item, index) => (
                <List.Item 
                  key={item.id}
                  style={{ 
                    padding: '12px 0', 
                    borderBottom: index === teamRanking.length - 1 ? 'none' : '1px solid #f0f0f0'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '4px' }}>
                        <span style={{ 
                          display: 'inline-block', 
                          width: '20px', 
                          height: '20px', 
                          lineHeight: '20px', 
                          textAlign: 'center', 
                          backgroundColor: index < 3 ? '#3370FF' : '#E5E5E5', 
                          color: index < 3 ? 'white' : '#666',
                          borderRadius: '4px',
                          marginRight: '8px',
                          fontSize: '12px'
                        }}>
                          {index + 1}
                        </span>
                        {item.name}
                      </div>
                      <div style={{ fontSize: '12px', color: '#999' }}>
                        {item.time}
                      </div>
                    </div>
                    <div style={{ color: '#52C41A', fontWeight: 'bold' }}>
                      {item.increase}
                    </div>
                  </div>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
      
      {/* 本月荣誉战绩 */}
      <Card
        title="本月荣誉战绩"
        extra={<a href="#more" style={{ color: '#1677FF', fontSize: '13px' }}>查看更多 <RightOutlined style={{ fontSize: '10px' }} /></a>}
      >
        <List
          grid={{ gutter: 16, column: 5 }}
          dataSource={monthlyHonors}
          renderItem={(item, index) => (
            <List.Item key={item.id}>
              <div style={{ textAlign: 'center' }}>
                <Avatar
                  size={64}
                  style={{ backgroundColor: getAvatarColor(index), marginBottom: '12px' }}
                >
                  {item.name.slice(0, 1)}
                </Avatar>
                <div style={{ fontWeight: 'bold', fontSize: '15px', marginBottom: '4px' }}>
                  {item.name}
                </div>
                <div style={{ color: '#666', fontSize: '13px', marginBottom: '4px' }}>
                  {item.dept}
                </div>
                <div style={{ color: '#ff6b45', fontSize: '14px', fontWeight: 'bold' }}>
                  {item.rank}
                </div>
              </div>
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default Dashboard; 