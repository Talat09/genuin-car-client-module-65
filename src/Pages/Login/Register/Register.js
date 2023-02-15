import React from "react";
import {
  useCreateUserWithEmailAndPassword,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import { useRef } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import auth from "../../../firebase.init";
import SocialLogin from "../SocialLogin/SocialLogin";
import { useState } from "react";
import Loding from "../../Shared/Loding/Loding";
import PageTitle from "../../Shared/PageTitle/PageTitle";
import useToken from "../../../hooks/useToken";

const Register = () => {
  const nameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const navigate = useNavigate();

  const [agree, setAgree] = useState(false);
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });

  //updating profile
  const [updateProfile, updating, updateError] = useUpdateProfile(auth);
  //take token from custom useToken hook
  const [token] = useToken(user);
  if (loading || updating || updateError) {
    return <Loding></Loding>;
  }
  if (token) {
    navigate("/home");
  }
  //get input value when submited form
  const handleSubmit = async (event) => {
    event.preventDefault();
    const name = nameRef.current.value; //const name =event.target.email.value; ref othoba eivhabe value paite pari
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    // const agree = event.target.terms.checked;
    // if (agree) {
    //     createUserWithEmailAndPassword(email, password)
    // }
    await createUserWithEmailAndPassword(email, password);
    await updateProfile({ displayName: name });
    alert("Updated profile");
    console.log("update profile");
    // navigate("/home");
    console.log(name, email, password);
  };

  const navigateLogin = (event) => {
    navigate("/login");
  };

  return (
    <div className="container w-50  mx-auto shadow-lg bg-primary  py-2  rounded my-5">
      <PageTitle title="Register"></PageTitle>
      <h2 className="text-light text-center mt-2">Please Register</h2>
      <Form
        onSubmit={handleSubmit}
        className="text-light text-start   justify-content-center"
      >
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Your Name</Form.Label>
          <Form.Control
            ref={nameRef}
            type="text"
            placeholder="Your Name"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            ref={emailRef}
            type="email"
            placeholder="Enter email"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            ref={passwordRef}
            type="password"
            placeholder="Password"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="cheakboxs">
          <input
            onClick={() => setAgree(!agree)}
            className="text-light "
            type="checkbox"
            name="terms"
            id="terms"
          />
          {/* <label className={agree ? 'ps-2' : 'ps-2 text-muted'} htmlFor="terms">Accept genuin cars Terms and Condition </label> */}
          <label
            className={`ps-2${agree ? "" : "ps-2 text-light"}`}
            htmlFor="terms"
          >
            Accept genuin cars Terms and Condition{" "}
          </label>
        </Form.Group>
        <Form.Text>
          <p>{error}</p>
        </Form.Text>
        <Button
          disabled={!agree}
          className="bg-light text-primary fw-semibold px-5"
          variant="primary"
          type="submit"
        >
          Register
        </Button>
      </Form>
      <p className="text-light">
        Already Have an Account?{" "}
        <Link
          to="/login"
          onClick={navigateLogin}
          className="text-light text-decoration-none   fw-semibold"
        >
          Login
        </Link>{" "}
      </p>
      <SocialLogin></SocialLogin>
    </div>
  );
};

export default Register;
