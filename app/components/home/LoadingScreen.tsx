'use client';

import { useState } from 'react';
import Image from 'next/image';
import { GiElephant } from 'react-icons/gi';
import { colors } from '@/app/lib/design-tokens';

interface LoadingScreenProps {
  progress: number;
}

export function LoadingScreen({ progress }: LoadingScreenProps) {
  const [logoError, setLogoError] = useState(false);

  return (
    <div className="loading-screen">
      {/* Logo 动画 */}
      <div className="logo-container">
        {!logoError ? (
          <Image 
            src="/derek-logo.png" 
            alt="Loading" 
            className="logo-image"
            width={140}
            height={140}
            onError={() => setLogoError(true)} 
          />
        ) : (
          <GiElephant size="6rem" color={colors.primary.DEFAULT} />
        )}
        {/* 光圈效果 */}
        <div className="glow-ring" />
      </div>

      {/* 进度条 */}
      <div className="progress-container">
        <div className="progress-bar-bg">
          <div 
            className="progress-bar-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="progress-text">
          戰情加載中 {progress}%
        </div>
      </div>

      <style jsx>{`
        .loading-screen {
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background-color: ${colors.white};
          gap: 2.5rem;
        }

        .logo-container {
          width: 140px;
          height: 140px;
          animation: pulse 2s infinite ease-in-out;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
        }

        .logo-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .glow-ring {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: 2px solid ${colors.primary.DEFAULT};
          animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
          opacity: 0.5;
        }

        .progress-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .progress-bar-bg {
          width: 280px;
          height: 6px;
          background-color: #f0f0f0;
          border-radius: 10px;
          overflow: hidden;
        }

        .progress-bar-fill {
          height: 100%;
          background-color: ${colors.primary.DEFAULT};
          transition: width 0.4s ease-out;
          box-shadow: 0 0 10px ${colors.primary.DEFAULT};
        }

        .progress-text {
          color: ${colors.secondary.DEFAULT};
          font-weight: 900;
          font-size: 1.1rem;
          letter-spacing: 4px;
          text-transform: uppercase;
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            filter: drop-shadow(0 0 0px rgba(252, 207, 0, 0));
          }
          50% {
            transform: scale(1.08);
            filter: drop-shadow(0 0 15px rgba(252, 207, 0, 0.4));
          }
        }

        @keyframes ping {
          75%, 100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
