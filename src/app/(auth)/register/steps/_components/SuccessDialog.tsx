"use client";
import { Dispatch, SetStateAction } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BadgeCheck } from "lucide-react";

type SuccessDialogProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const SuccessDialog = ({ open, setOpen }: SuccessDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md rounded-2xl gap-3">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <BadgeCheck className="h-9 w-9 text-green-600" />
          </div>
        </div>

        {/* Content */}
        <DialogHeader className="space-y-2 text-center">
          <DialogTitle className="text-2xl font-semibold">
            Verification Successful
          </DialogTitle>

          <DialogDescription className="text-sm leading-6">
            Your identity has been successfully verified. You can now securely
            access your healthcare records and continue using the platform.
          </DialogDescription>
        </DialogHeader>

        {/* Footer */}
        <DialogFooter>
          <Button onClick={() => setOpen(false)} className="h-10 w-full">
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessDialog;
