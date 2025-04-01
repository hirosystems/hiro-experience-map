import { 
  Book, 
  DiscordLogo, 
  GithubLogo, 
  Wrench, 
  Code, 
  FileCode, 
  Rocket, 
  Users, 
  ChartLine, 
  Database, 
  Shield, 
  Question, 
  Bookmark, 
  Link, 
  Gear, 
  Terminal, 
  Desktop, 
  DeviceMobile, 
  Globe,
  HardDrive,
  BookBookmark,
  BookOpen
} from '@phosphor-icons/react';

export const getIconForTouchpoint = (touchpoint: string) => {
  const iconMap: { [key: string]: any } = {
    'Docs': BookOpen,
    'Discord': DiscordLogo,
    'Community': Users,
    'Infrastructure': HardDrive,
    'Database': Database,
    'Clarinet': Terminal,
    'Platform': Desktop,
    'Hiro.so': Globe
  };

  // Try to find an exact match
  if (iconMap[touchpoint]) {
    return iconMap[touchpoint];
  }

  // Try to find a partial match
  for (const [key, icon] of Object.entries(iconMap)) {
    if (touchpoint.toLowerCase().includes(key.toLowerCase())) {
      return icon;
    }
  }

  // Default icon if no match is found
  return Question;
}; 