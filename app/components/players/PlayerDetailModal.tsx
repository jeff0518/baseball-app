'use client';

import { BatterStats } from '@/app/lib/api';
import { colors, spacing } from '@/app/lib/design-tokens';

interface PlayerDetailModalProps {
  player: BatterStats | null;
  isOpen: boolean;
  onClose: () => void;
}

export function PlayerDetailModal({ player, isOpen, onClose }: PlayerDetailModalProps) {
  if (!isOpen || !player) return null;

  const AVG = player.AB > 0 ? (player.H / player.AB).toFixed(3) : '0.000';
  const OBP = ((player.H + player.BB + player.HBP) / player.PA).toFixed(3);
  const SLG = (
    (player.H + player['2B'] + player['3B'] * 2 + player.HR * 3) /
    player.AB
  ).toFixed(3);
  const OPS = (parseFloat(AVG) + parseFloat(OBP)).toFixed(3);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: colors.white,
          borderRadius: '12px',
          padding: spacing.xl,
          maxWidth: '600px',
          width: '90%',
          maxHeight: '80vh',
          overflowY: 'auto',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: spacing.xl,
          }}
        >
          <div>
            <h2
              style={{
                margin: 0,
                fontSize: '2rem',
                color: colors.text.primary,
                fontWeight: 'bold',
              }}
            >
              {player.playerName}
            </h2>
            <p style={{ margin: '0.5rem 0 0 0', color: colors.text.secondary }}>
              背號 #{player.playerNumber}
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              backgroundColor: colors.background,
              border: 'none',
              fontSize: '2rem',
              cursor: 'pointer',
              borderRadius: '50%',
              width: '48px',
              height: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            ×
          </button>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: spacing.md,
            marginBottom: spacing.xl,
            padding: `${spacing.lg} ${spacing.md}`,
            backgroundColor: colors.background,
            borderRadius: '8px',
          }}
        >
          <StatDetail label="打席 (PA)" value={player.PA} />
          <StatDetail label="打數 (AB)" value={player.AB} />
          <StatDetail label="安打 (H)" value={player.H} />
          <StatDetail label="全壘打 (HR)" value={player.HR} />
          <StatDetail label="得分 (R)" value={player.R} />
          <StatDetail label="打點 (RBI)" value={player.RBI} />
          <StatDetail label="四壞球 (BB)" value={player.BB} />
          <StatDetail label="三振 (SO)" value={player.SO} />
          <StatDetail label="二壘安打 (2B)" value={player['2B']} />
          <StatDetail label="三壘安打 (3B)" value={player['3B']} />
          <StatDetail label="盜壘成功 (SB)" value={player.SB} />
          <StatDetail label="盜壘失敗 (CS)" value={player.CS} />
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: spacing.md,
            marginBottom: spacing.xl,
          }}
        >
          <AdvancedStatDetail label="打擊率 (AVG)" value={AVG} />
          <AdvancedStatDetail label="上壘率 (OBP)" value={OBP} />
          <AdvancedStatDetail label="長打率 (SLG)" value={SLG} />
          <AdvancedStatDetail label="OPS" value={OPS} />
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: spacing.md,
          }}
        >
          <StatDetail label="觸身球 (HBP)" value={player.HBP} />
          <StatDetail label="故意四壞 (IBB)" value={player.IBB} />
          <StatDetail label="犧牲觸擊 (SH)" value={player.SH} />
          <StatDetail label="犧牲飛球 (SF)" value={player.SF} />
          <StatDetail label="失誤上壘 (E)" value={player.E} />
        </div>

        <button
          onClick={onClose}
          style={{
            width: '100%',
            marginTop: spacing.xl,
            padding: spacing.md,
            backgroundColor: colors.secondary.DEFAULT,
            color: colors.white,
            border: 'none',
            borderRadius: '6px',
            fontSize: '1rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
          }}
          onMouseEnter={(e) => ((e.target as HTMLElement).style.backgroundColor = colors.primary.DEFAULT)}
          onMouseLeave={(e) => ((e.target as HTMLElement).style.backgroundColor = colors.secondary.DEFAULT)}
        >
          關閉
        </button>
      </div>
    </div>
  );
}

function StatDetail({ label, value }: { label: string; value: number }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: '0.875rem', color: colors.text.secondary, marginBottom: '0.5rem' }}>
        {label}
      </div>
      <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: colors.text.primary }}>
        {value}
      </div>
    </div>
  );
}

function AdvancedStatDetail({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        textAlign: 'center',
        backgroundColor: colors.background,
        padding: spacing.md,
        borderRadius: '8px',
        border: `2px solid ${colors.primary.DEFAULT}`,
      }}
    >
      <div style={{ fontSize: '0.875rem', color: colors.text.secondary, marginBottom: '0.5rem' }}>
        {label}
      </div>
      <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: colors.primary.DEFAULT }}>
        {value}
      </div>
    </div>
  );
}
