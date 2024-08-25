import { LoadingSkeleton } from "@/components/shared/LoadingSkeleton";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetBikesQuery } from "@/redux/features/bike/bikeApi";
import { TBike } from "@/types/bike";
import { Delete, Edit } from "lucide-react";

const BikeManagement = () => {
  const { data: bikeData, isLoading, isFetching } = useGetBikesQuery(undefined);
  console.log(bikeData);
  return (
    <>
      <>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>NO:</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Price Per Hour</TableHead>
              <TableHead>CC</TableHead>
              <TableHead>Modal</TableHead>
              <TableHead>Year</TableHead>
              <TableHead>Brand</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading || isFetching ? (
              <LoadingSkeleton />
            ) : bikeData?.data.length < 1 ? (
              <div>no data found</div>
            ) : (
              bikeData?.data?.map(
                (
                  { name, brand, cc, model, pricePerHour, year }: TBike,
                  _index: number
                ) => (
                  <TableRow key={_index}>
                    <TableCell className="font-medium">{_index + 1}</TableCell>
                    <TableCell className="font-medium">{name}</TableCell>
                    <TableCell>{pricePerHour} $</TableCell>
                    <TableCell>{cc}</TableCell>
                    <TableCell>{model}</TableCell>
                    <TableCell>{year}</TableCell>
                    <TableCell>{brand}</TableCell>
                    <TableCell className="flex items-center gap-2">
                      <Button variant="outline">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="destructive">
                        <Delete className="w-4 h-40" />
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              )
            )}
          </TableBody>
        </Table>
      </>
    </>
  );
};

export default BikeManagement;
