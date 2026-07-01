import React, { useRef, useState, useEffect } from 'react';
import { Upload, X, FileImage, CheckCircle2 } from 'lucide-react';

interface FileUploadProps {
  label: string;
  description: string;
  onChange: (file: File | null) => void;
  error?: string;
  value?: File | null;
}

export default function FileUpload({
  label,
  description,
  onChange,
  error,
  value,
}: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Sync state if value is cleared externally
  useEffect(() => {
    if (!value) {
      setSelectedFile(null);
      setPreviewUrl(null);
    } else {
      setSelectedFile(value);
      const url = URL.createObjectURL(value);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [value]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const validateAndSetFile = (file: File) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const maxBytes = 10 * 1024 * 1024; // 10MB

    if (!allowedTypes.includes(file.type)) {
      alert('Invalid file format. Please upload a JPG, JPEG, PNG, or WEBP image.');
      return;
    }

    if (file.size > maxBytes) {
      alert('File size exceeds 10MB limit. Please upload a smaller image.');
      return;
    }

    setSelectedFile(file);
    onChange(file);

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedFile(null);
    setPreviewUrl(null);
    onChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <label className="text-sm font-bold uppercase tracking-wider text-[#664436] flex justify-between">
        <span>{label}</span>
        {selectedFile && <span className="text-[#895158] text-xs lowercase">{(selectedFile.size / (1024 * 1024)).toFixed(2)} MB</span>}
      </label>

      <div
        className={`relative min-h-[200px] border-4 border-dashed rounded-2xl flex flex-col justify-center items-center p-4 transition-all duration-300 cursor-pointer overflow-hidden ${
          dragActive
            ? 'border-[#895158] bg-[#895158]/5 scale-[0.99]'
            : error
            ? 'border-red-500 bg-red-50/20'
            : selectedFile
            ? 'border-[#664436]/50 bg-green-50/10'
            : 'border-[#D1C7B7] hover:border-[#664436]/70 hover:bg-[#EADBC8]/20'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={openFileDialog}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept=".jpg,.jpeg,.png,.webp"
          onChange={handleFileChange}
        />

        {previewUrl ? (
          <div className="w-full h-full flex flex-col gap-3">
            <div className="relative w-full h-[180px] rounded-lg overflow-hidden border border-[#D1C7B7]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewUrl}
                alt="Upload preview"
                className="w-full h-full object-contain bg-black/5"
              />
              <button
                type="button"
                onClick={handleRemove}
                className="absolute top-2 right-2 bg-black/75 hover:bg-black text-white p-1.5 rounded-full transition-transform hover:scale-110"
                title="Remove photo"
              >
                <X size={16} />
              </button>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-green-700 bg-green-50 border border-green-200/50 px-3 py-1.5 rounded-lg w-fit mx-auto">
              <CheckCircle2 size={14} />
              <span>{selectedFile?.name}</span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center gap-2 p-4">
            <div className="p-3 bg-[#EADBC8]/40 text-[#664436] rounded-full">
              <Upload size={24} />
            </div>
            <p className="font-bold text-sm text-[#664436]">
              Drag and drop your image, or <span className="text-[#895158] underline decoration-dashed">browse</span>
            </p>
            <p className="text-xs text-[#664436]/70 max-w-[240px]">
              {description}
            </p>
          </div>
        )}
      </div>

      {error && <p className="text-xs text-red-500 font-semibold">{error}</p>}
    </div>
  );
}
