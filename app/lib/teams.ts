/**
 * 中職各隊資產管理中心
 * 如果你想更換球隊的圖示 (Icon) 或圖片 (Logo)，請在此檔案修改。
 */

export interface TeamInfo {
  id: string;
  name: string;
  shortName: string;
  icon: string;         // 目前使用 Emoji，未來可替換為圖片路徑
  logoUrl?: string;     // 預留給真正的圖片路徑，例如 '/images/logos/brothers.png'
  primaryColor: string; // 球隊主色
  secondaryColor: string; // 球隊副色
}

export const TEAMS: Record<string, TeamInfo> = {
  '中信兄弟': {
    id: 'brothers',
    name: '中信兄弟',
    shortName: '兄弟',
    icon: '🐘',
    primaryColor: '#FFD700',
    secondaryColor: '#002D62',
  },
  '統一獅': {
    id: 'lions',
    name: '統一獅',
    shortName: '統一',
    icon: '🦁',
    primaryColor: '#FF8C00',
    secondaryColor: '#000000',
  },
  '樂天桃猿': {
    id: 'monkeys',
    name: '樂天桃猿',
    shortName: '樂天',
    icon: '🐵',
    primaryColor: '#8B0000',
    secondaryColor: '#FFFFFF',
  },
  '味全龍': {
    id: 'dragons',
    name: '味全龍',
    shortName: '味全',
    icon: '🐲',
    primaryColor: '#ED1C24',
    secondaryColor: '#FFFFFF',
  },
  '富邦悍將': {
    id: 'guardians',
    name: '富邦悍將',
    shortName: '富邦',
    icon: '🛡️',
    primaryColor: '#004A9C',
    secondaryColor: '#FFFFFF',
  },
  '台鋼雄鷹': {
    id: 'hawks',
    name: '台鋼雄鷹',
    shortName: '台鋼',
    icon: '🦅',
    primaryColor: '#006400',
    secondaryColor: '#FFFFFF',
  },
};

/**
 * 根據球隊名稱獲取球隊資訊的輔助函數
 */
export const getTeamInfo = (teamName: string): TeamInfo => {
  return TEAMS[teamName] || {
    id: 'unknown',
    name: teamName,
    shortName: teamName,
    icon: '⚾',
    primaryColor: '#cccccc',
    secondaryColor: '#333333',
  };
};
