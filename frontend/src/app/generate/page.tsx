'use client';
import { useState } from 'react';
import UploadForm from '@/components/UploadForm';
import ResultCard, { GenerationResult } from '@/components/ResultCard';

export default function GeneratePage() {
  const [result, setResult] = useState<GenerationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGeneration = async (formData: FormData) => {
    setIsLoading(true);
    setResult(null);

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    if (!backendUrl) {
        setResult({ status: 'error', message: 'Backend URL is not configured.' });
        setIsLoading(false);
        return;
    }

    try {
      const response = await fetch(`${backendUrl}/generate-branding-image`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) { throw new Error(data.detail || 'An unknown error occurred.'); }
      setResult(data);
    } catch (error: any) {
      setResult({ status: 'error', message: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold">Generate Your Branding Image</h1>
        <p className="text-gray-500 mt-2">Upload your product, describe it, and let AI do the magic.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-md">
          <UploadForm onSubmit={handleGeneration} isLoading={isLoading} />
        </div>
        <div className="flex items-center justify-center bg-gray-50 p-6 md:p-8 rounded-xl shadow-inner min-h-[300px] md:min-h-0">
          {isLoading && (
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-brand-accent mx-auto"></div>
              <p className="mt-4 text-gray-600">Generating your image...</p>
            </div>
          )}
          {result && <ResultCard result={result} />}
          {!isLoading && !result && (<div className="text-center text-gray-400"><p>Your generated image will appear here.</p></div>)}
        </div>
      </div>
    </div>
  );
}