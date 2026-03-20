# ⚾ 台灣棒球統計資料庫

一個全棧棒球迷網站，提供台灣職棒球員的詳細統計數據。該項目包括前端（Next.js）、後端（NestJS）和資料庫（PostgreSQL）的完整實現。

## 功能特性

### 🎯 首頁（主介面）
- ⭐ Hero Section - 引人入勝的歡迎區域
- 📊 Quick Stats - 快速統計摘要（總球員數、聯盟、最新更新）
- 🏆 Featured Players - 精選球員卡片展示
- 🎨 優雅的設計（主色 #FCCF00、副色 #0B1B3D）

### 🔍 球員搜尋
- 按名稱或背號搜尋
- 多種排序選項（名稱、全壘打、打點、打擊率）
- 分頁顯示
- 球員詳細信息模態框

### 📈 球員統計
- 打者統計（打席、打數、安打、全壘打、得分、打點等）
- 投手統計（防禦率、奪三振、被安打等）
- 計算統計（打擊率 AVG、上壘率 OBP、長打率 SLG、OPS）
- 比賽記錄

## 技術棧

### 前端
- **框架**：Next.js 16 + React 19
- **語言**：TypeScript
- **樣式**：Tailwind CSS (原生 CSS-in-JS)
- **組件**：自製設計系統組件

### 後端
- **框架**：NestJS 11
- **資料庫**：PostgreSQL with TypeORM
- **驗證**：class-validator, class-transformer

### 部署
- **前端**：Vercel
- **後端**：Vercel Serverless Functions 或獨立伺服器
- **資料庫**：Vercel Postgres 或 Supabase

## 快速開始

### 安裝依賴

```bash
# 安裝前端和根依賴
npm install

# 安裝後端依賴
cd backend && npm install
cd ..
```

### 開發模式

```bash
# 開發前端（http://localhost:3000）
npm run dev

# 開發後端（http://localhost:3001）
npm run dev:backend
```

### 建置

```bash
# 建置前端
npm run build

# 建置後端
npm run build:backend
```

### 生產環境

```bash
# 前端
npm start

# 後端
npm run start:backend
```

## 環境設置

### 開發環境 (`.env.local`)
```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### 生產環境 (`.env.production`)
```
NEXT_PUBLIC_API_URL=https://baseball-app-api.vercel.app
```

### 後端環境 (`backend/.env`)
```
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_NAME=baseball_db
PORT=3001
```

## 專案結構

```
baseball-app/
├── app/                          # Next.js 前端
│   ├── components/
│   │   ├── layout/
│   │   │   └── Navigation.tsx
│   │   └── players/
│   │       ├── PlayerCard.tsx
│   │       └── PlayerDetailModal.tsx
│   ├── lib/
│   │   ├── api.ts                # API 客戶端
│   │   └── design-tokens.ts      # 設計系統
│   ├── search/                   # 搜尋頁面
│   ├── about/                    # 關於頁面
│   ├── page.tsx                  # 首頁
│   └── layout.tsx
│
├── backend/                      # NestJS 後端
│   ├── src/
│   │   ├── entities/             # 數據庫表結構
│   │   │   ├── batter-stats.entity.ts
│   │   │   ├── pitcher-stats.entity.ts
│   │   │   └── game-record.entity.ts
│   │   ├── modules/
│   │   │   └── players/          # 球員模塊
│   │   ├── config/               # 配置
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── package.json
│   └── tsconfig.json
│
├── package.json
└── tsconfig.json
```

## API 端點

### 球員相關
- `GET /api/players` - 獲取所有球員（分頁）
  - 參數：`page`, `limit`
- `GET /api/players/search?keyword=xxx` - 搜尋球員
- `GET /api/players/:id` - 獲取球員信息
- `GET /api/players/:id/stats` - 獲取球員統計（含計算值）

## 設計系統

### 色彩配置
- **主色**：#FCCF00 (金色)
- **副色**：#0B1B3D (深藍)
- **背景**：#F8F9FA (淺灰)
- **邊框**：#E5E7EB
- **成功**：#10B981
- **警告**：#F59E0B
- **錯誤**：#EF4444

### 排版
- 標題：1.5rem - 3.5rem
- 正文：1rem
- 標籤：0.875rem

## 數據表結構

### BatterStats (打者統計)
- playerId, playerNumber, playerName
- PA, AB, H, 2B, 3B, HR, R, RBI
- BB, IBB, HBP, SO, SH, SF, E, SB, CS

### PitcherStats (投手統計)
- playerId, playerNumber, playerName
- IPOuts, BF, H, HR, BB, IBB, HB, SO, R, ER

### GameRecord (比賽記錄)
- pitcherName, batterName, gameDate, inning
- result, isHit, isAB, bases, rbi

## 下一步行動

- [ ] 配置 PostgreSQL 資料庫
- [ ] 開發 rebas.tw 爬蟲
- [ ] 集成定時任務調度
- [ ] 部署到 Vercel
- [ ] 性能優化和快取策略
- [ ] 用戶帳戶和收藏功能

## 貢獻指南

歡迎提交 Issue 和 Pull Request！

## License

MIT

## 資料來源

- 所有統計數據來自 [rebas.tw](https://www.rebas.tw/)
- 資料每天定時自動更新

---

**作者**：由 GitHub Copilot 協助開發  
**建立時間**：2026年3月20日

