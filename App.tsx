
import React, { useState, useEffect, useCallback } from 'react';
import { UserProfile, Link, AppView, Platform } from './types';
import ProfileHeader from './components/ProfileHeader';
import LinkButton from './components/LinkButton';
import EditLinkCard from './components/EditLinkCard';
import LinkModal from './components/LinkModal';
import { 
  Plus, 
  Settings, 
  Share2, 
  ArrowLeft, 
  ExternalLink,
  Save,
  User as UserIcon
} from 'lucide-react';

const INITIAL_PROFILE: UserProfile = {
  id: 'user123',
  username: 'alex_dev',
  displayName: 'Alex Rivers',
  bio: 'Fullstack Developer & Content Creator. Building the future of Telegram apps 🚀',
  avatarUrl: 'https://picsum.photos/seed/alex_dev/400',
  links: [
    { id: '1', platform: 'telegram', title: 'Join my Channel', url: 't.me/alex_updates', enabled: true, order: 0 },
    { id: '2', platform: 'github', title: 'Open Source Projects', url: 'github.com/arivers', enabled: true, order: 1 },
    { id: '3', platform: 'instagram', title: 'Daily Life', url: 'instagram.com/alex_rivers', enabled: true, order: 2 },
  ]
};

const App: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>(INITIAL_PROFILE);
  const [view, setView] = useState<AppView>('public');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<Link | null>(null);

  // Profile Form State
  const [tempDisplayName, setTempDisplayName] = useState(profile.displayName);
  const [tempBio, setTempBio] = useState(profile.bio);

  const toggleLink = (id: string) => {
    setProfile(prev => ({
      ...prev,
      links: prev.links.map(l => l.id === id ? { ...l, enabled: !l.enabled } : l)
    }));
  };

  const deleteLink = (id: string) => {
    setProfile(prev => ({
      ...prev,
      links: prev.links.filter(l => l.id !== id)
    }));
  };

  const saveLink = (linkData: Partial<Link>) => {
    if (editingLink) {
      setProfile(prev => ({
        ...prev,
        links: prev.links.map(l => l.id === editingLink.id ? { ...l, ...linkData } as Link : l)
      }));
    } else {
      const newLink: Link = {
        id: Math.random().toString(36).substr(2, 9),
        platform: linkData.platform || 'website',
        title: linkData.title || '',
        url: linkData.url || '',
        enabled: true,
        order: profile.links.length
      };
      setProfile(prev => ({
        ...prev,
        links: [...prev.links, newLink]
      }));
    }
    setEditingLink(null);
  };

  const handleEditLink = (link: Link) => {
    setEditingLink(link);
    setIsModalOpen(true);
  };

  const saveProfileSettings = () => {
    setProfile(prev => ({
      ...prev,
      displayName: tempDisplayName,
      bio: tempBio
    }));
    setView('admin');
  };

  const sortedLinks = [...profile.links].sort((a, b) => a.order - b.order);

  return (
    <div className="min-h-screen max-w-lg mx-auto bg-slate-50 flex flex-col relative pb-24">
      
      {/* View Logic: PUBLIC PROFILE */}
      {view === 'public' && (
        <>
          <header className="absolute top-0 left-0 right-0 flex justify-between p-4 z-10">
            <div className="flex-1"></div>
            <button 
              onClick={() => setView('admin')}
              className="p-2 bg-white/80 backdrop-blur rounded-full shadow-sm text-slate-600 active:scale-90 transition-all"
            >
              <Settings size={20} />
            </button>
          </header>

          <main className="flex-1">
            <ProfileHeader profile={profile} />
            
            <div className="px-6 space-y-3 pb-10">
              {sortedLinks.filter(l => l.enabled).map(link => (
                <LinkButton key={link.id} link={link} />
              ))}
              
              {sortedLinks.filter(l => l.enabled).length === 0 && (
                <div className="py-20 text-center text-slate-400">
                  <p className="text-sm">This user hasn't added any links yet.</p>
                </div>
              )}
            </div>
          </main>

          <footer className="p-6 text-center">
            <p className="text-xs text-slate-300 font-medium tracking-widest uppercase">
              Powered by Linkify
            </p>
          </footer>
        </>
      )}

      {/* View Logic: ADMIN PANEL */}
      {view === 'admin' && (
        <div className="flex flex-col animate-in fade-in slide-in-from-right duration-300">
          <header className="sticky top-0 z-20 glass-effect p-4 border-b border-slate-100 flex items-center justify-between">
            <button onClick={() => setView('public')} className="p-2 text-slate-600">
              <ArrowLeft size={20} />
            </button>
            <h2 className="font-bold text-slate-800">Manage Links</h2>
            <button 
              onClick={() => {
                setTempDisplayName(profile.displayName);
                setTempBio(profile.bio);
                setView('edit-profile');
              }}
              className="p-2 text-blue-600 font-semibold text-sm"
            >
              Profile
            </button>
          </header>

          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Your Links</h3>
              <span className="text-xs font-medium text-slate-400">{profile.links.length} total</span>
            </div>

            <div className="space-y-3">
              {sortedLinks.map(link => (
                <EditLinkCard 
                  key={link.id} 
                  link={link} 
                  onToggle={toggleLink} 
                  onDelete={deleteLink}
                  onEdit={handleEditLink}
                />
              ))}

              <button 
                onClick={() => {
                  setEditingLink(null);
                  setIsModalOpen(true);
                }}
                className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 hover:text-blue-500 hover:border-blue-200 transition-all flex items-center justify-center space-x-2 bg-white/50"
              >
                <Plus size={20} />
                <span className="font-semibold text-sm">Add New Link</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Logic: EDIT PROFILE SETTINGS */}
      {view === 'edit-profile' && (
        <div className="flex flex-col animate-in fade-in slide-in-from-bottom duration-300">
          <header className="sticky top-0 z-20 glass-effect p-4 border-b border-slate-100 flex items-center justify-between">
            <button onClick={() => setView('admin')} className="p-2 text-slate-600">
              <ArrowLeft size={20} />
            </button>
            <h2 className="font-bold text-slate-800">Edit Profile</h2>
            <button 
              onClick={saveProfileSettings}
              className="p-2 text-blue-600 font-bold"
            >
              <Save size={20} />
            </button>
          </header>

          <div className="p-6 space-y-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative group cursor-pointer">
                <img 
                  src={profile.avatarUrl} 
                  className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg brightness-90" 
                  alt="Avatar"
                />
                <div className="absolute inset-0 flex items-center justify-center text-white opacity-100">
                  <UserIcon size={24} />
                </div>
              </div>
              <p className="text-xs text-blue-500 font-bold uppercase tracking-widest cursor-pointer">Change Photo</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Display Name</label>
                <input 
                  type="text" 
                  value={tempDisplayName}
                  onChange={(e) => setTempDisplayName(e.target.value)}
                  className="w-full p-4 bg-white border border-slate-100 rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="Enter your name"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Short Bio</label>
                <textarea 
                  value={tempBio}
                  onChange={(e) => setTempBio(e.target.value)}
                  className="w-full p-4 bg-white border border-slate-100 rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all h-32 resize-none"
                  placeholder="Tell people about yourself..."
                />
              </div>
            </div>

            <div className="pt-4">
              <button 
                onClick={saveProfileSettings}
                className="w-full py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-lg shadow-blue-200 flex items-center justify-center space-x-2 transition-all active:scale-95"
              >
                <span>Save Profile</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Buttons for Admin */}
      {view === 'admin' && (
        <div className="fixed bottom-8 left-0 right-0 flex justify-center px-6 pointer-events-none">
          <div className="flex items-center space-x-4 pointer-events-auto">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 text-white p-4 rounded-full shadow-xl shadow-blue-200 active:scale-90 transition-all"
            >
              <Plus size={28} />
            </button>
            <button 
              onClick={() => setView('public')}
              className="bg-white text-slate-600 px-6 py-4 rounded-full shadow-xl flex items-center space-x-2 font-bold active:scale-95 transition-all border border-slate-50"
            >
              <ExternalLink size={20} />
              <span>Preview</span>
            </button>
          </div>
        </div>
      )}

      {/* Public Share Button */}
      {view === 'public' && (
        <div className="fixed bottom-8 right-6">
          <button className="bg-white/80 backdrop-blur text-slate-800 p-4 rounded-full shadow-xl active:scale-90 transition-all border border-white">
            <Share2 size={24} />
          </button>
        </div>
      )}

      {/* MODAL */}
      <LinkModal 
        isOpen={isModalOpen} 
        onClose={() => {
          setIsModalOpen(false);
          setEditingLink(null);
        }} 
        onSave={saveLink}
        editLink={editingLink}
      />
    </div>
  );
};

export default App;
