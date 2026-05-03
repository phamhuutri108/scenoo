"use client";

import { useState, KeyboardEvent } from "react";

interface ShareExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ShareExportModal({ isOpen, onClose }: ShareExportModalProps) {
  const [emails, setEmails] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [access, setAccess] = useState("Just Crew");

  if (!isOpen) return null;

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newEmail = inputValue.trim();
      if (newEmail && newEmail.includes("@") && !emails.includes(newEmail)) {
        setEmails([...emails, newEmail]);
        setInputValue("");
      }
    }
  };

  const removeEmail = (emailToRemove: string) => {
    setEmails(emails.filter((e) => e !== emailToRemove));
  };

  const handleClose = () => {
    setEmails([]);
    setInputValue("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-2xl max-w-lg w-full flex flex-col p-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-h2 text-on-surface tracking-tight">Share Document</h2>
          <button
            onClick={handleClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-container transition-colors text-on-surface-variant hover:text-on-surface cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Email Chip Input */}
        <div className="mb-6">
          <div
            className="w-full p-2 bg-surface-container border border-outline-variant rounded-lg min-h-[48px] flex flex-wrap gap-2 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all cursor-text"
            onClick={() => document.getElementById("share-export-email-input")?.focus()}
          >
            {emails.map((email) => (
              <span key={email} className="flex items-center gap-1 bg-surface-container-high text-on-surface px-2 py-1 rounded-md text-label-sm">
                {email}
                <button
                  onClick={() => removeEmail(email)}
                  className="text-on-surface-variant hover:text-error transition-colors flex items-center justify-center cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[14px]">close</span>
                </button>
              </span>
            ))}
            <input
              id="share-export-email-input"
              type="email"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={emails.length === 0 ? "Add people by email..." : ""}
              className="flex-1 bg-transparent outline-none min-w-[150px] text-body-md text-on-surface placeholder:text-on-surface-variant"
            />
          </div>
          <p className="text-label-sm text-on-surface-variant mt-2">Press Enter to add multiple emails.</p>
        </div>

        {/* People with access */}
        <div className="mb-6">
          <h3 className="text-label-sm font-semibold text-on-surface mb-3">People with access</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-brand-amber flex items-center justify-center text-white text-label-sm font-medium">TP</div>
              <div className="flex flex-col">
                <p className="text-body-md font-medium text-on-surface">Tri Pham (you)</p>
                <p className="text-label-sm text-on-surface-variant">phamhuutri.work@gmail.com</p>
              </div>
            </div>
            <span className="text-label-sm text-on-surface-variant">Owner</span>
          </div>
        </div>

        {/* General access */}
        <div className="mb-6">
          <h3 className="text-label-sm font-semibold text-on-surface mb-3">General access</h3>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center shrink-0 mt-0.5">
              <span className="material-symbols-outlined text-[20px] text-on-surface-variant">
                {access === "Just Crew" ? "lock" : "public"}
              </span>
            </div>
            <div className="flex flex-col w-full">
              <select
                value={access}
                onChange={(e) => setAccess(e.target.value)}
                className="bg-transparent text-body-md font-medium text-on-surface outline-none cursor-pointer hover:bg-surface-container rounded px-1 py-0.5 -ml-1 w-fit transition-colors appearance-none"
              >
                <option value="Just Crew">Just Crew</option>
                <option value="Anyone with the link">Anyone with the link</option>
              </select>
              <p className="text-label-sm text-on-surface-variant mt-0.5">
                {access === "Just Crew"
                  ? "Only people added to the crew can open with this link"
                  : "Anyone on the internet with the link can view"}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center mt-2">
          <button
            onClick={handleClose}
            className="px-5 py-2 border border-outline-variant text-primary rounded-full flex items-center gap-2 hover:bg-surface-container-low transition-colors font-medium text-label-md cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">link</span>
            Copy link
          </button>
          <button
            onClick={handleClose}
            className="px-6 py-2 bg-primary text-on-primary rounded-full text-label-md hover:bg-primary/90 transition-colors shadow-sm font-medium cursor-pointer"
          >
            {emails.length > 0 ? "Share" : "Done"}
          </button>
        </div>

      </div>
    </div>
  );
}
