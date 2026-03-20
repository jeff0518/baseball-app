'use client';

import { BatterStats } from '@/app/lib/api';
import { colors, spacing } from '@/app/lib/design-tokens';

interface PlayerCardProps {
  player: BatterStats;
  onClick?: () => void;
}

export function PlayerCard({ player, onClick }: PlayerCardProps) {
  const AVG = player.AB > 0 ? (player.H / player.AB).toFixed(3) : '0.000';
  const OBP = ((player.H + player.BB + player.HBP) / player.PA).toFixed(3);
  const SLG = (
    (player.H + player['2B'] + player['3B'] * 2 + player.HR * 3) /
    player.AB
  ).toFixed(3);

  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor: colors.white,
        border: `2px solid ${colors.border}`,
        borderRadius: '8px',
        padding: spacing.lg,
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.3s ease',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.15)';
        (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.05)';
        (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
      }}
    >
      <div style={{ marginBottom: spacing.md }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: spacing.sm,
          }}
        >
          <h3
            style={{
              margin: 0,
              fontSize: '1.25rem',
              color: colors.text.primary,
              fontWeight: 'bold',
            }}
          >
            {player.playerName}
          </h3>
          <span
            style={{
              backgroundColor: colors.primary,
              color: colors.secondary,
              padding: `${spacing.sm} ${spacing.md}`,
              borderRadius: '20px',
              fontSize: '0.875rem',
              fontWeight: 'bold',
            }}
          >
            #{player.playerNumber}
          </span>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: spacing.md,
          marginBottom: spacing.md,
        }}
      >
        <StatItem label="打席" value={player.PA} />
        <StatItem label="打數" value={player.AB} />
        <StatItem label="安打" value={player.H} />
        <StatItem label="全壘打" value={player.HR} />
        <StatItem label="得分" value={player.R} />
        <StatItem label="打點" value={player.RBI} />
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: spacing.sm,
          borderTop: `1px solid ${colors.border}`,
          paddingTop: spacing.md,
        }}
      >
        <StatBoxSmall label="AVG" value={AVG} />
        <StatBoxSmall label="OBP" value={OBP} />
        <StatBoxSmall label="SLG" value={SLG} />
      </div>
    </div>
  );
}

function StatItem({ label, value }: { label: string; value: number }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <span style={{ color: colors.text.secondary, fontSize: '0.875rem' }}>{label}</span>
      <span style={{ color: colors.text.primary, fontWeight: 'bold' }}>{value}</span>
    </div>
  );
}

function StatBoxSmall({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        backgroundColor: colors.background,
        borderRadius: '6px',
        padding: spacing.sm,
        textAlign: 'center',
      }}
    >
      <div style={{ fontSize: '0.75rem', color: colors.text.secondary, marginBottom: '4px' }}>
        {label}
      </div>
      <div
        style={{
          fontSize: '1.125rem',
          fontWeight: 'bold',
          color: colors.primary,
        }}
      >
        {value}
      </div>
    </div>
  );
}
