import axios from "axios";
import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import auth from "../../firebase.init";
import OrdersDetails from "./OrdersDetails";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    const getOrders = async () => {
      const email = user?.email;
      const url = `https://genuin-car-server.vercel.app/order?email=${email}`;

      try {
        const { data } = await axios.get(url, {
          headers: {
            authorization: `bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        setOrders(data);
      } catch (error) {
        if (error.response.status === 401 || error.response.status === 403) {
          signOut(auth);
          navigate("/login");
        }
      }
    };
    getOrders();
  }, [user, navigate]);
  return (
    <div className=" mx-auto">
      <h1 className="text-primary text-center">Your Orders:{orders.length}</h1>
      <div className=" ">
        {orders.map((order) => (
          <OrdersDetails key={order._id} order={order}></OrdersDetails>
        ))}
      </div>
    </div>
  );
};

export default Orders;
