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
  HardDrive
} from '@phosphor-icons/react';

export const getIconForTouchpoint = (touchpoint: string) => {
  const iconMap: { [key: string]: any } = {
    'Documentation': Book,
    'Discord': DiscordLogo,
    'GitHub': GithubLogo,
    'Developer Tools': Wrench,
    'Code Examples': Code,
    'API Reference': FileCode,
    'Deployment': Rocket,
    'Community': Users,
    'Analytics': ChartLine,
    'Infrastructure': HardDrive,
    'Database': Database,
    'Security': Shield,
    'Support': Question,
    'Resources': Bookmark,
    'Integration': Link,
    'Configuration': Gear,
    'CLI': Terminal,
    'Desktop App': Desktop,
    'Mobile App': DeviceMobile,
    'Web App': Globe
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