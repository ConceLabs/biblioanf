
import React, { useMemo, useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Document, DocType } from '../types';

interface DocumentViewerProps {
  doc: Document;
  onBack: () => void;
  searchQuery: string;
  zoomLevel: number;
  setZoomLevel: (zoom: number | ((prevZoom: number) => number)) => void;
}

const DocumentViewer: React.FC<DocumentViewerProps> = ({ doc, onBack, searchQuery, zoomLevel, setZoomLevel }) => {
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);
  const viewerRef = useRef<HTMLDivElement>(null);

  const handleZoomIn = () => setZoomLevel(z => Math.min(200, z + 10));
  const handleZoomOut = () => setZoomLevel(z => Math.max(50, z - 10));

  const isZoomable = doc.type === DocType.MD || doc.type === DocType.PDF;
  
  const { highlightedContent, matchCount } = useMemo(() => {
    if (!searchQuery || doc.type !== DocType.MD) {
      return { highlightedContent: doc.content, matchCount: 0 };
    }
    const regex = new RegExp(`(${searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    let count = 0;
    const highlighted = doc.content.replace(regex, (match) => {
        count++;
        return `<mark>${match}</mark>`;
    });
    return { highlightedContent: highlighted, matchCount: count };
  }, [doc.content, searchQuery, doc.type]);

  useEffect(() => {
    // Reset index when search query changes
    setCurrentMatchIndex(0);
  }, [searchQuery]);

  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer || !searchQuery || matchCount === 0) return;

    const allMatches = viewer.querySelectorAll('mark');
    
    // Clear previous active match
    allMatches.forEach(match => match.classList.remove('active-match'));

    // Highlight current match and scroll to it
    const currentMatchElement = allMatches[currentMatchIndex];
    if (currentMatchElement) {
        currentMatchElement.classList.add('active-match');
        // We use a small timeout to allow the DOM to update with the new content
        setTimeout(() => {
            currentMatchElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
    }
  }, [highlightedContent, currentMatchIndex, matchCount, searchQuery]);

  const handleNextMatch = () => {
    if (matchCount === 0) return;
    setCurrentMatchIndex((prevIndex) => (prevIndex + 1) % matchCount);
  };

  const handlePrevMatch = () => {
    if (matchCount === 0) return;
    setCurrentMatchIndex((prevIndex) => (prevIndex - 1 + matchCount) % matchCount);
  };


  return (
    <div className="flex flex-col flex-grow bg-white overflow-hidden">
      <header className="bg-slate-100 p-4 flex justify-between items-center border-b z-10 flex-shrink-0">
        <button onClick={onBack} className="flex items-center space-x-2 text-slate-600 hover:text-blue-600 transition-colors">
          <i className="fa-solid fa-arrow-left"></i>
          <span className="font-semibold">Volver</span>
        </button>
        {searchQuery && doc.type === DocType.MD && (
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-600">
                {matchCount > 0 ? (
                    <>
                        <span>{currentMatchIndex + 1} / {matchCount}</span>
                        <div className="flex gap-1">
                            <button onClick={handlePrevMatch} disabled={matchCount === 0} className="w-7 h-7 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 transition-colors flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed">
                                <i className="fa-solid fa-chevron-up text-xs"></i>
                            </button>
                            <button onClick={handleNextMatch} disabled={matchCount === 0} className="w-7 h-7 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 transition-colors flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed">
                                <i className="fa-solid fa-chevron-down text-xs"></i>
                            </button>
                        </div>
                    </>
                ) : (
                    <span>{matchCount} coincidencia{matchCount !== 1 ? 's' : ''}</span>
                )}
            </div>
        )}
        {isZoomable && (
          <div className="flex items-center space-x-2">
            <button onClick={handleZoomOut} className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 transition-colors flex justify-center items-center font-bold">-</button>
            <span className="w-12 text-center font-semibold text-slate-700">{zoomLevel}%</span>
            <button onClick={handleZoomIn} className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 transition-colors flex justify-center items-center font-bold">+</button>
          </div>
        )}
      </header>
      
      <div className="flex-grow overflow-y-auto p-4 sm:p-6 lg:p-8" ref={viewerRef}>
        <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">{doc.title}</h2>
            <div className="prose prose-slate max-w-none" style={isZoomable ? { fontSize: `${zoomLevel}%` } : {}}>
                {doc.type === DocType.MD && <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>{highlightedContent}</ReactMarkdown>}
                {doc.type === DocType.PDF && (
                    <div className="bg-gray-200 p-8 rounded-md text-center text-gray-600">
                        <i className="fa-solid fa-file-pdf fa-4x mb-4"></i>
                        <p className="font-semibold">Visualizador de PDF</p>
                        <p>Contenido del documento "{doc.title}" se mostraría aquí.</p>
                        <p className="text-sm mt-2">(Esta es una simulación. Se usaría una biblioteca como react-pdf en una aplicación real)</p>
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentViewer;