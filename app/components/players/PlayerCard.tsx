'use client';

import { colors, spacing } from '@/app/lib/design-tokens';

interface PlayerCardProps {
  player: any; // 支援多種數據格式
  type?: 'batter' | 'pitcher';
  onClick?: () => void;
}

export function PlayerCard({ player, type = 'batter', onClick }: PlayerCardProps) {
  const isPitcher = type === 'pitcher';

  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor: colors.white,
        border: `2px solid ${isPitcher ? '#004A9C33' : '#FCCF0033'}`,
        borderRadius: '16px',
        padding: spacing.lg,
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
        position: 'relative',
        overflow: 'hidden'
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.15)';
        (e.currentTarget as HTMLElement).style.transform = 'translateY(-6px)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
        (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
      }}
    >
      {/* 角色背景標誌 */}
      <div style={{ 
        position: 'absolute', 
        right: '-10px', 
        bottom: '-10px', 
        fontSize: '4rem', 
        opacity: 0.05,
        fontStyle: 'italic',
        fontWeight: 'black',
        color: isPitcher ? '#004A9C' : '#FCCF00'
      }}>
        {isPitcher ? 'PITCHER' : 'BATTER'}
      </div>

      <div style={{ marginBottom: spacing.md, position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.sm }}>
          <h3 style={{ margin: 0, fontSize: '1.4rem', color: colors.secondary, fontWeight: 'bold' }}>
            {player.playerName}
          </h3>
          <span style={{ 
            backgroundColor: isPitcher ? '#004A9C' : colors.primary,
            color: isPitcher ? '#fff' : colors.secondary,
            padding: '4px 12px',
            borderRadius: '20px',
            fontSize: '0.9rem',
            fontWeight: 'bold',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            #{player.playerNumber}
          </span>
        </div>
      </div>

      {/* 核心數據區 (根據角色不同顯示不同數據) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1.5rem', position: 'relative' }}>
        {isPitcher ? (
          <>
            <StatItem label="勝-敗" value={`${player.W}-${player.L}`} />
            <StatItem label="救援" value={player.SV} />
            <StatItem label="三振" value={player.SO} />
            <StatItem label="投球局數" value={player.IP} />
          </>
        ) : (
          <>
            <StatItem label="安打" value={player.H} />
            <StatItem label="全壘打" value={player.HR} />
            <StatItem label="打點" value={player.RBI} />
            <StatItem label="得分" value={player.R} />
          </>
        )}
      </div>

      {/* 底部進階數據區 */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(3, 1fr)', 
        gap: '0.6rem', 
        borderTop: '1px solid #eee', 
        paddingTop: '1rem',
        position: 'relative'
      }}>
        {isPitcher ? (
          <>
            <StatBoxSmall label="ERA" value={player.ERA.toFixed(2)} color="#e63946" />
            <StatBoxSmall label="WHIP" value={player.WHIP.toFixed(2)} color="#457b9d" />
            <StatBoxSmall label="K/9" value={(player.SO / parseFloat(player.IP) * 9).toFixed(1)} color="#1d3557" />
          </>
        ) : (
          <>
            <StatBoxSmall label="AVG" value={player.AVG?.toFixed(3) || '0.000'} color={colors.secondary} />
            <StatBoxSmall label="OBP" value={player.OBP?.toFixed(3) || '0.000'} color={colors.secondary} />
            <StatBoxSmall label="OPS" value={player.OPS?.toFixed(3) || '0.000'} color={colors.primary} />
          </>
        )}
      </div>
    </div>
  );
}

function StatItem({ label, value }: { label: string; value: string | number }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span style={{ color: '#888', fontSize: '0.85rem' }}>{label}</span>
      <span style={{ color: colors.secondary, fontWeight: 'bold', fontSize: '1rem' }}>{value}</span>
    </div>
  );
}

function StatBoxSmall({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div style={{ 
      backgroundColor: '#f8f9fa', 
      borderRadius: '10px', 
      padding: '0.6rem 0.3rem', 
      textAlign: 'center',
      border: '1px solid #f0f0f0'
    }}>
      <div style={{ fontSize: '0.7rem', color: '#aaa', fontWeight: 'bold', marginBottom: '4px', letterSpacing: '1px' }}>
        {label}
      </div>
      <div style={{ fontSize: '1.1rem', fontWeight: '900', color: color || colors.secondary }}>
        {value}
      </div>
    </div>
  );
}
