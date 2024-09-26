import React from 'react';

function BulletPoints() {
  const points = [
    'Responsive design with Tailwind CSS.',
    'Easy-to-use and customizable.',
    'Supports light and dark themes.',
    'Seamless integration with React Router.',
    'Built-in support for error handling.',
    'Optimized for performance and speed.',
  ];

  return (
    <div className="w-full px-5 md:px-0" id="services-section">
      <div className="container mx-auto px-4 py-16 flex flex-col items-center">
        <div className="w-full md:w-4/5 lg:w-3/4 bg-white rounded-lg shadow-lg p-8 md:p-12 transition-transform duration-300">
          <h2 className="text-center text-3xl sm:text-4xl font-extrabold text-blue-900 mb-10">
            Our Services
          </h2>
          <div className="flex flex-col sm:flex-row items-center">
            {/* Bullet Points */}
            <div className="sm:w-1/2 mb-6 sm:mb-0 sm:mr-8">
              <ul className="list-disc pl-5 space-y-4 text-gray-700 text-lg leading-relaxed">
                {points.map((point, index) => (
                  <li key={index} className="hover:text-orange-500 transition-colors duration-300">
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            {/* Image */}
            <div className="sm:w-1/2 flex justify-center">
              <img 
                src="/aboutUs.png" 
                alt="Services" 
                className="w-full h-64 sm:h-64 rounded-lg shadow-lg object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BulletPoints;
