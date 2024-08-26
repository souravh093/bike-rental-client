import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TBike } from "@/types/bike";
import { Edit } from "lucide-react";
import { useState } from "react";
import EditBikeForm from "../form/EditBikeForm";

export function EditBikeModal({ data }: { data: TBike }) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Edit className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-5xl">
        <DialogHeader>
          <DialogTitle>Edit Bike Information</DialogTitle>
          <DialogDescription>Update the bike details below.</DialogDescription>
        </DialogHeader>
        <EditBikeForm data={data} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
