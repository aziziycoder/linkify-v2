
export type Platform = 
  | 'telegram' 
  | 'instagram' 
  | 'youtube' 
  | 'github' 
  | 'linkedin' 
  | 'twitter' 
  | 'website' 
  | 'email'
  | 'whatsapp'
  | 'tiktok';

export interface Link {
  id: string;
  platform: Platform;
  title: string;
  url: string;
  enabled: boolean;
  order: number;
}

export interface UserProfile {
  id: string;
  username: string;
  displayName: string;
  bio: string;
  avatarUrl: string;
  links: Link[];
}

export type AppView = 'public' | 'admin' | 'edit-profile';
