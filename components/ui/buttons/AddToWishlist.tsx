"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useState } from "react";

interface AddToWishlistButtonProps {
  productId: number;
  addedToWishList: boolean;
}

function AddToWishlistButton({ addedToWishList }: AddToWishlistButtonProps) {
  const [added, setAdded] = useState<boolean>(addedToWishList);

  const handleClick = () => {
    setAdded(!added);
  };

  return (
    <motion.button
      onClick={handleClick}
      whileTap={{ scale: 0.9 }}
      className="cursor-pointer absolute top-2 right-2"
    >
      <Heart
        size={20}
        className="text-red-500 opacity-80 hover:opacity-100 transition-opacity"
        fill={added ? "currentColor" : "transparent"}
      />
    </motion.button>
  );
}

export default AddToWishlistButton;
