import React, { useRef } from 'react';
import { UploadIcon } from './icons';

interface ImageUploaderProps {
  onImageChange: (file: File | null) => void;
  imageUrl: string | null;
  onAnalyze: () => void;
  isLoading: boolean;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageChange, imageUrl, onAnalyze, isLoading }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    onImageChange(file);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files?.[0] || null;
    onImageChange(file);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div
        className={`w-full h-64 border-2 border-dashed border-slate-300 rounded-lg flex items-center justify-center text-center p-4 cursor-pointer hover:border-green-400 hover:bg-green-50 transition-colors ${imageUrl ? 'p-0' : ''}`}
        onClick={() => fileInputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
        {imageUrl ? (
          <img src={imageUrl} alt="Mushroom preview" className="w-full h-full object-contain rounded-lg" />
        ) : (
          <div className="text-slate-500">
            <UploadIcon className="w-12 h-12 mx-auto mb-2" />
            <p className="font-semibold">Click to upload or drag & drop</p>
            <p className="text-sm">PNG, JPG, or WEBP</p>
          </div>
        )}
      </div>

      {imageUrl && (
        <button
          onClick={onAnalyze}
          disabled={isLoading}
          className="mt-6 w-full bg-green-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 disabled:bg-slate-300 disabled:cursor-not-allowed transition-all duration-200 ease-in-out transform hover:scale-105"
        >
          {isLoading ? 'Analyzing...' : 'Identify Mushroom'}
        </button>
      )}
    </div>
  );
};

export default ImageUploader;