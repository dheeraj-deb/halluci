// import { useSelector } from 'react-redux';
import { useQuery } from "@apollo/client";
import CheckoutStatus from "../../components/checkout-status";
import { GET_CART } from "../../graphql/query/cart";
import Item from "./item";
import { RootState } from "store";
import { useMemo } from "react";
import { GET_PROFILE } from "graphql/query/profile";

const ShoppingCart = () => {
  const { data: profileData } = useQuery(GET_PROFILE);

  const userProfile = useMemo(
    () => profileData?.getProfile?.data,
    [profileData]
  );

  const { data, error } = useQuery(GET_CART, {
    variables: {
      userId: "6657710804a44e8060c56819",
    },
    skip: !userProfile?.id,
  });

  const product = useMemo(() => data?.getCart, [data]);

  // const { cartItems } = useSelector((state: RootState)  => state.cart);

  // const priceTotal = () => {
  //   let totalPrice = 0;
  //   if(cartItems.length > 0) {
  //     cartItems.map(item => totalPrice += item.price * item.count);
  //   }

  //   return totalPrice;
  // }

  console.log("product", product);

  return (
    <section className="cart">
      <div className="container">
        <div className="cart__intro">
          <h3 className="cart__title">Shopping Cart</h3>
          <CheckoutStatus step="cart" />
        </div>

        <div className="cart-list">
          {product?.products?.length > 0 && (
            <table>
              <tbody>
                <tr>
                  <th style={{ textAlign: "left" }}>Product</th>
                  <th>Color</th>
                  <th>Size</th>
                  <th>Ammount</th>
                  <th>Price</th>
                  <th></th>
                </tr>

                {product?.products?.map((item, index) => (
                  <Item key={index.toString()} item={item} />
                ))}
              </tbody>
            </table>
          )}

          {product?.products?.length === 0 && <p>Nothing in the cart</p>}
          <>Subtotal: ₹{product?.grandTotal}</>
        </div>

        <div className="cart-actions">
          <a href="/products" className="cart__btn-back">
            <i className="icon-left"></i> Continue Shopping
          </a>
          <input
            type="text"
            placeholder="Promo Code"
            className="cart__promo-code"
          />

          <div className="cart-actions__items-wrapper">
            {/* <p className="cart-actions__total">Total cost <strong>${priceTotal().toFixed(2)}</strong></p> */}
            <a href="/cart/checkout" className="btn btn--rounded btn--yellow">
              Checkout
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShoppingCart;
