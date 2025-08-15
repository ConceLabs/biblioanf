
import React from 'react';
import { Category } from '../types';

interface BottomNavProps {
  activeTab: Category;
  setActiveTab: (tab: Category) => void;
}

const TABS = [
  { category: Category.CodesAndLaws, icon: 'fa-book', label: 'Leyes' },
  { category: Category.Jurisprudence, icon: 'fa-gavel', label: 'Jurisprudencia' },
  { category: Category.Applications, icon: 'fa-mobile-screen-button', label: 'Apps' },
  { category: Category.GeneralInfo, icon: 'fa-circle-info', label: 'Info' },
  { category: Category.Admin, icon: 'fa-user-shield', label: 'Admin' },
  { category: Category.Credits, icon: 'fa-user-circle', label: 'Créditos' },
];

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-t-lg z-50 border-t border-slate-200 pb-[calc(0.25rem+env(safe-area-inset-bottom))]">
      <div className="container mx-auto flex justify-around items-center h-16">
        {TABS.map((tab) => (
          <button
            key={tab.category}
            onClick={() => setActiveTab(tab.category)}
            className={`flex flex-col items-center justify-center w-full h-full transition-colors duration-200 gap-1 ${
              activeTab === tab.category
                ? 'text-blue-600'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <i className={`fa-solid ${tab.icon} text-xl`}></i>
            <span className="text-[11px] font-medium">{tab.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;