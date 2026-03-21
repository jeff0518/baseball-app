'use client';

import { useState } from 'react';
import Image from 'next/image';
import { colors } from '@/app/lib/design-tokens';
import { getTeamInfo } from '@/app/lib/teams';

/**
 * 队徽圆形徽章
 */
export function TeamLogoOnly({ 
  team, 
  size = '40px', 
  shadow = true 
}: { 
  team: string; 
  size?: string; 
  shadow?: boolean;
}) {
  const info = getTeamInfo(team);
  const [imgError, setImgError] = useState(false);

  return (
    <div style={{ 
      backgroundColor: colors.white, 
      borderRadius: '50%',
      width: size,
      height: size,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      border: `2px solid ${info.primaryColor}55`,
      boxShadow: shadow ? '0 4px 10px rgba(0,0,0,0.1)' : 'none',
      zIndex: 2,
      overflow: 'hidden',
      position: 'relative'
    }}>
      {info.avatarUrl && !imgError ? (
        <Image 
          src={info.avatarUrl} 
          alt={team} 
          fill
          sizes={size}
          style={{ objectFit: 'contain' }} 
          onError={() => setImgError(true)}
        />
      ) : (
        <span style={{ fontSize: `calc(${size} * 0.5)` }}>{info.icon}</span>
      )}
    </div>
  );
}

/**
 * 队伍徽章标签
 */
export function TeamBadge({ 
  team, 
  size = '1.2rem', 
  showLabel = true 
}: { 
  team: string; 
  size?: string; 
  showLabel?: boolean;
}) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.8rem' }}>
      <TeamLogoOnly team={team} size="44px" shadow={false} />
      {showLabel && <span style={{ fontWeight: '900', fontSize: size }}>{team}</span>}
    </span>
  );
}

/**
 * 连胜/连败标记 (W/L 标记法)
 */
export function StreakBadge({ streak }: { streak: string }) {
  // Support both English (L1, W3) and Chinese (1敗, 1勝) formats
  const isWin = streak.includes('勝') || streak.startsWith('W');
  const match = streak.match(/\d+/);
  const count = match ? match[0] : '1';
  const displayLabel = isWin ? `W${count}` : `L${count}`;
  const color = isWin ? colors.error : colors.success;
  
  return (
    <span style={{ 
      backgroundColor: `${color}15`,
      color: color,
      padding: '4px 14px',
      borderRadius: '20px',
      fontSize: '0.85rem',
      fontWeight: '900',
      border: `1.5px solid ${color}33`,
      display: 'inline-block',
      minWidth: '60px',
      textAlign: 'center',
      letterSpacing: '1px'
    }}>
      {displayLabel}
    </span>
  );
}
