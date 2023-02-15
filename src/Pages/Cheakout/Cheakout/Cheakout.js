import React from "react";
import { useParams } from "react-router-dom";
import useServiceDetails from "../../../hooks/useServiceDetails";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";
import axios from "axios";
import { toast } from "react-toastify";
const Cheakout = () => {
  const { serviceId } = useParams();
  const [service] = useServiceDetails(serviceId);
  const [user] = useAuthState(auth);
  if (user) {
    console.log(user);
  }
  //   const [user, setUser] = useState({
  //     name: "Talat Mahmud",
  //     email: "talat@gmail.com",
  //     address: "sobuj baag,Halishahar",
  //     phone: "01725456988",
  //   });
  //   const handleAddress = (event) => {
  //     const { address, ...rest } = user;
  //     const newAddress = event.target.value;
  //     const newUser = { address: newAddress, ...rest };
  //     setUser(newUser);
  //   };
  const handlePlaceOrder = (event) => {
    event.preventDefault();
    const order = {
      email: user.email,
      service: service.name,
      serviceId: serviceId,
      address: event.target.address.value,
      phone: event.target.phone.value,
    };
    axios
      .post("https://genuin-car-server.vercel.app/order", order)
      .then((response) => {
        const { data } = response;
        if (data.insertedId) {
          toast("Your order is Booked");
        }
      });
  };
  return (
    <div className="w-50 mx-auto">
      <h1 className="text-primary">Place Order:</h1>

      <form onSubmit={handlePlaceOrder}>
        <input
          className="w-100 mb-2"
          type="text"
          value={user?.displayName}
          name="name"
          placeholder="name"
          required
          readOnly
          disabled
        />
        <br />
        <input
          className="w-100 mb-2"
          type="email"
          value={user?.email}
          name="email"
          placeholder="email"
          required
          readOnly
          disabled
        />
        <br />
        <input
          className="w-100 mb-2"
          type="text"
          value={service.name}
          name="service"
          placeholder="service"
          required
          readOnly
        />
        <br />
        <input
          className="w-100 mb-2"
          type="text"
          name="address"
          placeholder="address"
          autoComplete="off"
          required
        />
        <br />
        <input
          className="w-100 mb-2"
          type="text"
          name="phone"
          placeholder="phone"
          required
        />
        <br />
        <input className="btn btn-primary" type="submit" value="Place Order" />
      </form>
    </div>
  );
};

export default Cheakout;
