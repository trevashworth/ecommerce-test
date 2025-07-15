import React, { useEffect, useState } from "react";
import { db } from "../lib/firebase/firebase";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";

interface Order {
  id: string;
  items: any[];
  total: number;
  createdAt: { seconds: number; nanoseconds: number };
}

const OrderHistory: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) {
        setOrders([]);
        setLoading(false);
        return;
      }
      const q = query(
        collection(db, "orders"),
        where("userId", "==", user.uid),
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(q);
      const orderList: Order[] = [];
      querySnapshot.forEach((doc) => {
        orderList.push({ id: doc.id, ...doc.data() } as Order);
      });
      setOrders(orderList);
      setLoading(false);
    };

    fetchOrders();
  }, []);

  const formatDate = (timestamp: { seconds: number; nanoseconds: number }) => {
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleString();
  };

  if (loading) return <div className="text-light">Loading your orders...</div>;
  if (orders.length === 0) return <div className="text-light">No orders found.</div>;

  return (
    <div className="mx-auto" style={{ maxWidth: 800 }}>
      <h2 className="text-light mb-4">Order History</h2>
      <ListGroup>
        {orders.map((order) => (
          <ListGroup.Item
            key={order.id}
            action
            onClick={() => setSelectedOrder(order)}
            className="bg-dark text-light mb-2"
          >
            <div className="d-flex justify-content-between align-items-center">
              <span>Order: <strong>{order.id}</strong></span>
              <span>Date: {formatDate(order.createdAt)}</span>
              <span>Total: <strong>${order.total.toFixed(2)}</strong></span>
              <Button variant="outline-info" size="sm" onClick={() => setSelectedOrder(order)}>
                View Details
              </Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>

      {/* Order Details Modal/Section */}
      {selectedOrder && (
        <Card className="mt-4 bg-dark text-light">
          <Card.Header>
            <div className="d-flex justify-content-between">
              <span>Order Details</span>
              <Button variant="outline-secondary" size="sm" onClick={() => setSelectedOrder(null)}>Close</Button>
            </div>
          </Card.Header>
          <Card.Body>
            <p><strong>Order ID:</strong> {selectedOrder.id}</p>
            <p><strong>Date:</strong> {formatDate(selectedOrder.createdAt)}</p>
            <ListGroup>
              {selectedOrder.items.map((item: any, idx) => (
                <ListGroup.Item key={idx} className="bg-secondary text-light">
                  <div className="d-flex align-items-center">
                    <img src={item.image} alt={item.title} width={40} style={{marginRight: 12, background: '#23272b', borderRadius: 8}} />
                    <div>
                      <div><strong>{item.title}</strong></div>
                      <div>Qty: {item.quantity}</div>
                      <div>Price: ${item.price}</div>
                      <div>Subtotal: ${(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
            <div className="mt-3 fs-5">
              <strong>Total:</strong> ${selectedOrder.total.toFixed(2)}
            </div>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default OrderHistory;