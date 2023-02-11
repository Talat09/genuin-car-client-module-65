import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
const ServiceDetail = () => {
  const { serviceId } = useParams();
  const [service, setService] = useState([]);
  useEffect(() => {
    const url = `http://localhost:5000/service/${serviceId}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setService(data));
  }, [serviceId]);
  return (
    <div>
      <h1>Welcome to service Details:{service.name}</h1>
      <div className="text-center">
        <Link to="/cheakout">
          <button className="btn btn-primary">Proceed Cheakout</button>
        </Link>
      </div>
    </div>
  );
};

export default ServiceDetail;
