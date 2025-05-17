import Image from "next/image";
import AddToWishlistButton from "../buttons/AddToWishlist";
import { IProduct } from "@/types/product.types";

function ProductCard({
  id,
  thumbnail,
  title,
  description,
  price,
  addedToWishList,
}: Omit<IProduct, "">) {
  return (
    <div className="rounded-xl relative bg-secondary h-max group">
      <div className="w-full overflow-hidden rounded-t-xl">
        <Image
          src={thumbnail}
          alt={`${title}-image`}
          width={200}
          height={200}
          className="object-cover w-full rounded-t-xl aspect-square group-hover:scale-105 transition-transform duration-300"
          priority
        />
      </div>

      {/* Product detail */}

      <div className="p-2 space-y-2">
        <h2 className="line-clamp-1 font-semibold opacity-90 text-sm">
          {title}
        </h2>
        <p className="line-clamp-2 opacity-60 text-[0.8rem]">{description}</p>

        <span className="text-lg font-bold opacity-85">
          {Intl.NumberFormat("en-us", {
            style: "currency",
            currency: "USD",
          }).format(price)}
        </span>
      </div>

      {/* Actions */}

      <AddToWishlistButton productId={id} addedToWishList={addedToWishList} />
    </div>
  );
}

export default ProductCard;
