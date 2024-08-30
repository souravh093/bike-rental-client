import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetRentalsQuery } from "@/redux/features/book/bookApi";
import { LoadingSkeleton } from "@/components/shared/LoadingSkeleton";
import moment from "moment";
import { useLocation, useNavigate } from "react-router-dom";
import { TBooking } from "@/types/global";

export default function Booking() {
  const location = useLocation();

  const paymentLocation = location.pathname.split("/").pop();


  const navigate = useNavigate();
  const { data: initialPaidData, isLoading: isInitialPaidLoading } =
    useGetRentalsQuery({
      name: "paidStatus",
      value: "initial-paid",
    });
  const { data: fullPaidData, isLoading: isFullPaidLoading } =
    useGetRentalsQuery({
      name: "paidStatus",
      value: "full-paid",
    });

  const handlePayment = (
    bikeId: string,
    totalPrice: number,
    bookingId: string
  ) => {
    navigate(`/dashboard/payment-booking`, {
      state: { id: bikeId, totalPrice, bookingId: bookingId },
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">My Rentals</h1>
      <Tabs
        defaultValue={paymentLocation === "my-rental-paid" ? "paid" : "unpaid"}
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="unpaid">Unpaid</TabsTrigger>
          <TabsTrigger value="paid">Paid</TabsTrigger>
        </TabsList>
        <TabsContent value="unpaid">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>NO</TableHead>
                <TableHead>Bike name</TableHead>
                <TableHead>Start time</TableHead>
                <TableHead>Return time</TableHead>
                <TableHead>Payment Status</TableHead>
                <TableHead>Total amount</TableHead>
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
                      bikeId: { image, name, _id },
                      startTime,
                      returnTime,
                      totalCost,
                      paidStatus,
                    }: TBooking,
                    _index: number
                  ) => (
                    <TableRow key={_index}>
                      <TableCell className="font-medium">
                        {_index + 1}
                      </TableCell>
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
                      <TableCell>
                        {moment(returnTime).format("Do, h:mm a")}
                      </TableCell>
                      <TableCell>
                        <span className="bg-yellow-500 px-4 py-2 rounded-sm">
                          {paidStatus && "Pending"}
                        </span>
                      </TableCell>
                      <TableCell>{totalCost} BDT</TableCell>
                      <TableCell className="flex items-center gap-2">
                        <Button
                          className="bg-green-500 px-8"
                          onClick={() =>
                            handlePayment(_id, totalCost, bookingId)
                          }
                        >
                          Pay
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                )
              )}
            </TableBody>
          </Table>
        </TabsContent>

        <TabsContent value="paid">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>NO</TableHead>
                <TableHead>Bike name</TableHead>
                <TableHead>Start time</TableHead>
                <TableHead>Return time</TableHead>
                <TableHead>Payment Status</TableHead>
                <TableHead>Total amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isFullPaidLoading ? (
                <LoadingSkeleton />
              ) : fullPaidData?.data.length < 1 ||
                fullPaidData?.data?.success === false ? (
                <TableCell>No data found</TableCell>
              ) : (
                fullPaidData?.data?.map(
                  (
                    {
                      bikeId: { image, name },
                      startTime,
                      returnTime,
                      totalCost,
                      paidStatus,
                    }: TBooking,
                    _index: number
                  ) => (
                    <TableRow key={_index}>
                      <TableCell className="font-medium">
                        {_index + 1}
                      </TableCell>
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
                      <TableCell>
                        {moment(returnTime).format("Do, h:mm a")}
                      </TableCell>
                      <TableCell>
                        <span className="bg-green-500 text-white px-4 py-2 rounded-sm">
                          {paidStatus && "Paid"}
                        </span>
                      </TableCell>
                      <TableCell>{totalCost}</TableCell>
                    </TableRow>
                  )
                )
              )}
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>
    </div>
  );
}
