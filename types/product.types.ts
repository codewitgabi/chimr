import { StaticImageData } from "next/image";

export interface IProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string | StaticImageData;
  addedToWishList: boolean;
  addedToCart: boolean;
}
