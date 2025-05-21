"use client";

import { useState, useMemo, useEffect } from "react";
import { getStrategyCards } from "@/lib/data/strategy-cards";
import { StrategyCard } from "@/components/strategy-card";
import { StrategyFilter } from "@/components/strategy-filter";

export default function Home() {
  // Get the strategy cards data
  const strategyCards = useMemo(() => getStrategyCards(), []);
  const [filterCategory, setFilterCategory] = useState<string>('Featured');

  // Set initial background color for Featured category
  useEffect(() => {
    document.body.style.backgroundColor = '#f5f5f5'; // Light gray
  }, []);

  // Extract unique themes and tags for filtering
  const uniqueThemes = useMemo(() => 
    Array.from(new Set(strategyCards.map(card => card.theme).filter(Boolean))).sort(),
  [strategyCards]);
  
  const uniqueTags = useMemo(() => 
    Array.from(new Set(strategyCards.map(card => card.tag))).sort(),
  [strategyCards]);

  // Filter the cards based on the category
  const filteredCards = (() => {
    // First filter out any cards without a theme (tag)
    const cardsWithTheme = strategyCards.filter(card => card.theme);
    
    // If "Featured" category is selected, show a curated selection
    if (filterCategory === 'Featured') {
      // Create an array to hold featured cards from different categories
      const featuredCards: typeof cardsWithTheme = [];
      const categoriesToFeature = ["Psychology", "Science", "Philosophy", "History", "Art", "Nature"];
      
      // Get 1-2 cards from each featured category
      for (const category of categoriesToFeature) {
        const categoryCards = cardsWithTheme.filter(card => card.theme === category);
        if (categoryCards.length > 0) {
          // Take up to 2 cards from this category
          featuredCards.push(...categoryCards.slice(0, 1));
        }
      }
      
      // If we have less than 8 cards, add more from any category
      if (featuredCards.length < 8) {
        const remainingCards = cardsWithTheme
          .filter(card => !featuredCards.includes(card))
          .slice(0, 8 - featuredCards.length);
        featuredCards.push(...remainingCards);
      }
      
      return featuredCards;
    }
    
    if (!filterCategory) {
        return cardsWithTheme;
    }

    return cardsWithTheme.filter(card => card.theme.toLowerCase() === filterCategory.toLowerCase());
  })();

  const handleFilterChange = () => {
    // Empty function since we no longer use filterText
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="py-8">
        <section className="container mx-auto px-4 max-w-3xl flex flex-col items-center text-center mb-8">
          <div className="mb-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Generative Strategy Cards</h1>
          </div>
        </section>
        <section className="container mx-auto px-4 mb-2">
          <div className="max-w-4xl mx-auto">
            <StrategyFilter 
              onFilterChange={handleFilterChange}
              onCategoryChange={setFilterCategory}
              uniqueThemes={uniqueThemes}
              uniqueSources={uniqueTags}
            />
          </div>
        </section>
      </header>

      <main className="container mx-auto flex-1 py-1 px-4 md:px-8">
        <div className="max-w-3xl mx-auto">
          {filteredCards.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No cards match your filter criteria</p>
            </div>
          ) : (
            filteredCards.map((card, index) => (
              <StrategyCard key={index} card={card} />
            ))
          )}
        </div>
      </main>

      <footer className="border-t py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Generative Design Strategy Cards Collection</p>
        </div>
      </footer>
    </div>
  );
}
