"use client";

import { useState } from "react";
import { slugify } from "@/lib/utils";

interface ImportScriptModalProps {
  isOpen: boolean;
  onClose: () => void;
  existingSlugs: string[];
  projectSlug: string;
}

export default function ImportScriptModal({ isOpen, onClose, existingSlugs, projectSlug }: ImportScriptModalProps) {
  const [versionName, setVersionName] = useState("");
  const [description, setDescription] = useState("");

  if (!isOpen) return null;

  const currentSlug = slugify(versionName);
  const isDuplicate = versionName.trim() !== "" && existingSlugs.includes(currentSlug);
  const isSaveDisabled = !versionName.trim() || isDuplicate;

  const handleClose = () => {
    setVersionName("");
    setDescription("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-2xl w-full max-w-lg flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-outline-variant">
          <h2 className="text-h3 text-on-surface">Script Information</h2>
          <button
            onClick={handleClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-container transition-colors text-on-surface-variant hover:text-on-surface cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {/* File Dropzone - Visual Only */}
          <div className="w-full h-32 border-2 border-dashed border-outline-variant rounded-lg bg-surface-container-lowest flex flex-col items-center justify-center cursor-pointer hover:bg-surface-container-low hover:border-primary transition-all group">
            <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors text-[28px] mb-2">
              upload_file
            </span>
            <p className="text-label-md text-on-surface-variant group-hover:text-primary transition-colors">
              Click to upload or drag &amp; drop PDF
            </p>
          </div>

          {/* Original Name */}
          <div>
            <label className="block text-label-sm text-on-surface-variant mb-1 uppercase tracking-wider">
              Original Name
            </label>
            <input
              type="text"
              defaultValue="NeonNights_Script.pdf"
              disabled
              className="w-full px-4 py-2.5 bg-surface-container-low border border-outline-variant rounded-lg text-body-md text-on-surface-variant cursor-not-allowed"
            />
          </div>

          {/* Version Name */}
          <div>
            <label className="block text-label-sm text-on-surface-variant mb-1 uppercase tracking-wider">
              Version Name <span className="text-error">*</span>
            </label>
            <input
              type="text"
              value={versionName}
              onChange={(e) => setVersionName(e.target.value)}
              placeholder="e.g. Draft 1"
              className={`w-full px-4 py-2.5 bg-surface-container-lowest border rounded-lg text-body-md text-on-surface focus:outline-none focus:ring-1 transition-all ${
                isDuplicate
                  ? "border-error focus:border-error focus:ring-error"
                  : "border-outline-variant focus:border-primary focus:ring-primary"
              }`}
            />
            {isDuplicate ? (
              <p className="text-label-sm text-error mt-1.5">
                Phiên bản này đã tồn tại. Hãy thêm .1 hoặc -2 vào sau (VD: Draft 1.1) để tiếp tục.
              </p>
            ) : (
              versionName.trim() !== "" && (
                <p className="text-label-sm text-on-surface-variant mt-1.5">
                  URL: /workspace/{projectSlug}/{currentSlug}/breakdown
                </p>
              )
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-label-sm text-on-surface-variant mb-1 uppercase tracking-wider">
              Description <span className="normal-case tracking-normal font-normal text-outline">(Optional)</span>
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief notes about this version..."
              className="w-full px-4 py-2.5 bg-surface-container-lowest border border-outline-variant rounded-lg text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
            />
          </div>

          {/* Smart Transfer */}
          <div className="p-4 bg-primary-fixed/30 border border-primary-fixed rounded-lg">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-primary text-[20px] mt-0.5">
                auto_awesome
              </span>
              <div className="flex-1">
                <label className="block text-label-md text-on-surface font-bold mb-1">
                  Smart Transfer Data
                </label>
                <p className="text-body-md text-on-surface-variant mb-3">
                  Copy breakdown tags and line scripts from an older version to this new upload.
                </p>
                <select className="w-full px-3 py-2 bg-white border border-outline-variant rounded-md text-body-md text-on-surface focus:outline-none focus:border-primary">
                  <option value="none">None (Start fresh)</option>
                  <option value="v1">Draft 1</option>
                  <option value="v3">Shooting Script</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-outline-variant flex justify-end gap-3 bg-surface-container-lowest rounded-b-xl">
          <button
            onClick={handleClose}
            className="px-5 py-2 rounded-lg text-label-md font-medium text-on-surface border border-outline-variant hover:bg-surface-container-low transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            disabled={isSaveDisabled}
            className={`px-5 py-2 rounded-lg text-label-md font-medium transition-all shadow-sm ${
              isSaveDisabled
                ? "bg-surface-variant text-outline cursor-not-allowed"
                : "bg-primary text-on-primary hover:bg-primary/90 cursor-pointer"
            }`}
          >
            Import Script
          </button>
        </div>
      </div>
    </div>
  );
}
