import { Product } from "../../domain/product.interface";

export interface ProductCardProps {
    product: Product;
    onAddToCart: (price: number) => void;
    onAddToWishlist: () => void;
  }