'use client';

import { FaFire } from 'react-icons/fa';
import { MdAnalytics } from 'react-icons/md';
import { colors } from '@/app/lib/design-tokens';
import { Player } from '@/app/lib/api';
import { PlayerCard } from '@/app/components/players/PlayerCard';

interface PlayersSectionProps {
  players: Player[];
  playerType: 'batter' | 'pitcher';
  onTypeChange: (type: 'batter' | 'pitcher') => void;
}

export function PlayersSection({ players, playerType, onTypeChange }: PlayersSectionProps) {
  return (
    <section className="players-section">
      {/* 标题和切换按钮 */}
      <div className="section-header">
        <h2 className="section-title">
          <FaFire size="2rem" color={colors.error} /> 
          戰將數據
        </h2>
        <div className="type-toggle">
          <button
            onClick={() => onTypeChange('batter')}
            className={`toggle-button ${playerType === 'batter' ? 'active' : ''}`}
          >
            強攻野手 <MdAnalytics style={{ marginLeft: '0.5rem' }} />
          </button>
          <button
            onClick={() => onTypeChange('pitcher')}
            className={`toggle-button ${playerType === 'pitcher' ? 'active' : ''}`}
          >
            王牌投手 <MdAnalytics style={{ marginLeft: '0.5rem' }} />
          </button>
        </div>
      </div>

      {/* 球员卡片 */}
      <div className="players-grid">
        {players.map((player) => (
          <PlayerCard key={player.playerId} player={player} />
        ))}
      </div>

      <style jsx>{`
        .players-section {
          background-color: ${colors.white};
          border-radius: 24px;
          padding: 2rem;
          box-shadow: 0 10px 40px rgba(0,0,0,0.06);
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
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

        .type-toggle {
          display: flex;
          background-color: #f0f0f0;
          border-radius: 15px;
          padding: 5px;
        }

        .toggle-button {
          padding: 0.8rem 2.5rem;
          border-radius: 12px;
          border: none;
          background-color: transparent;
          color: #666;
          cursor: pointer;
          font-weight: bold;
          font-size: 1rem;
          transition: all 0.2s;
          display: flex;
          align-items: center;
        }

        .toggle-button.active {
          background-color: ${colors.secondary.DEFAULT};
          color: ${colors.primary.DEFAULT};
        }

        .toggle-button:hover {
          transform: translateY(-1px);
        }

        .toggle-button:focus {
          outline: 2px solid ${colors.primary.DEFAULT};
          outline-offset: 2px;
        }

        .players-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 2rem;
        }

        @media (max-width: 768px) {
          .section-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .section-title {
            font-size: 1.3rem;
          }

          .toggle-button {
            padding: 0.6rem 1.5rem;
            font-size: 0.9rem;
          }

          .players-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
