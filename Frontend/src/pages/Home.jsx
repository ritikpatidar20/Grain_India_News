import Carousel from "../components/Carousel";
import HeroSection from "../components/HeroSection";
import HeroSection2 from "../components/layout/AboutUsHome";
import BulletPoints from "../components/layout/services";
import TestimonialSlider from "../components/TestimonialSlider";

export const Home = () => {
  return (
    <div>
      <Carousel/>
      <HeroSection2/>
      <HeroSection/>
      <BulletPoints/>
      
      <TestimonialSlider/>
    </div>
  )
};
