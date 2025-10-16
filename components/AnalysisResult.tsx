import React from 'react';
import type { MushroomAnalysis } from '../types';
import { Edibility } from '../types';

interface AnalysisResultProps {
  analysis: MushroomAnalysis;
  imageUrl: string | null;
  onReset: () => void;
}

const EdibilityBadge: React.FC<{ edibility: Edibility }> = ({ edibility }) => {
  const baseClasses = 'px-3 py-1 text-sm font-bold rounded-full inline-block';
  switch (edibility) {
    case Edibility.EDIBLE:
      return <span className={`${baseClasses} bg-green-200 text-green-800`}>Edible</span>;
    case Edibility.POISONOUS:
      return <span className={`${baseClasses} bg-red-200 text-red-800`}>Poisonous</span>;
    case Edibility.INEDIBLE:
      return <span className={`${baseClasses} bg-yellow-200 text-yellow-800`}>Inedible</span>;
    default:
      return <span className={`${baseClasses} bg-slate-300 text-slate-800`}>Unknown</span>;
  }
};

const AnalysisResult: React.FC<AnalysisResultProps> = ({ analysis, imageUrl, onReset }) => {
  return (
    <div className="animate-fade-in w-full">
      <div className="flex flex-col md:flex-row gap-6">
        {imageUrl && (
          <div className="md:w-1/3 flex-shrink-0">
            <img src={imageUrl} alt="Identified mushroom" className="rounded-lg shadow-lg w-full h-auto object-cover" />
          </div>
        )}
        <div className="flex-grow">
          <h2 className="text-3xl font-bold text-green-600">{analysis.species}</h2>
          <div className="flex items-center gap-4 my-3">
            <EdibilityBadge edibility={analysis.edibility} />
            <div className="text-sm text-slate-500">
                Confidence: <span className="font-semibold text-slate-800">{(analysis.confidence * 100).toFixed(1)}%</span>
            </div>
          </div>
          <p className="text-slate-700 leading-relaxed">{analysis.description}</p>
        </div>
      </div>
      <button
        onClick={onReset}
        className="mt-8 w-full bg-slate-200 text-slate-800 font-bold py-3 px-6 rounded-lg hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-75 transition-colors"
      >
        Identify Another Mushroom
      </button>
    </div>
  );
};

export default AnalysisResult;