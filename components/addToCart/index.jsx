import React from "react";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
} from "@material-tailwind/react";

function AddToCartModal() {
  const [isOpen, setIsOpen] = React.useState(true);
  const [count, setCount] = React.useState(0);

  const openDrawerBottom = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

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
          <h2>Drawer Content</h2>
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
              <div>
                <img
                  style={{ height: "45px", width: "45px" }}
                  src="https://5.imimg.com/data5/KC/PC/MY-38629861/dummy-chronograph-watch.jpg"
                />
              </div>
              <div>
                <h3 style={{ marginBottom: "2px" }}>413</h3>
                <p style={{ fontSize: "8px" }}>Min. Order:3 pieces</p>
              </div>
            </div>
            <div>
              <h3 style={{ marginBottom: "2px" }}>413</h3>
              <p style={{ fontSize: "8px" }}>10+ pieces</p>
            </div>
            <div>
              <h3 style={{ marginBottom: "2px" }}>413</h3>
              <p style={{ fontSize: "8px" }}>100+ pieces</p>
            </div>
          </div>
          <div style={{ marginTop: "20px" }}>
            <h5>Color(6)</h5>
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
                    src="https://5.imimg.com/data5/KC/PC/MY-38629861/dummy-chronograph-watch.jpg"
                    alt="Product"
                    style={{
                      width: "45px",
                      height: "45px",
                      marginRight: "10px",
                    }}
                  />
                  <div>Product Name</div>
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
                    onClick={() => setCount(count > 0 ? count - 1 : 0)}
                  >
                    -
                  </button>
                  <div style={{ margin: "0 10px" }}>{count}</div>
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
                    onClick={() => setCount(count + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              position: "fixed",
              bottom: 0,
              width: "100%",
              backgroundColor: "#f8f9fa",
              padding: "10px",
              display: "flex",
              flexDirection:"column",
              gap:"10px"
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
              <div>$100.00</div> {/* Replace with actual value */}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
              }}
            >
              <div>Discount:</div>
              <div>$10.00</div> {/* Replace with actual value */}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>Shipping Total:</div>
              <div>$5.00</div> {/* Replace with actual value */}
            </div>

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
