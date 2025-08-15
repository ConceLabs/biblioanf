import React from 'react';
import { Document } from '../types';
import { ICONS } from '../constants';

interface DocumentCardProps {
  doc: Document;
  onSelect: (doc: Document) => void;
}

const DocumentCard: React.FC<DocumentCardProps> = ({ doc, onSelect }) => {
    const icon = doc.iconKey ? ICONS[doc.iconKey] : null;

    return (
      <div 
        onClick={() => onSelect(doc)} 
        className="bg-white rounded-2xl w-full flex flex-col justify-center items-center p-4 h-40 cursor-pointer transition-all shadow-md hover:shadow-lg hover:bg-slate-50"
      >
        {icon && <div className="mb-2 text-slate-900">{icon}</div>}
        <div className="text-center overflow-hidden">
          <h3 className="font-semibold text-slate-900 text-sm leading-tight">{doc.title}</h3>
          {doc.subtitle && <p className="text-xs text-slate-600 mt-1">{doc.subtitle}</p>}
        </div>
      </div>
    );
};

export default DocumentCard;