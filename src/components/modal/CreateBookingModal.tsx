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
import { Link } from "react-router-dom";

export function CreateBookingModal({
  id,
  role,
}: {
  id: string;
  role?: string | null;
}) {
  const [open, setOpen] = useState(false);

  if (role === "user") {
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
  } else {
    return (
      <Link to={"/auth"}>
        <Button size="lg" className="w-full">
          {" "}
          Book Now{" "}
        </Button>
      </Link>
    );
  }
}
