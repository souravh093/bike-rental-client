import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreateBikeForm from "../form/CreateBikeForm";
import { useState } from "react";

export function CreateBikeModal() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create Bike</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-5xl">
        <DialogHeader>
          <DialogTitle>Create Bike Information</DialogTitle>
          <DialogDescription>Input the bike details below.</DialogDescription>
        </DialogHeader>
        <CreateBikeForm setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
