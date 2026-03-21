'use client';

import { MdCalendarMonth, MdLocationOn } from 'react-icons/md';
import { GameSchedule } from '@/app/lib/api';
import { getTeamInfo } from '@/app/lib/teams';
import { TeamLogoOnly } from './TeamComponents';
import styles from './ScheduleSection.module.css';

interface ScheduleSectionProps {
  games: GameSchedule[];
}

export function ScheduleSection({ games }: ScheduleSectionProps) {
  const brothersInfo = getTeamInfo('中信兄弟');

  return (
    <section className={styles.scheduleSection}>
      <h2 className={styles.sectionTitle}>
        <MdCalendarMonth size="2rem" /> 
        近期賽程
      </h2>

      <div className={styles.gamesContainer}>
        {games.map((game) => {
          const opponentInfo = getTeamInfo(game.opponent);
          return (
            <div key={game.id} className={styles.gameCard}>
              {/* 背景装饰 */}
              {brothersInfo.officialLogoUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img 
                  src={brothersInfo.officialLogoUrl} 
                  alt="" 
                  className={`${styles.bgLogo} ${styles.bgLogoLeft}`}
                />
              )}
              {opponentInfo.officialLogoUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img 
                  src={opponentInfo.officialLogoUrl} 
                  alt="" 
                  className={`${styles.bgLogo} ${styles.bgLogoRight}`}
                />
              )}

              {/* 日期和地点 */}
              <div className={styles.gameInfo}>
                <div className={styles.gameDate}>
                  {game.date} · <span className={styles.gameTime}>{game.time}</span>
                </div>
                <div className={styles.gameLocation}>
                  <MdLocationOn size="1rem" /> {game.location}
                </div>
              </div>

              {/* 对战双方 */}
              <div className={styles.teamsMatchup}>
                <TeamLogoOnly team="中信兄弟" size="65px" />
                <div className={styles.vsText}>VS</div>
                <TeamLogoOnly team={game.opponent} size="65px" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
