import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreateBookingForm from "../form/CreateBookingForm";

export function CreateBookingModal({id}: {id: string}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="w-full">
          Book Now
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Select Start Date time</DialogTitle>
          <DialogDescription>Input booking datetime</DialogDescription>
        </DialogHeader>
        <CreateBookingForm id={id} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
