
import React, { useState, useCallback } from 'react';
import { PromptForm } from './components/PromptForm';
import { ImageDisplay } from './components/ImageDisplay';
import { generateOldTimeyImage } from './services/geminiService';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    if (!prompt.trim()) {
      setError('Please enter a description for the image.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setImageUrl(null);

    try {
      const url = await generateOldTimeyImage(prompt);
      setImageUrl(url);
    } catch (err) {
      console.error(err);
      setError('Failed to generate image. The model may be unavailable or the prompt may be unsafe. Please try again later or with a different prompt.');
    } finally {
      setIsLoading(false);
    }
  }, [prompt]);

  return (
    <div className="min-h-screen w-full flex flex-col items-center p-4 sm:p-8 text-[#4A403A]">
      <div className="w-full max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-[#3E3228]">Old Timey Image Generator</h1>
          <p className="text-lg mt-2 text-[#6B5E51]">Create vintage photographs from your imagination</p>
        </header>

        <main className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/3 flex-shrink-0">
            <div className="bg-[#EAE0D5] p-6 rounded-lg shadow-lg border border-[#DCD1C1]">
              <h2 className="text-2xl font-bold mb-4 text-[#3E3228]">Describe Your Scene</h2>
              <PromptForm
                prompt={prompt}
                setPrompt={setPrompt}
                onSubmit={handleGenerate}
                isLoading={isLoading}
              />
            </div>
          </div>
          
          <div className="lg:w-2/3 flex-grow">
            <ImageDisplay 
              imageUrl={imageUrl}
              isLoading={isLoading}
              error={error}
            />
          </div>
        </main>
        
        <footer className="text-center mt-12 text-[#6B5E51]">
            <p>Powered by Google Gemini. Images are AI-generated.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
