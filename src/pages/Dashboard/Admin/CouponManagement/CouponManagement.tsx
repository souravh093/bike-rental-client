/* eslint-disable @typescript-eslint/no-explicit-any */
import { CreateCouponModal } from "@/components/modal/CreateCouponModal";
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
import { toast } from "@/components/ui/use-toast";
import {
  useDeleteCouponMutation,
  useGetAllCouponsQuery,
} from "@/redux/features/coupon/couponApi";
import { TCoupon } from "@/types/coupon";
import { Delete } from "lucide-react";

const CouponManagement = () => {
  const [deleteCoupon] = useDeleteCouponMutation();
  const {
    data: couponsData,
    isLoading,
    isFetching,
  } = useGetAllCouponsQuery(undefined);

  const handleCouponDelete = async (id: string) => {
    alert("Are you Sure Delete Coupon");
    try {
      const res = await deleteCoupon(id).unwrap();

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
    <>
      <div className="flex justify-end py-4">
        <CreateCouponModal />
      </div>
      <div className="flex items-center justify-between mb-6"></div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>NO:</TableHead>
            <TableHead>Coupon</TableHead>
            <TableHead>Discount</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading || isFetching ? (
            <LoadingSkeleton />
          ) : couponsData?.data.length < 1 ||
            couponsData?.data?.success === false ? (
            <div className="py-2 text-red-500">No data found</div>
          ) : (
            couponsData?.data?.map(
              ({ coupon, discount, title, _id }: TCoupon, _index: number) => (
                <TableRow key={_index}>
                  <TableCell className="font-medium">{_index + 1}</TableCell>
                  <TableCell>{coupon}</TableCell>
                  <TableCell>{discount}%</TableCell>
                  <TableCell>{title}</TableCell>
                  <TableCell className="flex items-center gap-2">
                    <Button
                      onClick={() => handleCouponDelete(_id)}
                      variant={"destructive"}
                    >
                      <Delete />
                    </Button>
                  </TableCell>
                </TableRow>
              )
            )
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default CouponManagement;
