import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GITHUB_PROJECT_QUERY } from '../src/services/queries';
import { GitHubResponse } from '../src/types/github';

dotenv.config();

const app = express();

// Configure CORS
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://hiro-experience-map.vercel.app', 'https://hirosystems.github.io']
    : 'http://localhost:3000',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Verify environment variables are set
const requiredEnvVars = [
  'HIRO_GITHUB_TOKEN',
  'HIRO_GITHUB_OWNER',
  'HIRO_GITHUB_REPO',
  'HIRO_GITHUB_PROJECT_NUMBER'
] as const;

requiredEnvVars.forEach(envVar => {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
});

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

// GitHub API endpoint
app.get('/api/github-data', async (_req: Request, res: Response) => {
  try {
    console.log('Starting GitHub API request...');

    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.HIRO_GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        query: GITHUB_PROJECT_QUERY,
        variables: {
          owner: process.env.HIRO_GITHUB_OWNER,
          projectNumber: parseInt(process.env.HIRO_GITHUB_PROJECT_NUMBER || '0', 10)
        }
      })
    });

    console.log('GitHub API response status:', response.status);
    const responseText = await response.text();
    console.log('GitHub API response:', responseText);

    if (!response.ok) {
      console.error('GitHub API error response:', responseText);
      throw new Error(`GitHub API responded with status: ${response.status}`);
    }

    let data;
    try {
      data = JSON.parse(responseText) as GitHubResponse;
    } catch (parseError) {
      console.error('Error parsing GitHub API response:', parseError);
      throw new Error('Invalid JSON response from GitHub API');
    }
    
    if (data.errors) {
      console.error('GitHub GraphQL errors:', data.errors);
      throw new Error(`GitHub API Error: ${data.errors[0].message}`);
    }

    res.json(data);
  } catch (error) {
    console.error('Error fetching GitHub data:', error);
    res.status(500).json({ 
      error: 'Failed to fetch GitHub data',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log('Environment variables loaded:', {
    hasToken: !!process.env.HIRO_GITHUB_TOKEN,
    owner: process.env.HIRO_GITHUB_OWNER,
    projectNumber: process.env.HIRO_GITHUB_PROJECT_NUMBER
  });
}); 