
import React from 'react';
import { UserProfile } from '../types';

interface ProfileHeaderProps {
  profile: UserProfile;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ profile }) => {
  return (
    <div className="flex flex-col items-center text-center space-y-4 pt-10 pb-6 px-4">
      <div className="relative">
        <img 
          src={profile.avatarUrl || `https://picsum.photos/seed/${profile.username}/200`} 
          alt={profile.displayName}
          className="w-24 h-24 rounded-full border-4 border-white shadow-xl object-cover"
        />
        <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 border-2 border-white rounded-full"></div>
      </div>
      
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          {profile.displayName}
        </h1>
        <p className="text-slate-500 font-medium">
          @{profile.username}
        </p>
      </div>

      {profile.bio && (
        <p className="text-slate-600 max-w-xs leading-relaxed text-sm px-4">
          {profile.bio}
        </p>
      )}
    </div>
  );
};

export default ProfileHeader;
