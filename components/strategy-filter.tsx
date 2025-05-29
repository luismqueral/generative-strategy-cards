"use client";

import React, { useState } from "react";
// Search and X icons are no longer needed.
// import { Search, X } from "lucide-react"; 

interface FilterProps {
  onFilterChange: (filter: string) => void;
  onCategoryChange: (category: string) => void;
  uniqueThemes: string[];
  uniqueSources: string[];
}

export function StrategyFilter({ onFilterChange, onCategoryChange, uniqueThemes, uniqueSources }: FilterProps) {
  // filter state and its handlers are no longer needed as search input is removed.
  const [activeCategory, setActiveCategory] = useState<string>('Featured');
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const categories = ['Featured', 'Psychology', 'Science', 'Philosophy', 'History', 'Art', 'Nature', 'Politics', 'Religion', 'Architecture', 'Chaotic', 'Experimental', 'Other'];

  const categoryEmojis: Record<string, string> = {
    Featured: '⭐',
    Psychology: '🧠',
    Science: '🔬',
    Philosophy: '💭',
    History: '📜',
    Art: '🎨',
    Nature: '🌿',
    Politics: '🗳️',
    Religion: '🙏',
    Architecture: '🏛️',
    Chaotic: '🌀',
    Experimental: '🧪',
    Other: '✨'
  };

  const categoryColors: Record<string, string> = {
    Featured: '#f9f9f9', // Lighter gray
    Psychology: '#fffaed', // Lighter khaki
    Science: '#f0f8ff', // Lighter blue
    Philosophy: '#f8f0ff', // Lighter purple
    History: '#fff0f5', // Lighter pink
    Art: '#f0fff0', // Lighter green
    Nature: '#f0ffff', // Lighter turquoise
    Experimental: '#fff5e6', // Lighter orange/peach
    Politics: '#fff0f0', // Lighter red
    Religion: '#f8f8f8', // Lighter grey
    Architecture: '#fff8ee', // Lighter moccasin
    Chaotic: '#fff0e6', // Lighter orange
    Other: '#fafafa' // Lighter beige
  };

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    onCategoryChange(category);
    setActiveTag(null); // Reset local active tag
    onFilterChange(""); // Clear any active tag filter in parent
    
    const bgColor = categoryColors[category];
    document.body.style.backgroundColor = bgColor;
  };

  const handleTagClick = (tag: string) => {
    const newActiveTag = tag === activeTag ? null : tag;
    setActiveTag(newActiveTag);
    onFilterChange(newActiveTag || ""); // Update parent's filterText with the tag, or empty string if deselected
  };

  const getTagsToShow = () => {
    if (activeCategory === 'theme') return uniqueThemes;
    if (activeCategory === 'tag') return uniqueSources;
    return [];
  };

  return (
    <div className="mb-8 w-full">
      {/* Search input div was removed in a previous step */}
      <div className="flex flex-wrap gap-2 mb-4 w-full justify-center">
        {categories.map((category) => {
          const isActive = activeCategory === category;
          return (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`px-6 py-3 text-lg rounded-lg cursor-pointer flex items-center gap-2`}
              style={{
                backgroundColor: isActive ? categoryColors[category] : 'rgba(0, 0, 0, 0.03)',
                color: isActive ? '#000' : '#000',
                transition: 'all 0.1s ease-in-out'
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
                  e.currentTarget.style.color = '#000';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.03)';
                  e.currentTarget.style.color = '#000';
                }
              }}
            >
              {isActive && <span>{categoryEmojis[category]}</span>}
              <span style={{ fontWeight: isActive ? 'bold' : 'normal' }}>{category}</span>
            </button>
          );
        })}
      </div>

      {activeCategory && getTagsToShow().length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2">
          {getTagsToShow().map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className={`px-2.5 py-0.5 text-xs rounded-full transition-colors ${
                activeTag === tag
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted/70 hover:bg-muted'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}
    </div>
  );
} 