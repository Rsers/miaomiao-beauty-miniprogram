import { useState } from "react";

const categories = [
  { id: 'skincare', name: '护肤', emoji: '🧴' },
  { id: 'makeup', name: '彩妆', emoji: '💄' },
  { id: 'tools', name: '工具', emoji: '🪞' },
  { id: 'limited', name: '限定', emoji: '⭐' },
  { id: 'accessories', name: '配饰', emoji: '🎀' },
];

interface CategoryTabsProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export function CategoryTabs({ activeCategory, onCategoryChange }: CategoryTabsProps) {
  return (
    <div className="px-4 py-4">
      <div className="flex gap-2 overflow-x-auto scrollbar-hide">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all duration-200 ${
              activeCategory === category.id
                ? 'bg-white/90 text-pink-600 shadow-lg'
                : 'bg-white/30 text-white hover:bg-white/50'
            }`}
          >
            <span>{category.emoji}</span>
            <span className="font-medium">{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}