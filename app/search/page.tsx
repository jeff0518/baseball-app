'use client';

import { useState, useEffect } from 'react';
import { playerApi, BatterStats } from '@/app/lib/api';
import { colors, spacing } from '@/app/lib/design-tokens';
import { PlayerCard } from '@/app/components/players/PlayerCard';
import { PlayerDetailModal } from '@/app/components/players/PlayerDetailModal';

export default function SearchPage() {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [players, setPlayers] = useState<BatterStats[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<BatterStats | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [sortBy, setSortBy] = useState<'name' | 'hr' | 'rbi' | 'avg'>('name');
  const [searchPerformed, setSearchPerformed] = useState(false);

  const itemsPerPage = 12;

  const handleSearch = async (keyword: string, page: number = 1) => {
    if (!keyword.trim()) {
      setSearchKeyword('');
      setPlayers([]);
      setSearchPerformed(false);
      return;
    }

    setLoading(true);
    try {
      const response = await playerApi.searchPlayers(keyword, page, itemsPerPage);
      if (response.data) {
        let sortedData = [...response.data];

        switch (sortBy) {
          case 'hr':
            sortedData.sort((a, b) => b.HR - a.HR);
            break;
          case 'rbi':
            sortedData.sort((a, b) => b.RBI - a.RBI);
            break;
          case 'avg':
            const avgA = sortedData.length > 0 ? response.data[0].AB > 0 ? response.data[0].H / response.data[0].AB : 0 : 0;
            sortedData.sort((a, b) => {
              const avgAVal = a.AB > 0 ? a.H / a.AB : 0;
              const avgBVal = b.AB > 0 ? b.H / b.AB : 0;
              return avgBVal - avgAVal;
            });
            break;
          case 'name':
          default:
            sortedData.sort((a, b) => a.playerName.localeCompare(b.playerName, 'zh'));
        }

        setPlayers(sortedData);
        setTotalResults(response.total || 0);
        setCurrentPage(page);
        setSearchPerformed(true);
      }
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePlayerClick = (player: BatterStats) => {
    setSelectedPlayer(player);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPlayer(null);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSort = e.target.value as 'name' | 'hr' | 'rbi' | 'avg';
    setSortBy(newSort);
    if (searchKeyword) {
      handleSearch(searchKeyword, 1);
    }
  };

  const totalPages = Math.ceil(totalResults / itemsPerPage);

  return (
    <main style={{ flex: 1, minHeight: 'calc(100vh - 60px)' }}>
      {/* Header Section */}
      <section
        style={{
          background: `linear-gradient(135deg, ${colors.secondary} 0%, #0f2850 100%)`,
          color: colors.white,
          padding: `${spacing['2xl']} ${spacing.xl}`,
          marginBottom: spacing['2xl'],
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1
            style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              margin: 0,
              marginBottom: spacing.lg,
            }}
          >
            球員搜尋
          </h1>
          <p style={{ fontSize: '1rem', margin: 0, color: colors.primary }}>
            輸入球員名稱或背號進行搜尋
          </p>
        </div>
      </section>

      {/* Search Section */}
      <section
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: `0 ${spacing.xl}`,
          marginBottom: spacing['2xl'],
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto auto',
            gap: spacing.md,
            alignItems: 'end',
            marginBottom: spacing.lg,
          }}
        >
          <div>
            <label
              htmlFor="search"
              style={{
                display: 'block',
                color: colors.text.primary,
                fontWeight: 'bold',
                marginBottom: spacing.sm,
              }}
            >
              搜尋
            </label>
            <input
              id="search"
              type="text"
              placeholder="輸入球員名稱或背號..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSearch(searchKeyword, 1);
                }
              }}
              style={{
                width: '100%',
                padding: spacing.md,
                fontSize: '1rem',
                border: `2px solid ${colors.border}`,
                borderRadius: '6px',
                fontFamily: 'inherit',
                transition: 'border-color 0.3s',
              }}
              onFocus={(e) => {
                (e.target as HTMLInputElement).style.borderColor = colors.primary;
              }}
              onBlur={(e) => {
                (e.target as HTMLInputElement).style.borderColor = colors.border;
              }}
            />
          </div>

          <div>
            <label
              htmlFor="sort"
              style={{
                display: 'block',
                color: colors.text.primary,
                fontWeight: 'bold',
                marginBottom: spacing.sm,
              }}
            >
              排序
            </label>
            <select
              id="sort"
              value={sortBy}
              onChange={handleSortChange}
              style={{
                padding: spacing.md,
                fontSize: '1rem',
                border: `2px solid ${colors.border}`,
                borderRadius: '6px',
                backgroundColor: colors.white,
                fontFamily: 'inherit',
                cursor: 'pointer',
              }}
            >
              <option value="name">名稱</option>
              <option value="hr">全壘打</option>
              <option value="rbi">打點</option>
              <option value="avg">打擊率</option>
            </select>
          </div>

          <button
            onClick={() => handleSearch(searchKeyword, 1)}
            disabled={loading}
            style={{
              backgroundColor: colors.primary,
              color: colors.secondary,
              border: 'none',
              padding: spacing.md,
              fontSize: '1rem',
              fontWeight: 'bold',
              borderRadius: '6px',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.6 : 1,
              transition: 'all 0.3s',
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                (e.target as HTMLElement).style.transform = 'translateY(-2px)';
                (e.target as HTMLElement).style.boxShadow = '0 8px 16px rgba(252, 207, 0, 0.3)';
              }
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.transform = 'translateY(0)';
              (e.target as HTMLElement).style.boxShadow = 'none';
            }}
          >
            {loading ? '搜尋中...' : '搜尋'}
          </button>
        </div>
      </section>

      {/* Results Section */}
      <section
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: `0 ${spacing.xl}`,
          marginBottom: spacing['2xl'],
        }}
      >
        {searchPerformed && (
          <div
            style={{
              marginBottom: spacing.lg,
              padding: spacing.md,
              backgroundColor: colors.background,
              borderRadius: '6px',
              color: colors.text.secondary,
            }}
          >
            找到 <strong>{totalResults}</strong> 個結果
          </div>
        )}

        {loading ? (
          <div style={{ textAlign: 'center', padding: spacing['2xl'], color: colors.text.secondary }}>
            搜尋中...
          </div>
        ) : players.length > 0 ? (
          <>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: spacing.lg,
                marginBottom: spacing.xl,
              }}
            >
              {players.map((player) => (
                <div key={player.playerId}>
                  <PlayerCard player={player} onClick={() => handlePlayerClick(player)} />
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: spacing.md,
                  marginBottom: spacing.xl,
                }}
              >
                <button
                  onClick={() => handleSearch(searchKeyword, Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  style={{
                    padding: `${spacing.sm} ${spacing.md}`,
                    border: `2px solid ${colors.border}`,
                    borderRadius: '6px',
                    backgroundColor: currentPage === 1 ? colors.background : colors.white,
                    cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                    fontWeight: 'bold',
                  }}
                >
                  上一頁
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handleSearch(searchKeyword, page)}
                    style={{
                      width: '40px',
                      height: '40px',
                      border: page === currentPage ? `2px solid ${colors.primary}` : `2px solid ${colors.border}`,
                      borderRadius: '6px',
                      backgroundColor: page === currentPage ? colors.primary : colors.white,
                      color: page === currentPage ? colors.secondary : colors.text.primary,
                      cursor: 'pointer',
                      fontWeight: 'bold',
                    }}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() => handleSearch(searchKeyword, Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  style={{
                    padding: `${spacing.sm} ${spacing.md}`,
                    border: `2px solid ${colors.border}`,
                    borderRadius: '6px',
                    backgroundColor: currentPage === totalPages ? colors.background : colors.white,
                    cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                    fontWeight: 'bold',
                  }}
                >
                  下一頁
                </button>
              </div>
            )}
          </>
        ) : searchPerformed && !loading ? (
          <div
            style={{
              textAlign: 'center',
              padding: spacing['2xl'],
              color: colors.text.secondary,
            }}
          >
            找不到符合的球員
          </div>
        ) : (
          <div
            style={{
              textAlign: 'center',
              padding: spacing['2xl'],
              color: colors.text.secondary,
            }}
          >
            輸入搜尋條件以開始尋找球員
          </div>
        )}
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
          © 2026 Baseball Stats Database. All rights reserved.
        </p>
      </footer>

      {/* Player Detail Modal */}
      <PlayerDetailModal player={selectedPlayer} isOpen={isModalOpen} onClose={handleCloseModal} />
    </main>
  );
}
