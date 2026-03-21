'use client';

import { MdLeaderboard } from 'react-icons/md';
import { colors } from '@/app/lib/design-tokens';
import { Standing } from '@/app/lib/api';
import { TeamBadge, StreakBadge } from './TeamComponents';

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
    <section className="standings-section">
      {/* 标题和切换按钮 */}
      <div className="section-header">
        <h2 className="section-title">
          <MdLeaderboard size="2rem" color={colors.secondary.DEFAULT} /> 
          聯賽排名
        </h2>
        <div className="tab-group">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onPeriodChange(tab.id)}
              className={`tab-button ${period === tab.id ? 'active' : ''}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      
      {/* 排名表格 */}
      <table className="standings-table">
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
                className={isBrothers ? 'brothers-row' : ''}
              >
                <td className="rank-cell">
                  <span className={isBrothers ? 'rank-highlight' : 'rank-normal'}>
                    {index + 1}
                  </span>
                </td>
                <td className="team-cell">
                  <TeamBadge team={team.team} showLabel={false} />
                </td>
                <td className={isBrothers ? 'bold' : ''}>{team.won}-{team.lost}-{team.drawn}</td>
                <td className="bold">{team.winRate.toFixed(3)}</td>
                <td className={isBrothers ? 'bold' : ''}>{team.gamesBehind}</td>
                <td>
                  <StreakBadge streak={team.streak} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <style jsx>{`
        .standings-section {
          background-color: ${colors.white};
          border-radius: 24px;
          padding: 2rem;
          box-shadow: 0 10px 40px rgba(0,0,0,0.06);
          display: flex;
          flex-direction: column;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          border-bottom: 4px solid ${colors.primary.DEFAULT};
          padding-bottom: 1rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .section-title {
          font-size: 1.6rem;
          color: ${colors.secondary.DEFAULT};
          margin: 0;
          display: flex;
          align-items: center;
          gap: 0.8rem;
        }

        .tab-group {
          display: flex;
          gap: 0.4rem;
          background-color: #f0f0f0;
          padding: 5px;
          border-radius: 15px;
        }

        .tab-button {
          padding: 0.6rem 1.4rem;
          border-radius: 10px;
          border: none;
          background-color: transparent;
          color: ${colors.secondary.DEFAULT};
          cursor: pointer;
          font-weight: bold;
          font-size: 0.9rem;
          transition: all 0.2s;
        }

        .tab-button.active {
          background-color: ${colors.white};
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }

        .tab-button:hover {
          transform: translateY(-1px);
        }

        .tab-button:focus {
          outline: 2px solid ${colors.primary.DEFAULT};
          outline-offset: 2px;
        }

        .standings-table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0 10px;
        }

        .standings-table thead tr {
          color: #aaa;
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .standings-table th {
          padding: 0.5rem;
          text-align: center;
          font-weight: bold;
        }

        .standings-table tbody tr {
          background: white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.02);
          border-radius: 15px;
          transition: all 0.2s;
        }

        .standings-table tbody tr.brothers-row {
          background: linear-gradient(90deg, ${colors.primary.DEFAULT} 0%, ${colors.primary.light} 100%);
          box-shadow: 0 8px 20px ${colors.primary.DEFAULT}4d;
          transform: scale(1.02);
          z-index: 2;
          position: relative;
        }

        .standings-table tbody tr:hover {
          transform: scale(1.01);
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        .standings-table td {
          padding: 0.8rem;
          text-align: center;
          color: ${colors.secondary.DEFAULT};
        }

        .standings-table tbody tr td:first-child {
          border-radius: 15px 0 0 15px;
        }

        .standings-table tbody tr td:last-child {
          border-radius: 0 15px 15px 0;
        }

        .rank-cell {
          width: 60px;
        }

        .team-cell {
          width: 100px;
        }

        .rank-normal {
          color: #bbb;
          font-size: 1.1rem;
          font-weight: 900;
        }

        .rank-highlight {
          color: ${colors.secondary.DEFAULT};
          font-size: 1.4rem;
          font-weight: 900;
        }

        .bold {
          font-weight: bold;
        }

        @media (max-width: 768px) {
          .section-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .standings-table {
            font-size: 0.85rem;
          }

          .section-title {
            font-size: 1.3rem;
          }
        }
      `}</style>
    </section>
  );
}
