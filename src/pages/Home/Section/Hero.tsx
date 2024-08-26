import video from "@/assets/hero.mp4";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TQueryParam } from "@/types/global";
import { useState } from "react";

const Hero = () => {
  const [params, setParams] = useState<TQueryParam[]>([]);

  console.log(params);

  const handleSearch = (value: string) => {
    setParams((prevParams) =>
      prevParams
        .filter((param) => param.name !== "searchTerm")
        .concat({ name: "searchTerm", value })
    );
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
        <div className="border p-4 rounded-lg shadow-lg max-w-md sm:max-w-xl lg:max-w-2xl flex items-center justify-center mx-auto gap-5">
          <Button size="lg" className="bg-yellow-500">
            Start Your Adventure
          </Button>
          <Input
            onBlur={(e) => handleSearch(e.target.value)}
            type="text"
            placeholder="Search bike..."
            className="w-96 px-4 py-2 text-white outline-none rounded-lg transition duration-300 ease-in-out transform focus:scale-105"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
