"use client";

import { useState, useEffect } from "react";
import { playerApi, Standing, GameSchedule } from "./lib/api";
import { colors } from "./lib/design-tokens";
import { LoadingScreen } from "./components/home/LoadingScreen";
import { StandingsSection } from "./components/home/StandingsSection";
import { ScheduleSection } from "./components/home/ScheduleSection";
import { PlayersSection } from "./components/home/PlayersSection";
import { HighlightsSection } from "./components/home/HighlightsSection";

// 模拟视频数据
const MOCK_VIDEOS = [
  {
    id: "NEXrXUiPbUE",
    title:
      "【2026】 這不是你想的小紅帽！中信兄弟菜鳥日話劇表演角色抽籤大亂鬥...",
    thumbnail: "https://img.youtube.com/vi/NEXrXUiPbUE/hqdefault.jpg",
  },
  {
    id: "v_p68jU-U-Q",
    title: "【2026】 蠟筆小新？哆啦A夢？兄弟們夢想成為哪個角色呢？",
    thumbnail: "https://img.youtube.com/vi/v_p68jU-U-Q/hqdefault.jpg",
  },
  {
    id: "8o7T8YyR4W8",
    title:
      "【2026】 WBC中華隊左營開訓！鄭浩均當兵漏接通知、江坤宇與卡仔相見...",
    thumbnail: "https://img.youtube.com/vi/8o7T8YyR4W8/hqdefault.jpg",
  },
  {
    id: "h2L69kE9Dfk",
    title:
      "【2026】 三小象Driveline心得分享，巧遇Carroll訓練：這就是大聯盟的節奏",
    thumbnail: "https://img.youtube.com/vi/h2L69kE9Dfk/hqdefault.jpg",
  },
];

export default function Home() {
  // 状态管理
  const [standings, setStandings] = useState<Standing[]>([]);
  const [standingPeriod, setStandingPeriod] = useState("full");
  const [games, setGames] = useState<GameSchedule[]>([]);
  const [featuredPlayers, setFeaturedPlayers] = useState<any[]>([]);
  const [playerType, setPlayerType] = useState<"batter" | "pitcher">("batter");
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  // 数据加载
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
        console.error("Failed to fetch data:", error);
        setLoading(false);
      }
    }

    fetchData();
  }, [standingPeriod, playerType]);

  // 加载中显示加载屏幕
  if (loading) {
    return <LoadingScreen progress={progress} />;
  }

  // 主页内容
  return (
    <main className="home-page">
      {/* 上部：排名 + 赛程 */}
      <div className="top-section">
        <StandingsSection
          standings={standings}
          period={standingPeriod}
          onPeriodChange={setStandingPeriod}
        />
        <ScheduleSection games={games} />
      </div>

      {/* 中部：战将数据 */}
      <div className="content-wrapper">
        <PlayersSection
          players={featuredPlayers}
          playerType={playerType}
          onTypeChange={setPlayerType}
        />
      </div>

      {/* 下部：精彩回顾 */}
      <div className="content-wrapper">
        <HighlightsSection videos={MOCK_VIDEOS} />
      </div>

      <style jsx>{`
        .home-page {
          padding: clamp(1rem, 5vw, 3rem) 0;
          background-color: ${colors.background};
          min-height: 100vh;
        }

        .top-section {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          margin-bottom: 2.5rem;
          padding: 0 clamp(1rem, 3vw, 2rem);
        }

        .content-wrapper {
          padding: 0 clamp(1rem, 3vw, 2rem);
          margin-bottom: 2.5rem;
        }

        @media (min-width: 768px) {
          .top-section {
            grid-template-columns: 1.4fr 1fr;
          }
        }
      `}</style>
    </main>
  );
}
