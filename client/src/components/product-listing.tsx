import React from "react";
import ProductCard from "@/components/product-card";
import ProductInterface from "../interfaces/productsInterface";

type ProductListingProps = {
  arrayProducts: ProductInterface[];
};

const ProductListing = ({ arrayProducts }: ProductListingProps) => {
  if (arrayProducts.length < 1) {
    return (
      <div className="container flex flex-col items-center pt-10 text-slate-600 text-4xl">
        <h3 className="font-bold p-5">
          Tu búsqueda no se relaciona con ningún producto
        </h3>
        <div className="flex max-w-[300px]">
          <img src="https://i.ibb.co/v3PW0mb/robot-con-engranaje-violet-400.png" />
        </div>
        <h3 className="text-violet-400 pl-7">Error 404</h3>
      </div>
    );
  }
  return (
    <div className="container ">
      {arrayProducts
        .filter((product) => product.avalaible)
        .filter((product) => product.stock > 0)
        .map((product) => {
          return (
            <ProductCard
              key={product.id}
              id={product.id}
              category={product.category}
              brand={product.brand}
              name={product.name}
              images={product.images}
              description={product.description}
              price={product.price}
              avalaible={product.avalaible}
              stock={product.stock}
            />
          );
        })}
    </div>
  );
};

export default ProductListing;
