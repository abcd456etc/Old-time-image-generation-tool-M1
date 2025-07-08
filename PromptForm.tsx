
import React from 'react';

interface PromptFormProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export const PromptForm: React.FC<PromptFormProps> = ({ prompt, setPrompt, onSubmit, isLoading }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="prompt" className="block text-sm font-semibold text-[#6B5E51] mb-1">
          e.g., "A robot holding a red skateboard"
        </label>
        <textarea
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your description here..."
          rows={5}
          className="w-full p-3 bg-[#F5EFE6] border-2 border-[#DCD1C1] rounded-md focus:ring-2 focus:ring-[#A08C7D] focus:border-[#A08C7D] transition-colors duration-200 resize-none text-[#4A403A] placeholder-[#96897D]"
          disabled={isLoading}
        />
      </div>
      <button
        type="submit"
        disabled={isLoading || !prompt.trim()}
        className="w-full bg-[#5A4A3E] text-white font-bold py-3 px-4 rounded-md hover:bg-[#4A3C32] transition-all duration-300 disabled:bg-[#96897D] disabled:cursor-not-allowed transform hover:scale-105 active:scale-100 disabled:transform-none flex items-center justify-center"
      >
        {isLoading ? 'Developing...' : 'Generate Image'}
      </button>
    </form>
  );
};
