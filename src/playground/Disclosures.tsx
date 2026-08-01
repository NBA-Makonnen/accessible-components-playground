import React, { useState } from 'react';

interface DisclosureProps {
  title: string;
  children: React.ReactNode;
  id: string;
}

export const Disclosure: React.FC<DisclosureProps> = ({ title, children, id }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const contentId = `disclosure-content-${id}`;

  return (
    <div className="border rounded-md w-full max-w-md">
      <button
        aria-expanded={isOpen}
        aria-controls={contentId}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 text-left font-medium bg-gray-50 hover:bg-gray-100 flex justify-between items-center"
      >
        {title}
        <span>{isOpen ? '−' : '+'}</span>
      </button>
      <div
        id={contentId}
        hidden={!isOpen}
        className="p-4"
      >
        {children}
      </div>
    </div>
  );
};