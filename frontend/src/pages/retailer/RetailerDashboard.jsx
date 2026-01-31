import PlaceOrder from "./PlaceOrder";
import MyOrders from "./MyOrders";

const RetailerDashboard = () => {
  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold">Retailer Dashboard</h1>

      <PlaceOrder />
      <MyOrders />
    </div>
  );
};

export default RetailerDashboard;
