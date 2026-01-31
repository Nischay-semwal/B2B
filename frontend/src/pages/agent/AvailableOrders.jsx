import { useEffect, useState } from "react";
import api from "../../api/axios";

const AvailableOrders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const res = await api.get("/orders/available");
    setOrders(res.data.data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const acceptOrder = async (orderId) => {
    await api.post(`/orders/${orderId}/accept`);
    fetchOrders();
  };

  return (
    <section>
      <h2 className="text-xl font-semibold mb-3">Available Orders</h2>

      {orders.length === 0 && <p>No nearby orders</p>}

      {orders.map((order) => (
        <div key={order._id} className="border p-4 mb-3 rounded">
          <p><b>Order:</b> {order._id}</p>
          <p><b>Retailer:</b> {order.retailer.name}</p>
          <p><b>Total:</b> ₹{order.totalAmount}</p>

          <ul className="list-disc ml-6 my-2">
            {order.items.map((item, idx) => (
              <li key={idx}>
                {item.name} — {item.quantity} units
              </li>
            ))}
          </ul>

          <button
            onClick={() => acceptOrder(order._id)}
            className="bg-green-600 text-white px-4 py-1 rounded"
          >
            Accept Delivery
          </button>
        </div>
      ))}
    </section>
  );
};

export default AvailableOrders;
