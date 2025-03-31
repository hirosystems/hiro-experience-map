import { StageData } from '../types';

export const stages: StageData[] = [
  {
    title: 'Discovery',
    color: '#E8F5E9',
    stage: [
      'About Stacks',
      'Blockchain Mechanics',
      'Web3 Development'
    ],
    actions: [
      'Initial research',
      'Explore documentation',
      'Join community'
    ],
    touchpoints: [
      'Stacks Documentation',
      'Discord Community',
      'Developer Tools'
    ],
    painPoints: [
      {
        title: 'Information Overload',
        description: 'Too much initial information to process'
      },
      {
        title: 'Getting Started',
        description: 'Unclear entry points for different user types'
      }
    ]
  },
  {
    title: 'Research: Stacks & Hiro',
    color: '#E3F2FD',
    stage: [
      'Smart Stacks Use Cases',
      'Hiro Platform Overview',
      'Development Tools'
    ],
    actions: [
      'Review documentation',
      'Explore example projects',
      'Understand architecture'
    ],
    touchpoints: [
      'Hiro Dev Tools',
      'Stacks API',
      'GitHub Repositories'
    ],
    painPoints: [
      {
        title: 'Documentation Gaps',
        description: 'Some areas lack detailed documentation'
      },
      {
        title: 'Version Compatibility',
        description: 'Understanding which versions of tools work together'
      }
    ]
  },
  {
    title: 'Evaluate: The Stacks Ecosystem',
    color: '#F3E5F5',
    stage: [
      'Stacks API Resources',
      'Third-Party Applications',
      'Integration Options',
      'Ecosystem Partners'
    ],
    actions: [
      'Evaluate API endpoints',
      'Research integration options',
      'Review partner solutions'
    ],
    touchpoints: [
      'API Documentation',
      'Integration Guides',
      'Partner Directory'
    ],
    painPoints: [
      {
        title: 'Ecosystem Complexity',
        description: 'Many components and services to understand'
      },
      {
        title: 'Integration Clarity',
        description: 'Unclear how different parts of ecosystem work together'
      }
    ]
  },
  {
    title: 'Evaluate: Tooling & Resources',
    color: '#FFF3E0',
    stage: [
      'Tools and Explorer',
      'Stacks API Documentation',
      'SDKs and Libraries'
    ],
    actions: [
      'Review available tools',
      'Assess SDK capabilities',
      'Evaluate development resources'
    ],
    touchpoints: [
      'Stacks Explorer',
      'Development SDKs',
      'API Documentation'
    ],
    painPoints: [
      {
        title: 'Tool Selection',
        description: 'Difficulty choosing between available tools'
      },
      {
        title: 'Resource Availability',
        description: 'Some tools lack comprehensive documentation'
      }
    ]
  },
  {
    title: 'Learn: Examples & Tutorials',
    color: '#E8EAF6',
    stage: [
      'Basic smart contract development',
      'Stacks integration',
      'Development workflow'
    ],
    actions: [
      'Follow tutorials',
      'Practice coding',
      'Build sample projects'
    ],
    touchpoints: [
      'Tutorial Documentation',
      'Sample Code',
      'Learning Resources'
    ],
    painPoints: [
      {
        title: 'Example Relevance',
        description: 'Finding examples that match specific use cases'
      },
      {
        title: 'Learning Curve',
        description: 'Steep learning curve for complex concepts'
      }
    ]
  },
  {
    title: 'Experiment: Test Project',
    color: '#E0F2F1',
    stage: [
      'Initial project architecture',
      'Testing environment setup',
      'Basic implementation'
    ],
    actions: [
      'Set up development environment',
      'Create test project',
      'Implement basic features'
    ],
    touchpoints: [
      'Development Environment',
      'Testing Framework',
      'Code Editor'
    ],
    painPoints: [
      {
        title: 'Local Setup',
        description: 'Challenges with local development environment'
      },
      {
        title: 'Testing Limitations',
        description: 'Uncertainty about testing best practices'
      }
    ]
  },
  {
    title: 'Build: Project Planning',
    color: '#FCE4EC',
    stage: [
      'Define project scope',
      'Plan architecture',
      'Set development milestones'
    ],
    actions: [
      'Create project plan',
      'Define requirements',
      'Set up project structure'
    ],
    touchpoints: [
      'Project Management Tools',
      'Documentation',
      'Planning Templates'
    ],
    painPoints: [
      {
        title: 'Scope Definition',
        description: 'Difficulty in defining MVP scope'
      },
      {
        title: 'Architecture Decisions',
        description: 'Choosing the right architectural patterns'
      }
    ]
  },
  {
    title: 'Build: Setup & Configuration',
    color: '#F1F8E9',
    stage: [
      'Environment setup',
      'Tool configuration',
      'Initial project setup'
    ],
    actions: [
      'Configure development environment',
      'Set up build process',
      'Initialize project structure'
    ],
    touchpoints: [
      'Development Tools',
      'Build Scripts',
      'Configuration Files'
    ],
    painPoints: [
      {
        title: 'Initial Configuration',
        description: 'Complex setup requirements'
      },
      {
        title: 'Environment Issues',
        description: 'Inconsistencies between environments'
      }
    ]
  },
  {
    title: 'Build: Core Development',
    color: '#E1F5FE',
    stage: [
      'Core feature development',
      'Integration implementation',
      'Testing and debugging'
    ],
    actions: [
      'Implement features',
      'Write tests',
      'Debug and optimize'
    ],
    touchpoints: [
      'IDE',
      'Testing Tools',
      'Debugging Tools'
    ],
    painPoints: [
      {
        title: 'Debug Challenges',
        description: 'Limited debugging tools and information'
      },
      {
        title: 'Performance Optimization',
        description: 'Unclear performance bottlenecks'
      }
    ]
  },
  {
    title: 'Build: Validate & Iterate',
    color: '#F3E5F5',
    stage: [
      'Testing implementation',
      'Gathering feedback',
      'Iterative improvements'
    ],
    actions: [
      'Run tests',
      'Collect feedback',
      'Make improvements'
    ],
    touchpoints: [
      'Testing Framework',
      'Feedback Tools',
      'Version Control'
    ],
    painPoints: [
      {
        title: 'Validation Process',
        description: 'Uncertainty in validation approaches'
      },
      {
        title: 'Feedback Integration',
        description: 'Incorporating user feedback effectively'
      }
    ]
  },
  {
    title: 'Build: Launch & Monitor',
    color: '#FFF3E0',
    stage: [
      'Deployment preparation',
      'Launch execution',
      'Monitoring setup'
    ],
    actions: [
      'Deploy application',
      'Monitor performance',
      'Address issues'
    ],
    touchpoints: [
      'Deployment Tools',
      'Monitoring Systems',
      'Analytics'
    ],
    painPoints: [
      {
        title: 'Deployment Complexity',
        description: 'Complex deployment requirements'
      },
      {
        title: 'Monitoring Setup',
        description: 'Setting up effective monitoring'
      }
    ]
  },
  {
    title: 'Market & Generate Support',
    color: '#E8EAF6',
    stage: [
      'Marketing strategy',
      'Community building',
      'Support system setup'
    ],
    actions: [
      'Implement marketing plan',
      'Engage with community',
      'Provide support'
    ],
    touchpoints: [
      'Marketing Platforms',
      'Community Tools',
      'Support Systems'
    ],
    painPoints: [
      {
        title: 'Market Visibility',
        description: 'Standing out in the ecosystem'
      },
      {
        title: 'Community Engagement',
        description: 'Building active user community'
      }
    ]
  },
  {
    title: 'Scale & Grow',
    color: '#E0F2F1',
    stage: [
      'Performance optimization',
      'Feature expansion',
      'Infrastructure scaling'
    ],
    actions: [
      'Monitor metrics',
      'Optimize performance',
      'Scale infrastructure'
    ],
    touchpoints: [
      'Analytics Tools',
      'Scaling Solutions',
      'Monitoring Systems'
    ],
    painPoints: [
      {
        title: 'Scaling Challenges',
        description: 'Handling increased usage and data'
      },
      {
        title: 'Resource Management',
        description: 'Managing growing resource needs'
      }
    ]
  }
]; 