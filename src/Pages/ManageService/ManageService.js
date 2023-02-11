import React from "react";
import useServices from "../../hooks/useServices";

const ManageService = () => {
  const [services, setServices] = useServices();
  const handleDelete = (id) => {
    const proceed = window.confirm("Are you sure want to delete?");
    if (proceed) {
      const url = `http://localhost:5000/service/${id}`;
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
        <div key={service._id} className="tex-left">
          <h5>
            {service.name}{" "}
            <button onClick={() => handleDelete(service._id)}>X</button>
          </h5>
        </div>
      ))}
    </div>
  );
};

export default ManageService;
