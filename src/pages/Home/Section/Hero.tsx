import video from "@/assets/hero.mp4";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FieldValues, SubmitHandler } from "react-hook-form";

interface HeroProps {
  onSearch: (query: string) => void;
}

const Hero = ({ onSearch }: HeroProps) => {
  const handleSearchSubmit: SubmitHandler<FieldValues> = (e) => {
    e.preventDefault();
    const search = e.target.search.value;
    onSearch(search);
  };
  return (
    <div className="relative flex items-center justify-center h-[calc(100vh-88px)] bg-gray-900">
      <video
        className="absolute inset-0 object-cover w-full h-full"
        src={video}
        autoPlay
        loop
        muted
        playsInline
      />

      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative z-10 text-center text-white">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
          Explore the City on Two Wheels
        </h1>
        <p className="text-xl sm:text-2xl mb-8">
          Rent a bike and discover the beauty of urban cycling
        </p>
        <div className="border p-4 rounded-lg shadow-lg max-w-md sm:max-w-2xl lg:max-w-3xl flex items-center justify-center mx-auto gap-5">
          <Button size="lg" className="bg-yellow-500">
            Start Your Adventure
          </Button>
          <form onSubmit={handleSearchSubmit} className="flex gap-2">
            <Input
              name="search"
              type="text"
              placeholder="Search bike..."
              className="w-96 px-4 py-2 text-black dark:text-white outline-none rounded-lg transition duration-300 ease-in-out transform focus:scale-105"
            />
            <Button type="submit" >Search</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Hero;
