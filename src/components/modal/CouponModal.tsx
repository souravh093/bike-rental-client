import { Dialog, DialogContent } from "../ui/dialog";

type CouponModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export const CouponModal = ({
  isOpen,
  onClose,
  children,
}: CouponModalProps) => (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent>{children}</DialogContent>
  </Dialog>
);
