import { CreateBookingModal } from "@/components/modal/CreateBookingModal";
import Loader from "@/components/shared/Loader";
import { SkeletonCard } from "@/components/shared/LoaderCard";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import {
  useGetBikesQuery,
  useSingleBikeQuery,
} from "@/redux/features/bike/bikeApi";
import { useAppSelector } from "@/redux/hooks";
import { TBike } from "@/types/bike";
import { Bike, CalendarRange, Cog, Component } from "lucide-react";
import { Link, useParams } from "react-router-dom";

const BikeDetailsClient = () => {
  const currentUser = useAppSelector(selectCurrentUser);
  const role = currentUser ? currentUser.role : null;
  const { id } = useParams();
  const { data: bikeDetails, isLoading } = useSingleBikeQuery(id);
  const query = [{ name: "brand", value: bikeDetails?.data?.brand }];

  const { data: bikes, isLoading: bikesLoading } = useGetBikesQuery(query);

  console.log(bikes);

  if (isLoading) {
    return <Loader />;
  }

  const {
    _id,
    name,
    pricePerHour,
    model,
    brand,
    year,
    description,
    image,
    cc,
    isAvailable,
  } = bikeDetails.data;

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="relative rounded-lg overflow-hidden">
            <img
              src={image}
              alt="Bike Image"
              width={600}
              height={400}
              className="w-full h-full object-cover"
              style={{ aspectRatio: "600/400", objectFit: "cover" }}
            />
          </div>
          <div className="grid gap-6">
            <div>
              <h1 className="text-3xl font-bold">{name}</h1>
              <p className="text-muted-foreground flex items-center gap-3 my-4">
                Brand: <Badge className="uppercase text-xl">{brand}</Badge>
              </p>
              <p className="text-muted-foreground flex items-center gap-3">
                Model:{" "}
                <Badge className="uppercase text-xl" variant={"outline"}>
                  {model}
                </Badge>
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-muted-foreground">CC</p>
                <p>{cc}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Price per Hour</p>
                <p>${pricePerHour}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Year</p>
                <p>{year}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Availability</p>
                <p>{isAvailable ? "Available" : "Not Available"}</p>
              </div>
            </div>
            <CreateBookingModal role={role} id={_id} />
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold">Description</h2>
          <p className="text-muted-foreground mt-4">{description}</p>
        </div>

        <div className="my-8">
          <h2 className="text-2xl font-bold mt-8 mb-2">Similar Bikes</h2>
          <Separator />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {bikesLoading ? (
            <SkeletonCard />
          ) : bikes?.data.length < 1 ? (
            <span className="text-red-500">No bike found</span>
          ) : (
            bikes?.data.map(
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
      </div>
    </div>
  );
};

export default BikeDetailsClient;
