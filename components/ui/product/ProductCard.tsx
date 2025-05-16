import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "../buttons/AddToCart";
import AddToWishlistButton from "../buttons/AddToWishlist";
import { IProduct } from "@/types/product.types";

function ProductCard({
  id,
  thumbnail,
  title,
  price,
  addedToCart,
  addedToWishList,
}: Omit<IProduct, "">) {
  return (
    <div className="rounded-md">
      <div className="w-full">
        <Image
          src={thumbnail}
          alt={`${title}-image`}
          width={200}
          height={200}
          className="object-cover w-full"
          priority
        />
      </div>

      {/* Product detail */}

      <div className="mt-2 flex items-center gap-4">
        <Link href="" className="line-clamp-1 text-base">
          {title}
        </Link>

        <h1 className="text-lg font-bold opacity-85">
          {Intl.NumberFormat("en-us", {
            style: "currency",
            currency: "USD",
          }).format(price)}
        </h1>
      </div>

      {/* Actions */}

      <div className="flex items-center gap-4 mt-4">
        <AddToCartButton productId={id} addedToCart={addedToCart} className="w-full" />

        <AddToWishlistButton productId={id} addedToWishList={addedToWishList} />
      </div>
    </div>
  );
}

export default ProductCard;
