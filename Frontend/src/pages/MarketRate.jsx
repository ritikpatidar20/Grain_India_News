// src/components/MarketRatePage.jsx
import React from 'react';
import marketrates1 from '../../public/marketrates1.png'
import marketrates2 from '../../public/marketrates3.jpg'
import marketrates3 from '../../public/marketrates2.jpg'
import { NavLink } from 'react-router-dom';
export const MarketRate = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center mb-7">
      <h1 className="text-4xl font-bold mb-8 text-blue-600">
        📈 Market Rates: Where Numbers Dance!
      </h1>
      <NavLink to="/contact">
        <h5 className="text-4xl font-bold mb-8 text-blue-600 hover:text-blue-800 hover:underline">
          For more updates and Current Rates you can contact us..
        </h5>
      </NavLink>

      {/* <img
        src={marketrates1} // Placeholder image (because even rates need kittens)
        alt="Market Rates"
        className="rounded-lg shadow-lg max-w-full"
      />*/
      }
      <img
        src={marketrates3} // Placeholder image (because even rates need kittens)
        alt="Market Rates"
        className="rounded-lg shadow-lg max-w-full"
      />
      <p className="mt-8 text-gray-600">
        "Our rates are so competitive, even Wall Street traders are jealous. We've got bulls, bears, and a few confused squirrels—all in one chart!"
      </p>
      <p className="mt-4 text-gray-600">
        Disclaimer: No actual squirrels were harmed in the calculation of these rates.
      </p>
    </div>
  );
};

// export default Page;
