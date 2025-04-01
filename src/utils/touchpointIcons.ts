import { 
  Book, 
  DiscordLogo,
  Drop, 
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
  BookOpen,
  UsersThree,
  Newspaper,
  MagnifyingGlass,
  TestTube,
  CodeSimple,
  GearFine,
  Bug,
  ChartBar,
  Bell,
  ChatCircle,
  Handshake,
  PresentationChart,
  Monitor,
  PuzzlePiece,
  MapTrifold,
  FileJs,
  Eye,
  Lifebuoy,
  TwitterLogo,
  AppWindow,
} from '@phosphor-icons/react';

export const getIconForTouchpoint = (touchpoint: string) => {
  const iconMap: { [key: string]: any } = {
    // Social & Community
    'Social': TwitterLogo,
    'Events & Hackathons': Users,
    'Blog': Newspaper,
    'Community': Users,
    'Support': Lifebuoy,

    // Documentation & Resources
    'Docs': BookOpen,
    'Hiro.so': Globe,
    'Stacks.co': Globe,
    'Platform': AppWindow,
    'Templates': PuzzlePiece,
    'Primitives': PuzzlePiece,
    'Examples & Guides': MapTrifold,

    // Development Tools
    'Clarinet': Terminal,
    'Clarity': FileJs,
    'VSCode Extension': Code,
    'Stacks JS': FileJs,
    'Stacks Connect': PuzzlePiece,
    'APIs': Database,
    'Chainhooks': Bell,

    // Testing & Deployment
    'Clarity Playground': TestTube,
    'Explorer': MagnifyingGlass,
    'Explorer Sandbox': TestTube,
    'Testnet': Bug,
    'Devnet': Bug,
    'Faucet': Drop,
    'Security': Shield,
    'Simnet': TestTube,
    'Simulation': TestTube,

    // Monitoring & Analytics
    'Contract Monitoring': Eye,
    'Usage & Analytics': ChartBar,
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