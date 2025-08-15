
import React, { useState, useMemo } from 'react';
import { Category, Document, DocType } from './types';
import { MOCK_DOCUMENTS } from './constants';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import DocumentCard from './components/DocumentCard';
import DocumentViewer from './components/DocumentViewer';
import AdminView from './components/AdminView';
import AbonoCalculator from './components/AbonoCalculator';
import InfoCard from './components/InfoCard'; // Importar el nuevo componente
import usePersistentState from './hooks/usePersistentState';


const App: React.FC = () => {
  const [documents, setDocuments] = usePersistentState<Document[]>('documents', MOCK_DOCUMENTS);
  const [activeTab, setActiveTab] = useState<Category>(Category.CodesAndLaws);
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [zoomLevel, setZoomLevel] = useState(100);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const ADMIN_PASSWORD = 'admin2025';

  const handleLogin = (password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      return true;
    }
    return false;
  };

  const handleAddDocument = (doc: Omit<Document, 'id'>) => {
    const newDoc: Document = { ...doc, id: Date.now().toString() };
    setDocuments(prevDocs => [...prevDocs, newDoc]);
  };

  const handleUpdateDocument = (updatedDoc: Document) => {
    setDocuments(prevDocs => prevDocs.map(doc => doc.id === updatedDoc.id ? updatedDoc : doc));
  };

  const handleDeleteDocument = (id: string) => {
    setDocuments(prevDocs => prevDocs.filter(doc => doc.id !== id));
  };

  const handleReorderDocument = (id: string, direction: 'up' | 'down') => {
    const index = documents.findIndex(d => d.id === id);
    if (index === -1) return;

    if (direction === 'up' && index > 0) {
        const newDocs = [...documents];
        [newDocs[index - 1], newDocs[index]] = [newDocs[index], newDocs[index - 1]];
        setDocuments(newDocs);
    } else if (direction === 'down' && index < documents.length - 1) {
        const newDocs = [...documents];
        [newDocs[index + 1], newDocs[index]] = [newDocs[index], newDocs[index + 1]];
        setDocuments(newDocs);
    }
  };

  const filteredDocuments = useMemo(() => {
    // No filtering for special tabs
    if ([Category.Credits, Category.Admin].includes(activeTab)) return [];

    return documents.filter(doc => {
      const inCategory = doc.category === activeTab;
      if (!searchQuery) return inCategory;
      const query = searchQuery.toLowerCase();
      const inTitle = doc.title.toLowerCase().includes(query);
      const inSubtitle = doc.subtitle?.toLowerCase().includes(query) ?? false;
      // Only search content for MD docs to avoid matching URLs or App IDs accidentally
      const inContent = doc.type === DocType.MD ? doc.content.toLowerCase().includes(query) : false;
      return inCategory && (inTitle || inSubtitle || inContent);
    });
  }, [documents, activeTab, searchQuery]);

  const handleSelectDoc = (doc: Document) => {
    if (doc.type === DocType.LINK) {
      window.open(doc.content, '_blank', 'noopener,noreferrer');
    } else {
      setSelectedDoc(doc);
    }
  };

  const handleBack = () => {
    setSelectedDoc(null);
  };

  const renderGridContent = () => {
    if (activeTab === Category.Credits) {
      return (
        <div className="flex flex-col items-center justify-center text-center text-slate-600 py-16 px-4 h-full">
          <p className="text-lg italic mb-4">Creado en 2025 por:</p>
          <img
            src="./credits-logo.png"
            alt="Logo de Créditos"
            className="w-64 h-64 rounded-full object-cover shadow-lg border-4 border-white"
          />
        </div>
      );
    }

    if (activeTab === Category.Admin) {
      return (
        <AdminView
          isLoggedIn={isLoggedIn}
          onLogin={handleLogin}
          documents={documents.filter(d => d.category !== Category.Credits)} // Don't allow editing credits
          onAddDocument={handleAddDocument}
          onUpdateDocument={handleUpdateDocument}
          onDeleteDocument={handleDeleteDocument}
          onReorderDocument={handleReorderDocument}
        />
      );
    }

    if (filteredDocuments.length === 0) {
        return <div className="text-center text-slate-500 py-16">No se encontraron documentos.</div>
    }

    return (
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 p-4 lg:p-6">
        {filteredDocuments.map(doc => (
          <DocumentCard key={doc.id} doc={doc} onSelect={handleSelectDoc} />
        ))}
      </div>
    );
  };

  const renderSelectedContent = () => {
    if (!selectedDoc) return null;

    switch (selectedDoc.type) {
      case DocType.APP:
        if (selectedDoc.content === 'abono-calculator') {
          return <AbonoCalculator onBack={handleBack} />;
        }
        if (selectedDoc.content === 'asistencia-juridica') {
          return <InfoCard onBack={handleBack} />;
        }
        return <DocumentViewer doc={selectedDoc} onBack={handleBack} searchQuery={searchQuery} zoomLevel={zoomLevel} setZoomLevel={setZoomLevel} />;
      
      case DocType.MD:
      case DocType.PDF:
      default:
        return <DocumentViewer doc={selectedDoc} onBack={handleBack} searchQuery={searchQuery} zoomLevel={zoomLevel} setZoomLevel={setZoomLevel} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans flex flex-col h-screen">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      {selectedDoc ? (
        renderSelectedContent()
      ) : (
        <>
          <main className="container mx-auto flex-grow overflow-y-auto pb-[calc(4.25rem+env(safe-area-inset-bottom))]">
            {renderGridContent()}
          </main>
          <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
        </>
      )}
    </div>
  );
};

export default App;
