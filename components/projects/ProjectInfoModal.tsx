"use client";

import { useState, useRef } from "react";

interface ProjectInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectInfoModal({ isOpen, onClose }: ProjectInfoModalProps) {
  const [projectName, setProjectName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [director, setDirector] = useState("");
  const [producer, setProducer] = useState("");
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setThumbnailFile(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setThumbnailFile(file);
  };

  const handleSave = () => {
    if (!projectName.trim()) return;
    onClose();
  };

  const inputClass =
    "w-full px-3 py-2 bg-surface-container border border-outline-variant rounded-lg text-body-md text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary transition-colors";
  const labelClass = "block text-label-sm text-on-surface-variant mb-1";

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-2xl max-w-md w-full flex flex-col p-6">
        <h2 className="text-h3 text-on-surface mb-5">Project Information</h2>

        <div className="flex flex-col gap-4">
          <div>
            <label className={labelClass}>Project Name</label>
            <input
              className={inputClass}
              placeholder="e.g. Neon Nights"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
          </div>
          <div>
            <label className={labelClass}>Company Name</label>
            <input
              className={inputClass}
              placeholder="e.g. Studio 42"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>
          <div>
            <label className={labelClass}>Director</label>
            <input
              className={inputClass}
              placeholder="e.g. Jane Doe"
              value={director}
              onChange={(e) => setDirector(e.target.value)}
            />
          </div>
          <div>
            <label className={labelClass}>Producer</label>
            <input
              className={inputClass}
              placeholder="e.g. John Smith"
              value={producer}
              onChange={(e) => setProducer(e.target.value)}
            />
          </div>

          <div>
            <label className={labelClass}>Thumbnail</label>
            <div
              className="border-2 border-dashed border-outline-variant rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-surface-container transition-colors"
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              onClick={() => fileInputRef.current?.click()}
            >
              {thumbnailFile ? (
                <p className="text-label-md text-on-surface">{thumbnailFile.name}</p>
              ) : (
                <>
                  <span className="material-symbols-outlined text-on-surface-variant text-[32px] mb-2">
                    add_photo_alternate
                  </span>
                  <p className="text-label-md text-on-surface-variant">Import Thumbnail</p>
                </>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
            <p className="text-body-sm text-on-surface-variant mt-1.5">
              Defaults to Scenoo branding image if empty.
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-label-md text-on-surface border border-outline-variant rounded-lg hover:bg-surface-container transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-label-md text-on-primary bg-primary rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
            disabled={!projectName.trim()}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
