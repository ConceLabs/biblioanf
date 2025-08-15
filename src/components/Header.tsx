
import React from 'react';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ searchQuery, setSearchQuery }) => {
  const logoSrc = './logo-anf.png';

  return (
    <header className="bg-slate-800 text-white shadow-lg sticky top-0 z-20">
      <div className="container mx-auto px-4 pt-[calc(0.75rem+env(safe-area-inset-top))] pb-3 flex justify-between items-center gap-2">
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          {logoSrc ? (
            <div className="bg-white rounded-full h-10 w-10 flex items-center justify-center flex-shrink-0">
              <img src={logoSrc} alt="Logo de la Biblioteca Jurídica ANF" className="h-7 w-7" />
            </div>
          ) : (
            <div className="h-10 w-10 bg-slate-700 rounded-full flex-shrink-0"></div>
          )}
          <h1 className="text-lg font-bold tracking-tight truncate">Biblioteca Jurídica ANF</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-slate-700 text-white rounded-full px-4 py-1.5 w-32 sm:w-48 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
               <i className="fa-solid fa-search text-slate-400"></i>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;