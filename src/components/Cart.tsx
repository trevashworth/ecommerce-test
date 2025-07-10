import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../redux/store";
import { removeFromCart, clearCart } from "../redux/cartSlice";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";

const Cart: React.FC = () => {
  const cart = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const [checkoutMessage, setCheckoutMessage] = useState("");

  // Calculate total price and total quantity
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    dispatch(clearCart());
    setCheckoutMessage("Your cart has been cleared!");
    setTimeout(() => setCheckoutMessage(""), 2000);
  };

  return (
    <div className="mx-auto" style={{ maxWidth: 800 }}>
      <h2 className="mb-4 text-center text-light">Your Shopping Cart</h2>
      {checkoutMessage && (
        <Alert variant="success" className="mb-3 text-center fw-bold">
          {checkoutMessage}
        </Alert>
      )}
      {cart.length === 0 ? (
        <Alert variant="info" className="text-center">
          Your cart is empty.
        </Alert>
      ) : (
        <>
          <Table striped bordered hover variant="dark" className="rounded shadow mb-4 align-middle">
            <thead className="bg-secondary text-light">
              <tr>
                <th>Product</th>
                <th>Image</th>
                <th>Unit Price</th>
                <th>Qty</th>
                <th>Subtotal</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td className="align-middle">{item.title}</td>
                  <td className="align-middle">
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{ width: 55, height: 55, objectFit: "contain", background: "#23272b", borderRadius: 10 }}
                    />
                  </td>
                  <td className="align-middle text-success fw-bold">
                    ${item.price}
                  </td>
                  <td className="align-middle">{item.quantity}</td>
                  <td className="align-middle fw-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </td>
                  <td className="align-middle">
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => dispatch(removeFromCart(item.id))}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="d-flex justify-content-between align-items-center mb-4 px-2">
            <div>
              <span className="fw-bold fs-5 text-light">Total Items:</span>{" "}
              <span className="badge bg-primary fs-5">{totalItems}</span>
            </div>
            <div>
              <span className="fw-bold fs-5 text-light">Total Price:</span>{" "}
              <span className="badge bg-success fs-5">${total.toFixed(2)}</span>
            </div>
          </div>
          <Button
            variant="success"
            size="lg"
            className="w-100 fw-bold shadow"
            onClick={handleCheckout}
          >
            Checkout
          </Button>
        </>
      )}
    </div>
  );
};

export default Cart;