
import React from 'react';
import { Link } from '../types';
import { getPlatformIcon, getPlatformColor } from '../constants';
import { ChevronRight } from 'lucide-react';

interface LinkButtonProps {
  link: Link;
}

const LinkButton: React.FC<LinkButtonProps> = ({ link }) => {
  if (!link.enabled) return null;

  return (
    <a 
      href={link.url.startsWith('http') ? link.url : `https://${link.url}`}
      target="_blank"
      rel="noopener noreferrer"
      className="w-full flex items-center p-4 bg-white hover:bg-slate-50 border border-slate-100 rounded-2xl shadow-sm transition-all active:scale-[0.98] group"
    >
      <div className={`flex items-center justify-center w-10 h-10 rounded-xl text-white ${getPlatformColor(link.platform)} shadow-sm`}>
        {getPlatformIcon(link.platform)}
      </div>
      
      <div className="ml-4 flex-1 text-left">
        <p className="font-semibold text-slate-800 text-sm">{link.title}</p>
      </div>
      
      <ChevronRight size={18} className="text-slate-300 group-hover:text-slate-500 transition-colors" />
    </a>
  );
};

export default LinkButton;
