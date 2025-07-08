import React from 'react';
import { Spinner } from './Spinner';

interface ImageDisplayProps {
  imageUrl: string | null;
  isLoading: boolean;
  error: string | null;
}

const PhotoFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="bg-[#EAE0D5] p-3 sm:p-4 rounded-lg shadow-lg border-2 border-[#DCD1C1]">
        <div className="bg-[#F5EFE6] p-2 sm:p-3 border-t-2 border-l-2 border-[#DCD1C1]">
            <div className="bg-white p-2 border-2 border-[#BDB1A3] shadow-inner">
                {children}
            </div>
        </div>
    </div>
);

export const ImageDisplay: React.FC<ImageDisplayProps> = ({ imageUrl, isLoading, error }) => {
  const handleDownload = () => {
    if (!imageUrl) return;
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'old-timey-image.jpeg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-full aspect-square">
          <Spinner />
          <p className="mt-4 text-lg text-[#6B5E51]">Developing your photograph...</p>
        </div>
      );
    }
    if (error) {
      return (
        <div className="flex flex-col items-center justify-center h-full aspect-square text-center p-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500/70 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-red-700 font-semibold">An Error Occurred</p>
            <p className="text-sm text-[#6B5E51] mt-1">{error}</p>
        </div>
      );
    }
    if (imageUrl) {
      return (
        <div className="flex flex-col items-center gap-4">
            <img 
              src={imageUrl} 
              alt="Generated old timey"
              className="w-full h-auto object-contain rounded-sm" 
            />
            <button
                onClick={handleDownload}
                aria-label="Download generated image"
                className="bg-[#5A4A3E] text-white font-bold py-2 px-6 rounded-md hover:bg-[#4A3C32] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5A4A3E] focus:ring-offset-white transition-all duration-300 flex items-center gap-2 transform active:scale-95"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download Image
            </button>
        </div>
      );
    }
    return (
      <div className="flex flex-col items-center justify-center h-full aspect-square text-center p-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-[#A08C7D] mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <h3 className="text-xl font-semibold text-[#4A403A]">Your Photograph Awaits</h3>
        <p className="mt-2 text-[#6B5E51]">Describe a scene and we'll bring it to life in vintage style.</p>
      </div>
    );
  };

  return <PhotoFrame>{renderContent()}</PhotoFrame>;
};
