import React from "react";
import useServices from "../../hooks/useServices";

const ManageService = () => {
  const [services, setServices] = useServices();
  const handleDelete = (id) => {
    const proceed = window.confirm("Are you sure want to delete?");
    if (proceed) {
      const url = `https://genuin-car-server.vercel.app/service/${id}`;
      console.log(url);
      fetch(url, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.deletedCount > 0) {
            console.log("deleted");
            const remaining = services.filter((service) => service._id !== id);
            setServices(remaining);
          }
        });
    }
  };
  return (
    <div className="w-50 mx-auto">
      <h1>Manage Your Service:{services.length}</h1>
      {services.map((service) => (
        <div
          key={service._id}
          className="tex-left border border-primary d-flex mb-3 align-items-center"
        >
          <div>
            <img src={service.img} alt="" />
          </div>
          <div className="ms-2">
            <h5> {service.name}</h5>
            <p>Description: {service.description}</p>
            <p>Price: ${service.price}</p>
          </div>

          <button
            className="h-25 btn btn-danger px-5 "
            onClick={() => handleDelete(service._id)}
          >
            Delete Service
          </button>
        </div>
      ))}
    </div>
  );
};

export default ManageService;
