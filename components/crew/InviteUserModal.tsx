"use client";

import { useState, KeyboardEvent } from "react";
import type { ProjectRole } from "@/types/project";

interface InviteUserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InviteUserModal({ isOpen, onClose }: InviteUserModalProps) {
  const [emails, setEmails] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [selectedRole, setSelectedRole] = useState<ProjectRole>("User");

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

  const handleInvite = () => {
    // Phase mock: simply close and reset
    onClose();
    setEmails([]);
    setInputValue("");
    setSelectedRole("User");
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-2xl max-w-md w-full flex flex-col p-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-h3 text-on-surface">Invite to Project</h2>
          <button
            onClick={() => {
              onClose();
              setEmails([]);
              setInputValue("");
              setSelectedRole("User");
            }}
            className="text-on-surface-variant hover:text-on-surface transition-colors w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-container"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <p className="text-body-md text-on-surface-variant mb-6">
          Send an email invitation to add new members to this project&apos;s crew.
        </p>

        <div className="mb-6">
          <label className="block text-label-sm text-on-surface-variant mb-2">Email Addresses</label>
          <div className="w-full p-2 bg-surface-container border border-outline-variant rounded-lg min-h-[48px] flex flex-wrap gap-2 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all cursor-text" onClick={() => document.getElementById("email-input")?.focus()}>
            {emails.map((email) => (
              <span key={email} className="flex items-center gap-1 bg-surface-container-high text-on-surface px-2 py-1 rounded-md text-label-sm">
                {email}
                <button onClick={() => removeEmail(email)} className="text-on-surface-variant hover:text-error transition-colors flex items-center justify-center">
                  <span className="material-symbols-outlined text-[14px]">close</span>
                </button>
              </span>
            ))}
            <input
              id="email-input"
              type="email"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={emails.length === 0 ? "colleague@example.com" : ""}
              className="flex-1 bg-transparent outline-none min-w-[150px] text-body-md text-on-surface placeholder:text-on-surface-variant"
            />
          </div>
          <p className="text-label-sm text-on-surface-variant mt-2">Press Enter to add multiple emails.</p>
        </div>

        <div className="mb-8">
          <label className="block text-label-sm text-on-surface-variant mb-3">Assign Role</label>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 text-body-md text-on-surface cursor-pointer group">
              <input
                type="radio"
                name="role"
                value="User"
                checked={selectedRole === "User"}
                onChange={() => setSelectedRole("User")}
                className="accent-primary w-4 h-4"
              />
              <span>User</span>
            </label>
            <label className="flex items-center gap-2 text-body-md text-on-surface cursor-pointer group">
              <input
                type="radio"
                name="role"
                value="Manager"
                checked={selectedRole === "Manager"}
                onChange={() => setSelectedRole("Manager")}
                className="accent-primary w-4 h-4"
              />
              <span>Manager</span>
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-outline-variant pt-6">
          <button
            onClick={() => {
              onClose();
              setEmails([]);
              setInputValue("");
              setSelectedRole("User");
            }}
            className="px-4 py-2 text-label-md text-on-surface hover:bg-surface-container rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleInvite}
            disabled={emails.length === 0}
            className="px-4 py-2 bg-primary text-on-primary rounded-lg text-label-md hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send Invite
          </button>
        </div>
      </div>
    </div>
  );
}
