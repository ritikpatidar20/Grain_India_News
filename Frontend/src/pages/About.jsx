import React from 'react';
import img1 from '../../public/aboutUs.png'
import img2 from '../../public/caroselimgs/vinod1.jpg'
export function About() {
  const sections = [
    {
      title: "Our Commitment to Quality",
      image: img2,
      description: " we are committed to delivering the highest standards of quality in the agri-commodity sector. We take pride in providing reliable and accurate information, sourced from trusted farmers, traders, and producers both in India and internationally. Our focus is on ensuring that every report and service we offer reflects our dedication to excellence. By adhering to ethical sourcing and responsible practices, we not only support local communities but also ensure that our clients receive the most valuable and precise insights, helping them make informed decisions in the competitive agri-commodity market.",
    },
    {
      title: "Global Market Insights",
      image: img1,
      description: "At Grain India News, our extensive network empowers us to offer unparalleled insights into global agricultural markets. We provide up-to-date and accurate market rates for a wide range of agricultural commodities, ensuring that our clients are always informed of the latest price trends. Our reports are meticulously crafted, drawing from reliable sources across the globe, including farmers, traders, and industry experts. Whether you’re tracking prices for grains, pulses, or other essential food products, our comprehensive data equips you with the knowledge needed to make strategic decisions in an ever-evolving market.",
    },
    {
      title: "Supporting Local Communities",
      image: "https://plus.unsplash.com/premium_photo-1683140908202-a8741a87045a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDV8fGJ1c2luZXNzd29tYW58ZW58MHx8MHx8fDA%3D",
      description: "At Grain India News, our commitment to ethical sourcing goes hand in hand with our dedication to supporting local farmers and communities across India. Our research and technical teams work tirelessly to gather accurate market rates and essential data, ensuring that our reports reflect the true state of the agricultural sector. By collaborating closely with local farmers, we not only provide precise and timely information but also contribute to their economic well-being. Our efforts are aimed at fostering sustainable growth, helping farmers achieve fair prices while empowering our clients with reliable insights to make informed decisions.",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-5xl font-bold text-center mb-16 text-gray-800">About Us</h1>

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

        {sections.map((section, index) => (
          <div key={index} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center mb-16 bg-white rounded-lg shadow-lg overflow-hidden`}>
            <div className="w-full lg:w-1/2">
              <img src={section.image} alt={section.title} className="w-full h-64 lg:h-80 object-contain" />
            </div>
            <div className="w-full lg:w-1/2 p-8">
              <h2 className="text-3xl font-semibold text-gray-800 mb-4">{section.title}</h2>
              <p className="text-gray-600 leading-relaxed">{section.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}