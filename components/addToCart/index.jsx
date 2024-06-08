import React, { useEffect, useMemo, useState } from "react";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_TO_CART } from "../../graphql/mutation/addToCart";
import { GET_PROFILE } from "graphql/query/profile";
import { useRouter } from "next/router";

function AddToCartModal({ isOpen, setIsOpen, product }) {
  const [error, serError] = useState(null);
  const router = useRouter();
  const { data: profileData } = useQuery(GET_PROFILE);

  const userProfile = useMemo(() => profileData?.getProfile?.data, [profileData])

  const priceFor10Pieces = product?.price - product?.price * 0.05;

  const priceFor20Pieces = product?.price - product?.price * 0.1;

  const [counts, setCounts] = useState({});

  const [addToCart, { data }] = useMutation(ADD_TO_CART);

  const totalCount = Object.values(counts).reduce(
    (total, count) => total + count,
    0
  );

  let subtotal = totalCount * product?.price;

  let discount = 0;

  // Apply the discount based on the total count
  if (totalCount >= 20) {
    discount = priceFor20Pieces;
    subtotal -= discount;
  } else if (totalCount >= 10) {
    discount = priceFor10Pieces;
    subtotal -= discount;
  }

  useEffect(() => {
    if (totalCount >= 3) {
      serError(null);
    }
  }, [totalCount]);

  useEffect(() => {
    if (product?.variations) {
      const initialCounts = product.variations.reduce((acc, variant) => {
        acc[variant._id] = 0;
        return acc;
      }, {});
      setCounts(initialCounts);
    }
  }, [product]);

  const incrementCount = (id) => {
    setCounts((prevCounts) => ({
      ...prevCounts,
      [id]: (prevCounts[id] || 0) + 1,
    }));
  };

  const decrementCount = (id) => {
    setCounts((prevCounts) => ({
      ...prevCounts,
      [id]: prevCounts[id] > 0 ? prevCounts[id] - 1 : 0,
    }));
  };

  const openDrawerBottom = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  console.log("profileData", profileData)

  const addToCartHandler = () => {
    if (totalCount >= 3) {
      addToCart({
        variables: {
          userId: userProfile?.id,
          productId: product?._id,
          products: Object.entries(counts).map(([variantId, quantity]) => {
            return {
              variantId,
              quantity,
            };
          }),
        },
        onCompleted: () => {
          setIsOpen(false);
          router.push("/cart");
        },
      });
    } else {
      serError("Minimum order quantity is 3 pieces.");
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`overlay ${isOpen ? "overlay-open" : ""}`}
        onClick={onClose}
      ></div>

      {/* Drawer */}
      <div className={`drawer ${isOpen ? "drawer-open" : ""}`}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px",
          }}
        >
          <h2>Add to cart</h2>
          <button className="" onClick={onClose}>
            Close
          </button>
        </div>
        <div className="content">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "10px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ padding: "5px" }}>
                <img
                  style={{ height: "45px", width: "45px" }}
                  src={product?.image}
                />
              </div>
              <div>
                <h3 style={{ marginBottom: "2px" }}>₹{product?.price}</h3>
                <p style={{ fontSize: "8px" }}>Min. Order:3 pieces</p>
              </div>
            </div>
            <div>
              <h3 style={{ marginBottom: "2px" }}>₹{priceFor10Pieces}</h3>
              <p style={{ fontSize: "8px" }}>10+ pieces</p>
            </div>
            <div>
              <h3 style={{ marginBottom: "2px" }}>₹{priceFor20Pieces}</h3>
              <p style={{ fontSize: "8px" }}>20+ pieces</p>
            </div>
          </div>
          <div style={{ marginTop: "20px" }}>
            <h5>Variant({product?.variations?.length})</h5>
            {product?.variations?.map((variation) => {
              return (
                <div style={{ marginTop: "15px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: "15px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <img
                        src={variation?.image}
                        alt="Product"
                        style={{
                          width: "45px",
                          height: "45px",
                          marginRight: "10px",
                        }}
                      />
                      <div>{variation?.color}</div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <button
                        style={{
                          height: "25px",
                          width: "25px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: "50%",
                          border: "1px solid lightgray",
                        }}
                        onClick={() => decrementCount(variation?._id)}
                      >
                        -
                      </button>
                      <div style={{ margin: "0 10px" }}>
                        {counts[variation?._id] ?? 0}
                      </div>
                      <button
                        style={{
                          height: "25px",
                          width: "25px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: "50%",
                          border: "1px solid lightgray",
                        }}
                        onClick={() => incrementCount(variation?._id)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {error && (
            <div
              style={{
                color: "red",
                fontSize: "8px",
                textAlign: "center",
                marginTop: "100px",
              }}
            >
              {error}
            </div>
          )}
          <div
            style={{
              position: "fixed",
              bottom: 0,
              width: "100%",
              backgroundColor: "#f8f9fa",
              padding: "10px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
              }}
            >
              <div>Item Subtotal:</div>
              <div>₹{subtotal}</div> {/* Replace with actual value */}
            </div>
            {discount > 0 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <div>Discount:</div>
                <div>₹{discount}</div>
              </div>
            )}

            <button
              style={{
                backgroundColor: "orange",
                borderRadius: "5px",
                border: "none",
                color: "white",
                padding: "10px 20px",
                textAlign: "center",
                textDecoration: "none",
                display: "inline-block",
                fontSize: "16px",
                margin: "4px 2px",
                cursor: "pointer",
              }}
              onClick={addToCartHandler}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddToCartModal;
