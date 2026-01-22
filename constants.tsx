
import React from 'react';
import { 
  Send, 
  Instagram, 
  Youtube, 
  Github, 
  Linkedin, 
  Twitter, 
  Globe, 
  Mail, 
  MessageSquare,
  Music
} from 'lucide-react';
import { Platform } from './types';

export const PLATFORMS: { value: Platform; label: string; icon: React.ReactNode; color: string }[] = [
  { value: 'telegram', label: 'Telegram', icon: <Send size={20} />, color: 'bg-sky-500' },
  { value: 'instagram', label: 'Instagram', icon: <Instagram size={20} />, color: 'bg-pink-600' },
  { value: 'youtube', label: 'YouTube', icon: <Youtube size={20} />, color: 'bg-red-600' },
  { value: 'github', label: 'GitHub', icon: <Github size={20} />, color: 'bg-slate-800' },
  { value: 'linkedin', label: 'LinkedIn', icon: <Linkedin size={20} />, color: 'bg-blue-700' },
  { value: 'twitter', label: 'X (Twitter)', icon: <Twitter size={20} />, color: 'bg-black' },
  { value: 'whatsapp', label: 'WhatsApp', icon: <MessageSquare size={20} />, color: 'bg-green-500' },
  { value: 'tiktok', label: 'TikTok', icon: <Music size={20} />, color: 'bg-neutral-900' },
  { value: 'website', label: 'Website', icon: <Globe size={20} />, color: 'bg-indigo-500' },
  { value: 'email', label: 'Email', icon: <Mail size={20} />, color: 'bg-amber-500' },
];

export const getPlatformIcon = (platform: Platform) => {
  return PLATFORMS.find(p => p.value === platform)?.icon || <Globe size={20} />;
};

export const getPlatformColor = (platform: Platform) => {
  return PLATFORMS.find(p => p.value === platform)?.color || 'bg-slate-500';
};
