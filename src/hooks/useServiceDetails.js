import { useEffect, useState } from "react";

const useServiceDetails = (serviceId) => {
  const [service, setService] = useState([]);
  useEffect(() => {
    const url = `https://genuin-car-server.vercel.app/service/${serviceId}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setService(data));
  }, [serviceId]);
  return [service, setService];
};
export default useServiceDetails;
