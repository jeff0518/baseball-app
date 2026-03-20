'use client';

import { useState, useEffect } from 'react';
import { playerApi, BatterStats } from '@/app/lib/api';
import { colors, spacing } from '@/app/lib/design-tokens';
import { PlayerCard } from '@/app/components/players/PlayerCard';
import { PlayerDetailModal } from '@/app/components/players/PlayerDetailModal';

export default function Home() {
  const [featuredPlayers, setFeaturedPlayers] = useState<BatterStats[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<BatterStats | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [totalPlayers, setTotalPlayers] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await playerApi.getAllPlayers(1, 5);
        if (response.data) {
          setFeaturedPlayers(response.data);
          setTotalPlayers(response.total || 0);
        }
      } catch (error) {
        console.error('Failed to fetch players:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePlayerClick = (player: BatterStats) => {
    setSelectedPlayer(player);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPlayer(null);
  };

  return (
    <main style={{ flex: 1 }}>
      {/* Hero Section */}
      <section
        style={{
          background: `linear-gradient(135deg, ${colors.secondary} 0%, #0f2850 100%)`,
          color: colors.white,
          padding: `${spacing['2xl']} ${spacing.xl}`,
          textAlign: 'center',
          marginBottom: spacing['2xl'],
        }}
      >
        <h1
          style={{
            fontSize: '3.5rem',
            fontWeight: 'bold',
            margin: 0,
            marginBottom: spacing.lg,
          }}
        >
          ⚾ 台灣棒球統計資料庫
        </h1>
        <p
          style={{
            fontSize: '1.25rem',
            margin: 0,
            color: colors.primary,
            fontWeight: '500',
          }}
        >
          探索球員數據，發現棒球的魅力
        </p>
      </section>

      {/* Quick Stats Section */}
      <section
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: spacing.xl,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: spacing.lg,
          marginBottom: spacing['2xl'],
        }}
      >
        <StatCard label="總球員數" value={totalPlayers} icon="👥" />
        <StatCard label="最新數據" value="2026年3月" icon="📅" />
        <StatCard label="聯盟" value="台灣職棒" icon="🏟️" />
      </section>

      {/* Featured Players Section */}
      <section
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: spacing.xl,
          paddingTop: 0,
        }}
      >
        <div style={{ marginBottom: spacing.xl }}>
          <h2
            style={{
              fontSize: '2rem',
              color: colors.text.primary,
              fontWeight: 'bold',
              margin: 0,
              marginBottom: spacing.md,
              borderBottom: `4px solid ${colors.primary}`,
              paddingBottom: spacing.md,
              display: 'inline-block',
            }}
          >
            精選球員
          </h2>
        </div>

        {loading ? (
          <div
            style={{
              textAlign: 'center',
              padding: spacing.xl,
              color: colors.text.secondary,
            }}
          >
            載入中...
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: spacing.lg,
              marginBottom: spacing['2xl'],
            }}
          >
            {featuredPlayers.map((player) => (
              <div key={player.playerId}>
                <PlayerCard player={player} onClick={() => handlePlayerClick(player)} />
              </div>
            ))}
          </div>
        )}

        <div
          style={{
            textAlign: 'center',
            marginBottom: spacing.xl,
          }}
        >
          <a
            href="/search"
            style={{
              display: 'inline-block',
              backgroundColor: colors.primary,
              color: colors.secondary,
              padding: `${spacing.md} ${spacing.xl}`,
              borderRadius: '6px',
              textDecoration: 'none',
              fontWeight: 'bold',
              fontSize: '1.125rem',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 12px rgba(252, 207, 0, 0.3)',
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.transform = 'translateY(-2px)';
              (e.target as HTMLElement).style.boxShadow = '0 8px 20px rgba(252, 207, 0, 0.4)';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.transform = 'translateY(0)';
              (e.target as HTMLElement).style.boxShadow = '0 4px 12px rgba(252, 207, 0, 0.3)';
            }}
          >
            查看所有球員 →
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          backgroundColor: colors.background,
          borderTop: `1px solid ${colors.border}`,
          padding: spacing.xl,
          textAlign: 'center',
          color: colors.text.secondary,
          marginTop: spacing['2xl'],
        }}
      >
        <p style={{ margin: 0 }}>
          © 2026 Baseball Stats Database. All rights reserved. | 資料來源: rebas.tw
        </p>
      </footer>

      {/* Player Detail Modal */}
      <PlayerDetailModal player={selectedPlayer} isOpen={isModalOpen} onClose={handleCloseModal} />
    </main>
  );
}

function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string | number;
  icon: string;
}) {
  return (
    <div
      style={{
        backgroundColor: colors.white,
        border: `2px solid ${colors.primary}`,
        borderRadius: '12px',
        padding: spacing.lg,
        textAlign: 'center',
        transition: 'all 0.3s ease',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.transform = 'translateY(-8px)';
        (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.1)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
        (e.currentTarget as HTMLElement).style.boxShadow = 'none';
      }}
    >
      <div style={{ fontSize: '3rem', marginBottom: spacing.md }}>{icon}</div>
      <p style={{ margin: 0, color: colors.text.secondary, fontSize: '0.875rem' }}>{label}</p>
      <p
        style={{
          margin: '0.5rem 0 0 0',
          fontSize: '2rem',
          color: colors.primary,
          fontWeight: 'bold',
        }}
      >
        {value}
      </p>
    </div>
  );
}
