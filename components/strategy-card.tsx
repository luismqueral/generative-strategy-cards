"use client";

import React, { useState } from "react";
import { CheckIcon, CopyIcon } from "lucide-react";
import { toast } from "sonner";
import { StrategyCard as StrategyCardType } from "@/lib/data/strategy-cards";

interface StrategyCardProps {
  card: StrategyCardType;
}

// Helper function to parse prompt text for basic markdown (newlines and bullets)
function formatPrompt(promptText: string): React.ReactNode[] {
  const lines = promptText.split('\n');
  const elements: React.ReactNode[] = [];
  let currentListItems: React.ReactNode[] = [];
  let inList = false;

  lines.forEach((line, index) => {
    const trimmedLine = line.trim();
    if (trimmedLine.startsWith('* ')) {
      if (!inList) {
        inList = true;
        currentListItems = []; // Start a new list
      }
      currentListItems.push(<li key={`li-${index}`}>{trimmedLine.substring(2)}</li>);
    } else {
      if (inList) {
        // Current line is not a list item, so the previous list (if any) has ended
        elements.push(<ul key={`ul-${elements.length}`} className="list-disc pl-5 my-2 space-y-1">{currentListItems}</ul>);
        currentListItems = [];
        inList = false;
      }
      // Handle non-list item lines (text, paragraph breaks)
      if (trimmedLine === '' && index > 0 && lines[index-1].trim() !== '' && !lines[index-1].trim().startsWith('* ')) {
        elements.push(<div key={`p-space-${index}`} className="h-3"></div>); // Paragraph break
      } else if (trimmedLine !== '') {
        elements.push(trimmedLine);
        if (index < lines.length - 1 && lines[index+1].trim() !== '' && !lines[index+1].trim().startsWith('* ')) {
          elements.push(<br key={`br-${index}`} />);
        }
      }
    }
  });

  // If the prompt ends with a list, add it to elements
  if (inList && currentListItems.length > 0) {
    elements.push(<ul key={`ul-${elements.length}`} className="list-disc pl-5 my-2 space-y-1">{currentListItems}</ul>);
  }

  return elements;
}

export function StrategyCard({ card }: StrategyCardProps) {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(card.prompt);
      setIsCopied(true);
      toast.success("Copied to clipboard!");
      
      // Reset the copied state after 2 seconds
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch {
      toast.error("Failed to copy to clipboard");
    }
  };

  return (
    <div className="mb-10 group">
      <div className="flex-1">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <h2 className="text-xl font-bold">{card.title}</h2>
          
          {/* Theme badge above the text area, right-aligned */}
          {card.theme && (
            <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary whitespace-nowrap">
              {card.theme}
            </span>
          )}
        </div>
        
        <div 
          onClick={copyToClipboard}
          className="relative rounded-md p-5 font-mono text-sm leading-relaxed cursor-pointer transition-all 
                   hover:shadow-md whitespace-pre-line"
          style={{ 
            backgroundColor: 'rgba(0, 0, 0, 0.03)',
            border: '1px solid transparent',
            transition: 'all 0.1s ease-in-out'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'transparent';
          }}
          aria-label={`Click to copy: ${card.prompt}`}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              copyToClipboard();
            }
          }}
        >
          {formatPrompt(card.prompt)}
          
          <div className={`absolute right-3 top-3 transition-opacity ${isCopied ? 'opacity-100' : 'opacity-0 group-hover:opacity-70'}`}>
            {isCopied ? (
              <div className="bg-green-500/10 border border-green-500 text-green-500 rounded-md p-1 flex items-center gap-1 text-xs font-sans">
                <CheckIcon className="h-3.5 w-3.5" />
                <span>Copied!</span>
              </div>
            ) : (
              <div className="bg-white/70 border rounded-md p-1 flex items-center justify-center">
                <CopyIcon className="h-3.5 w-3.5" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 