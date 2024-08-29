import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import CreateCouponForm from "../form/CreateCouponForm";

export function CreateCouponModal() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create Coupon</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Input Coupon Information</DialogTitle>
          <DialogDescription>Input the coupon details below.</DialogDescription>
        </DialogHeader>
        <CreateCouponForm setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}