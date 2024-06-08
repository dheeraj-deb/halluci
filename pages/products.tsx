import Layout from "../layouts/Main";
import Footer from "../components/footer";
import Breadcrumb from "../components/breadcrumb";
import ProductsFilter from "../components/products-filter";
import ProductsContent from "../components/products-content";
import {GET_PRODUCTS} from "../graphql/query/products"
import { useQuery } from "@apollo/client";
import { useEffect } from "react";
const Products = () => {
  const { error, data} = useQuery(GET_PRODUCTS,{onCompleted: (data) => {
    console.log(data);
    
  }});
  useEffect(()=>{
    console.log(error,data,data?.getProducts,"got u");
    
  },[data])
  
  return (
    <Layout>
      <Breadcrumb />
      <section className="products-page">
        <div className="container">
          {/* <ProductsFilter /> */}
          <ProductsContent products={data?.getProducts}/>
        </div>
      </section>
      <Footer />
    </Layout>
  );
};
export default Products;
