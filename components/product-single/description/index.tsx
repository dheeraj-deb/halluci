import { ProductType } from "types";

type ProductDescriptionType = {
  show: boolean;
  product:ProductType
}

const Description = ({ show, product }: ProductDescriptionType) => {
  const style = {
    display: show ? 'flex' : 'none',
  }

  return (
    <section style={style} className="product-single__description">
      <div className="product-description-block">
        <i className="icon-cart"></i>
        <h4>Details and product description</h4>
        <p>{product?.description}</p>
      </div>
    </section>
  );
};
  
export default Description;
    