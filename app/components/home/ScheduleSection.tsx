'use client';

import { MdCalendarMonth, MdLocationOn } from 'react-icons/md';
import { colors } from '@/app/lib/design-tokens';
import { GameSchedule } from '@/app/lib/api';
import { getTeamInfo } from '@/app/lib/teams';
import { TeamLogoOnly } from './TeamComponents';

interface ScheduleSectionProps {
  games: GameSchedule[];
}

export function ScheduleSection({ games }: ScheduleSectionProps) {
  const brothersInfo = getTeamInfo('中信兄弟');

  return (
    <section className="schedule-section">
      <h2 className="section-title">
        <MdCalendarMonth size="2rem" /> 
        近期賽程
      </h2>

      <div className="games-container">
        {games.map((game) => {
          const opponentInfo = getTeamInfo(game.opponent);
          return (
            <div key={game.id} className="game-card">
              {/* 背景装饰 */}
              {brothersInfo.officialLogoUrl && (
                <img 
                  src={brothersInfo.officialLogoUrl} 
                  alt="" 
                  className="bg-logo bg-logo-left"
                />
              )}
              {opponentInfo.officialLogoUrl && (
                <img 
                  src={opponentInfo.officialLogoUrl} 
                  alt="" 
                  className="bg-logo bg-logo-right"
                />
              )}

              {/* 日期和地点 */}
              <div className="game-info">
                <div className="game-date">
                  {game.date} · <span className="game-time">{game.time}</span>
                </div>
                <div className="game-location">
                  <MdLocationOn size="1rem" /> {game.location}
                </div>
              </div>

              {/* 对战双方 */}
              <div className="teams-matchup">
                <TeamLogoOnly team="中信兄弟" size="65px" />
                <div className="vs-text">VS</div>
                <TeamLogoOnly team={game.opponent} size="65px" />
              </div>
            </div>
          );
        })}
      </div>

      <style jsx>{`
        .schedule-section {
          background-color: ${colors.secondary.DEFAULT};
          border-radius: 24px;
          padding: 2rem;
          color: ${colors.white};
          box-shadow: 0 15px 50px rgba(11,27,61,0.25);
          display: flex;
          flex-direction: column;
        }

        .section-title {
          font-size: 1.6rem;
          color: ${colors.primary.DEFAULT};
          margin-bottom: 1.5rem;
          margin-top: 0;
          display: flex;
          align-items: center;
          gap: 0.8rem;
        }

        .games-container {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          flex: 1;
        }

        .game-card {
          background: linear-gradient(135deg, ${colors.secondary.DEFAULT} 0%, rgba(15, 40, 80, 0.3) 100%);
          border-radius: 20px;
          padding: 1.2rem;
          border: 1px solid rgba(255,255,255,0.1);
          position: relative;
          overflow: hidden;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          transition: all 0.3s;
        }

        .game-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(252,207,0,0.2);
        }

        .bg-logo {
          position: absolute;
          width: 180px;
          height: 180px;
          opacity: 0.15;
          z-index: 0;
        }

        .bg-logo-left {
          left: -25px;
          top: -25px;
          transform: rotate(15deg);
          filter: grayscale(30%);
        }

        .bg-logo-right {
          right: -25px;
          bottom: -25px;
          transform: rotate(-15deg);
        }

        .game-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
          position: relative;
          z-index: 1;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .game-date {
          font-size: 1rem;
          color: ${colors.primary.DEFAULT};
          font-weight: 900;
        }

        .game-time {
          opacity: 0.8;
        }

        .game-location {
          background-color: rgba(255,255,255,0.15);
          padding: 3px 10px;
          border-radius: 15px;
          display: flex;
          align-items: center;
          gap: 0.3rem;
          font-size: 0.85rem;
          color: ${colors.primary.DEFAULT};
          font-weight: bold;
          border: 1px solid rgba(255,255,255,0.05);
        }

        .teams-matchup {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 2.5rem;
          position: relative;
          z-index: 1;
        }

        .vs-text {
          font-size: 1.5rem;
          font-weight: 900;
          color: rgba(255,255,255,0.3);
          font-style: italic;
        }

        @media (max-width: 768px) {
          .section-title {
            font-size: 1.3rem;
          }

          .teams-matchup {
            gap: 1.5rem;
          }

          .bg-logo {
            width: 120px;
            height: 120px;
          }
        }
      `}</style>
    </section>
  );
}
