import useSwr from "swr";
import ProductItem from "../../product-item";
import ProductsLoading from "./loading";
import { Product, ProductTypeList } from "types";

const ProductsContent = ({ products: data }: { products: Product[] }) => {
  
  return (
    <>
      {!data && <ProductsLoading />}

      {data && (
        <section className="products-list">
          {data?.map((item: Product) => (
            <ProductItem
              id={item._id}
              name={item.name}
              price={String(item.price)}
              color={item.variations[0].color}
              currentPrice={item.price}
              key={item._id}

              images={[item.image]}
            />
          ))}
        </section>
      )}
    </>
  );
};

export default ProductsContent;
