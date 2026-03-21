'use client';

import { MdLeaderboard } from 'react-icons/md';
import { colors } from '@/app/lib/design-tokens';
import { Standing } from '@/app/lib/api';
import { TeamBadge, StreakBadge } from './TeamComponents';
import styles from './StandingsSection.module.css';

interface StandingsSectionProps {
  standings: Standing[];
  period: string;
  onPeriodChange: (period: string) => void;
}

const TABS = [
  { id: 'full', label: '全年度' },
  { id: 'first', label: '上半季' },
  { id: 'second', label: '下半季' },
];

export function StandingsSection({ standings, period, onPeriodChange }: StandingsSectionProps) {
  return (
    <section className={styles.standingsSection}>
      {/* 标题和切换按钮 */}
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>
          <MdLeaderboard size="2rem" color={colors.secondary.DEFAULT} /> 
          聯賽排名
        </h2>
        <div className={styles.tabGroup}>
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onPeriodChange(tab.id)}
              className={`${styles.tabButton} ${period === tab.id ? styles.active : ''}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      
      {/* 排名表格 */}
      <table className={styles.standingsTable}>
        <thead>
          <tr>
            <th>排名</th>
            <th>球隊</th>
            <th>勝-敗-和</th>
            <th>勝率</th>
            <th>勝差</th>
            <th>近況</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((team, index) => {
            const isBrothers = team.team === '中信兄弟';
            return (
              <tr 
                key={team.team} 
                className={isBrothers ? styles.brothersRow : ''}
              >
                <td className={styles.rankCell}>
                  <span className={isBrothers ? styles.rankHighlight : styles.rankNormal}>
                    {index + 1}
                  </span>
                </td>
                <td className={styles.teamCell}>
                  <TeamBadge team={team.team} showLabel={false} />
                </td>
                <td className={isBrothers ? styles.bold : ''}>{team.won}-{team.lost}-{team.drawn}</td>
                <td className={styles.bold}>{team.winRate.toFixed(3)}</td>
                <td className={isBrothers ? styles.bold : ''}>{team.gamesBehind}</td>
                <td>
                  <StreakBadge streak={team.streak} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}
