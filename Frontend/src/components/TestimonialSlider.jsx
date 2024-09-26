import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaQuoteLeft } from 'react-icons/fa';
import p1 from '../../public/testimonials/p1.jpg';
import p2 from '../../public/testimonials/p2.jpg';
import p3 from '../../public/testimonials/p3.png';

const testimonials = [
  {
    name: "Ram Singh",
    job: "Farmer, Agriculture",
    image: p1,
    testimonial:
      "गेहूं की फसल का अच्छा उत्पादन हुआ। नई तकनीक के इस्तेमाल से काम आसान हो गया।",
  },
  {
    name: "Suresh Kumar",
    job: "Farmer, Agriculture",
    image: p2,
    testimonial:
      "सरसों की पैदावार में इस साल काफी बढ़ोतरी हुई। अब अच्छी कीमत मिलने की उम्मीद है।",
  },
  {
    name: "Manju Devi",
    job: "Farmer, Wife",
    image: p3,
    testimonial:
      "धान की खेती में इस बार अच्छी पैदावार हुई है। सरकार की मदद से फसल का उचित मूल्य मिल रहा है।",
  },
];

const TestimonialSlider = () => {
  const [index, setIndex] = useState(0);

  const nextTestimonial = () => {
    setIndex((index + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setIndex((index - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div >
      <h2 className="text-center text-3xl sm:text-4xl font-bold text-blue-900 mb-10">
       Our Happy Customers
      </h2>
      <div className="flex items-center justify-center gap-10 mb-10">
        <div className="w-4/5 max-w-5xl p-8 rounded-lg relative bg-white">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 ">
            {[index, (index + 1) % testimonials.length, (index + 2) % testimonials.length].map((i) => (
              <div key={i} className="flex flex-col items-center justify-center shadow-md p-4">
                <img
                  src={testimonials[i].image}
                  alt={testimonials[i].name}
                  className="w-24 h-24 rounded-full mx-auto mb-4"
                />
                <h3 className="text-blue-900 font-bold">{testimonials[i].name}</h3>
                <h6 className="text-gray-400 mb-4">{testimonials[i].job}</h6>
                <div className="relative">
                  <FaQuoteLeft className="absolute -top-2 left-0 text-gray-400 text-xl" />
                  <p className="text-gray-600 pl-8 pr-4">{testimonials[i].testimonial}</p>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={prevTestimonial}
            className="hidden sm:flex absolute -left-3 top-1/2 transform -translate-y-1/2 text-blue-600 bg-white border border-gray-300 rounded-full w-8 h-8 items-center justify-center shadow"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={nextTestimonial}
            className="hidden sm:flex absolute -right-3 top-1/2 transform -translate-y-1/2 text-blue-600 bg-white border border-gray-300 rounded-full w-8 h-8 items-center justify-center shadow"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSlider;
