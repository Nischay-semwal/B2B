import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

const WholesalerOrders = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const res = await api.get("/orders/wholesaler");
    setOrders(res.data.orders);
  };

  return (
    <section>
      <h2 className="text-xl font-semibold mb-3">
        Orders Using My Stock
      </h2>

      {orders.map((order) => {
        const myItems = order.items.filter((item) => {
          const wholesalerId =
            typeof item.wholesaler === "object"
              ? item.wholesaler._id
              : item.wholesaler;

          return wholesalerId === user._id;
        });

        if (myItems.length === 0) return null;

        return (
          <div key={order._id} className="border p-4 mb-3 rounded">
            <p><b>Order:</b> {order._id}</p>
            <p><b>Retailer:</b> {order.retailer?.name}</p>
            <p><b>Status:</b> {order.status}</p>

            <ul className="list-disc ml-6">
              {myItems.map((item, idx) => (
                <li key={idx}>
                  {item.name} — {item.quantity} units
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </section>
  );
};

export default WholesalerOrders;
