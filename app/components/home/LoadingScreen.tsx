'use client';

import { useState } from 'react';
import Image from 'next/image';
import { GiElephant } from 'react-icons/gi';
import { colors } from '@/app/lib/design-tokens';
import styles from './LoadingScreen.module.css';

interface LoadingScreenProps {
  progress: number;
}

export function LoadingScreen({ progress }: LoadingScreenProps) {
  const [logoError, setLogoError] = useState(false);

  return (
    <div className={styles.loadingScreen}>
      {/* Logo 动画 */}
      <div className={styles.logoContainer}>
        {!logoError ? (
          <Image 
            src="/derek-logo.png" 
            alt="Loading" 
            className={styles.logoImage}
            width={140}
            height={140}
            onError={() => setLogoError(true)} 
          />
        ) : (
          <GiElephant size="6rem" color={colors.primary.DEFAULT} />
        )}
        {/* 光圈效果 */}
        <div className={styles.glowRing} />
      </div>

      {/* 进度条 */}
      <div className={styles.progressContainer}>
        <div className={styles.progressBarBg}>
          <div 
            className={styles.progressBarFill}
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className={styles.progressText}>
          戰情加載中 {progress}%
        </div>
      </div>
    </div>
  );
}
