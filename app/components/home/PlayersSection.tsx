'use client';

import { FaFire } from 'react-icons/fa';
import { MdAnalytics } from 'react-icons/md';
import { colors } from '@/app/lib/design-tokens';
import { Player } from '@/app/lib/api';
import { PlayerCard } from '@/app/components/players/PlayerCard';
import styles from './PlayersSection.module.css';

interface PlayersSectionProps {
  players: Player[];
  playerType: 'batter' | 'pitcher';
  onTypeChange: (type: 'batter' | 'pitcher') => void;
}

export function PlayersSection({ players, playerType, onTypeChange }: PlayersSectionProps) {
  return (
    <section className={styles.playersSection}>
      {/* 标题和切换按钮 */}
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>
          <FaFire size="2rem" color={colors.error} /> 
          戰將數據
        </h2>
        <div className={styles.typeToggle}>
          <button
            onClick={() => onTypeChange('batter')}
            className={`${styles.toggleButton} ${playerType === 'batter' ? styles.active : ''}`}
          >
            強攻野手 <MdAnalytics style={{ marginLeft: '0.5rem' }} />
          </button>
          <button
            onClick={() => onTypeChange('pitcher')}
            className={`${styles.toggleButton} ${playerType === 'pitcher' ? styles.active : ''}`}
          >
            王牌投手 <MdAnalytics style={{ marginLeft: '0.5rem' }} />
          </button>
        </div>
      </div>

      {/* 球员卡片 */}
      <div className={styles.playersGrid}>
        {players.map((player) => (
          <PlayerCard key={player.playerId} player={player} />
        ))}
      </div>
    </section>
  );
}
