import { CreateBookingModal } from "@/components/modal/CreateBookingModal";
import Loader from "@/components/shared/Loader";
import { Badge } from "@/components/ui/badge";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useSingleBikeQuery } from "@/redux/features/bike/bikeApi";
import { useAppSelector } from "@/redux/hooks";
import { useParams } from "react-router-dom";

const BikeDetailsClient = () => {
  const currentUser = useAppSelector(selectCurrentUser);
  const role = currentUser ? currentUser.role : null;
  const { id } = useParams();
  const { data: bikeDetails, isLoading } = useSingleBikeQuery(id);

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
            <div className="prose">
              <p>{description}</p>
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
      </div>
    </div>
  );
};

export default BikeDetailsClient;
