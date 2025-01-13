import { useState, useEffect } from "react";
import { useGetBikesQuery } from "@/redux/features/bike/bikeApi";
import { TQueryParam } from "@/types/global";
import { TBike } from "@/types/bike";
import { Link } from "react-router-dom";
import { Bike, CalendarRange, Cog, Component, Filter } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const EnhancedAllBikes = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("-createdAt");
  const [filterBrand, setFilterBrand] = useState("");
  const [filterCC, setFilterCC] = useState("");

  const [params, setParams] = useState<TQueryParam[]>([
    { name: "isAvailable", value: true },
    { name: "page", value: currentPage },
    { name: "limit", value: 8 },
    { name: "sort", value: sortBy },
  ]);

  useEffect(() => {
    const updatedParams: TQueryParam[] = [
      { name: "isAvailable", value: true },
      { name: "page", value: currentPage },
      { name: "limit", value: 8 },
      { name: "sort", value: sortBy },
    ];

    if (searchTerm) {
      updatedParams.push({ name: "searchTerm", value: searchTerm });
    }

    if (filterBrand) {
      updatedParams.push({ name: "brand", value: filterBrand });
    }

    if (filterCC) {
      updatedParams.push({ name: "cc", value: filterCC });
    }

    setParams(updatedParams);
  }, [currentPage, sortBy, searchTerm, filterBrand, filterCC]);

  const { data: bikeData, isLoading } = useGetBikesQuery(params, {
    pollingInterval: 30000,
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleSort = (value: string) => {
    setSortBy(value);
    setCurrentPage(1);
  };

  const handleFilterBrand = (value: string) => {
    setFilterBrand(value);
    setCurrentPage(1);
  };

  const handleFilterCC = (value: string) => {
    setFilterCC(value);
    setCurrentPage(1);
  };

  const { totalPage } = bikeData?.meta || {};

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">All Bikes</h1>

      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
          <Input
            type="text"
            placeholder="Search bikes..."
            value={searchTerm}
            onChange={handleSearch}
            className="max-w-sm"
          />
          <Select onValueChange={handleSort} defaultValue={sortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="-createdAt">Newest First</SelectItem>
              <SelectItem value="createdAt">Oldest First</SelectItem>
              <SelectItem value="name">Name A-Z</SelectItem>
              <SelectItem value="-name">Name Z-A</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" /> Filters
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filter Bikes</SheetTitle>
              <SheetDescription>
                Apply filters to narrow down your bike search.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="brand" className="text-right">
                  Brand
                </Label>
                <Select onValueChange={handleFilterBrand} value={filterBrand}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select brand" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="honda">Honda</SelectItem>
                    <SelectItem value="yamaha">Yamaha</SelectItem>
                    <SelectItem value="suzuki">Suzuki</SelectItem>
                    <SelectItem value="bajaj">Bajaj</SelectItem>
                    <SelectItem value="hero">Hero</SelectItem>
                    <SelectItem value="tvs">TVS</SelectItem>
                    <SelectItem value="kawasaki">Kawasaki</SelectItem>
                    <SelectItem value="royal-enfield">Royal Enfield</SelectItem>
                    <SelectItem value="keeway">Keeway</SelectItem>
                    <SelectItem value="lifan">Lifan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="cc" className="text-right">
                  CC
                </Label>
                <Select onValueChange={handleFilterCC} value={filterCC}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select CC" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                    <SelectItem value="110">110</SelectItem>
                    <SelectItem value="125">125</SelectItem>
                    <SelectItem value="150">150</SelectItem>
                    <SelectItem value="160">160</SelectItem>
                    <SelectItem value="180">180</SelectItem>
                    <SelectItem value="200">200</SelectItem>
                    <SelectItem value="250">250</SelectItem>
                    <SelectItem value="300">300</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {isLoading ? (
          Array.from({ length: 8 }).map((_, index) => (
            <Card key={index} className="flex flex-col h-full">
              <CardHeader className="mb-5">
                <Skeleton className="h-4 w-[250px]" />
                <Separator className="my-2" />
                <Skeleton className="h-[176px] w-full rounded-md" />
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="grid grid-cols-2 gap-4">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex gap-2">
                      <Skeleton className="h-6 w-6 rounded-full" />
                      <div>
                        <Skeleton className="h-4 w-[100px]" />
                        <Skeleton className="h-3 w-[70px] mt-1" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <Separator />
              <CardFooter className="flex items-center justify-end mt-4">
                <Skeleton className="h-10 w-[100px]" />
              </CardFooter>
            </Card>
          ))
        ) : bikeData?.data.length < 1 ? (
          <span className="text-red-500">No bike found</span>
        ) : (
          bikeData?.data.map(
            ({ image, brand, _id, name, model, cc, year }: TBike) => (
              <Card key={_id} className="flex flex-col h-full">
                <CardHeader className="mb-5">
                  <h1 className="text-xl font-bold capitalize">{name}</h1>
                  <Separator />
                  <img
                    src={image}
                    alt="Bike Image"
                    className="rounded-md object-cover h-44 w-full"
                  />
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="grid grid-cols-2 gap-4">
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
                          <h3 className="font-bold uppercase">{cc}</h3>
                          <span>CC</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-3">
                      <div className="flex gap-2">
                        <Component className="w-6 h-6 text-yellow-500" />
                        <div>
                          <h3 className="font-bold uppercase">{model}</h3>
                          <span>Model</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <CalendarRange className="w-6 h-6 text-yellow-500" />
                        <div>
                          <h3 className="font-bold uppercase">{year}</h3>
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
                className={`cursor-pointer ${
                  currentPage === index + 1
                    ? "bg-primary text-primary-foreground"
                    : ""
                }`}
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

export default EnhancedAllBikes;
