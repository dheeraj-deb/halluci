import { useDispatch } from "react-redux";
import { removeProduct, setCount } from "store/reducers/cart";
import { ProductStoreType } from "types";

const ShoppingCart = ({ item }: { item: any }) => {

  return (
    <tr>
      <td>
        <div className="cart-product">
          <div className="cart-product__img">
            <img src={item?.product?.image} alt="" />
          </div>

          <div className="cart-product__content">
            <h3>{item?.product?.name}</h3>
            <p>#{item?.product?._id}</p>
          </div>
        </div>
      </td>
      {/* <td className="cart-item-before" data-label="Color">
        {color}
      </td>
      <td className="cart-item-before" data-label="Size">
        {size}
      </td> */}

      <td>${item?.product?.total}</td>
      <td className="cart-item-cancel">
        <i className="icon-cancel" onClick={() => {}}></i>
      </td>
    </tr>
  );
};

export default ShoppingCart;
