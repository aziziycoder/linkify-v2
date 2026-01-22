
import React from 'react';
import { Link } from '../types';
import { getPlatformIcon, getPlatformColor } from '../constants';
import { MoreVertical, GripVertical, Trash2, Edit2, Power } from 'lucide-react';

interface EditLinkCardProps {
  link: Link;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (link: Link) => void;
}

const EditLinkCard: React.FC<EditLinkCardProps> = ({ link, onToggle, onDelete, onEdit }) => {
  return (
    <div className={`w-full flex items-center p-4 bg-white border ${link.enabled ? 'border-slate-100' : 'border-slate-200 opacity-60'} rounded-2xl shadow-sm transition-all`}>
      <div className="text-slate-300 cursor-grab px-1">
        <GripVertical size={20} />
      </div>

      <div className={`flex items-center justify-center w-10 h-10 rounded-xl text-white ${getPlatformColor(link.platform)} shrink-0 ml-1`}>
        {getPlatformIcon(link.platform)}
      </div>
      
      <div className="ml-4 flex-1 overflow-hidden">
        <p className="font-semibold text-slate-800 text-sm truncate">{link.title}</p>
        <p className="text-xs text-slate-400 truncate">{link.url}</p>
      </div>

      <div className="flex items-center space-x-1">
        <button 
          onClick={() => onEdit(link)}
          className="p-2 text-slate-400 hover:text-blue-500 transition-colors"
        >
          <Edit2 size={18} />
        </button>
        <button 
          onClick={() => onToggle(link.id)}
          className={`p-2 transition-colors ${link.enabled ? 'text-green-500 hover:text-green-600' : 'text-slate-400 hover:text-slate-600'}`}
        >
          <Power size={18} />
        </button>
        <button 
          onClick={() => onDelete(link.id)}
          className="p-2 text-slate-400 hover:text-red-500 transition-colors"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default EditLinkCard;
