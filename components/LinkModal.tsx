
import React, { useState, useEffect } from 'react';
import { Link, Platform } from '../types';
import { PLATFORMS } from '../constants';
import { X } from 'lucide-react';

interface LinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (link: Partial<Link>) => void;
  editLink?: Link | null;
}

const LinkModal: React.FC<LinkModalProps> = ({ isOpen, onClose, onSave, editLink }) => {
  const [platform, setPlatform] = useState<Platform>('website');
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    if (editLink) {
      setPlatform(editLink.platform);
      setTitle(editLink.title);
      setUrl(editLink.url);
    } else {
      setPlatform('website');
      setTitle('');
      setUrl('');
    }
  }, [editLink, isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (!title || !url) return;
    onSave({
      platform,
      title,
      url,
      enabled: editLink ? editLink.enabled : true,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl p-6 space-y-6 animate-in slide-in-from-bottom duration-300">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">
            {editLink ? 'Edit Link' : 'Add New Link'}
          </h2>
          <button onClick={onClose} className="p-2 text-slate-400 hover:bg-slate-50 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Platform</label>
            <div className="grid grid-cols-5 gap-2">
              {PLATFORMS.map((p) => (
                <button
                  key={p.value}
                  onClick={() => {
                    setPlatform(p.value);
                    if (!title) setTitle(p.label);
                  }}
                  className={`flex flex-col items-center justify-center p-2 rounded-xl border-2 transition-all ${
                    platform === p.value 
                      ? 'border-blue-500 bg-blue-50 text-blue-600' 
                      : 'border-slate-100 text-slate-400'
                  }`}
                >
                  {p.icon}
                  <span className="text-[10px] mt-1 font-medium truncate w-full text-center">
                    {p.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-semibold text-slate-700">Display Title</label>
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. My Portfolio"
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-semibold text-slate-700">URL / Handle</label>
            <input 
              type="text" 
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="e.g. https://yourname.me"
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
            />
          </div>
        </div>

        <button 
          onClick={handleSave}
          className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-200 transition-all active:scale-95"
        >
          {editLink ? 'Update Link' : 'Add Link'}
        </button>
      </div>
    </div>
  );
};

export default LinkModal;
