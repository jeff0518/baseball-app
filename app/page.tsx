'use client';

import { useState, useEffect } from 'react';
import { playerApi, Standing, GameSchedule } from './lib/api';
import { colors } from './lib/design-tokens';
import { getTeamInfo } from './lib/teams';
import { PlayerCard } from './components/players/PlayerCard';

// 導入專業 React Icons
import { 
  MdLeaderboard, 
  MdCalendarMonth, 
  MdLocationOn, 
  MdVideoLibrary, 
  MdAnalytics,
  MdPlayArrow
} from 'react-icons/md';
import { FaFire, FaYoutube } from 'react-icons/fa';
import { GiElephant } from 'react-icons/gi'; // 象迷專屬備援圖示

/**
 * 專業隊徽元件 - 使用本地 team_avatar 路徑
 */
function TeamLogoOnly({ team, size = '40px', shadow = true }: { team: string; size?: string; shadow?: boolean }) {
  const info = getTeamInfo(team);
  const [imgError, setImgError] = useState(false);

  return (
    <div style={{ 
      backgroundColor: colors.white, 
      borderRadius: '50%',
      width: size,
      height: size,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      border: `2px solid ${info.primaryColor}55`,
      boxShadow: shadow ? '0 4px 10px rgba(0,0,0,0.1)' : 'none',
      zIndex: 2,
      overflow: 'hidden'
    }}>
      {info.avatarUrl && !imgError ? (
        <img 
          src={info.avatarUrl} 
          alt={team} 
          style={{ width: '85%', height: '85%', objectFit: 'contain' }} 
          onError={() => setImgError(true)}
        />
      ) : (
        <span style={{ fontSize: `calc(${size} * 0.5)` }}>{info.icon}</span>
      )}
    </div>
  );
}

function TeamBadge({ team, size = '1.2rem', showLabel = true }: { team: string; size?: string; showLabel?: boolean }) {
  const info = getTeamInfo(team);
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.8rem' }}>
      <TeamLogoOnly team={team} size="44px" shadow={false} />
      {showLabel && <span style={{ fontWeight: '900', fontSize: size }}>{team}</span>}
    </span>
  );
}

/**
 * 國際化格式的近況標籤 (W/L 標記法)
 */
function StreakBadge({ streak }: { streak: string }) {
  const isWin = streak.includes('勝');
  const match = streak.match(/\d+/);
  const count = match ? match[0] : '1';
  const displayLabel = isWin ? `W${count}` : `L${count}`;
  const color = isWin ? colors.error : colors.success;
  
  return (
    <span style={{ 
      backgroundColor: `${color}15`,
      color: color,
      padding: '4px 14px',
      borderRadius: '20px',
      fontSize: '0.85rem',
      fontWeight: '900',
      border: `1.5px solid ${color}33`,
      display: 'inline-block',
      minWidth: '60px',
      textAlign: 'center',
      letterSpacing: '1px'
    }}>
      {displayLabel}
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
  const [logoError, setLogoError] = useState(false);

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

  const mockVideos = [
    { id: 'NEXrXUiPbUE', title: '【2026】 這不是你想的小紅帽！中信兄弟菜鳥日話劇表演角色抽籤大亂鬥...', thumbnail: 'https://img.youtube.com/vi/NEXrXUiPbUE/hqdefault.jpg' },
    { id: 'v_p68jU-U-Q', title: '【2026】 蠟筆小新？哆啦A夢？兄弟們夢想成為哪個角色呢？', thumbnail: 'https://img.youtube.com/vi/v_p68jU-U-Q/hqdefault.jpg' },
    { id: '8o7T8YyR4W8', title: '【2026】 WBC中華隊左營開訓！鄭浩均當兵漏接通知、江坤宇與卡仔相見...', thumbnail: 'https://img.youtube.com/vi/8o7T8YyR4W8/hqdefault.jpg' },
    { id: 'h2L69kE9Dfk', title: '【2026】 三小象Driveline心得分享，巧遇Carroll訓練：這就是大聯盟的節奏', thumbnail: 'https://img.youtube.com/vi/h2L69kE9Dfk/hqdefault.jpg' },
  ];

  if (loading) {
    return (
      <div style={{ 
        height: '100vh', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: colors.white,
        gap: '2.5rem'
      }}>
        {/* 精緻呼吸動畫 Logo */}
        <div style={{ 
          width: '140px', 
          height: '140px', 
          animation: 'pulse 2s infinite ease-in-out',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative'
        }}>
          {!logoError ? (
            <img 
              src="/derek-logo.png" 
              alt="Loading" 
              style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
              onError={() => setLogoError(true)} 
            />
          ) : (
            <GiElephant size="6rem" color={colors.primary.DEFAULT} />
          )}
          {/* 背景光圈效果 */}
          <div style={{ 
            position: 'absolute', 
            width: '100%', 
            height: '100%', 
            borderRadius: '50%', 
            border: `2px solid ${colors.primary.DEFAULT}`,
            animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
            opacity: 0.5
          }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '280px', height: '6px', backgroundColor: '#f0f0f0', borderRadius: '10px', overflow: 'hidden' }}>
            <div style={{ 
              width: `${progress}%`, 
              height: '100%', 
              backgroundColor: colors.primary.DEFAULT, 
              transition: 'width 0.4s ease-out',
              boxShadow: `0 0 10px ${colors.primary.DEFAULT}`
            }} />
          </div>
          <div style={{ color: colors.secondary.DEFAULT, fontWeight: '900', fontSize: '1.1rem', letterSpacing: '4px', textTransform: 'uppercase' }}>
            戰情加載中 {progress}%
          </div>
        </div>

        <style jsx global>{`
          @keyframes pulse {
            0%, 100% { transform: scale(1); filter: drop-shadow(0 0 0px rgba(252, 207, 0, 0)); }
            50% { transform: scale(1.08); filter: drop-shadow(0 0 15px rgba(252, 207, 0, 0.4)); }
          }
          @keyframes ping {
            75%, 100% { transform: scale(1.5); opacity: 0; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <main style={{ padding: '2rem 3rem', maxWidth: '1700px', margin: '0 auto', backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '2rem', marginBottom: '2.5rem', alignItems: 'stretch' }}>
        
        <section style={{ backgroundColor: colors.white, borderRadius: '24px', padding: '2rem', boxShadow: '0 10px 40px rgba(0,0,0,0.06)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: `4px solid ${colors.primary.DEFAULT}`, paddingBottom: '1rem' }}>
            <h2 style={{ fontSize: '1.6rem', color: colors.secondary.DEFAULT, margin: 0, display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              <MdLeaderboard size="2rem" color={colors.secondary.DEFAULT} /> 聯賽排名
            </h2>
            <div style={{ display: 'flex', gap: '0.4rem', backgroundColor: '#f0f0f0', padding: '5px', borderRadius: '15px' }}>
              {standingTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setStandingPeriod(tab.id)}
                  style={{
                    padding: '0.6rem 1.4rem',
                    borderRadius: '10px',
                    border: 'none',
                    backgroundColor: standingPeriod === tab.id ? colors.white : 'transparent',
                    color: colors.secondary.DEFAULT,
                    boxShadow: standingPeriod === tab.id ? '0 4px 8px rgba(0,0,0,0.1)' : 'none',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    fontSize: '0.9rem',
                    transition: 'all 0.2s'
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
          
          <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 10px' }}>
            <thead>
              <tr style={{ color: '#aaa', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                <th style={{ padding: '0.5rem', textAlign: 'center', width: '60px' }}>排名</th>
                <th style={{ padding: '0.5rem', textAlign: 'center', width: '100px' }}>球隊</th>
                <th style={{ padding: '0.5rem', textAlign: 'center' }}>勝-敗-和</th>
                <th style={{ padding: '0.5rem', textAlign: 'center' }}>勝率</th>
                <th style={{ padding: '0.5rem', textAlign: 'center' }}>勝差</th>
                <th style={{ padding: '0.5rem', textAlign: 'center' }}>近況</th>
              </tr>
            </thead>
            <tbody>
              {standings.map((team, index) => {
                const isBrothers = team.team === '中信兄弟';
                return (
                  <tr 
                    key={team.team} 
                    style={{ 
                      background: isBrothers 
                        ? `linear-gradient(90deg, ${colors.primary.DEFAULT} 0%, ${colors.primary.light} 100%)` 
                        : colors.white,
                      boxShadow: isBrothers ? `0 8px 20px ${colors.primary.DEFAULT}4d` : '0 2px 4px rgba(0,0,0,0.02)',
                      transform: isBrothers ? 'scale(1.02)' : 'scale(1)',
                      zIndex: isBrothers ? 2 : 1,
                      position: 'relative',
                      borderRadius: '15px'
                    }}
                  >
                    <td style={{ padding: '0.8rem', textAlign: 'center', borderRadius: '15px 0 0 15px' }}>
                      <span style={{ 
                        color: isBrothers ? colors.secondary.DEFAULT : '#bbb', 
                        fontSize: isBrothers ? '1.4rem' : '1.1rem',
                        fontWeight: '900'
                      }}>
                        {index + 1}
                      </span>
                    </td>
                    <td style={{ padding: '0.8rem', textAlign: 'center' }}>
                      <TeamBadge team={team.team} showLabel={false} />
                    </td>
                    <td style={{ padding: '0.8rem', textAlign: 'center', fontWeight: isBrothers ? 'bold' : 'normal', color: colors.secondary.DEFAULT }}>
                      {team.won}-{team.lost}-{team.drawn}
                    </td>
                    <td style={{ padding: '0.8rem', textAlign: 'center', fontWeight: 'bold', color: colors.secondary.DEFAULT }}>
                      {team.winRate.toFixed(3)}
                    </td>
                    <td style={{ padding: '0.8rem', textAlign: 'center', fontWeight: isBrothers ? 'bold' : 'normal', color: colors.secondary.DEFAULT }}>
                      {team.gamesBehind}
                    </td>
                    <td style={{ padding: '0.8rem', textAlign: 'center', borderRadius: '0 15px 15px 0' }}>
                      <StreakBadge streak={team.streak} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>

        <section style={{ backgroundColor: colors.secondary.DEFAULT, borderRadius: '24px', padding: '2rem', color: colors.white, boxShadow: '0 15px 50px rgba(11,27,61,0.25)', display: 'flex', flexDirection: 'column' }}>
          <h2 style={{ fontSize: '1.6rem', color: colors.primary.DEFAULT, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <MdCalendarMonth size="2rem" /> 近期賽程
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
            {games.map((game) => {
              const brothersInfo = getTeamInfo('中信兄弟');
              const opponentInfo = getTeamInfo(game.opponent);
              return (
                <div key={game.id} style={{ 
                  background: `linear-gradient(135deg, ${colors.secondary.DEFAULT} 0%, ${opponentInfo.primaryColor}33 100%)`, 
                  borderRadius: '20px', 
                  padding: '1.2rem', 
                  border: '1px solid rgba(255,255,255,0.1)',
                  position: 'relative',
                  overflow: 'hidden',
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center'
                }}>
                  {brothersInfo.officialLogoUrl && (
                    <img src={brothersInfo.officialLogoUrl} alt="" style={{ position: 'absolute', left: '-25px', top: '-25px', width: '180px', height: '180px', opacity: 0.15, zIndex: 0, transform: 'rotate(15deg)', filter: 'grayscale(30%)' }} />
                  )}
                  {opponentInfo.officialLogoUrl && (
                    <img src={opponentInfo.officialLogoUrl} alt="" style={{ position: 'absolute', right: '-25px', bottom: '-25px', width: '180px', height: '180px', opacity: 0.18, zIndex: 0, transform: 'rotate(-15deg)' }} />
                  )}

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', position: 'relative', zIndex: 1 }}>
                    <div style={{ fontSize: '1rem', color: colors.primary.DEFAULT, fontWeight: '900' }}>
                      {game.date} · <span style={{ opacity: 0.8 }}>{game.time}</span>
                    </div>
                    <div style={{ backgroundColor: 'rgba(255,255,255,0.15)', padding: '3px 10px', borderRadius: '15px', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.85rem', color: colors.primary.DEFAULT, fontWeight: 'bold', border: '1px solid rgba(255,255,255,0.05)' }}>
                      <MdLocationOn size="1rem" /> {game.location}
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '2.5rem', position: 'relative', zIndex: 1 }}>
                    <TeamLogoOnly team="中信兄弟" size="65px" />
                    <div style={{ fontSize: '1.5rem', fontWeight: '900', color: 'rgba(255,255,255,0.3)', fontStyle: 'italic' }}>VS</div>
                    <TeamLogoOnly team={game.opponent} size="65px" />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      <section style={{ backgroundColor: colors.white, borderRadius: '24px', padding: '2rem', boxShadow: '0 10px 40px rgba(0,0,0,0.06)', marginBottom: '3rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.6rem', color: colors.secondary.DEFAULT, margin: 0, display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <FaFire size="2rem" color={colors.error} /> 戰將數據
          </h2>
          <div style={{ display: 'flex', backgroundColor: '#f0f0f0', borderRadius: '15px', padding: '5px' }}>
            <button
              onClick={() => setPlayerType('batter')}
              style={{
                padding: '0.8rem 2.5rem',
                borderRadius: '12px',
                border: 'none',
                backgroundColor: playerType === 'batter' ? colors.secondary.DEFAULT : 'transparent',
                color: playerType === 'batter' ? colors.primary.DEFAULT : '#666',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '1rem',
                transition: 'all 0.2s'
              }}
            >
              強攻野手 <MdAnalytics style={{ marginLeft: '0.5rem' }} />
            </button>
            <button
              onClick={() => setPlayerType('pitcher')}
              style={{
                padding: '0.8rem 2.5rem',
                borderRadius: '12px',
                border: 'none',
                backgroundColor: playerType === 'pitcher' ? colors.secondary.DEFAULT : 'transparent',
                color: playerType === 'pitcher' ? colors.primary.DEFAULT : '#666',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '1rem',
                transition: 'all 0.2s'
              }}
            >
              王牌投手 <MdAnalytics style={{ marginLeft: '0.5rem' }} />
            </button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '2rem' }}>
          {featuredPlayers.map((player) => (
            <PlayerCard key={player.playerId} player={player} type={playerType} />
          ))}
        </div>
      </section>

      <section style={{ paddingBottom: '4rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
          <span style={{ color: colors.primary.DEFAULT, fontWeight: 'bold', fontSize: '1rem', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FaYoutube color="#ff0000" /> Video
          </span>
          <h2 style={{ fontSize: '1.8rem', color: colors.secondary.DEFAULT, margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            【爪嗨賴】▸ 全部播放 <MdVideoLibrary size="1.5rem" />
          </h2>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
          {mockVideos.map((video) => (
            <a 
              key={video.id} 
              href={`https://www.youtube.com/watch?v=${video.id}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none', transition: 'transform 0.2s' }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              <div style={{ 
                backgroundColor: colors.primary.DEFAULT, 
                borderRadius: '12px', 
                overflow: 'hidden', 
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)' 
              }}>
                <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9' }}>
                  <img 
                    src={video.thumbnail} 
                    alt={video.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                  <div style={{ 
                    position: 'absolute', 
                    top: '50%', 
                    left: '50%', 
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: 'rgba(255,0,0,0.9)',
                    width: '50px',
                    height: '35px',
                    borderRadius: '10px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'white',
                    fontSize: '1.2rem'
                  }}>
                    <MdPlayArrow />
                  </div>
                </div>
                <div style={{ 
                  padding: '1rem', 
                  height: '80px', 
                  fontSize: '0.9rem', 
                  color: colors.secondary.DEFAULT, 
                  fontWeight: 'bold',
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  lineHeight: '1.4'
                }}>
                  {video.title}
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
