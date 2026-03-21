/**
 * 中職各隊資產管理中心 - 使用本地 public 資料夾下的圖片
 */

export interface TeamInfo {
  id: string;
  name: string;
  shortName: string;
  icon: string;             // 備用 Emoji
  avatarUrl: string;        // 小頭像路徑 (/team_avatar/...)
  officialLogoUrl: string;  // 背景大 Logo 路徑 (/team_official/...)
  primaryColor: string; 
  secondaryColor: string;
}

export const TEAMS: Record<string, TeamInfo> = {
  '中信兄弟': {
    id: 'brothers',
    name: '中信兄弟',
    shortName: '兄弟',
    icon: '🐘',
    avatarUrl: '/team_avatar/caplogo-bothers.png', // 檔名照你資料夾裡的寫法
    officialLogoUrl: '/team_official/brothers_logo.png',
    primaryColor: '#FCCF00',
    secondaryColor: '#002D62',
  },
  '統一獅': {
    id: 'lions',
    name: '統一獅',
    shortName: '統一',
    icon: '🦁',
    avatarUrl: '/team_avatar/caplogo-unil.png',
    officialLogoUrl: '/team_official/unil_logo.png',
    primaryColor: '#FF8C00',
    secondaryColor: '#000000',
  },
  '樂天桃猿': {
    id: 'monkeys',
    name: '樂天桃猿',
    shortName: '樂天',
    icon: '🐵',
    avatarUrl: '/team_avatar/caplogo-rakuten.png',
    officialLogoUrl: '/team_official/rakuten_logo.png',
    primaryColor: '#8B0000',
    secondaryColor: '#FFFFFF',
  },
  '味全龍': {
    id: 'dragons',
    name: '味全龍',
    shortName: '味全',
    icon: '🐲',
    avatarUrl: '/team_avatar/caplogo-dragon.png',
    officialLogoUrl: '/team_official/dragon_logo.png',
    primaryColor: '#ED1C24',
    secondaryColor: '#FFFFFF',
  },
  '富邦悍將': {
    id: 'guardians',
    name: '富邦悍將',
    shortName: '富邦',
    icon: '🛡️',
    avatarUrl: '/team_avatar/caplogo-fubon.png',
    officialLogoUrl: '/team_official/fubon_logo.png',
    primaryColor: '#004A9C',
    secondaryColor: '#FFFFFF',
  },
  '台鋼雄鷹': {
    id: 'hawks',
    name: '台鋼雄鷹',
    shortName: '台鋼',
    icon: '🦅',
    avatarUrl: '/team_avatar/caplogo-hawks.png',
    officialLogoUrl: '/team_official/hawks_logo.png',
    primaryColor: '#006400',
    secondaryColor: '#FFFFFF',
  },
};

export const getTeamInfo = (teamName: string): TeamInfo => {
  return TEAMS[teamName] || {
    id: 'unknown',
    name: teamName,
    shortName: teamName,
    icon: '⚾',
    avatarUrl: '',
    officialLogoUrl: '',
    primaryColor: '#cccccc',
    secondaryColor: '#333333',
  };
};
