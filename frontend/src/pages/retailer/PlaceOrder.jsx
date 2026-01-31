import { useState } from "react";
import api from "../../api/axios";

const PlaceOrder = () => {
  const [items, setItems] = useState([
    { name: "", quantity: "" }
  ]);

  const addItem = () => {
    setItems([...items, { name: "", quantity: "" }]);
  };

  const updateItem = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  const placeOrder = async () => {
    try {
      await api.post("/orders", {
        items: items.map(i => ({
          name: i.name,
          quantity: Number(i.quantity)
        }))
      });

      alert("Order placed successfully");
      setItems([{ name: "", quantity: "" }]);
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to place order");
    }
  };

  return (
    <section className="border p-4 rounded">
      <h2 className="text-xl font-semibold mb-3">Place Order</h2>

      {items.map((item, idx) => (
        <div key={idx} className="flex gap-2 mb-2">
          <input
            placeholder="Product name"
            value={item.name}
            onChange={(e) =>
              updateItem(idx, "name", e.target.value)
            }
          />
          <input
            placeholder="Quantity"
            type="number"
            value={item.quantity}
            onChange={(e) =>
              updateItem(idx, "quantity", e.target.value)
            }
          />
        </div>
      ))}

      <button onClick={addItem} className="mb-3 text-blue-600">
        + Add item
      </button>

      <button
        onClick={placeOrder}
        className="bg-green-600 text-white px-4 py-2"
      >
        Place Order
      </button>
    </section>
  );
};

export default PlaceOrder;
