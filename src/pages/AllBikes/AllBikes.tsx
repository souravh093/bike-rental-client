import { useGetBikesQuery } from "@/redux/features/bike/bikeApi";
import { TQueryParam } from "@/types/global";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { SkeletonCard } from "@/components/shared/LoaderCard";
import { Separator } from "@/components/ui/separator";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Bike, CalendarRange, Cog, Component } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { TBike } from "@/types/bike";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const AllBikes = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [params] = useState<TQueryParam[]>([
    { name: "isAvailable", value: true },
  ]);

  const { data: bikeData, isLoading } = useGetBikesQuery(
    [
      ...params,
      { name: "page", value: currentPage },
      { name: "limit", value: 8 },
    ],
    { pollingInterval: 30000 }
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const { totalPage } = bikeData?.meta || {};


  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">All Bikes</h1>

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
                    <Link to={`/bike-details-client/${_id}`}>View Details</Link>
                  </Button>
                </CardFooter>
              </Card>
            )
          )
        )}
      </div>

      <Pagination className="flex justify-end mt-10">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className="cursor-pointer"
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            />
          </PaginationItem>
          {[...Array(totalPage)].map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                className="cursor-pointer"
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              className="cursor-pointer"
              onClick={() =>
                handlePageChange(Math.min(totalPage, currentPage + 1))
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default AllBikes;
