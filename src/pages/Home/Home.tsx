import { useRef, useState } from 'react';
import AvailableBike from "./Section/AvailableBike";
import ContactUs from "./Section/ContactUps";
import Hero from "./Section/Hero";
import TestimonialsSection from "./Section/TestimonialsSection";
import WheelSpinComponent from "./Section/WheelSpinComponent";
import WhyChooseUs from "./Section/WhyChoosUs";

const Home = () => {
  const availableBikeRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (availableBikeRef.current) {
      availableBikeRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <Hero onSearch={handleSearch} />
      <div ref={availableBikeRef}>
        <AvailableBike searchQuery={searchQuery} />
      </div>
      <TestimonialsSection />
      <WhyChooseUs />
      <WheelSpinComponent />
      <ContactUs />
    </div>
  );
};

export default Home;
