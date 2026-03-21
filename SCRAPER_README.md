# CPBL 爬蟲 (CPBL Web Scraper)

## 概述
這個爬蟲模組用於抓取中華職棒(CPBL) 2025年的球隊戰績排行數據。

## 功能
- 從 [Rebas 野球革命](https://www.rebas.tw/season/CPBL-2025-JO/leaderboard?stats=team&section=standard) 網站抓取球隊戰績
- 提取球隊名稱、勝敗場數、勝率、落後場數等信息
- 自動轉換球隊名稱為球隊代碼 (BRO, ENG, LIO, FAG, DMO)

## 技術棧
- **Puppeteer**: 用於渲染 JavaScript 並載入動態內容
- **Cheerio**: 用於解析 HTML 和提取數據

## 安裝依賴
```bash
cd backend
npm install puppeteer cheerio
```

## API 端點

### 獲取 CPBL 球隊戰績
```
GET /scraper/cpbl-standings
```

**響應格式:**
```json
[
  {
    "rank": 1,
    "teamName": "中信兄弟",
    "teamCode": "BRO",
    "wins": 70,
    "losses": 50,
    "draws": 0,
    "gamesPlayed": 120,
    "winRate": "58.3%",
    "gamesBehind": "0",
    "streak": "1L"
  },
  ...
]
```

**字段說明:**
- `rank`: 排名 (1-6)
- `teamName`: 球隊名稱
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
