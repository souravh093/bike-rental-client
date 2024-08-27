import { useLocation } from "react-router-dom";

const PaymentBooking = () => {
  const location = useLocation();
  const { id, startTime } = location.state || {};

  console.log(id, startTime);
  return <div>PaymentBooking</div>;
};

export default PaymentBooking;
