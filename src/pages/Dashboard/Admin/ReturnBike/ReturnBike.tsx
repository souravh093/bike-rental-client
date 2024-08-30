/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useGetInitialBookingQuery,
  useReturnCalculationMutation,
} from "@/redux/features/book/bookApi";
import { LoadingSkeleton } from "@/components/shared/LoadingSkeleton";
import moment from "moment";
import { TBooking } from "@/types/global";
import { toast } from "@/components/ui/use-toast";

export default function ReturnBike() {
  const { data: initialPaidData, isLoading: isInitialPaidLoading } =
    useGetInitialBookingQuery(undefined, { pollingInterval: 30000 });

  const [calculateBooking, { isLoading: calculateLoading }] =
    useReturnCalculationMutation();

  const handleCalculate = async (bookingId: string) => {
    try {
      const res = await calculateBooking(bookingId).unwrap();

      if (res.success) {
        toast({
          variant: "default",
          title: res.message,
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: error?.data?.message,
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Return Bikes</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>NO</TableHead>
            <TableHead>Bike name</TableHead>
            <TableHead>Start time</TableHead>
            <TableHead>Price Per Hour</TableHead>
            <TableHead>Payment Status</TableHead>
            <TableHead>Return Time</TableHead>
            <TableHead>Total Cost</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isInitialPaidLoading ? (
            <LoadingSkeleton />
          ) : initialPaidData?.data.length < 1 ||
            initialPaidData?.data?.success === false ? (
            <div className="text-red-500 py-5">No Bike found</div>
          ) : (
            initialPaidData?.data?.map(
              (
                {
                  _id: bookingId,
                  bikeId: { image, name, pricePerHour },
                  startTime,
                  totalCost,
                  paidStatus,
                  returnTime,
                }: TBooking,
                _index: number
              ) => (
                <TableRow key={_index}>
                  <TableCell className="font-medium">{_index + 1}</TableCell>
                  <TableCell className="font-medium">
                    <span className="flex items-center gap-2">
                      <img
                        src={image}
                        alt={`bike image`}
                        className="w-12 h-12 object-contain rounded-2xl border-2"
                      />
                      <span>{name}</span>
                    </span>
                  </TableCell>
                  <TableCell>
                    {moment(startTime).format("Do ,h:mm a")}
                  </TableCell>
                  <TableCell>{pricePerHour} BDT</TableCell>
                  <TableCell>
                    <span
                      className={`${
                        paidStatus === "full-paid"
                          ? "bg-green-500"
                          : "bg-yellow-500"
                      } px-4 py-2 rounded-sm`}
                    >
                      {paidStatus === "full-paid"
                        ? "Full Paid"
                        : "Initial Paid"}
                    </span>
                  </TableCell>
                  {returnTime ? (
                    <TableCell>
                      {moment(returnTime).format("Do ,h:mm a")}
                    </TableCell>
                  ) : (
                    <TableCell>No Available</TableCell>
                  )}
                  {totalCost > 0 ? (
                    <TableCell>{totalCost} BDT</TableCell>
                  ) : (
                    <TableCell>Not Available</TableCell>
                  )}
                  <TableCell className="flex items-center gap-2">
                    <Button
                      disabled={!!totalCost}
                      className="bg-green-500 px-8"
                      onClick={() => handleCalculate(bookingId)}
                    >
                      {calculateLoading ? "Calculate..." : "Calculate"}
                    </Button>
                  </TableCell>
                </TableRow>
              )
            )
          )}
        </TableBody>
      </Table>
    </div>
  );
}
