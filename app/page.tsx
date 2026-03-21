'use client';

import { useState, useEffect } from 'react';
import { playerApi, Standing, GameSchedule } from './lib/api';
import { colors } from './lib/design-tokens';
import { getTeamInfo } from './lib/teams';
import { PlayerCard } from './components/players/PlayerCard';

function TeamBadge({ team, size = '1.2rem' }: { team: string; size?: string }) {
  const info = getTeamInfo(team);
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
      <span style={{ 
        fontSize: size, 
        backgroundColor: `${info.primaryColor}22`, 
        padding: '4px', 
        borderRadius: '50%',
        width: '32px',
        height: '32px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: `1px solid ${info.primaryColor}44`
      }}>
        {info.icon}
      </span>
      <span>{team}</span>
    </span>
  );
}

export default function Home() {
  const [standings, setStandings] = useState<Standing[]>([]);
  const [standingPeriod, setStandingPeriod] = useState('full');
  const [games, setGames] = useState<GameSchedule[]>([]);
  const [featuredPlayers, setFeaturedPlayers] = useState<any[]>([]);
  const [playerType, setPlayerType] = useState<'batter' | 'pitcher'>('batter');
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setProgress(20);
      try {
        const [standingsData, gamesData, playersData] = await Promise.all([
          playerApi.getStandings(standingPeriod),
          playerApi.getUpcomingGames(),
          playerApi.getFeaturedPlayers(playerType),
        ]);
        setProgress(70);
        setStandings(standingsData);
        setGames(gamesData);
        setFeaturedPlayers(playersData);
        setProgress(100);
        setTimeout(() => setLoading(false), 500);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        setLoading(false);
      }
    }
    fetchData();
  }, [standingPeriod, playerType]);

  const standingTabs = [
    { id: 'full', label: '全年度' },
    { id: 'first', label: '上半季' },
    { id: 'second', label: '下半季' },
  ];

  if (loading) {
    return (
      <div style={{ 
        height: '80vh', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center',
        gap: '2rem'
      }}>
        <div style={{ fontSize: '4rem', animation: 'bounce 1s infinite' }}>⚾</div>
        <div style={{ width: '300px', height: '12px', backgroundColor: '#eee', borderRadius: '10px', overflow: 'hidden', position: 'relative' }}>
          <div style={{ 
            width: `${progress}%`, 
            height: '100%', 
            backgroundColor: colors.primary, 
            transition: 'width 0.3s ease-out',
            borderRadius: '10px'
          }} />
        </div>
        <div style={{ color: colors.secondary, fontWeight: 'bold', fontSize: '1.2rem', letterSpacing: '2px' }}>
          正在熱身中... {progress}%
        </div>
        <style jsx global>{`
          @keyframes bounce {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <main style={{ padding: '2rem 3rem', maxWidth: '1600px', margin: '0 auto', backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
        
        {/* 各隊戰績 */}
        <section style={{ backgroundColor: colors.white, borderRadius: '16px', padding: '1.5rem', boxShadow: '0 8px 30px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: `3px solid ${colors.primary}`, paddingBottom: '0.8rem' }}>
            <h2 style={{ fontSize: '1.4rem', color: colors.secondary, margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '1.6rem' }}>📈</span> 戰情排名
            </h2>
            <div style={{ display: 'flex', gap: '0.3rem', backgroundColor: '#f0f0f0', padding: '4px', borderRadius: '12px' }}>
              {standingTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setStandingPeriod(tab.id)}
                  style={{
                    padding: '0.5rem 1.2rem',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: standingPeriod === tab.id ? colors.white : 'transparent',
                    color: colors.secondary,
                    boxShadow: standingPeriod === tab.id ? '0 2px 4px rgba(0,0,0,0.1)' : 'none',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    fontSize: '0.85rem',
                    transition: 'all 0.2s'
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
          
          <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 8px', textAlign: 'left' }}>
            <thead>
              <tr style={{ color: '#888', fontSize: '0.85rem' }}>
                <th style={{ padding: '0.5rem 1rem' }}>排名 / 球隊</th>
                <th style={{ padding: '0.5rem' }}>已賽</th>
                <th style={{ padding: '0.5rem' }}>勝-敗-和</th>
                <th style={{ padding: '0.5rem' }}>勝率</th>
                <th style={{ padding: '0.5rem' }}>勝差</th>
                <th style={{ padding: '0.5rem' }}>近況</th>
              </tr>
            </thead>
            <tbody>
              {standings.map((team, index) => (
                <tr 
                  key={team.team} 
                  style={{ 
                    backgroundColor: team.team === '中信兄弟' ? `${colors.primary}15` : '#fff',
                    transition: 'transform 0.2s',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.02)'
                  }}
                >
                  <td style={{ padding: '0.8rem 1rem', borderRadius: '10px 0 0 10px', fontWeight: 'bold' }}>
                    <span style={{ marginRight: '1rem', color: '#aaa', fontSize: '0.8rem' }}>{index + 1}</span>
                    <TeamBadge team={team.team} />
                  </td>
                  <td style={{ padding: '0.8rem 0.5rem' }}>{team.played}</td>
                  <td style={{ padding: '0.8rem 0.5rem' }}>{team.won}-{team.lost}-{team.drawn}</td>
                  <td style={{ padding: '0.8rem 0.5rem', fontWeight: 'bold' }}>{team.winRate.toFixed(3)}</td>
                  <td style={{ padding: '0.8rem 0.5rem' }}>{team.gamesBehind}</td>
                  <td style={{ padding: '0.8rem 1rem', borderRadius: '0 10px 10px 0' }}>
                    <span style={{ 
                      backgroundColor: team.streak.includes('勝') ? '#ff4d4f22' : '#1890ff22',
                      color: team.streak.includes('勝') ? '#cf1322' : '#096dd9',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      fontSize: '0.75rem',
                      fontWeight: 'bold'
                    }}>
                      {team.streak}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* 右側欄：賽程 + YouTube 直播/訪問 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* 近期賽程 */}
          <section style={{ backgroundColor: colors.secondary, borderRadius: '16px', padding: '1.5rem', color: colors.white, boxShadow: '0 10px 40px rgba(11,27,61,0.2)' }}>
            <h2 style={{ fontSize: '1.4rem', color: colors.primary, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>📅</span> 下三場預告
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              {games.map((game) => {
                const teamInfo = getTeamInfo(game.opponent);
                return (
                  <div key={game.id} style={{ 
                    backgroundColor: 'rgba(255,255,255,0.08)', 
                    borderRadius: '12px', 
                    padding: '1.2rem', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    <div style={{ position: 'absolute', right: '-10px', top: '-10px', fontSize: '4rem', opacity: 0.1 }}>
                      {teamInfo.icon}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: colors.primary, fontWeight: 'bold', marginBottom: '0.5rem' }}>
                      {game.date} · {game.time}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>VS</div>
                        <TeamBadge team={game.opponent} size="1.4rem" />
                      </div>
                    </div>
                    <div style={{ marginTop: '0.8rem', display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#aaa' }}>
                      <span>📍 {game.location}</span>
                      <span style={{ color: game.isHome ? colors.primary : '#fff' }}>
                        {game.isHome ? '🏠 洲際主場' : '🚌 遠征客場'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* YouTube 嵌入區塊 */}
          <section style={{ backgroundColor: colors.white, borderRadius: '16px', padding: '1.2rem', boxShadow: '0 8px 30px rgba(0,0,0,0.05)' }}>
            <h2 style={{ fontSize: '1.2rem', color: colors.secondary, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: '#ff0000' }}>📺</span> 兄弟最新訪問
            </h2>
            <div style={{ 
              width: '100%', 
              aspectRatio: '16/9', 
              backgroundColor: '#000', 
              borderRadius: '12px', 
              overflow: 'hidden',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}>
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/videoseries?list=PL_Xq989f_VnOInlM6G7i7W6zY8EunG8Hh"
                title="CTBC Brothers Latest Videos"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
            <div style={{ marginTop: '0.8rem', textAlign: 'right' }}>
              <a 
                href="https://www.youtube.com/@CTBCBrothersOfficial/videos" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ fontSize: '0.8rem', color: '#ff0000', fontWeight: 'bold', textDecoration: 'none' }}
              >
                前往官方頻道 →
              </a>
            </div>
          </section>
        </div>
      </div>

      <section style={{ backgroundColor: colors.white, borderRadius: '16px', padding: '1.5rem', boxShadow: '0 8px 30px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.4rem', color: colors.secondary, margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.6rem' }}>🔥</span> 焦點球員
          </h2>
          <div style={{ display: 'flex', backgroundColor: '#f0f0f0', borderRadius: '12px', padding: '4px' }}>
            <button
              onClick={() => setPlayerType('batter')}
              style={{
                padding: '0.6rem 2rem',
                borderRadius: '10px',
                border: 'none',
                backgroundColor: playerType === 'batter' ? colors.secondary : 'transparent',
                color: playerType === 'batter' ? colors.primary : '#666',
                cursor: 'pointer',
                fontWeight: 'bold',
                transition: 'all 0.2s'
              }}
            >
              強攻野手 ⚾
            </button>
            <button
              onClick={() => setPlayerType('pitcher')}
              style={{
                padding: '0.6rem 2rem',
                borderRadius: '10px',
                border: 'none',
                backgroundColor: playerType === 'pitcher' ? colors.secondary : 'transparent',
                color: playerType === 'pitcher' ? colors.primary : '#666',
                cursor: 'pointer',
                fontWeight: 'bold',
                transition: 'all 0.2s'
              }}
            >
              王牌投手 💎
            </button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
          {featuredPlayers.map((player) => (
            <PlayerCard key={player.playerId} player={player} />
          ))}
        </div>
      </section>
    </main>
  );
}
