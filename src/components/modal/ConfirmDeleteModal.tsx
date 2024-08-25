/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import { Delete } from "lucide-react";
import { useDeleteBikeMutation } from "@/redux/features/bike/bikeApi";
import { toast } from "../ui/use-toast";

const ConfirmDeleteModal = ({ id }: { id: string | undefined }) => {
  const [deleteBike] = useDeleteBikeMutation();

  const handleBikeDelete = async () => {
    try {
      const res = await deleteBike(id).unwrap();
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
    <div>
      <AlertDialog>
        <AlertDialogTrigger>
          <Button variant="destructive">
            <Delete className="w-4 h-4" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you absolutely sure delete Bike?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              item and remove its data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleBikeDelete}>
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ConfirmDeleteModal;
