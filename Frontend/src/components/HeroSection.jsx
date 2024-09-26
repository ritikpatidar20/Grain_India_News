import React, { useState, useEffect } from "react";
import { FaExpandAlt } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { MdNavigateNext, MdArticle } from 'react-icons/md';
import { BASE_URL } from "./helper";

const imgArr = [
  "https://images.unsplash.com/photo-1615485290628-c5033c657a8c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODN8fGdyYWluc3xlbnwwfHwwfHx8MA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1705003210782-8cf745112fb2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTYxfHxncmFpbnN8ZW58MHx8MHx8fDA%3D",
  "https://plus.unsplash.com/premium_photo-1674654419403-1a80edb26881?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8aW5kaWFuJTIwZ3JhaW5zfGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1615485290628-c5033c657a8c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODN8fGdyYWluc3xlbnwwfHwwfHx8MA%3D%3D",
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const openLightbox = (img) => {
    setSelectedImage(img);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  return (
    <div className="container mx-auto px-3 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {imgArr.map((img, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-lg shadow-lg group cursor-pointer"
            onClick={() => openLightbox(img)}
          >
            <img
              src={img}
              alt={`Gallery image ${index + 1}`}
              className="w-full h-64 object-cover transform transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition duration-500 flex items-center justify-center">
              <FaExpandAlt className="text-white text-2xl" />
            </div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative max-w-3xl mx-auto">
            <img
              src={selectedImage}
              alt="Selected"
              className="w-full h-auto rounded-lg"
            />
            <button
              onClick={closeLightbox}
              className="absolute top-3 right-3 text-black font-bold text-4xl"
            >
              <MdClose className="text-black" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const BlogID = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/v1/blog`,{
          
            headers:{
              'Accept': 'application/json, text/plain, */*'
            },
        });
        const blogsArray = Array.isArray(response.data.data.data) 
          ? response.data.data.data 
          : [response.data.data.data];
        setBlogs(blogsArray);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  
  const displayedBlogs = blogs.slice(0, 5);
  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md mt-8 md:mt-0">
      <h1 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
        <MdArticle className="mr-2 text-gray-800" /> Top Stories
      </h1>
      <div className="flex flex-col gap-4">
        {displayedBlogs.length > 0 ? (
          displayedBlogs.map((blog, index) => (
            <div key={index} className="group">
              <Link to="/blog">
                <h2 className="text-xl font-semibold text-gray-500 group-hover:text-gray-800 flex items-center group-hover:underline">
                  {blog.heading}
                  <MdNavigateNext className="ml-1 text-gray-500 group-hover:text-gray-800" />
                </h2>
              </Link>
              <hr className="border-t-2 border-dotted border-gray-700 my-2" />
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div className="mt-4">
        <Link
          to="/blog"
          className="inline-flex items-center bg-blue-600 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-lg"
        >
          View More
          <MdNavigateNext className="ml-1" />
        </Link>
      </div>
    </div>
  );
};

function HeroSection() {
  return (
    <div className="w-full px-5 md:px-0 -mt-16">
      <div className="mx-auto grid grid-cols-1 md:grid-cols-10 gap-8 my-10 md:px-52">
        <div className="md:col-span-7">
          <Gallery />
        </div>
        <div className="md:col-span-3">
          <BlogID />
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
