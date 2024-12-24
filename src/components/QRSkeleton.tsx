import React from 'react';

export default function QRSkeleton() {
  return (
    <div className="p-6 md:w-1/2 bg-gray-50 flex flex-col items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-sm w-full max-w-sm animate-pulse">
        <div className="text-center mb-4">
          <div className="h-6 w-32 bg-gray-200 rounded mx-auto mb-2"></div>
          <div className="h-8 w-24 bg-gray-200 rounded mx-auto"></div>
        </div>
        
        <div className="flex justify-center mb-4">
          <div className="h-[200px] w-[200px] bg-gray-200 rounded"></div>
        </div>

        <div className="border-t pt-4">
          <div className="h-4 w-32 bg-gray-200 rounded mx-auto mb-4"></div>
          <div className="flex justify-center items-center space-x-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="h-6 w-6 bg-gray-200 rounded"></div>
                <div className="h-3 w-12 bg-gray-200 rounded mt-1"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 flex justify-center space-x-2">
        <div className="h-10 w-36 bg-gray-200 rounded"></div>
        <div className="h-10 w-36 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
}