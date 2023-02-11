import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Expert = (props) => {
  const { name, img } = props.expert;
  return (
    <div className="col-sm-12 col-md-6 col-lg-4 g-5">
      <div className="card " style={{ width: "18rem" }}>
        <img className="w-100 card-img-top" src={img} alt="..." />
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
          <Link to="/cheakout">
            <Button className="btn btn-primary">Go somewhere</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Expert;
