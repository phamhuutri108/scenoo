"use client";

export default function ChangePasswordPage() {
  return (
    <div className="w-full max-w-3xl flex flex-col items-center animate-in fade-in duration-300">
      <div className="w-16 h-16 bg-surface-container rounded-full flex items-center justify-center text-primary mb-6">
        <span className="material-symbols-outlined text-[32px]">lock</span>
      </div>
      <h2 className="text-h2 text-on-surface mb-10">Change Password</h2>

      <div className="w-full max-w-md space-y-5">
        <div>
          <label className="block text-label-sm text-on-surface-variant mb-1">Current Password</label>
          <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 bg-surface-container-lowest border border-outline-variant rounded-lg text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
        </div>
        <div>
          <label className="block text-label-sm text-on-surface-variant mb-1">New Password</label>
          <input type="password" placeholder="New password" className="w-full px-4 py-2.5 bg-surface-container-lowest border border-outline-variant rounded-lg text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
        </div>
        <div>
          <label className="block text-label-sm text-on-surface-variant mb-1">Confirm New Password</label>
          <input type="password" placeholder="Confirm password" className="w-full px-4 py-2.5 bg-surface-container-lowest border border-outline-variant rounded-lg text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
        </div>

        <div className="pt-6">
          <button className="w-full py-3 bg-primary text-on-primary rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-sm cursor-pointer">
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
}
