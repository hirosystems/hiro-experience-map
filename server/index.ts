import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GITHUB_PROJECT_QUERY } from '../src/services/queries';
import { GitHubResponse } from '../src/types/github';

dotenv.config();

const app = express();
app.use(cors());
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

// GitHub API endpoint
app.get('/api/github-data', async (_req: Request, res: Response) => {
  try {
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

    if (!response.ok) {
      const errorText = await response.text();
      console.error('GitHub API error response:', errorText);
      throw new Error(`GitHub API responded with status: ${response.status}`);
    }

    const data = await response.json() as GitHubResponse;
    
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