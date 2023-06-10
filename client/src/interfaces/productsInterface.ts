interface ProductInterface {
  id: number;
  category: string;
  brand: string;
  name: string;
  images: string[];
  description: string;
  price: number;
  available: true;
  stock: number;
}

export default ProductInterface;
