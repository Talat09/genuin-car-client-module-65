import React from "react";
import { Link, useParams } from "react-router-dom";
import useServiceDetails from "../../hooks/useServiceDetails";
const ServiceDetail = () => {
  const { serviceId } = useParams();
  const [service] = useServiceDetails(serviceId);
  return (
    <div>
      <h1>Welcome to service Details:{service.name}</h1>
      <div className="text-center">
        <Link to={`/cheakout/${serviceId}`}>
          <button className="btn btn-primary">Proceed Cheakout</button>
        </Link>
      </div>
    </div>
  );
};

export default ServiceDetail;
