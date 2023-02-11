import React from "react";
import { useNavigate } from "react-router-dom";
import "./Service.css";
const Service = (props) => {
  const { _id, name, price, img, description } = props.service;

  const navigate = useNavigate();

  const navigateToDetail = (id) => {
    navigate(`/Service/${id}`);
  };
  return (
    <div className="service">
      <img className="w-100" src={img} alt="" />
      <h2>{name}</h2>
      <p>Price:{price}$</p>
      <p>
        <small>{description}</small>
      </p>
      <button onClick={() => navigateToDetail(_id)} className="btn btn-primary">
        Book: {name}
      </button>
    </div>
  );
};

export default Service;
