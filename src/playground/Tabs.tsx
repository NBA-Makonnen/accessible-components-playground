import React, { useState, useRef } from 'react';
import type { KeyboardEvent } from 'react';

interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: TabItem[];
  ariaLabel: string;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, ariaLabel }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let newIndex = -1;

    if (e.key === 'ArrowRight') {
      newIndex = index === tabs.length - 1 ? 0 : index + 1;
    } else if (e.key === 'ArrowLeft') {
      newIndex = index === 0 ? tabs.length - 1 : index - 1;
    }

    if (newIndex !== -1) {
      setActiveIndex(newIndex);
      tabRefs.current[newIndex]?.focus();
    }
  };

  return (
    <div className="w-full max-w-md">
      <div role="tablist" aria-label={ariaLabel} className="flex border-b border-gray-200">
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            ref={(el) => {
              tabRefs.current[index] = el;
            }}
            role="tab"
            aria-selected={activeIndex === index}
            aria-controls={`panel-${tab.id}`}
            id={`tab-${tab.id}`}
            tabIndex={activeIndex === index ? 0 : -1}
            onClick={() => setActiveIndex(index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={`px-4 py-2 border-b-2 ${
              activeIndex === index 
                ? 'border-blue-600 text-blue-600 font-medium' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      {tabs.map((tab, index) => (
        <div
          key={tab.id}
          id={`panel-${tab.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${tab.id}`}
          hidden={activeIndex !== index}
          tabIndex={0}
          className="py-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
};