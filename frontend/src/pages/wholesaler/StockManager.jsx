import { useEffect, useState } from "react";
import api from "../../api/axios";

const StockManager = () => {
  const [stock, setStock] = useState([]);
  const [form, setForm] = useState({
    productName: "",
    pricePerUnit: "",
    quantity: "",
    category: ""
  });

  const fetchStock = async () => {
    const res = await api.get("/stock");
    setStock(res.data.data);
  };

  useEffect(() => {
    fetchStock();
  }, []);

  const addStock = async () => {
    await api.post("/stock", {
      ...form,
      pricePerUnit: Number(form.pricePerUnit),
      quantity: Number(form.quantity)
    });
    setForm({ productName: "", pricePerUnit: "", quantity: "", category: "" });
    fetchStock();
  };

  const updateStock = async (id, updates) => {
    await api.put(`/stock/${id}`, updates);
    fetchStock();
  };

  const deleteStock = async (id) => {
    await api.delete(`/stock/${id}`);
    fetchStock();
  };

  return (
    <section>
      <h2 className="text-xl font-semibold mb-3">My Stock</h2>

      <div className="flex gap-2 mb-4">
        <input
          placeholder="Product"
          value={form.productName}
          onChange={(e) => setForm({ ...form, productName: e.target.value })}
        />
        <input
          placeholder="Price"
          type="number"
          value={form.pricePerUnit}
          onChange={(e) => setForm({ ...form, pricePerUnit: e.target.value })}
        />
        <input
          placeholder="Qty"
          type="number"
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: e.target.value })}
        />
        <input
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />
        <button onClick={addStock} className="bg-green-600 text-white px-3">
          Add
        </button>
      </div>

      <table className="w-full border">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {stock.map((s) => (
            <tr key={s._id}>
              <td>{s.productName}</td>
              <td>₹{s.pricePerUnit}</td>
              <td>{s.quantity}</td>
              <td className="space-x-2">
                <button
                  onClick={() =>
                    updateStock(s._id, { quantity: s.quantity + 1 })
                  }
                  className="px-2 bg-blue-500 text-white"
                >
                  +
                </button>
                <button
                  onClick={() => deleteStock(s._id)}
                  className="px-2 bg-red-600 text-white"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default StockManager;
