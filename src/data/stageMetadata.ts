import { StageMetadata } from "../types";

export const stageMetadata: Record<string, StageMetadata> = {
  Discovery: {
    color: "#CDF4D3",
    actions: [
      "Attend Events",
      "Participate in Hackathons",
      "Consume Stacks/Hiro content",
    ],
  },
  "Research: Stacks & Hiro": {
    color: "#C6FAF6",
    actions: [
      "Peruse Stacks / Hiro websites",
      "Consume Stacks/Hiro content",
      "Investigate specific Stacks use cases",
    ],
  },
  "Evaluate: The Stacks Ecosystem": {
    color: "#C6FAF6",
    actions: [
      "Explore OSS Repositories",
      "Trial Live Applications on Mainnet",
      "Investigate specific Stacks use cases",
    ],
  },
  "Evaluate: Tooling & Resources": {
    color: "#C6FAF6",
    actions: [
      "Peruse Stacks / Hiro Docs",
      "Investigate Available Tools & Resources",
      "Evaluate the maturity of the developer experience",
    ],
  },
  "Learn: Examples & Guides": {
    color: "#C2E5FF",
    actions: [
      "Tinker with Examples",
      "Tinker with OSS Smart Contracts in Explorer Sandbox",
      "Experiment w/ Clarity in Clarity Playground",
      "Write basic contract functions",
      "Call/test contract functions",
      "Complete Tutorials",
    ],
  },
  "Experiment: Test Project": {
    color: "#C2E5FF",
    actions: [
      "Setup a basic developer environment",
      "Configure boilerplate",
      "Clone an example project / recipe / template",
      "Modify or author a basic smart contract",
      "Build and integrate with a basic front-end",
      "Test basic contract functions",
      "Deploy project to test the deployment experience",
    ],
  },
  "Build: Project Planning": {
    color: "#DCCCFF",
    actions: [
      "Define and design project architecture",
      "Identify necessary dependencies",
      "Identify available primitives and ready-to-use components",
    ],
  },
  "Build: Setup & Configuration": {
    color: "#DCCCFF",
    actions: [
      "Setup and configure Hiro development environment",
      "Setup and configure essential tools and services",
      "Create new project repository",
      "Seek support when troubleshooting",
    ],
  },
  "Build: Core Development": {
    color: "#DCCCFF",
    actions: [
      "Refine project architecture",
      "Author Smart Contracts",
      "Build application front-ends",
      "Write tests",
      "Begin integrating with Hiro tools and services",
      "Seek support when troubleshooting",
    ],
  },
  "Build: Validate & Iterate": {
    color: "#DCCCFF",
    actions: [
      "Test and Validate Smart Contracts",
      "Deploy to Test Environments",
      "Conduct contract security audits",
      "Simulate transactions",
      "Stress and load testing",
      "Diagnose and troubleshoot",
      "User Testing",
    ],
  },
  "Build: Launch & Monitor": {
    color: "#DCCCFF",
    actions: [
      "Final reviews and audits",
      "Deploy to Mainnet",
      "Monitor contract functionality",
      "Monitor API and service usage",
      "Monitor performance",
      "Diagnose and troubleshoot",
    ],
  },
  "Market & Generate Support": {
    color: "#FFC7C2",
    actions: [
      "Initial marketing across social channels",
      "Initial fundraising",
    ],
  },
  "Scale & Grow": {
    color: "#FFE0C2",
    actions: [
      "Hiring and increasing team headcount",
      "Predict infrastructure costs",
      "Simulate increased load / traffic",
      "Collaborative Development",
      "Continued monitoring of contract and application security, performance, and usage.",
    ],
  },
};
