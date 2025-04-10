"use client";

import Dialog from "@mui/material/Dialog";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface LogoutModalProps {
  open: boolean;
  handleClose: () => void;
}

function LogoutModal({ open, handleClose }: LogoutModalProps) {
  const router = useRouter();

  const handleAction = () => {
    // Close the modal

    handleClose();

    // Handle logout

    localStorage.clear();

    toast.success("Logout successful", {
      description: "You will be redirected to login page",
    });

    // Clear state

    

    router.replace("/auth/login");
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <div className="bg-white text-black p-6 text-center">
        <h1 className="font-bold text-lg text-red-500">
          Logout of your account
        </h1>
        <p className="text-base opacity-80">Are you sure you want to logout</p>

        <div className="flex items-center gap-4 mt-6">
          <button
            className="w-full py-2 px-4 rounded-full bg-[#eee] shadow-lg hover:shadow-xs transition-all duration-300"
            onClick={handleClose}
          >
            No
          </button>

          <button
            className="w-full py-2 px-4 rounded-full bg-red-500 text-white shadow-lg hover:shadow-xs transition-all duration-300"
            onClick={handleAction}
          >
            Yes
          </button>
        </div>
      </div>
    </Dialog>
  );
}

export default LogoutModal;
