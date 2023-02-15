import React from "react";

const OrdersDetails = ({ order }) => {
  console.log(order);
  const { address, email, phone, service } = order;
  return (
    <div className="text-left border border-primary w-25 mx-auto p-5 mt-5">
      <h4>Service Name: {service}</h4>
      <p>Email: {email}</p>
      <p>Phone: {phone}</p>
      <p>Address: {address}</p>
    </div>
  );
};

export default OrdersDetails;
