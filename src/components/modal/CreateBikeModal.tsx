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
import CreateBikeForm from "../form/CreateBikeForm";

export function CreateBikeModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create Bike</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-5xl">
        <DialogHeader>
          <DialogTitle>Edit Bike Information</DialogTitle>
          <DialogDescription>Update the bike details below.</DialogDescription>
        </DialogHeader>
        <CreateBikeForm />
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
