import React from 'react';

function ShimmerUI() {
  return (
    <div className="relative w-full max-w-6xl mx-auto mt-8 mb-8">
      <div className="overflow-hidden rounded-lg shadow-lg relative w-[90%] mx-auto">
        {/* Shimmer Effect */}
        <div className="animate-pulse">
          <div className="w-full h-96 bg-gray-300 rounded-lg">
            <div className="w-full h-full bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 bg-animate"></div>
          </div>
        </div>

        {/* Left Arrow */}
        <button
          className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white p-2 rounded-full shadow-md focus:outline-none bg-gray-400 animate-pulse"
        >
          &#10094;
        </button>

        {/* Right Arrow */}
        <button
          className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white p-2 rounded-full shadow-md focus:outline-none bg-gray-400 animate-pulse"
        >
          &#10095;
        </button>
      </div>
    </div>
  );
}

export default ShimmerUI;
