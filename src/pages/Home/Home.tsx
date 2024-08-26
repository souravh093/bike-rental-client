import AvailableBike from "./Section/AvailableBike";
import ContactUs from "./Section/ContactUps";
import CouponsAndDiscounts from "./Section/CouponsDiscount";
import Hero from "./Section/Hero";
import TestimonialsSection from "./Section/TestimonialsSection";
import WhyChooseUs from "./Section/WhyChoosUs";

const Home = () => {
  return (
    <div>
      <Hero />
      <AvailableBike /> 
      <TestimonialsSection />
      <WhyChooseUs />
      <CouponsAndDiscounts />
      <ContactUs />
    </div>
  );
};

export default Home;
