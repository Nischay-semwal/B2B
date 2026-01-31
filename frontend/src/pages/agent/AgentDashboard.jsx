import AvailableOrders from "./AvailableOrders";
import MyDeliveries from "./MyDeliveries";

const AgentDashboard = () => {
  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold">Agent Dashboard</h1>

      <AvailableOrders />
      <MyDeliveries />
    </div>
  );
};

export default AgentDashboard;
