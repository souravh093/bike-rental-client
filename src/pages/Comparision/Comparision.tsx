import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Bike, X } from "lucide-react";
import { useGetBikesQuery } from "@/redux/features/bike/bikeApi";
import { Link } from "react-router-dom";

interface Bike {
  _id: number;
  name: string;
  image: string;
  brand: string;
  model: string;
  cc: number;
  pricePerHour: number;
  year: number;
}

export default function Comparison() {
  const { data: bikesData } = useGetBikesQuery(undefined);
  const [selectedBikes, setSelectedBikes] = useState<Bike[]>([]);

  const handleBikeSelect = (bike: Bike) => {
    if (selectedBikes.length < 3) {
      setSelectedBikes([...selectedBikes, bike]);
    } else {
      setSelectedBikes([...selectedBikes.slice(1), bike]);
    }
  };

  const handleRemoveSelectedBike = (bikeId: number) => {
    setSelectedBikes(selectedBikes.filter((bike) => bike._id !== bikeId));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Compare Bikes</h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">
          Select up to 3 bikes to compare:
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {bikesData?.data.map((bike: Bike) => (
            <Button
              key={bike._id}
              onClick={() => handleBikeSelect(bike)}
              disabled={selectedBikes.some((b) => b._id === bike._id)}
              className="flex items-center justify-between w-full"
            >
              <span className="flex items-center gap-2">
                <Bike className="h-4 w-4" />
                {bike.name}
              </span>
              {selectedBikes.some((b) => b._id === bike._id) && (
                <span className="bg-primary-foreground text-primary px-2 py-1 rounded-full text-xs">
                  Selected
                </span>
              )}
            </Button>
          ))}
        </div>
      </div>

      {selectedBikes.length > 0 && (
        <div className="bg-muted rounded-lg p-6 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Feature</TableHead>
                {selectedBikes.map((bike) => (
                  <TableHead key={bike._id}>
                    <div className="flex justify-between items-center">
                      {bike.name}
                      <Button
                        size="sm"
                        onClick={() => handleRemoveSelectedBike(bike._id)}
                      >
                        <Link
                          to={`/dashboard/bike-details/${bike._id}`}
                          className=""
                        >
                          Rent Bike
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveSelectedBike(bike._id)}
                      >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Remove {bike.name}</span>
                      </Button>
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Image</TableCell>
                {selectedBikes.map((bike) => (
                  <TableCell key={bike._id}>
                    <img
                      src={bike.image}
                      alt={bike.name}
                      className="w-24 h-24 object-contain rounded-lg"
                    />
                  </TableCell>
                ))}
              </TableRow>
              {["Brand", "Model", "CC", "pricePerHour", "Year"].map(
                (feature) => (
                  <TableRow key={feature}>
                    <TableCell className="font-medium">{feature}</TableCell>
                    {selectedBikes.map((bike) => (
                      <TableCell key={bike._id}>
                        {feature === "pricePerHour"
                          ? `${bike.pricePerHour.toFixed(0)} BDT`
                          : bike[feature.toLowerCase() as keyof Bike]}
                      </TableCell>
                    ))}
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
