import { GetServerSideProps } from "next";

import { useEffect, useState } from "react";
import Footer from "../../components/footer";
import Layout from "../../layouts/Main";
import Breadcrumb from "../../components/breadcrumb";
import ProductsFeatured from "../../components/products-featured";
import Gallery from "../../components/product-single/gallery";
import Content from "../../components/product-single/content";
import Description from "../../components/product-single/description";
import Reviews from "../../components/product-single/reviews";
import { server } from "../../utils/server";

// types
import { ProductType } from "types";
import { GET_PRODUCT } from "graphql/query/products";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";

type ProductPageType = {
  product: ProductType;
};

const Product = () => {
  const router = useRouter();
  const { error, data } = useQuery(GET_PRODUCT, {
    variables: { id: router.query.pid },
  });
  const [showBlock, setShowBlock] = useState("description");
  useEffect(() => {
    console.log(data, "single");
  }, [data]);

  return (
    <Layout>
      <Breadcrumb />

      <section className="product-single">
        <div className="container">
          <div className="product-single__content">
            <Gallery images={[data?.getProduct?.image]} />
            <Content product={data?.getProduct} />
          </div>

          <div className="product-single__info">
            <div className="product-single__info-btns">
              <button
                type="button"
                onClick={() => setShowBlock("description")}
                className={`btn btn--rounded ${
                  showBlock === "description" ? "btn--active" : ""
                }`}
              >
                Description
              </button>
              <button
                type="button"
                onClick={() => setShowBlock("reviews")}
                className={`btn btn--rounded ${
                  showBlock === "reviews" ? "btn--active" : ""
                }`}
              >
                Reviews (2)
              </button>
            </div>

            <Description
              product={data?.getProduct}
              show={showBlock === "description"}
            />
            <Reviews
              product={data?.getProduct}
              show={showBlock === "reviews"}
            />
          </div>
        </div>
      </section>

      <div className="product-single-page">
        <ProductsFeatured />
      </div>
      <Footer />
    </Layout>
  );
};

export default Product;
