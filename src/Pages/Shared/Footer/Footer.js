import React, { useEffect, useState } from "react";

const Footer = () => {
  const [date, setDate] = useState();

  const getYear = () => setDate(new Date().getFullYear());

  useEffect(() => {
    getYear();
  }, []);
  return (
    <footer className="text-dark mt-5">
      <p>
        <small>&copy; Copyright - {date}</small>
      </p>
    </footer>
  );
};

export default Footer;
