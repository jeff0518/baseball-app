"use client";

import { useState, useEffect } from "react";
import { playerApi, Standing, GameSchedule, Player, YouTubeVideo } from "./lib/api";

import { LoadingScreen } from "./components/home/LoadingScreen";
import { StandingsSection } from "./components/home/StandingsSection";
import { ScheduleSection } from "./components/home/ScheduleSection";
import { PlayersSection } from "./components/home/PlayersSection";
import { HighlightsSection } from "./components/home/HighlightsSection";
import styles from "./page.module.css";

export default function Home() {
  // 状态管理
  const [standings, setStandings] = useState<Standing[]>([]);
  const [standingPeriod, setStandingPeriod] = useState("full");
  const [games, setGames] = useState<GameSchedule[]>([]);
  const [featuredPlayers, setFeaturedPlayers] = useState<Player[]>([]);
  const [playerType, setPlayerType] = useState<"batter" | "pitcher">("batter");
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  // 数据加载
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setProgress(20);

      try {
        const [standingsData, gamesData, playersData, videosData] = await Promise.all([
          playerApi.getStandings(standingPeriod),
          playerApi.getUpcomingGames(),
          playerApi.getFeaturedPlayers(playerType),
          playerApi.getLatestVideos(3),
        ]);

        setProgress(70);
        setStandings(standingsData);
        setGames(gamesData);
        setFeaturedPlayers(playersData);
        setVideos(videosData);
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
    <main className={styles.homePage}>
      {/* 上部：排名 + 赛程 */}
      <div className={styles.topSection}>
        <StandingsSection
          standings={standings}
          period={standingPeriod}
          onPeriodChange={setStandingPeriod}
        />
        <ScheduleSection games={games} />
      </div>

      {/* 中部：战将数据 */}
      <div className={styles.contentWrapper}>
        <PlayersSection
          players={featuredPlayers}
          playerType={playerType}
          onTypeChange={setPlayerType}
        />
      </div>

      {/* 下部：精彩回顾 */}
      <div className={styles.contentWrapper}>
        <HighlightsSection videos={videos} />
      </div>
    </main>
  );
}
