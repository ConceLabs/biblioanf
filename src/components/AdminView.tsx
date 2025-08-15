
import React, { useState, useEffect, useRef } from 'react';
import { Category, Document, DocType } from '../types';
import { ICONS } from '../constants';

interface AdminViewProps {
  isLoggedIn: boolean;
  onLogin: (password: string) => boolean;
  documents: Document[];
  onAddDocument: (doc: Omit<Document, 'id'>) => void;
  onUpdateDocument: (doc: Document) => void;
  onDeleteDocument: (id: string) => void;
  onReorderDocument: (id: string, direction: 'up' | 'down') => void;
}

const LoginScreen: React.FC<{ onLogin: (password: string) => boolean }> = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const logoSrc = './logo-anf.png';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!onLogin(password)) {
      setError('Clave incorrecta.');
    } else {
        setError('');
    }
  };

  return (
    <div className="flex justify-center items-start pt-16 flex-grow">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm flex flex-col items-center">
        {logoSrc ? (
            <img src={logoSrc} alt="Logo de la Empresa" className="h-20 w-20 mb-6" />
        ) : (
            <div className="h-20 w-20 mb-6 bg-slate-200 rounded-full"></div>
        )}
        <h2 className="text-2xl font-bold text-center text-slate-800 mb-6 w-full">Acceso Administrador</h2>
        <div className="mb-4 w-full">
          <label className="block text-slate-600 mb-2" htmlFor="password">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
        <button type="submit" className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
          Ingresar
        </button>
      </form>
    </div>
  );
};


const AdminView: React.FC<AdminViewProps> = ({ isLoggedIn, onLogin, documents, onAddDocument, onUpdateDocument, onDeleteDocument, onReorderDocument }) => {

  if (!isLoggedIn) {
    return <LoginScreen onLogin={onLogin} />;
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 flex-grow">
      <DocumentManager 
        documents={documents} 
        onAddDocument={onAddDocument}
        onUpdateDocument={onUpdateDocument}
        onDeleteDocument={onDeleteDocument}
        onReorderDocument={onReorderDocument}
      />
    </div>
  );
};

const DocumentManager: React.FC<Omit<AdminViewProps, 'isLoggedIn' | 'onLogin'>> = ({ documents, onAddDocument, onUpdateDocument, onDeleteDocument, onReorderDocument }) => {
  const [editingDoc, setEditingDoc] = useState<Document | null>(null);
  
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [category, setCategory] = useState<Category>(Category.CodesAndLaws);
  const [type, setType] = useState<DocType>(DocType.MD);
  const [content, setContent] = useState('');
  const [selectedIconKey, setSelectedIconKey] = useState<string | null>(null);
  
  const formRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editingDoc) {
      setTitle(editingDoc.title);
      setSubtitle(editingDoc.subtitle || '');
      setCategory(editingDoc.category);
      setType(editingDoc.type);
      setContent(editingDoc.content);
      setSelectedIconKey(editingDoc.iconKey || null);
    } else {
      resetForm();
    }
  }, [editingDoc]);

  const resetForm = () => {
    setTitle('');
    setSubtitle('');
    setCategory(Category.CodesAndLaws);
    setType(DocType.MD);
    setContent('');
    setSelectedIconKey(null);
    setEditingDoc(null);
  };

  const handleEditClick = (doc: Document) => {
    setEditingDoc(doc);
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleDeleteClick = (doc: Document) => {
    if (window.confirm(`¿Estás seguro de que quieres eliminar "${doc.title}"?`)) {
      onDeleteDocument(doc.id);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) {
        alert("Título y Contenido son obligatorios.");
        return;
    }

    const docData = { 
        title, 
        subtitle, 
        category, 
        type, 
        content, 
        iconKey: selectedIconKey || undefined
    };

    if (editingDoc) {
      onUpdateDocument({ ...docData, id: editingDoc.id });
      alert("Documento actualizado exitosamente!");
    } else {
      onAddDocument(docData);
      alert("Documento agregado exitosamente!");
    }
    
    resetForm();
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
        const fileContent = event.target?.result as string;
        setContent(fileContent);
        alert('Archivo .md cargado. El contenido ha sido copiado al área de texto.');
    };
    reader.onerror = () => {
        console.error("Error al leer el archivo");
        alert('Hubo un error al leer el archivo.');
    };
    reader.readAsText(file);

    if (e.target) {
        e.target.value = '';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div ref={formRef} className="bg-white p-8 rounded-xl shadow-lg w-full">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">{editingDoc ? 'Editar Documento' : 'Subir Nuevo Documento'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-slate-600 mb-1 font-semibold">Título</label>
            <input value={title} onChange={e => setTitle(e.target.value)} required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          </div>
           <div>
            <label className="block text-slate-600 mb-1 font-semibold">Subtítulo (Opcional)</label>
            <input value={subtitle} onChange={e => setSubtitle(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          </div>
          <div>
            <label className="block text-slate-600 mb-1 font-semibold">Icono (Opcional)</label>
            <div className="p-4 border rounded-lg bg-slate-50">
                <div className="grid grid-cols-6 sm:grid-cols-8 gap-3">
                    {Object.entries(ICONS).map(([key, iconNode]) => (
                        <button
                            type="button"
                            key={key}
                            onClick={() => setSelectedIconKey(prev => prev === key ? null : key)}
                            className={`flex justify-center items-center p-2 rounded-lg transition-all duration-200 aspect-square ${
                                selectedIconKey === key 
                                ? 'bg-blue-100 ring-2 ring-blue-500' 
                                : 'bg-slate-200 hover:bg-slate-300'
                            }`}
                            aria-label={`Seleccionar icono ${key}`}
                            aria-pressed={selectedIconKey === key}
                        >
                           <div className={selectedIconKey === key ? 'text-blue-600' : 'text-slate-600'}>
                                {iconNode}
                            </div>
                        </button>
                    ))}
                </div>
            </div>
          </div>
          <div>
            <label className="block text-slate-600 mb-1 font-semibold">Categoría</label>
            <select value={category} onChange={e => setCategory(e.target.value as Category)} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                {Object.entries(Category)
                    .filter(([, value]) => value !== Category.Credits)
                    .map(([key, value]) => (
                        <option key={key} value={value}>
                            {value}
                        </option>
                    ))}
            </select>
          </div>
           <div>
            <label className="block text-slate-600 mb-1 font-semibold">Tipo</label>
            <select value={type} onChange={e => setType(e.target.value as DocType)} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                <option value={DocType.MD}>Markdown (.md)</option>
                <option value={DocType.PDF}>PDF</option>
                <option value={DocType.LINK}>Enlace (Link)</option>
                <option value={DocType.APP}>Aplicación</option>
            </select>
          </div>
           <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-slate-600 font-semibold">
                {type === DocType.MD ? 'Contenido (Markdown)' : (type === DocType.APP ? 'Identificador de App' : 'URL del Archivo/Enlace')}
              </label>
              {type === DocType.MD && (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-sm bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold py-1 px-3 rounded-lg transition-colors"
                >
                  <i className="fa-solid fa-upload mr-2"></i>
                  Cargar .md
                </button>
              )}
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".md,text/markdown"
              className="hidden"
              aria-hidden="true"
            />
            <textarea value={content} onChange={e => setContent(e.target.value)} required rows={8} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder={type === DocType.MD ? 'Escribe tu markdown aquí o carga un archivo...' : 'https://ejemplo.com/documento.pdf o abono-calculator'}/>
          </div>
          <div className="flex space-x-4">
            <button type="submit" className="flex-grow bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors">
              {editingDoc ? 'Guardar Cambios' : 'Agregar Documento'}
            </button>
            {editingDoc && (
              <button type="button" onClick={resetForm} className="flex-grow bg-slate-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-slate-600 transition-colors">
                Cancelar Edición
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-lg w-full">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Gestionar Documentos Existentes</h2>
        <div className="space-y-3">
          {documents.length > 0 ? (
            documents.map((doc, index) => (
              <div key={doc.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border">
                <div>
                  <p className="font-semibold text-slate-700">{doc.title}</p>
                  <p className="text-sm text-slate-500">{doc.category}</p>
                </div>
                <div className="space-x-2 flex items-center flex-shrink-0 ml-4">
                  <button 
                    onClick={() => onReorderDocument(doc.id, 'up')}
                    disabled={index === 0}
                    className="w-8 h-8 bg-slate-200 text-slate-600 rounded-md hover:bg-slate-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Mover hacia arriba"
                  >
                    <i className="fa-solid fa-arrow-up"></i>
                  </button>
                  <button 
                    onClick={() => onReorderDocument(doc.id, 'down')}
                    disabled={index === documents.length - 1}
                    className="w-8 h-8 bg-slate-200 text-slate-600 rounded-md hover:bg-slate-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Mover hacia abajo"
                  >
                    <i className="fa-solid fa-arrow-down"></i>
                  </button>
                  <button onClick={() => handleEditClick(doc)} className="px-3 py-1 text-sm font-semibold bg-yellow-400 text-yellow-900 rounded-md hover:bg-yellow-500 transition-colors">Editar</button>
                  <button onClick={() => handleDeleteClick(doc)} className="px-3 py-1 text-sm font-semibold bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors">Eliminar</button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-slate-500 text-center py-4">No hay documentos para gestionar.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminView;
