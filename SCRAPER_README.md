# CPBL 爬蟲系統 (CPBL Web Scraper System)

## 🎯 概述

這是一個完整的 CPBL（中華職棒）2025年賽季戰績爬蟲和 API 系統，包括：
- **後端爬蟲**: Puppeteer + Cheerio 自動從 Rebas 官網抓取球隊戰績
- **資料庫**: PostgreSQL 存儲當前排名和每日快照
- **定時任務**: 每日 12:00 自動執行爬蟲
- **API 端點**: RESTful 接口供前端調用

## 🏗️ 系統架構

```
┌─────────────────┐
│   Frontend      │  (Next.js)
│   (localhost    │
│     :3000)      │
└────────┬────────┘
         │
         ↓ API calls
┌────────────────────────────────┐
│   NestJS Backend               │
│   (localhost:3001)             │
├────────────────────────────────┤
│ ┌──────────────────────────┐   │
│ │  ScraperModule           │   │
│ │  • Puppeteer/Cheerio     │   │
│ │  • @Cron (每天12:00)     │   │
│ │  • 資料轉換              │   │
│ └──────────────────────────┘   │
│ ┌──────────────────────────┐   │
│ │  API Controller          │   │
│ │  • GET /standings/current│   │
│ │  • GET /standings/history│   │
│ │  • GET /standings/scrape │   │
│ └──────────────────────────┘   │
└────────┬───────────────────────┘
         │
         ↓ TypeORM
┌────────────────────────────────┐
│   PostgreSQL (Docker)          │
│   - teams (6支球隊)            │
│   - season (CPBL-2025)         │
│   - team_standings (目前排名)  │
│   - team_standings_history     │
│     (每日快照 24筆)            │
└────────────────────────────────┘
```

## 🚀 快速開始

### 1. 啟動 Docker 資料庫
```bash
docker-compose up -d
```
確認容器運行：
```bash
docker ps
```

### 2. 啟動後端
```bash
cd backend
npm run dev
```
後端會在 `http://localhost:3001`

### 3. 啟動前端
```bash
npm run dev
```
前端會在 `http://localhost:3000`

## 📊 API 端點

### 獲取當前戰績
```bash
GET http://localhost:3001/standings/current
```

**回應範例:**
```json
{
  "data": [
    {
      "rank": 1,
      "teamId": "BRO",
      "teamName": "中信兄弟",
      "wins": 70,
      "losses": 50,
      "draws": 0,
      "winRate": "58.3%",
      "gamesBehind": "0.0",
      "streak": "1L"
    },
    ...
  ],
  "timestamp": "2026-03-21T08:32:18.031Z",
  "season": "CPBL-2025"
}
```

### 查詢歷史紀錄
```bash
GET http://localhost:3001/standings/history?teamId=BRO&limit=10
```

### 手動觸發爬蟲
```bash
GET http://localhost:3001/standings/scrape-now
```

## 🗄️ 使用 Docker 查詢資料

### 查看所有表格
```bash
docker exec -it baseball-app-db psql -U baseball_user -d baseball_app -c "\dt"
```

### 查看球隊資料
```bash
docker exec -it baseball-app-db psql -U baseball_user -d baseball_app -c "SELECT * FROM teams;"
```

### 查看當前排名
```bash
docker exec -it baseball-app-db psql -U baseball_user -d baseball_app -c 'SELECT rank, team_id, wins, losses, "winRate", "gamesBehind" FROM team_standings ORDER BY rank;'
```

### 進入互動式查詢
```bash
docker exec -it baseball-app-db psql -U baseball_user -d baseball_app
```

## ⏰ 定時爬蟲

爬蟲會在**每天 12:00** 自動執行，透過 `@Cron('0 12 * * *')` 裝飾器實現。

**運作流程:**
1. 使用 Puppeteer 載入 Rebas 官網
2. 等待 `table` 選擇器出現 (networkidle2)
3. 用 Cheerio 解析 HTML
4. 提取球隊資料（排名、勝敗、勝率等）
5. 自動轉換球隊名稱為代碼 (BRO, RAK, UNI, FUB, TSG, WDR)
6. **更新** `team_standings` 表（當前排名，upsert)
7. **插入** `team_standings_history` 表（歷史快照）

## 🔄 資料流程

```
Rebas 官網
    ↓
Puppeteer 加載頁面
    ↓
Cheerio 解析 HTML
    ↓
提取原始數據
    ↓
資料轉換 (例: "58.3%" → 0.583)
    ↓
存入資料庫
    ├─ team_standings (當前)
    └─ team_standings_history (歷史)
```

## 📁 檔案結構

```
backend/
├── src/
│   ├── app.module.ts              # 主模組，設定 TypeORM + ScheduleModule
│   ├── entities/
│   │   ├── team.entity.ts         # 球隊表
│   │   ├── season.entity.ts       # 賽季表
│   │   ├── team-standing.entity.ts    # 當前排名
│   │   └── team-standings-history.entity.ts  # 歷史快照
│   ├── modules/
│   │   └── scraper/
│   │       ├── scraper.service.ts  # 爬蟲邏輯
│   │       ├── scraper.controller.ts   # API 端點
│   │       └── dto/
│   │           ├── standings.dto.ts    # 資料類型定義
│   │           └── standings.mapper.ts # 資料轉換
│   └── seed.ts                    # 初始化腳本
├── .env.local                     # 資料庫設定
└── ormconfig.ts                   # TypeORM 設定
```

## 🔧 技術棧

- **Framework**: NestJS 9 + TypeORM 0.2
- **爬蟲**: Puppeteer + Cheerio
- **資料庫**: PostgreSQL 15
- **定時任務**: @nestjs/schedule
- **前端**: Next.js 15 + React
- **容器化**: Docker + docker-compose

## ✅ 已完成功能

- [x] Web 爬蟲 (Puppeteer + Cheerio)
- [x] 資料庫架構 (PostgreSQL)
- [x] 定時任務 (每日 12:00)
- [x] API 端點 (3個)
- [x] 前端集成 (使用真實 API)
- [x] Docker 本地開發環境
- [x] Seed 腳本 (初始化 6 支球隊)

## 🔮 未來計畫

1. 近期賽程爬蟲 (schedule/upcoming)
2. 球員統計爬蟲 (players/stats)
3. API 文件生成 (Swagger)
4. 單元測試
5. 部署到 AWS/GCP

- `teamCode`: 球隊代碼
- `wins`: 勝場
- `losses`: 敗場
- `draws`: 平手
- `gamesPlayed`: 比賽場數
- `winRate`: 勝率
- `gamesBehind`: 落後首名場數
- `streak`: 近期戰績 (連勝/連敗)

## 球隊代碼
| 代碼 | 球隊名稱 |
|------|---------|
| BRO | 中信兄弟 |
| ENG | 樂天桃猿 |
| LIO | 統一獅 |
| FAG | 富邦悍將 |
| DMO | 臺鋼雄鷹 |

## 使用範例

### 在 NestJS 應用中使用
```typescript
import { ScraperService } from './modules/scraper/scraper.service';

@Injectable()
export class MyService {
  constructor(private scraperService: ScraperService) {}

  async getStandings() {
    return await this.scraperService.scrapeTeamStandings();
  }
}
```

### 通過 HTTP API 使用
```bash
curl http://localhost:3001/scraper/cpbl-standings
```

## 性能考慮
- 首次抓取可能需要 10-30 秒，因為需要啟動瀏覽器並加載頁面
- 建議在生產環境中添加緩存機制
- 考慮定時更新數據而不是每次都抓取

## 錯誤處理
如果爬蟲失敗，將返回以下錯誤信息:
- `Failed to scrape CPBL standings`: 爬蟲執行失敗
- `No standings data found in the page`: 頁面結構變更，無法找到數據

## 限制
- 依賴目標網站的 HTML 結構，如果網站更新可能需要調整選擇器
- Puppeteer 需要較多系統資源，在服務器環境中需要考慮資源限制
- 不支持歷史數據查詢，只能獲取當前季度的數據

## 未來改進
- [ ] 添加緩存機制以減少 API 調用
- [ ] 支持多個 CPBL 賽季的數據
- [ ] 添加個別球隊詳細統計
- [ ] 實現定時更新機制
- [ ] 添加數據庫存儲
