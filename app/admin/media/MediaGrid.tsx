"use client";

import { useState } from "react";

interface MediaFile {
  name: string;
  size: number;
  created_at: string;
  url: string;
}

function isImage(name: string) {
  return /\.(jpg|jpeg|png|webp|gif|svg)$/i.test(name);
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)}MB`;
}

export default function MediaGrid({ files }: { files: MediaFile[] }) {
  const [selected, setSelected] = useState<MediaFile | null>(null);
  const [uploading, setUploading] = useState(false);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    fd.append("folder", "admin");
    await fetch("/api/upload", { method: "POST", body: fd });
    setUploading(false);
    window.location.reload();
    e.target.value = "";
  }

  if (files.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-16 text-center">
        <div className="text-4xl mb-3">🖼️</div>
        <div className="font-semibold text-gray-700 mb-1">No uploads yet</div>
        <div className="text-sm text-gray-400 mb-6">Client logos and photos uploaded via the application form will appear here.</div>
        <label className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-5 py-2.5 rounded-full cursor-pointer text-sm transition-all">
          {uploading ? "Uploading…" : "Upload File"}
          <input type="file" accept="image/*" className="hidden" onChange={handleUpload} disabled={uploading} />
        </label>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-end mb-4">
        <label className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-5 py-2.5 rounded-full cursor-pointer text-sm transition-all">
          {uploading ? "Uploading…" : "+ Upload"}
          <input type="file" accept="image/*" className="hidden" onChange={handleUpload} disabled={uploading} />
        </label>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        {files.map((f) => (
          <button key={f.name} onClick={() => setSelected(f)}
            className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow text-left group">
            {isImage(f.name) ? (
              <img src={f.url} alt={f.name} className="w-full h-32 object-cover" />
            ) : (
              <div className="w-full h-32 bg-gray-50 flex items-center justify-center text-3xl">📄</div>
            )}
            <div className="p-2">
              <div className="text-xs text-gray-700 font-medium truncate">{f.name}</div>
              <div className="text-xs text-gray-400">{formatBytes(f.size)}</div>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {selected && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-2xl overflow-hidden max-w-2xl w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
            {isImage(selected.name) && <img src={selected.url} alt={selected.name} className="w-full max-h-96 object-contain bg-gray-100" />}
            <div className="p-5 flex items-center justify-between">
              <div>
                <div className="font-semibold text-gray-900">{selected.name}</div>
                <div className="text-sm text-gray-400">{formatBytes(selected.size)}</div>
              </div>
              <div className="flex gap-2">
                <a href={selected.url} target="_blank" rel="noopener noreferrer"
                  className="text-sm bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full font-semibold hover:bg-indigo-100 transition-colors">
                  Open ↗
                </a>
                <button onClick={() => {navigator.clipboard.writeText(selected.url); }}
                  className="text-sm bg-gray-50 text-gray-600 px-4 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                  Copy URL
                </button>
                <button onClick={() => setSelected(null)}
                  className="text-sm bg-gray-50 text-gray-600 px-4 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
