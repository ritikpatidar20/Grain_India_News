import React from "react";
import { NavLink } from 'react-router-dom';

function HeroSection2() {
    return (
        <div className="container mx-auto px-4 py-8 flex flex-col items-center">
        <div className="w-full md:w-4/5 lg:w-3/4 bg-white ">
            <NavLink
                to='/about'
                className="container mx-auto px-4 py-16 block transition-transform duration-300 ease-in-out hover:scale-105"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
                <div>
                    <h1 className="text-5xl font-bold text-center mb-16 text-gray-800">
                        About Us
                    </h1>

                    <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
                        <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                        At Grain India News, we specialize in providing top-notch services in the agri-commodities sector. Since our inception in 2009, we've been committed to offering timely and precise insights that the industry relies on. Our reports, filled with crucial data on agricultural commodities, have become the standard within the field.
                        </p>
                        <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                        We take great pride in delivering high-quality reports on grains and food products, sourced from a network of reputable farmers, traders, millers, extractors, importers, exporters, associations, and producers from India and around the globe. Our offerings celebrate the rich culinary diversity of India, featuring comprehensive market analyses across a wide range of agricultural products.
                        </p>
                        <p className="text-gray-700 leading-relaxed text-lg">
                        Our mission is to be the reliable connection between you and the agri-industry, establishing ourselves as the preferred source for premium information on grains and essential food items that drive your business forward. We are dedicated to ethical sourcing and responsible practices, committed to supporting local farmers and communities while providing unparalleled value to our clients.
                        </p>
                    </div>
                </div>
            </NavLink>
        </div>
        </div>
    );
}

export default HeroSection2;
