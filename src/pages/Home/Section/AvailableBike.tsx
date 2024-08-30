/* eslint-disable @typescript-eslint/no-unused-vars */
import Container from "@/components/shared/Container";
import { useGetBikesQuery } from "@/redux/features/bike/bikeApi";
import { TQueryParam } from "@/types/global";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Bike, CalendarRange, Cog, Component } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SkeletonCard } from "@/components/shared/LoaderCard";
import { TBike } from "@/types/bike";
import { motion } from "framer-motion";
import { fadeIn } from "@/variant";

interface AvailableBikeProps {
  searchQuery: string;
}

const AvailableBike = ({ searchQuery }: AvailableBikeProps) => {
  const [currentPage] = useState(1);
  const [params] = useState<TQueryParam[]>([
    { name: "isAvailable", value: true },
  ]);

  const { data: bikeData, isLoading } = useGetBikesQuery(
    [
      ...params,
      { name: "page", value: currentPage },
      { name: "limit", value: 8 },
      { name: "searchTerm", value: searchQuery },
    ],
    { pollingInterval: 30000 }
  );

  return (
    <div className="mt-5">
      <Container>
        <motion.div
          variants={fadeIn("right", 0)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.7 }}
          className="my-10"
        >
          <h3 className="bg-yellow-500 w-32 py-2 px-2 text-md font-black uppercase text-center text-white">
            Our Bikes
          </h3>
          <h1 className="text-4xl font-black uppercase">Available Bikes</h1>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {isLoading ? (
            <SkeletonCard />
          ) : bikeData?.data.length < 1 ? (
            <span className="text-red-500">No bike found</span>
          ) : (
            bikeData?.data.map(
              ({ image, brand, _id, name, model, cc, year }: TBike) => (
                <Card key={_id}>
                  <CardHeader className="mb-5">
                    <h1 className="text-xl font-bold capitalize">{name}</h1>
                    <Separator />
                    <AspectRatio ratio={16 / 9}>
                      <img
                        src={image}
                        alt="Image"
                        className="rounded-md object-cover"
                      />
                    </AspectRatio>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 justify-between">
                      <div className="flex flex-col gap-3">
                        <div className="flex gap-2">
                          <Bike className="w-6 h-6 text-yellow-500" />
                          <div>
                            <h3 className="font-bold uppercase">{brand}</h3>
                            <span>Brand</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Cog className="w-6 h-6 text-yellow-500" />
                          <div>
                            <h3 className=" font-bold uppercase">{cc}</h3>
                            <span>CC</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-3">
                        <div className="flex gap-2">
                          <Component className="w-6 h-6 text-yellow-500" />
                          <div>
                            <h3 className=" font-bold uppercase">{model}</h3>
                            <span>Model</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <CalendarRange className="w-6 h-6 text-yellow-500" />
                          <div>
                            <h3 className=" font-bold uppercase">{year}</h3>
                            <span>Year</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <Separator />
                  <CardFooter className="flex items-center justify-end mt-4">
                    <Button>
                      <Link to={`/bike-details-client/${_id}`}>
                        View Details
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              )
            )
          )}
        </div>
      </Container>
    </div>
  );
};

export default AvailableBike;
