"use client";

import { useState, useMemo } from "react";
import { getStrategyCards, StrategyCard as StrategyCardType } from "@/lib/data/strategy-cards";
import { StrategyCard } from "@/components/strategy-card";
import { StrategyFilter } from "@/components/strategy-filter";

export default function Home() {
  // Get the strategy cards data
  const strategyCards = useMemo(() => getStrategyCards(), []);
  const [filterText, setFilterText] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>('');

  // Extract unique themes and tags for filtering
  const uniqueThemes = useMemo(() => 
    Array.from(new Set(strategyCards.map(card => card.theme).filter(Boolean))).sort(),
  [strategyCards]);
  
  const uniqueTags = useMemo(() => 
    Array.from(new Set(strategyCards.map(card => card.tag))).sort(),
  [strategyCards]);

  // Filter the cards based on the filter text and category
  const filteredCards = (() => {
    // First filter out any cards without a theme (tag)
    const cardsWithTheme = strategyCards.filter(card => card.theme);
    
    if (!filterCategory) {
        return cardsWithTheme;
    }

    return cardsWithTheme.filter(card => card.theme.toLowerCase() === filterCategory.toLowerCase());
  })();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="py-8">
        <section className="container mx-auto px-4 max-w-3xl flex flex-col items-center text-center mb-8">
          <div className="mb-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Generative Strategy Cards</h1>
          </div>
        </section>
        <section className="container mx-auto px-4 max-w-3xl mb-2">
          <StrategyFilter 
            onFilterChange={setFilterText}
            onCategoryChange={setFilterCategory}
            uniqueThemes={uniqueThemes}
            uniqueSources={uniqueTags}
          />
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
