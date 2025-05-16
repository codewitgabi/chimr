"use client";

import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { twMerge } from "tailwind-merge";

interface AddToCartButtonProps {
  productId: number;
  className?: string;
  addedToCart: boolean;
}

function AddToCartButton({ className }: AddToCartButtonProps) {
  const variant = {
    tap: { scale: 0.9 },
  };

  return (
    <motion.button
      variants={variant}
      whileTap={"tap"}
      className={twMerge(
        "bg-red-50 py-2 cursor-pointer rounded-lg flex items-center justify-center gap-3",
        className
      )}
    >
      <ShoppingCart size={20} color="#000" />
      <span className="text-black">Add to cart</span>
    </motion.button>
  );
}

export default AddToCartButton;
