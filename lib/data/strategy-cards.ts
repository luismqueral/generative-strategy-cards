// Type definition for a strategy card
export interface StrategyCard {
  title: string;
  prompt: string;
  theme: string;
  tag: string;
}

// Import the strategy cards data directly
import strategiesData from '../../strategy-cards-data-source.json';

export function getStrategyCards(): StrategyCard[] {
  try {
    // Map the data to handle either the new format (with tag) or old format (with source_inspiration)
    return strategiesData.map((card: any) => ({
      title: card.title,
      prompt: card.prompt,
      theme: card.theme || '',
      tag: card.tag || card.source_inspiration // Support both formats
    }));
  } catch (error) {
    console.error('Error loading strategy cards data:', error);
    return [];
  }
} 