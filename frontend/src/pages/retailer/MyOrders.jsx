import { useEffect, useState } from "react";
import api from "../../api/axios";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const res = await api.get("/orders/retailer");
    setOrders(res.data.orders);
  };

  return (
    <section>
      <h2 className="text-xl font-semibold mb-3">My Orders</h2>

      {orders.map((order) => (
        <div key={order._id} className="border p-4 mb-4 rounded">
          <p><b>Order ID:</b> {order._id}</p>
          <p><b>Status:</b> {order.status}</p>
          <p><b>Total:</b> ₹{order.totalAmount}</p>

          <ul className="list-disc ml-6 mt-2">
            {order.items.map((item, idx) => (
              <li key={idx}>
                {item.name} — {item.quantity} units
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
};

export default MyOrders;
