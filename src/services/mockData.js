// 模拟用户数据
export const currentUser = {
  id: '1',
  name: '李雷',
  avatar: null,
  department: '研发部',
  role: '前端开发'
};

// 模拟团队成就数据
export const teamAchievements = [
  {
    id: 1,
    title: '团队亮点',
    days: '2',
    description: 'EM核心功能连代项目提前2天完成M3里程碑，表现优异！',
    user: { name: '李丽', color: '#9254DE' },
    time: '昨天 18:20'
  },
  {
    id: 2,
    title: '效率提升',
    days: '5',
    description: '产品发布流程优化项目提前5天完成，节省团队30%的工作时间',
    user: { name: '张伟', color: '#5AD8A6' },
    time: '3天前 09:15'
  },
  {
    id: 3,
    title: '质量改进',
    days: '1',
    description: 'Bug修复速度提升15%，用户满意度增长8个百分点',
    user: { name: '王芳', color: '#F6BD16' },
    time: '上周五 15:40'
  }
];

// 模拟团队进度数据
export const teamProgress = [
  {
    id: 1, 
    name: '数据团队', 
    progress: '2',
    description: '数据分析效率提升70%，决策准确率提高45%'
  },
  {
    id: 2, 
    name: '算法团队', 
    progress: '3',
    description: '新算法上线后，系统响应速度提升30%，用户体验大幅优化'
  },
  {
    id: 3, 
    name: '前端团队', 
    progress: '1',
    description: '新UI框架应用，开发效率提升50%，代码复用率提高40%'
  },
  {
    id: 4, 
    name: '运维团队', 
    progress: '2',
    description: '系统稳定性提升，宕机时间减少80%，服务可用性达到99.9%'
  }
];

// 模拟个人成就数据
export const personalStats = {
  growthPoints: '+0.2',
  completedTasks: 7,
  ranking: 5,
  daysStreak: 2
};

// 模拟团队排行数据
export const teamRanking = [
  {
    id: 1,
    name: '数据中台项目',
    time: '2024-03-10 更新',
    increase: '+7%'
  },
  {
    id: 2,
    name: '用户增长项目',
    time: '2024-03-09 更新',
    increase: '+5%'
  },
  {
    id: 3,
    name: '算法优化项目',
    time: '2024-03-08 更新',
    increase: '+8%'
  },
  {
    id: 4,
    name: '前端重构项目',
    time: '2024-03-07 更新',
    increase: '+4%'
  },
  {
    id: 5,
    name: '基础设施升级',
    time: '2024-03-06 更新',
    increase: '+6%'
  }
];

// 模拟月度荣誉数据
export const monthlyHonors = [
  {
    id: 1,
    avatar: null,
    name: '李明',
    dept: '数据部',
    rank: '第1名'
  },
  {
    id: 2,
    avatar: null,
    name: '王红',
    dept: '产品部',
    rank: '第2名'
  },
  {
    id: 3,
    avatar: null,
    name: '张伟',
    dept: '研发部',
    rank: '第3名'
  },
  {
    id: 4,
    avatar: null,
    name: '赵阳',
    dept: '设计部',
    rank: '第4名'
  },
  {
    id: 5,
    avatar: null,
    name: '刘芳',
    dept: '运营部',
    rank: '第5名'
  }
];

// 模拟战队成果数据
export const teamAchievementsData = [
  {
    id: 1,
    teamName: '飞鹰战队',
    achievement: 'CPI降低$0.5',
    points: 2,
    date: '2023-10-15',
    user: { name: '李明', color: '#1677FF' }
  },
  {
    id: 2,
    teamName: '雄狮战队',
    achievement: '1m rev/install 提升20%',
    points: 3,
    date: '2023-10-14',
    user: { name: '张伟', color: '#722ED1' }
  },
  {
    id: 3,
    teamName: '猎豹战队',
    achievement: '大R体验 QS分差提升0.5',
    points: 1,
    date: '2023-10-13',
    user: { name: '王芳', color: '#13C2C2' }
  },
  {
    id: 4,
    teamName: '雄鹰战队',
    achievement: '用户留存率提升15%',
    points: 3,
    date: '2023-10-12',
    user: { name: '赵强', color: '#FA8C16' }
  },
  {
    id: 5,
    teamName: '火箭战队',
    achievement: '广告点击率提升22%',
    points: 2,
    date: '2023-10-11',
    user: { name: '陈红', color: '#EB2F96' }
  },
  {
    id: 6,
    teamName: '闪电战队',
    achievement: '页面加载速度提升40%',
    points: 1,
    date: '2023-10-10',
    user: { name: '刘洋', color: '#52C41A' }
  },
  {
    id: 7,
    teamName: '钢铁战队',
    achievement: '系统稳定性提升25%',
    points: 2,
    date: '2023-10-09',
    user: { name: '孙明', color: '#2F54EB' }
  },
  {
    id: 8,
    teamName: '星辰战队',
    achievement: '新用户注册转化率提升18%',
    points: 3, 
    date: '2023-10-08',
    user: { name: '周琳', color: '#FF4D4F' }
  },
  {
    id: 9,
    teamName: '猛虎战队',
    achievement: '客服响应时间降低45%',
    points: 1,
    date: '2023-10-07', 
    user: { name: '吴刚', color: '#9254DE' }
  },
  {
    id: 10,
    teamName: '神鹰战队',
    achievement: '应用崩溃率降低60%',
    points: 2,
    date: '2023-10-06',
    user: { name: '郑华', color: '#FF7A45' }
  }
];

// 动态获取当前日期
export const getCurrentDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const date = now.getDate();
  const day = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'][now.getDay()];
  
  return {
    formattedDate: `${year}年${month}月${date}日`,
    day
  };
};

// 导航菜单数据
export const menuItems = [
  {
    key: 'home',
    label: '主页',
    icon: 'HomeOutlined'
  },
  {
    key: 'calendar',
    label: '日程安排',
    icon: 'CalendarOutlined'
  },
  {
    key: 'projects',
    label: '项目管理',
    icon: 'ProjectOutlined'
  },
  {
    key: 'team',
    label: '团队协作',
    icon: 'TeamOutlined'
  },
  {
    key: 'reports',
    label: '数据报表',
    icon: 'BarChartOutlined'
  },
  {
    key: 'messages',
    label: '消息中心',
    icon: 'MessageOutlined'
  },
  {
    key: 'user',
    label: '个人中心',
    icon: 'UserOutlined'
  },
  {
    key: 'settings',
    label: '系统设置',
    icon: 'SettingOutlined'
  }
]; 