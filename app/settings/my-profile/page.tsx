"use client";

import { useState } from "react";

export default function MyProfilePage() {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatarPreview(url);
    }
  };

  return (
    <div className="w-full max-w-3xl flex flex-col items-center animate-in fade-in duration-300">
      <div className="relative group cursor-pointer w-24 h-24 mb-6">
        <div className="w-full h-full bg-brand-amber rounded-full flex items-center justify-center text-h1 text-white shadow-sm overflow-hidden">
          {avatarPreview ? (
            <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
          ) : (
            "TP"
          )}
        </div>
        <label className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
          <span className="material-symbols-outlined text-white">photo_camera</span>
          <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
        </label>
      </div>

      <h2 className="text-h2 text-on-surface mb-10">My Profile</h2>

      <div className="w-full max-w-md space-y-5">
        <div>
          <label className="block text-label-sm text-on-surface-variant mb-1">Full Name</label>
          <input type="text" defaultValue="Tri Pham" className="w-full px-4 py-2.5 bg-surface-container-lowest border border-outline-variant rounded-lg text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
        </div>
        <div>
          <label className="block text-label-sm text-on-surface-variant mb-1">Role</label>
          <input type="text" defaultValue="Director" className="w-full px-4 py-2.5 bg-surface-container-lowest border border-outline-variant rounded-lg text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
        </div>
        <div>
          <label className="block text-label-sm text-on-surface-variant mb-1">Email Address</label>
          <input type="email" defaultValue="phamhuutri.work@gmail.com" disabled className="w-full px-4 py-2.5 bg-surface-container-low border border-outline-variant rounded-lg text-body-md text-on-surface-variant cursor-not-allowed" />
        </div>
        <div>
          <label className="block text-label-sm text-on-surface-variant mb-1">
            Company Name <span className="text-outline font-normal">(Optional)</span>
          </label>
          <input type="text" placeholder="e.g. Scenoo Production" className="w-full px-4 py-2.5 bg-surface-container-lowest border border-outline-variant rounded-lg text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
        </div>

        <div className="pt-6">
          <button className="w-full py-3 bg-primary text-on-primary rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-sm cursor-pointer">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
