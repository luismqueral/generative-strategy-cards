"use client";

import { useState, useMemo, useEffect } from "react";
import { getStrategyCards } from "@/lib/data/strategy-cards";
import { StrategyCard } from "@/components/strategy-card";
import { StrategyFilter } from "@/components/strategy-filter";
import Image from "next/image";
import Link from "next/link";
import { Search, X } from "lucide-react";

export default function Home() {
  // Get the strategy cards data
  const strategyCards = useMemo(() => getStrategyCards(), []);
  const [filterCategory, setFilterCategory] = useState<string>('Featured');
  const [searchQuery, setSearchQuery] = useState<string>('');

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

  // Filter the cards based on search query or category
  const filteredCards = useMemo(() => {
    // If there's a search query, search ALL cards (not just those with themes)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      return strategyCards.filter(card => 
        card.title.toLowerCase().includes(query) || 
        card.prompt.toLowerCase().includes(query) ||
        (card.theme && card.theme.toLowerCase().includes(query)) ||
        (card.tag && card.tag.toLowerCase().includes(query))
      );
    }

    // Otherwise, use category filtering (existing logic)
    // First filter out any cards without a theme (tag)
    const cardsWithTheme = strategyCards.filter(card => card.theme);
    
    // If "Featured" category is selected, show a curated selection
    if (filterCategory === 'Featured') {
      // Create an array to hold featured cards from different categories
      const featuredCards: typeof cardsWithTheme = [];
      const categoriesToFeature = ["Psychology", "Science", "Philosophy", "History", "Art", "Nature", "Chaotic", "Experimental"];
      
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
  }, [strategyCards, searchQuery, filterCategory]);

  const handleFilterChange = () => {
    // Empty function since we no longer use filterText
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="py-8">
        <section className="container mx-auto px-4 max-w-3xl flex flex-col items-center text-center mb-4">
          <div className="mb-4">
            <div className="flex items-center justify-center gap-2 font-mono text-sm text-muted-foreground mb-6">
              <Link href="/about" className="hover:text-foreground transition-colors">
                what is this?
              </Link>
            </div>
            <Image
              src="/generative-strategies-logo2-transparent.png"
              alt="Generative Strategy Cards"
              width={400}
              height={133}
              className="mx-auto mb-1"
              priority
            />
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
        
        {/* Search Bar */}
        <section className="container mx-auto px-4 mb-4">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <input
                type="text"
                placeholder="Search strategies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-sans text-base"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            {searchQuery && (
              <p className="text-sm text-muted-foreground mt-2 text-center">
                Found {filteredCards.length} result{filteredCards.length !== 1 ? 's' : ''} for "{searchQuery}"
              </p>
            )}
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

      <footer className="py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground font-mono">
          <p>
            a project by Luis Queral — <a 
              href="https://queral.studio" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors underline"
            >
              queral.studio
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
