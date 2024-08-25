import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TBike } from "@/types/bike";
import { Edit } from "lucide-react";

export function EditBikeModal({ data }: { data: TBike }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Edit className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Bike Information</DialogTitle>
          <DialogDescription>Update the bike details below.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" defaultValue={data.name} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="brand">Brand</Label>
            <Input id="brand" defaultValue={data.brand} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="model">Model</Label>
            <Input id="model" defaultValue={data.model} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="price">Price Per Hour</Label>
            <Input id="price" defaultValue={data.pricePerHour} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="cc">CC</Label>
            <Input id="cc" defaultValue={data.cc} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="year">Year</Label>
            <Input id="year" defaultValue={data.year} />
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <Button type="submit">Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
