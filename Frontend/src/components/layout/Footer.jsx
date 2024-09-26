

import { FaTwitter, FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';
import { BsFillMapFill } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';
import { AiOutlinePhone } from 'react-icons/ai';
import { IoLocation } from "react-icons/io5";

export const Footer = () => {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-evenly items-center">
        <div className="flex flex-col items-center md:items-start mb-4">
          <img src="/logow.png" alt="IGrain India Logo" className="w-48" />
        </div>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 gap-4">
          <div>
            <h3 className="text-xl font-bold mb-4">Company Information</h3>
            <ul className="space-y-2">
              <li>About</li>
              <li>Career</li>
              <li>Contact</li>
            </ul>
            
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>Select Report Type</li>
              <li>Daily Report</li>
              <li>Weekly Report</li>
              <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-1 mt-6 rounded-md">RSS Feed</button>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Research</h3>
            <ul className="space-y-2">
              <li>Spot Market Prices</li>
              <li>Research Reports</li>
              <li>News & Commentaries</li>
              <li>Technical Analysis</li>
            </ul>
          </div>
          <div className=''>
            <h3 className="text-xl font-bold mb-4">Locate Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <BsFillMapFill className="mr-2" />
                <span className=''>BEHIND NAV DURGA SHAKTI MANDIR, KHURJA(BSR.)</span>
              </li>
              <li className="flex items-center">
                <IoLocation className="mr-2" />
                <span>203131 (U.P)</span>
              </li>
              <li className="flex items-center">
                <MdEmail className="mr-2" />
                <span>grainindianews@gmail.com</span>
              </li>
              <li className="flex items-center">
                <AiOutlinePhone className="mr-2" />
                <span>096752622609</span>
              </li>
            </ul>
            <div className="flex space-x-4 mt-4 md:mt-4">
          <FaTwitter className="hover:text-blue-500  text-lg" />
          <FaFacebook className="hover:text-blue-600  text-lg" />
          <FaInstagram className="hover:text-red-500  text-lg" />
          <FaYoutube className="hover:text-red-600  text-lg" />
        </div>
          </div>
        </div>
      
      </div>
    </footer>
  );
};
