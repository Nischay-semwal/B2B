import { useEffect, useState } from "react";
import api from "../../api/axios";

const MyDeliveries = () => {
  const [orders, setOrders] = useState([]);

  const fetchMyOrders = async () => {
    const res = await api.get("/orders/agent");
    setOrders(res.data.orders);
  };

  useEffect(() => {
    fetchMyOrders();
  }, []);

  const markOutForDelivery = async (id) => {
    await api.post(`/orders/${id}/out-for-delivery`);
    fetchMyOrders();
  };

  const markDelivered = async (id) => {
    await api.post(`/orders/${id}/delivered`);
    fetchMyOrders();
  };

  return (
    <section>
      <h2 className="text-xl font-semibold mb-3">My Deliveries</h2>

      {orders.length === 0 && <p>No assigned deliveries</p>}

      {orders.map((order) => (
        <div key={order._id} className="border p-4 mb-3 rounded">
          <p><b>Order:</b> {order._id}</p>
          <p><b>Status:</b> {order.status}</p>
          <p><b>Retailer:</b> {order.retailer.name}</p>

          <ul className="list-disc ml-6 my-2">
            {order.items.map((item, idx) => (
              <li key={idx}>
                {item.name} — {item.quantity}
              </li>
            ))}
          </ul>

          {order.status === "AGENT_ASSIGNED" && (
            <button
              onClick={() => markOutForDelivery(order._id)}
              className="bg-blue-600 text-white px-4 py-1 rounded"
            >
              Mark Out For Delivery
            </button>
          )}

          {order.status === "OUT_FOR_DELIVERY" && (
            <button
              onClick={() => markDelivered(order._id)}
              className="bg-green-700 text-white px-4 py-1 rounded"
            >
              Mark Delivered
            </button>
          )}
        </div>
      ))}
    </section>
  );
};

export default MyDeliveries;
