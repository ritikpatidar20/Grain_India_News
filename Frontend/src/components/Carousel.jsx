import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CarouselShimmer from './CarouselShimmer'
import { BASE_URL } from './helper';

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3500); // Change image every 3.5 seconds

    const fetchImages = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/v1/crousel`,
          { headers: {
            'Accept': 'application/json, text/plain, */*'
          }
        }
        );
        const imagesArray = Array.isArray(response.data.data.data) ? response.data.data.data : [response.data.data.data];
        setImages(imagesArray);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, [images.length]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
  isLoading ? <CarouselShimmer /> :
   ( <div className="relative w-full max-w-6xl mx-auto mt-8 mb-8">
      <div className="overflow-hidden rounded-lg shadow-lg relative w-[90%] mx-auto">
        {images.map((image, index) => (
          <div
            key={index}
            className={`${
              index === currentIndex ? 'block' : 'hidden'
            } transition-all duration-1000 ease-in-out`}
          >
            <img
              src={image.cImage} // Assuming the API returns an array of objects with a `cImage` property
              alt={`Slide ${index + 1}`}
              className="w-full object-cover h-96"
            />
          </div>
        ))}

        {/* Left Arrow */}
        <button
          onClick={goToPrevious}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white p-2 rounded-full shadow-md focus:outline-none"
        >
          &#10094;
        </button>

        {/* Right Arrow */}
        <button
          onClick={goToNext}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white p-2 rounded-full shadow-md focus:outline-none"
        >
          &#10095;
        </button>
      </div>
    </div>)
  );
};

export default Carousel;
