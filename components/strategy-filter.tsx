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

  const categories = ['Featured', 'Psychology', 'Science', 'Philosophy', 'History', 'Art', 'Nature', 'Experimental', 'Politics', 'Religion', 'Architecture', 'Other'];

  const categoryColors: Record<string, string> = {
    Featured: '#f5f5f5', // Light gray
    Psychology: '#f0e68c', // Light khaki
    Science: '#add8e6', // Light blue
    Philosophy: '#dda0dd', // Plum
    History: '#ffb6c1', // Light pink
    Art: '#98fb98', // Pale green
    Nature: '#afeeee', // Pale turquoise
    Experimental: '#ffdead', // Navajo white
    Politics: '#ffcccb', // Light red
    Religion: '#d3d3d3', // Light grey
    Architecture: '#ffe4b5', // Moccasin
    Other: '#f5f5dc' // Beige
  };

  const categoryDarkColors: Record<string, string> = {
    Featured: '#6e6e6e', // Dark gray
    Psychology: '#9B7D0A', // Dark yellow/gold
    Science: '#1A5D8F', // Dark blue
    Philosophy: '#8A2BE2', // Deep purple
    History: '#DC143C', // Crimson
    Art: '#228B22', // Forest green
    Nature: '#008080', // Teal
    Experimental: '#CD853F', // Peru (dark orange/brown)
    Politics: '#B22222', // Firebrick red
    Religion: '#696969', // Dim grey
    Architecture: '#CD8500', // Dark goldenrod
    Other: '#A0A0A0' // Medium grey
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
          return (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`px-6 py-3 text-lg rounded-lg cursor-pointer`}
              style={{
                backgroundColor: activeCategory === category ? categoryDarkColors[category] : 'rgba(0, 0, 0, 0.05)',
                color: activeCategory === category ? '#fff' : '#000',
                transition: 'all 0.1s ease-in-out'
              }}
              onMouseEnter={(e) => {
                if (activeCategory !== category) {
                  e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
                  e.currentTarget.style.color = '#000';
                }
              }}
              onMouseLeave={(e) => {
                if (activeCategory !== category) {
                  e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
                  e.currentTarget.style.color = '#000';
                }
              }}
            >
              {category}
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