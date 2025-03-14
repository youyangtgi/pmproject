import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';

const CelebrationEffect = ({ level }) => {
  useEffect(() => {
    // 根据等级执行不同强度的特效
    switch(level) {
      case 1: // 轻度庆祝
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
        break;
      case 2: // 中度庆祝
        confetti({
          particleCount: 200,
          spread: 100,
          origin: { y: 0.6 }
        });
        
        // 延迟一秒后再来一次
        setTimeout(() => {
          confetti({
            particleCount: 150,
            spread: 80,
            origin: { y: 0.7 }
          });
        }, 1000);
        break;
      case 3: // 重度庆祝
        // 学校风格庆祝
        const duration = 5 * 1000;
        const end = Date.now() + duration;
        
        const frame = () => {
          confetti({
            particleCount: 50,
            angle: 60,
            spread: 55,
            origin: { x: 0, y: 0.65 }
          });
          
          confetti({
            particleCount: 50,
            angle: 120,
            spread: 55,
            origin: { x: 1, y: 0.65 }
          });
          
          if (Date.now() < end) {
            requestAnimationFrame(frame);
          }
        };
        
        frame();
        break;
      default:
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
    }
  }, [level]);
  
  // 不再返回canvas元素，让canvas-confetti自己创建和管理canvas
  return null;
};

export default CelebrationEffect; 