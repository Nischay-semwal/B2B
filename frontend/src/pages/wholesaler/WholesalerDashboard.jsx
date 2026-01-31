import StockManager from "./StockManager";
import WholesalerOrders from "./WholesalerOrders";

const WholesalerDashboard = () => {
  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold">Wholesaler Dashboard</h1>

      <StockManager />
      <WholesalerOrders />
    </div>
  );
};

export default WholesalerDashboard;
