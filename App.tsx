import React, { useState, useCallback } from 'react';
import type { MushroomAnalysis } from './types';
import { analyzeMushroomImage } from './services/geminiService';
import ImageUploader from './components/ImageUploader';
import AnalysisResult from './components/AnalysisResult';
import Disclaimer from './components/Disclaimer';
import { MushroomIcon } from './components/icons';

const App: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<MushroomAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = (file: File | null) => {
    if (file) {
      setImageFile(file);
      setImageUrl(URL.createObjectURL(file));
      setAnalysis(null);
      setError(null);
    }
  };

  const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        resolve(result.split(',')[1]);
      };
      reader.onerror = (error) => reject(error);
    });

  const handleAnalyze = useCallback(async () => {
    if (!imageFile) {
      setError('Please select an image first.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      const base64Image = await fileToBase64(imageFile);
      const result = await analyzeMushroomImage(base64Image, imageFile.type);
      setAnalysis(result);
    } catch (err) {
      console.error('Analysis failed:', err);
      setError('Failed to analyze the image. The mushroom may not be identifiable, or an API error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [imageFile]);
  
  const handleReset = () => {
    setImageFile(null);
    setImageUrl(null);
    setAnalysis(null);
    setError(null);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-slate-800 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
      <main className="w-full max-w-2xl mx-auto flex flex-col items-center">
        <div className="text-center mb-8">
            <MushroomIcon className="w-16 h-16 mx-auto text-green-400 mb-2"/>
          <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">
            Mushroom Identifier AI
          </h1>
          <p className="text-slate-500 mt-2">Upload a photo to identify a mushroom.</p>
        </div>

        <div className="w-full bg-white/60 rounded-2xl shadow-2xl backdrop-blur-lg border border-slate-300 p-6 sm:p-8 transition-all duration-300">
          {!analysis && (
            <ImageUploader
              onImageChange={handleImageChange}
              imageUrl={imageUrl}
              onAnalyze={handleAnalyze}
              isLoading={isLoading}
            />
          )}
          
          {isLoading && !analysis && (
             <div className="text-center py-10">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
                <p className="mt-4 text-slate-600">Analyzing... this may take a moment.</p>
             </div>
          )}

          {analysis && (
            <AnalysisResult analysis={analysis} imageUrl={imageUrl} onReset={handleReset} />
          )}

          {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        </div>
        
        <Disclaimer />
      </main>
    </div>
  );
};

export default App;