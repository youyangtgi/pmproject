import axios from 'axios';
import { 
  teamAchievements, 
  teamProgress, 
  personalStats, 
  teamRanking, 
  monthlyHonors, 
  currentUser,
  teamData, 
  personalStatsData, 
  teamRankingData, 
  monthlyHonorsData,
  teamAchievementsData
} from './mockData';

// 创建axios实例
const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    // 在请求发送前处理，比如添加token等
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
api.interceptors.response.use(
  (response) => {
    // 对响应数据进行处理
    return response.data;
  },
  (error) => {
    // 处理响应错误
    if (error.response) {
      // 服务器返回错误状态码
      console.error('API Error:', error.response.data);
    } else if (error.request) {
      // 请求发送成功但未收到响应
      console.error('Network Error:', error.request);
    } else {
      // 请求配置错误
      console.error('Request Error:', error.message);
    }
    return Promise.reject(error);
  }
);

// 模拟API函数，在没有实际后端情况下返回模拟数据
export const fetchCurrentUser = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(currentUser);
    }, 300);
  });
};

export const fetchTeamAchievements = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(teamAchievements);
    }, 300);
  });
};

export const fetchTeamProgress = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(teamProgress);
    }, 300);
  });
};

export const fetchPersonalStats = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(personalStats);
    }, 300);
  });
};

export const fetchTeamRanking = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(teamRanking);
    }, 300);
  });
};

export const fetchMonthlyHonors = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(monthlyHonors);
    }, 300);
  });
};

// 如果连接实际后端，可以使用以下函数
// export const fetchCurrentUser = () => api.get('/user/current');
// export const fetchTeamAchievements = () => api.get('/team/achievements');
// export const fetchTeamProgress = () => api.get('/team/progress');
// export const fetchPersonalStats = () => api.get('/user/stats');
// export const fetchTeamRanking = () => api.get('/team/ranking');
// export const fetchMonthlyHonors = () => api.get('/honors/monthly');

// 导出战队成果数据，在其他组件中直接使用
export { teamAchievementsData };

export default api; 