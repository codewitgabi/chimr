import { IProduct } from "@/types/product.types";
import ProductCard from "./ProductCard";
import TestProductImage from "@/assets/acls-thumbnail.jpg";

const products: IProduct[] = [
  {
    id: 1,
    title: "Lorem ipsum dolor sit amet.",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore incidunt reprehenderit animi hic porro aliquid deserunt eligendi nesciunt quos! Culpa nesciunt iste voluptate, laudantium reiciendis repellendus atque? Voluptates, totam et.",
    price: 25,
    thumbnail: TestProductImage,
    addedToCart: false,
    addedToWishList: false,
  },
  {
    id: 2,
    title: "Lorem ipsum dolor sit amet.",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore incidunt reprehenderit animi hic porro aliquid deserunt eligendi nesciunt quos! Culpa nesciunt iste voluptate, laudantium reiciendis repellendus atque? Voluptates, totam et.",
    price: 96,
    thumbnail: TestProductImage,
    addedToCart: false,
    addedToWishList: false,
  },
  {
    id: 3,
    title: "Lorem ipsum dolor sit amet.",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore incidunt reprehenderit animi hic porro aliquid deserunt eligendi nesciunt quos! Culpa nesciunt iste voluptate, laudantium reiciendis repellendus atque? Voluptates, totam et.",
    price: 25.45,
    thumbnail: TestProductImage,
    addedToCart: false,
    addedToWishList: false,
  },
  {
    id: 4,
    title: "Lorem ipsum dolor sit amet.",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore incidunt reprehenderit animi hic porro aliquid deserunt eligendi nesciunt quos! Culpa nesciunt iste voluptate, laudantium reiciendis repellendus atque? Voluptates, totam et.",
    price: 25,
    thumbnail: TestProductImage,
    addedToCart: false,
    addedToWishList: false,
  },
  {
    id: 5,
    title: "Lorem ipsum dolor sit amet.",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore incidunt reprehenderit animi hic porro aliquid deserunt eligendi nesciunt quos! Culpa nesciunt iste voluptate, laudantium reiciendis repellendus atque? Voluptates, totam et.",
    price: 18.25,
    thumbnail: TestProductImage,
    addedToCart: false,
    addedToWishList: false,
  },
  {
    id: 6,
    title: "Lorem ipsum dolor sit amet.",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore incidunt reprehenderit animi hic porro aliquid deserunt eligendi nesciunt quos! Culpa nesciunt iste voluptate, laudantium reiciendis repellendus atque? Voluptates, totam et.",
    price: 20.5,
    thumbnail: TestProductImage,
    addedToCart: false,
    addedToWishList: false,
  },
];

function ProductList() {
  return (
    <div className="flex-1 grid grid-cols-[repeat(auto-fit,_minmax(150px,_1fr))] gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
}

export default ProductList;
