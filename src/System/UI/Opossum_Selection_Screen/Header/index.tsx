import React from "react";

export interface OpossumSelectionHeaderProps {
  onBack?: () => void;
}

export const OpossumSelectionHeader: React.FC<OpossumSelectionHeaderProps> = ({ onBack }) => {
  return (
    <header className={`mb-6 flex justify-between items-center border-b border-green-900 pb-4`}>
      <h1 className={`text-xl md:text-2xl font-bold text-green-400`}>
        <button 
          onClick={onBack}
          className="hover:text-green-300 transition-colors cursor-pointer"
        >
          Opossum Ride Adventure
        </button>
      </h1>
    </header>
  );
};
